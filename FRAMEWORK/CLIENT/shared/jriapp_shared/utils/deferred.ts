﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
import {
    IStatefulDeferred, IStatefulPromise, IPromiseState, IThenable, ITaskQueue, PromiseState,
    IPromise, IAbortablePromise, IDeferredErrorCB, IDeferredSuccessCB, IErrorCB, IVoidErrorCB,
    ISuccessCB, IAbortable, IDeferred
} from "../iasync";
import { AbortError, AggregateError } from "../errors";
import { Checks } from "./checks";

const checks = Checks;
let taskQueue: TaskQueue = null;

export function createDefer<T>(): IStatefulDeferred<T> {
    return new Deferred(fn_dispatch);
}

export function createSyncDefer<T>(): IStatefulDeferred<T> {
    return new Deferred(fn_dispatchImmediate);
}

export function getTaskQueue(): ITaskQueue {
    if (!taskQueue) {
        taskQueue = new TaskQueue();
    }
    return taskQueue;
}

export function whenAll<T>(args: Array<T | IThenable<T>>): IStatefulPromise<T[]> {
    let deferred = createDefer<T[]>(), errors = <any[]>[], countAll = args.length,
        result = new Array<T>(args.length);
    const checkResult = function () {
            if (countAll === 0) {
                if (errors.length > 0)
                    deferred.reject(new AggregateError(errors));
                else
                    deferred.resolve(result);
            }
        };
   
    const cnt = args.length;
    if (cnt === 0) {
        deferred.resolve([]);
    }

    for (let i = 0; i < cnt; i += 1) {
        let value = args[i];
        if (checks.isThenable(value)) {
            (<IThenable<T>>value).then((res) => {
                --countAll;
                result[i] = res;
                checkResult();
            }, (err) => {
                --countAll;
                result[i] = err;
                errors.push(err);
                checkResult();
            });
        }
        else {
            --countAll;
            result[i] = value;
            checkResult();
        }
    }

    return deferred.promise();
}

interface IDispatcher {
    (closure: () => void): void;
}

function fn_dispatch(task: () => void) {
    getTaskQueue().enque(task);
}

function fn_dispatchImmediate(task: () => void) {
    task();
}

class TaskQueue implements ITaskQueue {
    private _tasks: { (): void; }[];
    private _state: number;

    constructor() {
        this._tasks = [];
        this._state = 0;
    }

    private _process(): void {
        let tasks = this._tasks;
        this._tasks = [];
        for (let i = 0; i < tasks.length; i += 1) {
            tasks[i]();
        }
    }

    enque(task: () => void) {
        this._tasks.push(task);

        if (this._state === 0) {
            this._state = 1;
            setTimeout(() => { if (this._state !== 1) return; this._state = 0; this._process(); }, 0);
        }
    }

    clear() {
        this._tasks = [];
        this._state = 0;
    }
}

class Callback {
    private _dispatcher: IDispatcher;
    private _successCB: any;
    private _errorCB: any;

    constructor(dispatcher: IDispatcher, successCB: any, errorCB: any) {
        this._dispatcher = dispatcher;
        this._successCB = successCB;
        this._errorCB = errorCB;
        this.deferred = new Deferred<any>(this._dispatcher);
    }

    resolve(value: any, defer: boolean): void {
        if (!checks.isFunc(this._successCB)) {
            this.deferred.resolve(value);
            return;
        }

        if (!!defer) {
            this._dispatcher(() => this._dispatchCallback(this._successCB, value));
        } else {
            this._dispatchCallback(this._successCB, value);
        }
    }
    reject(error: any, defer: boolean): void {
        if (!checks.isFunc(this._errorCB)) {
            this.deferred.reject(error);
            return;
        }

        if (!!defer) {
            this._dispatcher(() => this._dispatchCallback(this._errorCB, error));
        } else {
            this._dispatchCallback(this._errorCB, error);
        }
    }
    private _dispatchCallback(callback: (arg: any) => any, arg: any): void {
        let result: any;
        try {
            result = callback(arg);
            this.deferred.resolve(result);
        } catch (err) {
            this.deferred.reject(err);
            return;
        }
    }

    public deferred: IDeferred<any>;
}

class Deferred<T> implements IStatefulDeferred<T> {
    private _promise: IStatefulPromise<T>;
    private _stack: Array<Callback>;
    private _state: PromiseState;
    private _value: T;
    private _error: any;
    private _dispatcher: IDispatcher;

    constructor(dispatcher: IDispatcher) {
        this._dispatcher = dispatcher;
        this._value = checks.undefined;
        this._error = checks.undefined;
        this._state = PromiseState.Pending;
        this._stack = [];
        this._promise = new Promise<T>(this);
    }

