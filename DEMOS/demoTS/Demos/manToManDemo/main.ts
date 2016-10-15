﻿/// <reference path="../../jriapp/jriapp.d.ts" />
/// <reference path="../../jriapp/jriapp_db.d.ts" />
/// <reference path="../../jriapp/jriapp_ui.d.ts" />
/// <reference path="../../built/shared/shared.d.ts" />
import * as RIAPP from "jriapp";
import * as dbMOD from "jriapp_db";
import * as uiMOD from "jriapp_ui";
import * as DEMODB from "../demo/demoDB";
import * as COMMON from "common";
import * as AUTOCOMPLETE from "autocomplete";
import { IMainOptions, DemoApplication } from "./app";

var bootstrap = RIAPP.bootstrap;

//bootstrap error handler - the last resort (typically display message to the user)
bootstrap.addOnError(function (sender, args) {
    debugger;
    alert(args.error.message);
});

export function start(mainOptions: IMainOptions) {
    mainOptions.modulesInits = {
        "COMMON": COMMON.initModule,
        "AUTOCOMPLETE": AUTOCOMPLETE.initModule
    };

    //create and start application here
    bootstrap.startApp(() => {
        return new DemoApplication(mainOptions);
    }).then((app) => {
        app.customerVM.load();
    });
}