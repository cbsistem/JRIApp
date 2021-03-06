var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("common", ["require", "exports", "jriapp", "jriapp_db", "jriapp_ui"], function (require, exports, RIAPP, dbMOD, uiMOD) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils, $ = RIAPP.$;
    function addTextQuery(query, fldName, val) {
        var tmp;
        if (!!val) {
            if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, 4, [tmp]);
            }
            else if (utils.str.startsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, 3, [tmp]);
            }
            else if (utils.str.endsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, 2, [tmp]);
            }
            else {
                tmp = utils.str.trim(val);
                query.where(fldName, 0, [tmp]);
            }
        }
        return query;
    }
    exports.addTextQuery = addTextQuery;
    ;
    var DownloadLinkElView = (function (_super) {
        __extends(DownloadLinkElView, _super);
        function DownloadLinkElView(options) {
            _super.call(this, options);
            this._baseUri = '';
            if (!!options.baseUri)
                this._baseUri = options.baseUri;
            this._id = '';
        }
        Object.defineProperty(DownloadLinkElView.prototype, "text", {
            get: function () {
                return this.$el.text();
            },
            set: function (v) {
                var $el = this.$el;
                var x = $el.text();
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    $el.text(v);
                    this.raisePropertyChanged('text');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DownloadLinkElView.prototype, "href", {
            get: function () {
                return this.$el.prop('href');
            },
            set: function (v) {
                var x = this.$el.prop('href');
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this.$el.prop('href', v);
                    this.raisePropertyChanged('href');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DownloadLinkElView.prototype, "id", {
            get: function () { return this._id; },
            set: function (v) {
                var x = this._id;
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this._id = v;
                    this.href = this._baseUri + '/' + this._id;
                    this.raisePropertyChanged('id');
                }
            },
            enumerable: true,
            configurable: true
        });
        return DownloadLinkElView;
    }(uiMOD.BaseElView));
    exports.DownloadLinkElView = DownloadLinkElView;
    var FileImgElView = (function (_super) {
        __extends(FileImgElView, _super);
        function FileImgElView(options) {
            _super.call(this, options);
            this._debounce = null;
            this._baseUri = '';
            if (!!options.baseUri)
                this._baseUri = options.baseUri;
            this._id = '';
            this._src = null;
            this._fileName = null;
        }
        FileImgElView.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            clearTimeout(this._debounce);
            this._debounce = null;
            _super.prototype.destroy.call(this);
        };
        FileImgElView.prototype.reloadImg = function () {
            if (!!this.src) {
                var src = this.src;
                var pos = src.indexOf('?');
                if (pos >= 0) {
                    src = src.substr(0, pos);
                }
                var date = new Date();
                this.src = src + '?v=' + date.getTime();
            }
        };
        Object.defineProperty(FileImgElView.prototype, "fileName", {
            get: function () { return this._fileName; },
            set: function (v) {
                var x = this._fileName;
                if (x !== v) {
                    this._fileName = v;
                    this.raisePropertyChanged('fileName');
                    this.reloadImg();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileImgElView.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (v) {
                var _this = this;
                if (this._src !== v) {
                    this._src = v;
                    this.raisePropertyChanged('src');
                }
                clearTimeout(this._debounce);
                this._debounce = setTimeout(function () {
                    _this._debounce = null;
                    var $img = _this.$el;
                    if (!!_this._src) {
                        $img.prop('src', _this._src);
                    }
                    else {
                        $img.prop('src', "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                    }
                }, 100);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileImgElView.prototype, "id", {
            get: function () { return this._id; },
            set: function (v) {
                var x = this._id;
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this._id = v;
                    if (!this._id)
                        this.src = null;
                    else
                        this.src = this._baseUri + '/' + this._id;
                    this.raisePropertyChanged('id');
                }
            },
            enumerable: true,
            configurable: true
        });
        return FileImgElView;
    }(uiMOD.BaseElView));
    exports.FileImgElView = FileImgElView;
    var ErrorViewModel = (function (_super) {
        __extends(ErrorViewModel, _super);
        function ErrorViewModel(app) {
            _super.call(this, app);
            var self = this;
            this._error = null;
            this._errors = [];
            this._message = null;
            this._title = '';
            this._dialogVM = new uiMOD.DialogVM(app);
            var dialogOptions = {
                templateID: 'errorTemplate',
                width: 500,
                height: 300,
                title: '',
                canCancel: false,
                fn_OnShow: function (dialog) {
                    while (!!self.error && !!self.error.origError) {
                        self._error = self.error.origError;
                        self.raisePropertyChanged('error');
                    }
                    if (self.error instanceof dbMOD.AccessDeniedError)
                        self.title = "ACCESS DENIED";
                    else if (self.error instanceof dbMOD.ConcurrencyError)
                        self.title = "CONCURRENCY ERROR";
                    else if (self.error instanceof RIAPP.ValidationError)
                        self.title = "VALIDATION ERROR";
                    else if (self.error instanceof dbMOD.SvcValidationError)
                        self.title = "VALIDATION ERROR";
                    else if (self.error instanceof dbMOD.DataOperationError)
                        self.title = "DATA OPERATION ERROR";
                    else
                        self.title = "UNEXPECTED ERROR";
                    dialog.title = self.title;
                },
                fn_OnClose: function (dialog) {
                    self._error = null;
                    self._errors = [];
                    self._message = null;
                    self.raisePropertyChanged('error');
                    self.raisePropertyChanged('message');
                }
            };
            this._dialogVM.createDialog('errorDialog', dialogOptions);
        }
        ErrorViewModel.prototype.showDialog = function () {
            this._dialogVM.showDialog('errorDialog', this);
        };
        ErrorViewModel.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._dialogVM.destroy();
            this._dialogVM = null;
            this._error = null;
            this._errors = [];
            this._message = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(ErrorViewModel.prototype, "error", {
            get: function () { return this._error; },
            set: function (v) {
                var self = this, old = this._error;
                if (!old) {
                    this._error = v;
                    var msg = '';
                    if (!!self.error)
                        msg = (!self.error.message) ? ('' + self.error) : self.error.message;
                    else
                        msg = 'Error!';
                    this.message = msg;
                    this.raisePropertyChanged('error');
                }
                else {
                    this._errors.push(v);
                    this.raisePropertyChanged('errorCount');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ErrorViewModel.prototype, "title", {
            get: function () { return this._title; },
            set: function (v) {
                var old = this._title;
                if (old !== v) {
                    this._title = v;
                    this.raisePropertyChanged('title');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ErrorViewModel.prototype, "message", {
            get: function () { return this._message; },
            set: function (v) {
                var old = this._message;
                if (old !== v) {
                    this._message = v;
                    this.raisePropertyChanged('message');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ErrorViewModel.prototype, "errorCount", {
            get: function () {
                return this._errors.length + 1;
            },
            enumerable: true,
            configurable: true
        });
        return ErrorViewModel;
    }(RIAPP.ViewModel));
    exports.ErrorViewModel = ErrorViewModel;
    function initModule(app) {
        app.registerElView('fileLink', DownloadLinkElView);
        app.registerElView('fileImage', FileImgElView);
    }
    exports.initModule = initModule;
    ;
});
define("autocomplete", ["require", "exports", "jriapp", "jriapp_ui", "common"], function (require, exports, RIAPP, uiMOD, COMMON) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    function findElemViewInTemplate(template, name) {
        var arr = template.findElViewsByDataName(name);
        if (!!arr && arr.length > 0)
            return arr[0];
        else
            return null;
    }
    function findElemInTemplate(template, name) {
        var arr = template.findElByDataName(name);
        if (!!arr && arr.length > 0)
            return arr[0];
        else
            return null;
    }
    var AutoCompleteElView = (function (_super) {
        __extends(AutoCompleteElView, _super);
        function AutoCompleteElView(options) {
            _super.call(this, options);
            var self = this;
            this._templateId = options.templateId;
            this._fieldName = options.fieldName;
            this._dbSetName = options.dbSetName;
            this._queryName = options.queryName;
            this._dbContextName = options.dbContext;
            this._minTextLength = (!!options.minTextLength) ? options.minTextLength : 1;
            this._template = null;
            this._gridDataSource = null;
            this._prevText = null;
            this._selectedItem = null;
            this._template = null;
            this._$dropDown = null;
            this._loadTimeout = null;
            this._dataContext = null;
            this._isLoading = false;
            this._width = options.width || '200px';
            this._height = options.height || '300px';
            this._lookupGrid = null;
            this._btnOk = null;
            this._btnCancel = null;
            this._$dlg = null;
            var $el = this.$el;
            $el.on('change.' + this.uniqueID, function (e) {
                e.stopPropagation();
                self._onTextChange();
                self.raisePropertyChanged('value');
            });
            $el.on('keyup.' + this.uniqueID, function (e) {
                e.stopPropagation();
                self._onKeyUp(e.target.value);
                self._onKeyPress(e.keyCode);
            });
            $el.on('keypress.' + this.uniqueID, function (e) {
                e.stopPropagation();
            });
            this._isOpen = false;
            this._createGridDataSource();
            this._template = this._createTemplate();
            this._$dropDown = RIAPP.$(utils.dom.document.createElement("div"));
            this._$dropDown.css({
                "position": "absolute",
                "left": "-2000px",
                "top": "-1000px",
                "z-index": "10000",
                "background-color": "white",
                "border": "1px solid gray",
                "width": this._width,
                "height": this._height
            });
            this._$dropDown.append(this._template.el);
            this._template.el.style.height = '100%';
            this._template.el.style.width = '100%';
            utils.dom.document.body.appendChild(this._$dropDown.get(0));
        }
        AutoCompleteElView.prototype.templateLoading = function (template) {
        };
        AutoCompleteElView.prototype.templateLoaded = function (template, error) {
            if (this._isDestroyCalled)
                return;
            var self = this;
            var gridElView = findElemViewInTemplate(template, 'lookupGrid');
            if (!!gridElView) {
                this._lookupGrid = gridElView.grid;
            }
            this._btnOk = findElemInTemplate(template, 'btnOk');
            this._btnCancel = findElemInTemplate(template, 'btnCancel');
            RIAPP.$(this._btnOk).click(function () {
                self._updateSelection();
                self._hide();
            });
            RIAPP.$(this._btnCancel).click(function () {
                self._hide();
            });
        };
        AutoCompleteElView.prototype.templateUnLoading = function (template) {
        };
        AutoCompleteElView.prototype._createGridDataSource = function () {
            this._gridDataSource = this._getDbContext().getDbSet(this._dbSetName);
            if (!this._gridDataSource) {
                throw new Error(utils.str.format('dbContext does not contain dbSet with the name: {0}', this._dbSetName));
            }
        };
        AutoCompleteElView.prototype._getDbContext = function () {
            var dbContext = this.app.getObject(this._dbContextName);
            if (!dbContext) {
                throw new Error(utils.str.format('dbContext with the name: {0} is not registered', this._dbContextName));
            }
            return dbContext;
        };
        AutoCompleteElView.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['hide', 'show'].concat(base_events);
        };
        AutoCompleteElView.prototype._createTemplate = function () {
            var t = RIAPP.createTemplate(this, this);
            t.templateID = this._templateId;
            return t;
        };
        AutoCompleteElView.prototype._onTextChange = function () {
        };
        AutoCompleteElView.prototype._onKeyUp = function (text) {
            var self = this;
            clearTimeout(this._loadTimeout);
            if (!!text && text.length >= self._minTextLength) {
                this._loadTimeout = setTimeout(function () {
                    if (self._isDestroyCalled)
                        return;
                    if (self._prevText != text) {
                        self._prevText = text;
                        if (!self._isOpen)
                            self._open();
                        self.load(text);
                    }
                }, 500);
            }
            else
                self.gridDataSource.clear();
        };
        AutoCompleteElView.prototype._onKeyPress = function (keyCode) {
            if (keyCode === 27) {
                this._hideAsync();
                return;
            }
            if (keyCode === 13) {
                this._updateSelection();
                this._hideAsync();
                return;
            }
        };
        AutoCompleteElView.prototype._hideAsync = function () {
            var self = this;
            setTimeout(function () {
                self._hide();
            }, 100);
        };
        AutoCompleteElView.prototype._updateSelection = function () {
            this.value = this.currentSelection;
        };
        AutoCompleteElView.prototype._updatePosition = function () {
            this._$dropDown.position({
                my: "left top",
                at: "left bottom",
                of: RIAPP.$(this.el),
                offset: "0 0"
            });
        };
        AutoCompleteElView.prototype._onShow = function () {
            this.raiseEvent('show', {});
        };
        AutoCompleteElView.prototype._onHide = function () {
            this.raiseEvent('hide', {});
        };
        AutoCompleteElView.prototype._open = function () {
            if (this._isOpen)
                return;
            var self = this;
            this._$dlg = this.$el.closest(".ui-dialog");
            var dialogdrag = "dialogdrag." + this.uniqueID;
            this._$dlg.on(dialogdrag, null, function (event) {
                if (!self._isOpen)
                    return null;
                self._updatePosition();
                return null;
            });
            this._updatePosition();
            if (!!this._lookupGrid) {
                this._lookupGrid.addOnCellDblClicked(function (s, a) {
                    self._updateSelection();
                    self._hide();
                }, this.uniqueID);
                RIAPP.$(utils.dom.document).on('keyup.' + this.uniqueID, function (e) {
                    e.stopPropagation();
                    if (bootstrap.currentSelectable === self._lookupGrid)
                        self._onKeyPress(e.which);
                });
            }
            this._isOpen = true;
            this._onShow();
        };
        AutoCompleteElView.prototype._hide = function () {
            var self = this;
            if (!this._isOpen)
                return;
            RIAPP.$(utils.dom.document).off('.' + this.uniqueID);
            this._$dlg.off('.' + this.uniqueID);
            if (!!this._lookupGrid) {
                this._lookupGrid.removeNSHandlers(this.uniqueID);
            }
            this._$dropDown.css("left", "-2000px");
            this._isOpen = false;
            this._onHide();
        };
        AutoCompleteElView.prototype.load = function (str) {
            var self = this, query = this.gridDataSource.createQuery(this._queryName);
            query.pageSize = 50;
            query.isClearPrevData = true;
            COMMON.addTextQuery(query, this._fieldName, str + '%');
            query.orderBy(this._fieldName);
            this._isLoading = true;
            this.raisePropertyChanged('isLoading');
            query.load().always(function (res) {
                self._isLoading = false;
                self.raisePropertyChanged('isLoading');
            });
        };
        AutoCompleteElView.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._hide();
            if (!!this._lookupGrid) {
                this._lookupGrid = null;
            }
            if (!!this._template) {
                this._template.destroy();
                this._template = null;
                this._$dropDown = null;
            }
            this._gridDataSource = null;
            this._dataContext = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(AutoCompleteElView.prototype, "fieldName", {
            get: function () { return this._fieldName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "templateId", {
            get: function () { return this._templateId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "currentSelection", {
            get: function () {
                if (this._gridDataSource.currentItem)
                    return this._gridDataSource.currentItem[this._fieldName];
                else
                    return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "template", {
            get: function () { return this._template; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "dataContext", {
            get: function () { return this._dataContext; },
            set: function (v) {
                if (this._dataContext !== v) {
                    this._dataContext = v;
                    this.raisePropertyChanged('dataContext');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "gridDataSource", {
            get: function () { return this._gridDataSource; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "value", {
            get: function () {
                return this.$el.val();
            },
            set: function (v) {
                var x = this.$el.val();
                var str = '' + v;
                v = (v === null) ? '' : str;
                if (x !== v) {
                    this.$el.val(v);
                    this._prevText = v;
                    this.raisePropertyChanged('value');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteElView.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return AutoCompleteElView;
    }(uiMOD.InputElView));
    exports.AutoCompleteElView = AutoCompleteElView;
    function initModule(app) {
        app.registerElView('autocomplete', AutoCompleteElView);
    }
    exports.initModule = initModule;
    ;
});
define("header", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils, $ = RIAPP.$;
    exports.topPanel = "#demoHeader";
    exports.contentPanel = "#demoContent";
    var HeaderVM = (function (_super) {
        __extends(HeaderVM, _super);
        function HeaderVM(app) {
            _super.call(this, app);
            var self = this;
            this._$topPanel = $(exports.topPanel);
            this._$contentPanel = $(exports.contentPanel);
            this._contentPanelHeight = 0;
            if (!!this._$contentPanel)
                this._contentPanelHeight = this._$contentPanel.height();
            this._expanderCommand = new RIAPP.Command(function (sender, param) {
                if (sender.isExpanded) {
                    self.expand();
                }
                else
                    self.collapse();
            }, self, null);
        }
        HeaderVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['updateUI'].concat(base_events);
        };
        HeaderVM.prototype.addOnUpdateUI = function (fn, namespace) {
            this.addHandler('updateUI', fn, namespace);
        };
        HeaderVM.prototype.expand = function () {
            var self = this;
            this._$topPanel.slideDown('fast', function () { self.updateUI(false); });
        };
        HeaderVM.prototype.collapse = function () {
            var self = this;
            this._$topPanel.slideUp('fast', function () { self.updateUI(true); });
        };
        HeaderVM.prototype.updateUI = function (isUp) {
            var args = { isHandled: false, isUp: isUp };
            this.raiseEvent('updateUI', args);
            if (args.isHandled)
                return;
            if (!!this._$contentPanel) {
                if (isUp)
                    this._$contentPanel.height(this._contentPanelHeight);
                else
                    this._$contentPanel.height(this._contentPanelHeight - this._$topPanel.outerHeight());
            }
        };
        Object.defineProperty(HeaderVM.prototype, "expanderCommand", {
            get: function () { return this._expanderCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderVM.prototype, "$contentPanel", {
            get: function () { return this._$contentPanel; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderVM.prototype, "$topPanel", {
            get: function () { return this._$topPanel; },
            enumerable: true,
            configurable: true
        });
        return HeaderVM;
    }(RIAPP.ViewModel));
    exports.HeaderVM = HeaderVM;
});
define("ssevents", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    var SSEventsVM = (function (_super) {
        __extends(SSEventsVM, _super);
        function SSEventsVM(baseUrl, clientID) {
            _super.call(this);
            var self = this;
            this._es = null;
            this._deffered = null;
            this._baseUrl = baseUrl;
            this._clientID = clientID;
            this._url = this._baseUrl + "?id=" + clientID;
            this._closeClientUrl = this._baseUrl + "/CloseClient?id=" + clientID;
            this._postMsgUrl = this._baseUrl + "/PostMessage";
            this._openESCommand = new RIAPP.Command(function (sender, data) {
                self.open().then(function () {
                }, function (res) {
                    self.handleError(res, self);
                });
            }, null, function () {
                return !self._es;
            });
            this._closeESCommand = new RIAPP.TCommand(function (sender, data) {
                self.close();
            }, null, function () {
                return !!self._es;
            });
            bootstrap.addOnUnLoad(function (s, a) {
                self.close();
            });
        }
        SSEventsVM.isSupported = function () {
            try {
                return !!EventSource;
            }
            catch (e) {
                return false;
            }
        };
        SSEventsVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['open', 'close', 'error', 'message'].concat(base_events);
        };
        SSEventsVM.prototype._onEsOpen = function (event) {
            clearTimeout(this._timeOut);
            this._timeOut = null;
            if (!!this._deffered) {
                this._deffered.resolve();
                this._deffered = null;
            }
        };
        SSEventsVM.prototype._onEsError = function (event) {
            this.handleError("EventSource error", this);
            this.close();
        };
        SSEventsVM.prototype._onMsg = function (event) {
            var data = JSON.parse(event.data);
            this.raiseEvent('message', { message: event.data, data: data });
        };
        SSEventsVM.prototype._close = function () {
            var self = this;
            if (!!this._timeOut)
                clearTimeout(this._timeOut);
            this._timeOut = null;
            if (!!this._deffered) {
                this._deffered.reject({ message: "EventSource closed" });
            }
            this._deffered = null;
            if (!!this._es) {
                try {
                    this._es.close();
                    this._es = null;
                    this._openESCommand.raiseCanExecuteChanged();
                    this._closeESCommand.raiseCanExecuteChanged();
                }
                catch (e) {
                    this._es = null;
                }
            }
        };
        SSEventsVM.prototype.addOnMessage = function (fn, namespace) {
            this.addHandler('message', fn, namespace);
        };
        SSEventsVM.prototype.open = function () {
            var self = this;
            if (!!this._deffered)
                return this._deffered.promise();
            this._deffered = utils.defer.createDeferred();
            this._timeOut = setTimeout(function () {
                self._timeOut = null;
                if (!!self._deffered) {
                    self._deffered.reject({ message: "EventSource connect timeout!" });
                    self._deffered = null;
                    self._close();
                }
            }, 10000);
            if (!this._es) {
                this._es = new EventSource(self.url);
                this._es.addEventListener('message', function (e) {
                    self._onMsg(e);
                }, false);
                this._es.addEventListener('open', function (e) {
                    self._onEsOpen(e);
                }, false);
                this._es.addEventListener('error', function (e) {
                    self._onEsError(e);
                }, false);
                this._openESCommand.raiseCanExecuteChanged();
                this._closeESCommand.raiseCanExecuteChanged();
            }
            return this._deffered.promise();
        };
        SSEventsVM.prototype.close = function () {
            var self = this, postData = null;
            if (!this._es)
                return;
            try {
                self._close();
            }
            finally {
                utils.http.postAjax(self._closeClientUrl, postData);
            }
        };
        SSEventsVM.prototype.post = function (message, clientID) {
            var payload = { message: message };
            var self = this, postData = JSON.stringify({ payload: payload, clientID: !clientID ? self._clientID : clientID });
            var req_promise = utils.http.postAjax(self._postMsgUrl, postData);
            return req_promise;
        };
        SSEventsVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self.close();
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        Object.defineProperty(SSEventsVM.prototype, "es", {
            get: function () { return this._es; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SSEventsVM.prototype, "openESCommand", {
            get: function () { return this._openESCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SSEventsVM.prototype, "closeESCommand", {
            get: function () { return this._closeESCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SSEventsVM.prototype, "url", {
            get: function () { return this._url; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SSEventsVM.prototype, "baseUrl", {
            get: function () { return this._baseUrl; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SSEventsVM.prototype, "clientID", {
            get: function () { return this._clientID; },
            enumerable: true,
            configurable: true
        });
        return SSEventsVM;
    }(RIAPP.BaseObject));
    exports.SSEventsVM = SSEventsVM;
});
define("websocket", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    var WebSocketsVM = (function (_super) {
        __extends(WebSocketsVM, _super);
        function WebSocketsVM(url) {
            _super.call(this);
            var self = this;
            this._ws = null;
            this._clientID = null;
            this._deffered = null;
            this._url = url;
            this._openWsCommand = new RIAPP.TCommand(function (sender, data) {
                self.open().then(function () { }, function (res) {
                    self.handleError(res, self);
                });
            }, null, function () {
                return !self._ws;
            });
            this._closeWsCommand = new RIAPP.TCommand(function (sender, data) {
                self.close();
            }, null, function () {
                return !!self._ws;
            });
            bootstrap.addOnUnLoad(function (s, a) {
                self.close();
            });
        }
        WebSocketsVM.createUrl = function (port, svcName, isSSL) {
            svcName = !!svcName ? svcName : "PollingService";
            var url = (!isSSL ? "ws://" : "wss://") + window.location.host.split(":")[0] + ":" + port + "/" + svcName;
            return url;
        };
        WebSocketsVM.isSupported = function () {
            try {
                return !!WebSocket;
            }
            catch (e) {
                return false;
            }
        };
        WebSocketsVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['open', 'close', 'error', 'message'].concat(base_events);
        };
        WebSocketsVM.prototype._onWsOpen = function (event) {
        };
        WebSocketsVM.prototype._onWsClose = function (event) {
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
        };
        WebSocketsVM.prototype._onWsError = function (event) {
            this.handleError("Websocket error", this);
            this.close();
        };
        WebSocketsVM.prototype._onMsg = function (event) {
            var res = JSON.parse(event.data);
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
        };
        WebSocketsVM.prototype.addOnMessage = function (fn, nmspace, context) {
            this.addHandler('message', fn, nmspace, context);
        };
        WebSocketsVM.prototype.open = function () {
            var self = this;
            if (!!this._deffered)
                return this._deffered.promise();
            this._deffered = utils.defer.createDeferred();
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
        };
        WebSocketsVM.prototype.close = function () {
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
        };
        WebSocketsVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self.close();
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        Object.defineProperty(WebSocketsVM.prototype, "ws", {
            get: function () { return this._ws; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebSocketsVM.prototype, "openWsCommand", {
            get: function () { return this._openWsCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebSocketsVM.prototype, "closeWsCommand", {
            get: function () { return this._closeWsCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebSocketsVM.prototype, "url", {
            get: function () { return this._url; },
            set: function (v) { this._url = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebSocketsVM.prototype, "clientID", {
            get: function () { return this._clientID; },
            enumerable: true,
            configurable: true
        });
        return WebSocketsVM;
    }(RIAPP.BaseObject));
    exports.WebSocketsVM = WebSocketsVM;
});
