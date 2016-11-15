﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { BINDING_MODE } from "jriapp_core/const";
import {
    IBaseObject, IExternallyCachable, IBinding, IBindingOptions,
    IConstructorContentOptions, IContentFactory, IContentConstructor, IContent, IContentOptions, IElView
} from "jriapp_core/shared";
import { ERRS } from "jriapp_core/lang";
import { parser } from "jriapp_core/parser";
import { DomUtils } from "jriapp_utils/dom";
import { Utils } from "jriapp_utils/utils";
import { ICollection, ICollectionItem } from "jriapp_collection/int";
import { bootstrap } from "jriapp_core/bootstrap";
import { ListBoxElView } from "../listbox";
import { SpanElView } from "../span";
import { BasicContent } from "./basic";

const utils = Utils, dom = DomUtils, $ = dom.$, doc = dom.document, checks = utils.check,
    strUtils = utils.str, coreUtils = utils.core;
    

const PROP_NAME = {
    dataSource: "dataSource",
    selectedItem: "selectedItem",
    selectedValue: "selectedValue",
    valuePath: "valuePath",
    textPath: "textPath",
    isEnabled: "isEnabled",
    listBox: "listBox",
    value: "value",
    textProvider: "textProvider",
    stateProvider: "stateProvider"
};

export interface ILookupOptions {
    dataSource: string;
    valuePath: string;
    textPath: string;
    statePath?: string;
}

let LOOKUP_EVENTS = {
    obj_created: "object_created",
    obj_needed: "object_needed"
};

export type TObjCreatedArgs = { objectKey: string; object: IBaseObject; isCachedExternally: boolean; };
export type TObjNeededArgs = { objectKey: string; object: IBaseObject; };

export class LookupContent extends BasicContent implements IExternallyCachable {
    private _spanView: SpanElView;
    private _valBinding: IBinding;
    private _listBinding: IBinding;
    private _listBoxElView: ListBoxElView;
    private _isListBoxCachedExternally: boolean;
    private _value: any;
    private _objId: string;

