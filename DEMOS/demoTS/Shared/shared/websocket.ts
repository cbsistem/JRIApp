﻿import * as RIAPP from "jriapp";

var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;

export class WebSocketsVM extends RIAPP.BaseObject {
    private _ws: WebSocket;
    private _clientID: string;
    private _url: string;
    private _openWsCommand: RIAPP.ICommand;
    private _closeWsCommand: RIAPP.ICommand;
    private _deffered: RIAPP.IDeferred<any>;
    private _timeOut: any;

    public static createUrl(port: number, svcName?: string, isSSL?: boolean): string {
        svcName = !!svcName ? svcName : "PollingService";
        var url = (!isSSL ? "ws://" : "wss://") + window.location.host.split(":")[0] + ":" + port + "/" + svcName;
        return url;
    }
    constructor(url: string) {
        super();
        var self = this;
        this._ws = null;
        this._clientID = null;
        this._deffered = null;
        this._url = url;
        this._openWsCommand = new RIAPP.TCommand(function (sender, data) {
            self.open().then(() => { }, (res) => {
                self.handleError(res, self);
            });
        }, null, () => {
            return !self._ws;
        });
        this._closeWsCommand = new RIAPP.TCommand(function (sender, data) {
            self.close();
        }, null, () => {
            return !!self._ws;
        });
        bootstrap.addOnUnLoad(function (s, a) {
            self.close();
        });
    }
    static isSupported(): boolean {
        try {
            return !!WebSocket;
        } catch (e) {
            return false;
        }
    }
    protected _getEventNames() {
        var base_events = super._getEventNames();
        return ['open', 'close', 'error', 'message'].concat(base_events);
    }
    protected _onWsOpen(event:any) {
    }
    protected _onWsClose(event:any) {
        this._ws = null;
        this._clientID = null;
        clearTimeout(this._timeOut);
        this._timeOut = null;
        this._ws = null;
        this._clientID = null;
        this._openWsCommand.raiseCanExecuteChanged();
        this._closeWsCommand.raiseCanExecuteChanged();

        if (!!this._deffered) {
            this._deffered.reject("Websocket closed");
            this._deffered = null;
        }
        this.raiseEvent('close', {});
    }
    protected _onWsError(event:any) {
        this.handleError("Websocket error", this);
        this.close();
    }
    protected _onMsg(event:any) {
        var res: { Tag: string; Payload: any; } = JSON.parse(event.data);
        if (res.Tag == "connect") {
            clearTimeout(this._timeOut);
            this._timeOut = null;
            this._clientID = res.Payload.id;
            if (!!this._deffered) {
                this._deffered.resolve(this._clientID);
                this._deffered = null;
            }
        }
        else if (res.Tag == "closed") {
            this.close();
        }
        else if (res.Tag == "message") {
            this.raiseEvent('message', { message: event.data, data: res.Payload });
        }
        else
            console.log(event.data);
    }
    addOnMessage(fn: (sender: WebSocketsVM, args: { message: string; data: any; }) => void, nmspace?: string, context?: any) {
        this.addHandler('message', fn, nmspace, context);
    }
    open(): RIAPP.IPromise<any> {
        var self = this;
        if (!!this._deffered)
            return this._deffered.promise();
        this._deffered = utils.defer.createDeferred<any>();
        if (!!this._ws && !!this._clientID) {
            this._deffered.resolve(this._clientID);
            var promise = this._deffered.promise();
            this._deffered = null;
            return promise;
        }
        this._timeOut = setTimeout(function () {
            self._timeOut = null;
            if (!!self._deffered) {
                self._deffered.reject("Websocket connection timeout: " + self._url);
                self._deffered = null;
                self.close();
            }
        }, 5000);

        if (!this._ws) {
            this._ws = new WebSocket(self.url);
            this._ws.onopen = function (e) { self._onWsOpen(e); };
            this._ws.onclose = function (e) { self._onWsClose(e); };
            this._ws.onmessage = function (e) { self._onMsg(e); };
            this._ws.onerror = function (e) { self._onWsError(e); };
            this._openWsCommand.raiseCanExecuteChanged();
            this._closeWsCommand.raiseCanExecuteChanged();
        }
        return this._deffered.promise();
    }
    close() {
        clearTimeout(this._timeOut);
        this._timeOut = null;

        if (!!this._deffered) {
            this._deffered.reject("Websocket closed");
        }
        this._deffered = null;

        if (!!this._ws) {
            try {
                this._ws.close();
                this._ws = null;
                this._clientID = null;
                this._openWsCommand.raiseCanExecuteChanged();
                this._closeWsCommand.raiseCanExecuteChanged();
            }
            catch (e) {
                this._ws = null;
                this._clientID = null;
            }
        }
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        var self = this;
        try {
            self.close();
        } finally {
            super.destroy();
        }
    }
    get ws() { return this._ws; }
    get openWsCommand(): RIAPP.ICommand { return this._openWsCommand; }
    get closeWsCommand(): RIAPP.ICommand { return this._closeWsCommand; }
    get url() { return this._url; }
    set url(v) { this._url = v; }
    get clientID() { return this._clientID; }
}