    private _resolve(value: any): IStatefulDeferred<T> {
        let pending = true;
        try {
            if (checks.isThenable(value)) {
                if (value === this._promise) {
                    throw new TypeError("recursive resolution");
                }
                const fn_then = value.then;
                this._state = PromiseState.ResolutionInProgress;

                fn_then.call(value,
                    (result: any): void => {
                        if (pending) {
                            pending = false;
                            this._resolve(result);
                        }
                    },
                    (error: any): void => {
                        if (pending) {
                            pending = false;
                            this._reject(error);
                        }
                    }
                );
            } else {
                this._state = PromiseState.ResolutionInProgress;

                this._dispatcher(() => {
                    this._state = PromiseState.Resolved;
                    this._value = value;

                    let i: number, stackSize = this._stack.length;

                    for (i = 0; i < stackSize; i++) {
                        this._stack[i].resolve(value, false);
                    }

                    this._stack.splice(0, stackSize);
                });
            }
        } catch (err) {
            if (pending) {
                this._reject(err);
            }
        }

        return this;
    }
    private _reject(error?: any): IStatefulDeferred<T> {
        this._state = PromiseState.ResolutionInProgress;

        this._dispatcher(() => {
            this._state = PromiseState.Rejected;
            this._error = error;

            let stackSize = this._stack.length,
                i = 0;

            for (i = 0; i < stackSize; i++) {
                this._stack[i].reject(error, false);
            }

            this._stack.splice(0, stackSize);
        });

        return this;
    }
    _then(successCB: any, errorCB: any): any {
        if (!checks.isFunc(successCB) && !checks.isFunc(errorCB)) {
            return this._promise;
        }

        let cb = new Callback(this._dispatcher, successCB, errorCB);

        switch (this._state) {
            case PromiseState.Pending:
            case PromiseState.ResolutionInProgress:
                this._stack.push(cb);
                break;

            case PromiseState.Resolved:
                cb.resolve(this._value, true);
                break;

            case PromiseState.Rejected:
                cb.reject(this._error, true);
                break;
        }

        return cb.deferred.promise();
    }

    resolve(value?: T): IStatefulPromise<T>;

    resolve(value?: IPromise<T>): IStatefulPromise<T>;

    resolve(value?: any): IStatefulPromise<T> {
        if (this._state !== PromiseState.Pending) {
            return this.promise();
        }
        return this._resolve(value).promise();
    }

    reject(error?: any): IStatefulPromise<T> {
        if (this._state !== PromiseState.Pending) {
            return this.promise();
        }
        return this._reject(error).promise();
    }

    promise(): IStatefulPromise<T> {
        return this._promise;
    }

    state(): PromiseState {
        return this._state;
    }
}

class Promise<T> implements IStatefulPromise<T> {
    private _deferred: Deferred<T>;

    constructor(deferred: Deferred<T>) {
        this._deferred = deferred;
    }
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IDeferredErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IVoidErrorCB
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IDeferredErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IVoidErrorCB
    ): IStatefulPromise<TP>;
    then(successCB: any, errorCB: any): any {
        return this._deferred._then(successCB, errorCB);
    }

    fail(errorCB?: IDeferredErrorCB<T>): IStatefulPromise<T>;
    fail(errorCB?: IErrorCB<T>): IStatefulPromise<T>;
    fail(errorCB?: IVoidErrorCB): IStatefulPromise<void>;

    fail(errorCB: any): any {
        return this._deferred._then(checks.undefined, errorCB);
    }

    always<TP>(errorCB?: IDeferredErrorCB<TP>): IStatefulPromise<TP>;
    always<TP>(errorCB?: IErrorCB<TP>): IStatefulPromise<TP>;
    always(errorCB?: IVoidErrorCB): IStatefulPromise<void>;

    always<TP>(errorCB?: any): any {
        return this._deferred._then(errorCB, errorCB);
    }

    state(): PromiseState {
        return this._deferred.state();
    }
}

export class AbortablePromise<T> implements IAbortablePromise<T> {
    private _deferred: IStatefulDeferred<T>;
    private _abortable: IAbortable;
    private _aborted: boolean;

    constructor(deferred: IStatefulDeferred<T>, abortable: IAbortable) {
        this._deferred = deferred;
        this._abortable = abortable;
        this._aborted = false;
    }
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IDeferredErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: IDeferredSuccessCB<T, TP>,
        errorCB?: IVoidErrorCB
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IDeferredErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IErrorCB<TP>
    ): IStatefulPromise<TP>;
    then<TP>(
        successCB?: ISuccessCB<T, TP>,
        errorCB?: IVoidErrorCB
    ): IStatefulPromise<TP>;
    then(successCB: any, errorCB: any): any {
        return this._deferred.promise().then(successCB, errorCB);
    }

    fail(errorCB?: IDeferredErrorCB<T>): IStatefulPromise<T>;
    fail(errorCB?: IErrorCB<T>): IStatefulPromise<T>;
    fail(errorCB?: IVoidErrorCB): IStatefulPromise<void>;

    fail(errorCB: any): any {
        return this._deferred.promise().fail(errorCB);
    }

    always<TP>(errorCB?: IDeferredErrorCB<TP>): IStatefulPromise<TP>;
    always<TP>(errorCB?: IErrorCB<TP>): IStatefulPromise<TP>;
    always(errorCB?: IVoidErrorCB): IStatefulPromise<void>;

    always<TP>(errorCB?: any): any {
        return this._deferred.promise().always(errorCB);
    }

    abort(reason?: string): void {
        if (this._aborted)
            return;
        let self = this;
        self._deferred.reject(new AbortError(reason));
        self._aborted = true;
        setTimeout(() => { self._abortable.abort(); }, 0);
    }
    state() {
        return this._deferred.state();
    }
}