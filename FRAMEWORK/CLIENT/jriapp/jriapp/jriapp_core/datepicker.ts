﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { IDatepicker } from "../jriapp_core/shared";
import { ERRS } from "../jriapp_core/lang";
import { BaseObject }  from "../jriapp_core/object";
import { CoreUtils } from "../jriapp_utils/coreutils";
import { DomUtils } from "../jriapp_utils/dom";
import { bootstrap } from "../jriapp_core/bootstrap";
import { TextBoxElView, ITextBoxOptions } from "../jriapp_elview/textbox";

const coreUtils = CoreUtils, dom = DomUtils, $ = dom.$, boot = bootstrap;

const PROP_NAME = {
    dateFormat: "dateFormat",
    datepickerRegion: "datepickerRegion"
};

export class Datepicker extends BaseObject implements IDatepicker {
    private _datepickerRegion: string;
    private _dateFormat: string;

    constructor() {
        super();
        this._dateFormat = null;
        this._datepickerRegion = "";
        if (!(<any>$).datepicker) {
            throw new Error(ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
       }
        this.dateFormat = "dd.mm.yy";
   }
    toString() {
        return "Datepicker";
   }
    attachTo($el: any, options?: { dateFormat?: string; }) {
        if (!!options)
            $el.datepicker(options);
        else
            $el.datepicker();
   }
    detachFrom($el: any) {
        dom.destroyJQueryPlugin($el, "datepicker");
   }
    parseDate(str: string): Date {
        return this.datePickerFn.parseDate(this.dateFormat, str);
   }
    formatDate(date: Date): string {
        return this.datePickerFn.formatDate(this.dateFormat, date);
   }
    //uses jQuery datepicker format
    get dateFormat(): string {
        if (!this._dateFormat) {
            let regional = this.datePickerFn.regional[this._datepickerRegion];
            return regional.dateFormat;
       }
        else
            return this._dateFormat;
   }
    set dateFormat(v: string) {
        if (this.dateFormat !== v) {
            this._dateFormat = v;
            let regional = this.datePickerFn.regional[this._datepickerRegion];
            if (!!this._dateFormat) {
                regional.dateFormat = this._dateFormat;
                this.datePickerFn.setDefaults(regional);
           }
            this.raisePropertyChanged(PROP_NAME.dateFormat);
       }
   }
    get datepickerRegion() { return this._datepickerRegion; }
    set datepickerRegion(v) {
        if (!v)
            v = "";
        let oldDateFormat = this.dateFormat;
        if (this._datepickerRegion !== v) {
            let regional = this.datePickerFn.regional[v];
            if (!!regional) {
                this._datepickerRegion = v;
                regional.dateFormat = oldDateFormat;
                this.datePickerFn.setDefaults(regional);
                this.raisePropertyChanged(PROP_NAME.datepickerRegion);
           }
       }
   }
    get datePickerFn() {
        return (<any>$).datepicker;
   }
}

export interface IDatePickerOptions extends ITextBoxOptions {
    datepicker?: any;
}

export class DatePickerElView extends TextBoxElView {
    constructor(options: IDatePickerOptions) {
        super(options);
        let $el = this.$el;
        boot.defaults.datepicker.attachTo($el, options.datepicker);
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        let $el = this.$el;
        boot.defaults.datepicker.detachFrom($el);
        super.destroy();
   }
    toString() {
        return "DatePickerElView";
   }
}


boot.registerSvc("IDatepicker", new Datepicker());
boot.registerElView("datepicker", DatePickerElView);