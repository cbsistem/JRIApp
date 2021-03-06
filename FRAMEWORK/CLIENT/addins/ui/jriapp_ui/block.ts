﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import { $ } from "jriapp/utils/jquery";
import { bootstrap } from "jriapp/bootstrap";
import { BaseElView, css, PROP_NAME } from "./generic";
import { SpanElView } from "./span";

const boot = bootstrap;

export class BlockElView extends SpanElView {
    toString() {
        return "BlockElView";
    }
    get width() {
        let $el = this.$el;
        return $el.width();
    }
    set width(v) {
        let $el = this.$el;
        let x = $el.width();
        if (v !== x) {
            $el.width(v);
            this.raisePropertyChanged(PROP_NAME.width);
        }
    }
    get height() {
        let $el = this.$el;
        return $el.height();
    }
    set height(v) {
        let $el = this.$el;
        let x = $el.height();
        if (v !== x) {
            $el.height(v);
            this.raisePropertyChanged(PROP_NAME.height);
        }
    }
}

boot.registerElView("block", BlockElView);
boot.registerElView("div", BlockElView);
boot.registerElView("section", BlockElView);
