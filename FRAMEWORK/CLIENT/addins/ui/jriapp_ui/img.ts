﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { IViewOptions } from "jriapp/int";
import { bootstrap } from "jriapp/bootstrap";
import { BaseElView, PROP_NAME } from "./generic";

export class ImgElView extends BaseElView {
    constructor(options: IViewOptions) {
        super(options);
    }
    toString() {
        return "ImgElView";
    }
    get src(): string { return this.$el.prop("src"); }
    set src(v: string) {
        let x = this.src;
        if (x !== v) {
            this.$el.prop("src", v);
            this.raisePropertyChanged(PROP_NAME.src);
        }
    }
}

bootstrap.registerElView("img", ImgElView);