    constructor(options: IConstructorContentOptions) {
        if (options.contentOptions.name !== "lookup") {
            throw new Error(strUtils.format(ERRS.ERR_ASSERTION_FAILED, "contentOptions.name === 'lookup'"));
        }
        super(options);
        this._spanView = null;
        this._listBoxElView = null;
        this._isListBoxCachedExternally = false;
        this._valBinding = null;
        this._listBinding = null;
        this._value = null;
        this._objId = "lku" + coreUtils.getNewID();
    }
    protected init() {
        if (!!this._options.initContentFn) {
            this._options.initContentFn(this);
        }
    }
    protected _getEventNames() {
        let base_events = super._getEventNames();
        return [LOOKUP_EVENTS.obj_created, LOOKUP_EVENTS.obj_needed].concat(base_events);
    }
    addOnObjectCreated(fn: (sender: any, args: TObjCreatedArgs) => void, nmspace?: string) {
        this._addHandler(LOOKUP_EVENTS.obj_created, fn, nmspace);
    }
    removeOnObjectCreated(nmspace?: string) {
        this._removeHandler(LOOKUP_EVENTS.obj_created, nmspace);
    }
    addOnObjectNeeded(fn: (sender: any, args: TObjNeededArgs) => void, nmspace?: string) {
        this._addHandler(LOOKUP_EVENTS.obj_needed, fn, nmspace);
    }
    removeOnObjectNeeded(nmspace?: string) {
        this._removeHandler(LOOKUP_EVENTS.obj_needed, nmspace);
    }
    protected getListBoxElView(): ListBoxElView {
        if (!!this._listBoxElView)
            return this._listBoxElView;
        const lookUpOptions: ILookupOptions = this._options.options, objectKey = "listBoxElView";

        let args1: TObjNeededArgs = { objectKey: objectKey, object: null };
        //try get externally externally cached listBox
        this.raiseEvent(LOOKUP_EVENTS.obj_needed, args1);
        if (!!args1.object) {
            this._isListBoxCachedExternally = true;
            this._listBoxElView = <ListBoxElView>args1.object;
        }
        if (!!this._listBoxElView) {
            this._listBoxElView.listBox.addOnRefreshed(this.onListRefreshed, this.uniqueID, this);
            return this._listBoxElView;
        }
        //IF NO ELEMENT VIEW in THE CACHE - proceed creating new ElView
        let listBoxElView = this.createListBoxElView(lookUpOptions);
        let args2: TObjCreatedArgs = { objectKey: objectKey, object: listBoxElView, isCachedExternally: false };
        //this allows to cache listBox externally
        this.raiseEvent(LOOKUP_EVENTS.obj_created, args2);
        this._isListBoxCachedExternally = args2.isCachedExternally;
        this._listBoxElView = listBoxElView;
        this._listBoxElView.listBox.addOnRefreshed(this.onListRefreshed, this.uniqueID, this);
        return this._listBoxElView;
    }
    protected onListRefreshed(): void {
        this.updateTextValue();
    }
    protected createListBoxElView(lookUpOptions: ILookupOptions): ListBoxElView {
        let options = {
            valuePath: lookUpOptions.valuePath,
            textPath: lookUpOptions.textPath,
            statePath: (!lookUpOptions.statePath) ? null : lookUpOptions.statePath,
            el: doc.createElement("select")
        }, el = options.el, dataSource = parser.resolvePath(this.app, lookUpOptions.dataSource);
        el.setAttribute("size", "1");
        let elView = new ListBoxElView(options);
        elView.dataSource = dataSource;
        return elView;
    }
    protected updateTextValue() {
        let spanView = this.getSpanView();
        spanView.value = this.getLookupText();
    }
    protected getLookupText() {
        let listBoxView = this.getListBoxElView();
        return listBoxView.listBox.getTextByValue(this.value);
    }
    protected getSpanView() {
        if (!!this._spanView) {
            return this._spanView;
        }
        let el = doc.createElement("span"), displayInfo = this._options.displayInfo;
        if (!!displayInfo && !!displayInfo.displayCss) {
            dom.addClass([el], displayInfo.displayCss);
        }
        let spanView = new SpanElView({ el: el });
        this._spanView = spanView;
        return this._spanView;
    }
    protected render() {
        this.cleanUp();
        this.createTargetElement();
        this._parentEl.appendChild(this._el);
    }
    protected createTargetElement(): IElView {
        let tgt: IElView, el: HTMLElement, selectView: ListBoxElView, spanView: SpanElView;
        if (this.isEditing && this.getIsCanBeEdited()) {
            selectView = this.getListBoxElView();
            this._listBinding = this.bindToList(selectView);
            tgt = selectView;
        }
        else {
            spanView = this.getSpanView();
            this._valBinding = this.bindToValue();
            tgt = spanView;
        }
        this._el = tgt.el;
        this.updateCss();
        return tgt;
    }
    protected cleanUp() {
        if (!!this._el) {
            dom.removeNode(this._el);
            this._el = null;
        }
        if (!!this._listBinding) {
            this._listBinding.destroy();
            this._listBinding = null;
        }
        if (!!this._valBinding) {
            this._valBinding.destroy();
            this._valBinding = null;
        }

        if (!!this._listBoxElView && this._isListBoxCachedExternally) {
            if (!this._listBoxElView.getIsDestroyCalled())
                this._listBoxElView.listBox.removeOnRefreshed(this.uniqueID);
            this._listBoxElView = null;
        }
    }
    protected updateBindingSource() {
        if (!!this._valBinding) {
            this._valBinding.source = this._dataContext;
        }
        if (!!this._listBinding) {
            this._listBinding.source = this._dataContext;
        }
    }
    protected bindToValue() {
        if (!this._options.fieldName)
            return null;

        let options: IBindingOptions = {
            target: this, source: this._dataContext,
            targetPath: PROP_NAME.value, sourcePath: this._options.fieldName,
            mode: BINDING_MODE.OneWay,
            converter: null, converterParam: null, isSourceFixed: false
        };
        return this.app.bind(options);
    }
    protected bindToList(selectView: ListBoxElView) {
        if (!this._options.fieldName)
            return null;

        let options: IBindingOptions = {
            target: selectView, source: this._dataContext,
            targetPath: PROP_NAME.selectedValue, sourcePath: this._options.fieldName,
            mode: BINDING_MODE.TwoWay,
            converter: null, converterParam: null, isSourceFixed: false
        };
        return this.app.bind(options);
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        this.cleanUp();
        if (!!this._listBoxElView && !this._listBoxElView.getIsDestroyCalled()) {
            this._listBoxElView.listBox.removeOnRefreshed(this.uniqueID);
            if (!this._isListBoxCachedExternally)
                this._listBoxElView.destroy();
        }
        this._listBoxElView = null;
        if (!!this._spanView) {
            this._spanView.destroy();
        }
        this._spanView = null;
        super.destroy();
    }
    toString() {
        return "LookupContent";
    }
    get value() { return this._value; }
    set value(v) {
        if (this._value !== v) {
            this._value = v;
            this.raisePropertyChanged(PROP_NAME.value);
        }
        this.updateTextValue();
    }
    get uniqueID() { return this._objId; }
}

class ContentFactory implements IContentFactory {
    private _nextFactory: IContentFactory;

    constructor(nextFactory?: IContentFactory) {
        this._nextFactory = nextFactory;
    }

    getContentType(options: IContentOptions): IContentConstructor {
        if (options.name === "lookup") {
            return LookupContent;
        }

        if (!this._nextFactory) {
            throw new Error(ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
        }
        else {
            return this._nextFactory.getContentType(options);
        }
    }
    createContent(options: IConstructorContentOptions): IContent {
        let contentType = this.getContentType(options);
        return new contentType(options);
    }
    isExternallyCachable(contentType: IContentConstructor): boolean {
        if (LookupContent === contentType)
            return true;
        if (!this._nextFactory)
            return false;
        return this._nextFactory.isExternallyCachable(contentType);
    }
}

export function initContentFactory() {
    bootstrap.contentFactory.addFactory((nextFactory?: IContentFactory) => {
        return new ContentFactory(nextFactory);
    });
}