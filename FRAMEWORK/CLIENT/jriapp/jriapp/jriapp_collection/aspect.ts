﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { FIELD_TYPE, DATA_TYPE } from "../jriapp_core/const";
import { IIndexer, IValidationInfo, IFieldInfo, IVoidPromise, TEventHandler, IErrorNotification, IBaseObject } from "../jriapp_core/shared";
import { BaseObject }  from "../jriapp_core/object";
import { ERROR } from "../jriapp_utils/coreutils";
import { Utils } from "../jriapp_utils/utils";
import { ERRS } from "../jriapp_core/lang";

import { ICollectionItem, IItemAspect, ICancellableArgs, ITEM_STATUS, PROP_NAME, ITEM_EVENTS } from "int";
import { BaseCollection } from "base";
import { fn_traverseFields } from "utils";
import { ValidationError, Validations } from "validation";

const utils = Utils, coreUtils = utils.core, strUtils = utils.str, checks = utils.check;

interface ICustomVal
{
    val: any;
    isOwnIt: boolean;
}


export class ItemAspect<TItem extends ICollectionItem> extends BaseObject implements IItemAspect<TItem> {
    private _key: string;
    private _item: TItem;
    private _isEditing: boolean;
    private _collection: BaseCollection<TItem>;
    protected _status: ITEM_STATUS;
    protected _saveVals: IIndexer<any>;
    protected _vals: IIndexer<any>;
    protected _notEdited: boolean;
    private _isCached: boolean;
    private _isDetached: boolean;
    private _valueBag: IIndexer<ICustomVal>;
    _setIsDetached(v: boolean) {
        this._isDetached = v;
    }
    _setIsCached(v: boolean) {
        this._isCached = v;
    }
    constructor(collection: BaseCollection<TItem>) {
        super();
        this._key = null;
        this._item = null;
        this._isEditing = false;
        this._collection = collection;
        this._status = ITEM_STATUS.None;
        this._saveVals = null;
        this._vals = {};
        this._notEdited = true;
        this._isCached = false;
        this._isDetached = false;
    }
    protected _getEventNames() {
        let base_events = super._getEventNames();
        return [ITEM_EVENTS.errors_changed].concat(base_events);
    }
    protected _onErrorsChanged(args: any) {
        this.raiseEvent(ITEM_EVENTS.errors_changed, args);
    }
    handleError(error: any, source: any): boolean {
        let isHandled = super.handleError(error, source);
        if (!isHandled) {
            return this.collection.handleError(error, source);
        }
        return isHandled;
    }
    protected _beginEdit(): boolean {
        const coll = this.collection;
        let isHandled: boolean = false;
        if (coll.isEditing) {
            let item = coll._getInternal().getEditingItem();
            if (item._aspect === this)
                return false;
            try {
                item._aspect.endEdit();
                if (item._aspect.getIsHasErrors()) {
                    this.handleError(new ValidationError(item._aspect.getAllErrors(), item), item);
                    item._aspect.cancelEdit();
                }
            } catch (ex) {
                isHandled = this.handleError(ex, item);
                item._aspect.cancelEdit();
                ERROR.reThrow(ex, isHandled);
            }
        }
        if (this.isDetached)
            return false;
        this._saveVals = coreUtils.clone(this._vals);
        this.collection.currentItem = this.item;
        return true;
    }
    protected _endEdit(): boolean {
        if (!this.isEditing)
            return false;
        const coll = this.collection, self = this, internal = coll._getInternal();
        if (this.getIsHasErrors()) {
            return false;
        }
        //revalidate all
        internal.removeAllErrors(this.item);
        let validation_errors = this._validateAll();
        if (validation_errors.length > 0) {
            internal.addErrors(self.item, validation_errors);
        }
        if (this.getIsHasErrors()) {
            return false;
        }
        this._saveVals = null;
        return true;
    }
    protected _cancelEdit(): boolean {
        if (!this.isEditing)
            return false;
        const coll = this.collection, self = this, item = self.item, changes = this._saveVals;
        this._vals = this._saveVals;
        this._saveVals = null;
        coll._getInternal().removeAllErrors(item);
        //refresh User interface when values restored
        coll.getFieldNames().forEach(function (name) {
            if (changes[name] !== self._vals[name]) {
                item.raisePropertyChanged(name);
            }
        });
        return true;
    }
    protected _validate(): IValidationInfo {
        return this.collection._getInternal().validateItem(this.item);
    }
    protected _skipValidate(fieldInfo: IFieldInfo, val: any) {
        return false;
    }
    protected _validateField(fieldName: string): IValidationInfo {
        let value: any, fieldInfo = this.getFieldInfo(fieldName), valInfo: IValidationInfo = null;
        try {
            value = coreUtils.getValue(this._vals, fieldName);
            if (this._skipValidate(fieldInfo, value))
                return valInfo;

            if (this.isNew) {
                if (value === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly && !fieldInfo.isAutoGenerated)
                    throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);
            }
            else {
                if (value === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly)
                    throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);
            }
        } catch (ex) {
            valInfo = { fieldName: fieldName, errors: [ex.message] };
        }

        let tmpValInfo = this.collection._getInternal().validateItemField(this.item, fieldName);

        if (!!valInfo && !!tmpValInfo) {
            valInfo = { fieldName: valInfo.fieldName, errors: valInfo.errors.concat(tmpValInfo.errors) };
        }
        else if (!!tmpValInfo)
            valInfo = tmpValInfo;

        return valInfo;
    }
    protected _validateAll(): IValidationInfo[] {
        let self = this, fieldInfos = this.collection.getFieldInfos(), errs: IValidationInfo[] = [];
        fn_traverseFields(fieldInfos, (fld, fullName) => {
            if (fld.fieldType !== FIELD_TYPE.Object) {
                let res = self._validateField(fullName);
                if (!!res) {
                    errs.push(res);
                }
            }
        });

        let res = self._validate();
        if (!!res) {
            errs.push(res);
        }
        return errs;
    }
    protected _checkVal(fieldInfo: IFieldInfo, val: any): any {
        let res = val;
        if (this._skipValidate(fieldInfo, val))
            return res;
        if (fieldInfo.isReadOnly && !(fieldInfo.allowClientDefault && this.isNew))
            throw new Error(ERRS.ERR_FIELD_READONLY);
        if ((val === null || (checks.isString(val) && !val)) && !fieldInfo.isNullable)
            throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);

        if (val === null)
            return val;

        switch (fieldInfo.dataType) {
            case DATA_TYPE.None:
                break;
            case DATA_TYPE.Guid:
            case DATA_TYPE.String:
                if (!checks.isString(val)) {
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "String"));
                }
                if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                if (fieldInfo.isNullable && val === "")
                    res = null;
                if (!!fieldInfo.regex) {
                    let reg = new RegExp(fieldInfo.regex, "i");
                    if (!reg.test(val)) {
                        throw new Error(strUtils.format(ERRS.ERR_FIELD_REGEX, val));
                    }
                }
                break;
            case DATA_TYPE.Binary:
                if (!checks.isArray(val)) {
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "Array"));
                }
                if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                break;
            case DATA_TYPE.Bool:
                if (!checks.isBoolean(val))
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "Boolean"));
                break;
            case DATA_TYPE.Integer:
            case DATA_TYPE.Decimal:
            case DATA_TYPE.Float:
                if (!checks.isNumber(val))
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "Number"));
                if (!!fieldInfo.range) {
                    Validations.checkNumRange(Number(val), fieldInfo.range);
                }
                break;
            case DATA_TYPE.DateTime:
            case DATA_TYPE.Date:
                if (!checks.isDate(val))
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "Date"));
                if (!!fieldInfo.range) {
                    Validations.checkDateRange(val, fieldInfo.range);
                }
                break;
            case DATA_TYPE.Time:
                if (!checks.isDate(val))
                    throw new Error(strUtils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, "Time"));
                break;
            default:
                throw new Error(strUtils.format(ERRS.ERR_PARAM_INVALID, "dataType", fieldInfo.dataType));
        }
        return res;
    }
    protected _resetIsNew() {
        //can reset isNew on all items in the collection
        //the list descendant does it
    }
    protected _fakeDestroy() {
        this.raiseEvent(ITEM_EVENTS.destroyed, {});
        this.removeNSHandlers();
    }
    _onAttaching(): void {
    }
    _onAttach(): void {
    }
    raiseErrorsChanged(args: any): void {
        this._onErrorsChanged(args);
    }
    getFieldInfo(fieldName: string) {
        return this.collection.getFieldInfo(fieldName);
    }
    getFieldNames() {
        return this.collection.getFieldNames();
    }
    getErrorString(): string {
        let itemErrors = this.collection._getInternal().getErrors(this.item);
        if (!itemErrors)
            return "";
        let res: string[] = [];
        coreUtils.forEachProp(itemErrors, function (name) {
            res.push(strUtils.format("{0}: {1}", name, itemErrors[name]));
        });
        return res.join("|");
    }
    submitChanges(): IVoidPromise {
        let deferred = utils.defer.createDeferred<void>();
        deferred.reject();
        return deferred.promise();
    }
    rejectChanges(): void {
    }
    beginEdit(): boolean {
        if (this.isEditing)
            return false;
        const coll = this.collection, internal = coll._getInternal(), item = this.item;
        internal.onBeforeEditing(item, true, false);
        if (!this._beginEdit())
            return false;
        internal.onEditing(item, true, false);
        if (!!this._valueBag && this.isEditing) {
            coreUtils.iterateIndexer(this._valueBag, (name, obj) => {
                if (!!obj && checks.isEditable(obj.val))
                    obj.val.beginEdit();
            });
        }
        return true;
    }
    endEdit(): boolean {
        if (!this.isEditing)
            return false;
        const coll = this.collection, internal = coll._getInternal(), item = this.item;
        internal.onBeforeEditing(item, false, false);
        if (!!this._valueBag) {
            coreUtils.iterateIndexer(this._valueBag, (name, obj) => {
                if (!!obj && checks.isEditable(obj.val))
                    obj.val.endEdit();
            });
        }
        if (!this._endEdit())
            return false;
        internal.onEditing(item, false, false);
        this._notEdited = false;
        return true;
    }
    cancelEdit(): boolean {
        //console.log("cancel " + this._item.toString());
        if (!this.isEditing)
            return false;
        const coll = this.collection, internal = coll._getInternal(), item = this.item, isNew = this.isNew;
        internal.onBeforeEditing(item, false, true);
        if (!!this._valueBag) {
            coreUtils.iterateIndexer(this._valueBag, (name, obj) => {
                if (!!obj && checks.isEditable(obj.val))
                    obj.val.cancelEdit();
            });
        }
        if (!this._cancelEdit())
            return false;
        internal.onEditing(item, false, true);
        if (isNew && this._notEdited && !this.getIsDestroyCalled()) {
            this.destroy();
        }
        return true;
    }
    deleteItem(): boolean {
        let coll = this.collection;
        if (!this.key)
            return false;
        let args: ICancellableArgs<TItem> = { item: this.item, isCancel: false };
        coll._getInternal().onItemDeleting(args);
        if (args.isCancel) {
            return false;
        }
        this.destroy();
        return true;
    }
    getIsHasErrors() {
        const itemErrors = this.collection._getInternal().getErrors(this.item);
        return !!itemErrors;
    }
    addOnErrorsChanged(fn: TEventHandler<ItemAspect<TItem>, any>, nmspace?: string, context?: any) {
        this._addHandler(ITEM_EVENTS.errors_changed, fn, nmspace, context);
    }
    removeOnErrorsChanged(nmspace?: string) {
        this._removeHandler(ITEM_EVENTS.errors_changed, nmspace);
    }
    getFieldErrors(fieldName: string): IValidationInfo[] {
        let itemErrors = this.collection._getInternal().getErrors(this.item);
        if (!itemErrors)
            return [];
        let name = fieldName;
        if (!fieldName)
            fieldName = "*";
        if (!itemErrors[fieldName])
            return [];
        if (fieldName === "*")
            name = null;
        return [
            { fieldName: name, errors: itemErrors[fieldName] }
        ];
    }
    getAllErrors(): IValidationInfo[] {
        let itemErrors = this.collection._getInternal().getErrors(this.item);
        if (!itemErrors)
            return [];
        let res: IValidationInfo[] = [];
        coreUtils.forEachProp(itemErrors, function (name) {
            let fieldName: string = null;
            if (name !== "*") {
                fieldName = name;
            }
            res.push({ fieldName: fieldName, errors: itemErrors[name] });
        });
        return res;
    }
    getIErrorNotification(): IErrorNotification {
        return this;
    }
    destroy() {
        if (this._isDestroyed)
            return;
        const self = this;
        this._isDestroyCalled = true;
        let coll = this._collection;
        let item = this._item;
        if (!!item) {
            this.cancelEdit();
            if (this._isCached) {
                try {
                    this._fakeDestroy();
                }
                finally {
                    this._isDestroyCalled = false;
                }
                return;
            }


            if (!item._aspect.isDetached) {
                coll.removeItem(item);
            }
        }
        this._key = null;
        this._saveVals = null;
        this._vals = {};
        this._isCached = false;
        this._isDetached = true;
        this._collection = null;
        if (!!this._valueBag) {
            utils.core.forEachProp(this._valueBag, (name) => {
                self._delCustomVal(self._valueBag[name]);
            });

            this._valueBag = null;
        }
        super.destroy(); 
    }
    private _delCustomVal(old: ICustomVal) {
        if (!!old) {
            if (checks.isEditable(old.val) && old.val.isEditing)
                old.val.cancelEdit();

            if (old.isOwnIt && checks.isBaseObject(old.val))
                old.val.destroy();
        }
    }
    toString() {
        return "ItemAspect";
    }
    get item(): TItem {
        return this._item;
    }
    set item(v: TItem) {
        this._item = v;
    }
    get isCanSubmit(): boolean { return false; }
    get status(): ITEM_STATUS { return this._status; }
    get isNew(): boolean {
        return false;
    }
    get isDeleted(): boolean { return false; }
    get key(): string { return this._key; }
    set key(v: string) {
        if (v !== null)
            v = "" + v;
        this._key = v;
    }
    get collection(): BaseCollection<TItem> { return this._collection; }
    get isUpdating(): boolean {
        let coll = this.collection;
        if (!coll)
            return false;
        return coll.isUpdating;
    }
    get isEditing(): boolean {
        const coll = this._collection, editingItem = !coll ? <TItem>null : coll._getInternal().getEditingItem();
        return !!editingItem && editingItem._aspect === this;
    }
    get isHasChanges(): boolean { return this._status !== ITEM_STATUS.None; }
    get isCached(): boolean { return this._isCached; }
    get isDetached(): boolean { return this._isDetached; }
    // can be used to store any user object
    setCustomVal(name: string, val: any, isOwnVal: boolean = true): void {
        if (this.getIsDestroyCalled())
            return;

        if (!this._valueBag) {
            if (checks.isNt(val))
                return;
            this._valueBag = {};
        }

        let old = this._valueBag[name];

        if (!!old && old.val !== val) {
            this._delCustomVal(old);
        }

        if (checks.isNt(val))
        {
            delete this._valueBag[name];
        }
        else {
            this._valueBag[name] = { val: val, isOwnIt: !!isOwnVal };
            if (this.isEditing && checks.isEditable(val))
                val.beginEdit();
        }
    }
    getCustomVal(name: string): any {
        if (this.getIsDestroyCalled() || !this._valueBag)
            return null;
      
        let obj = this._valueBag[name];
        if (!obj) {
            return null;
        }
        return obj.val;
    }
}