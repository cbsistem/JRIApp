﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { Utils } from "jriapp_shared";
import { $ } from "jriapp/utils/jquery";
import { IViewOptions } from "jriapp/int";
import { bootstrap } from "jriapp/bootstrap";
import { css, PROP_NAME } from "./generic";
import { InputElView } from "./input";

const dom = Utils.dom, checks = Utils.check, boot = bootstrap;

export class CheckBoxElView extends InputElView {
    private _checked: boolean;

    constructor(options: IViewOptions) {
        super(options);
        let self = this;
        let chk = <HTMLInputElement>this.el;
        this._checked = null;
        chk.checked = false;

        this.$el.on("change." + this.uniqueID, function (e) {
            e.stopPropagation();
            if (self.checked !== this.checked)
                self.checked = this.checked;
        });
        this._updateState();
    }
    protected _updateState() {
        dom.setClass(this.$el.toArray(), css.checkedNull, !checks.isNt(this.checked));
    }
    toString() {
        return "CheckBoxElView";
    }
    get checked(): boolean {
        return this._checked;
    }
    set checked(v: boolean) {
        if (this._checked !== v) {
            this._checked = v;
            let chk = <HTMLInputElement>this.el;
            chk.checked = !!v;
            this._updateState();
            this.raisePropertyChanged(PROP_NAME.checked);
        }
    }
}

boot.registerElView("input:checkbox", CheckBoxElView);
boot.registerElView("checkbox", CheckBoxElView);