﻿import * as RIAPP from "jriapp";
import * as dbMOD from "jriapp_db";
import * as uiMOD from "jriapp_ui";
import * as COMMON from "common";
import * as DEMODB from "../demo/demoDB";
import { DemoApplication } from "./app";
import { CustomerAddressVM } from "./custAddressVM";

var utils = RIAPP.Utils, $ = RIAPP.$;

//RIAPP.ISubmittable allows for the edit dialog to submit changes automatically
export class AddAddressVM extends RIAPP.ViewModel<DemoApplication> implements RIAPP.ISubmittable {
    private _customerAddressVM: CustomerAddressVM;
    private _addressInfosDb: DEMODB.AddressInfoDb;
    private _currentCustomer: DEMODB.Customer;
    private _searchToolTip: string;
    private _newAddress: DEMODB.Address;
    private _dataGrid: uiMOD.DataGrid;
    private _searchString: string;
    private _isAddingNew: boolean;
    private _dialogVM: uiMOD.DialogVM;
    private _addressInfosView: dbMOD.DataView<DEMODB.AddressInfo>;
    private _linkCommand: RIAPP.ICommand;
    private _addNewCommand: RIAPP.ICommand;
    private _unLinkCommand: RIAPP.ICommand;
    private _execSearchCommand: RIAPP.ICommand;
    private _addNewAddressCommand: RIAPP.ICommand;

    constructor(customerAddressVM: CustomerAddressVM) {
        super(customerAddressVM.app);
        var self = this;
        this._customerAddressVM = customerAddressVM;
        this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
        this._currentCustomer = null;
        this._searchToolTip = 'enter any address part then press search button';
        this._newAddress = null;
        this._dataGrid = null;
        this._searchString = null;
        this._isAddingNew = false;
        this._dialogVM = new uiMOD.DialogVM(self.app);
        var dialogOptions: uiMOD.IDialogConstructorOptions = {
            templateID: 'addAddressTemplate',
            width: 950,
            height: 600,
            title: 'add new customer address',
            submitOnOK: true,
            fn_OnClose: function (dialog) {
                if (dialog.result != 'ok') {
                    //if new address is not explicitly accepted then reject added address
                    if (!!self._newAddress) {
                        self._cancelAddNewAddress();
                    }
                    self.dbContext.rejectChanges();
                }
                self._addressInfosDb.clear();
                self.searchString = null;
            },
            fn_OnOK: function (dialog) {
                if (!self._isAddingNew) {
                    //allow to close the dialog
                    return uiMOD.DIALOG_ACTION.Default;
                }
                if (!self._newAddress._aspect.endEdit())
                    return uiMOD.DIALOG_ACTION.StayOpen;
                var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                custAdress._aspect.endEdit();
                self._newAddress = null;
                self._isAddingNew = false;
                self.raisePropertyChanged('newAddress');
                self.raisePropertyChanged('isAddingNew');
                return uiMOD.DIALOG_ACTION.StayOpen;
            },
            fn_OnCancel: function (dialog) {
                if (!self._isAddingNew) {
                    return uiMOD.DIALOG_ACTION.Default;
                }
                if (!!self._newAddress) {
                    self._cancelAddNewAddress();
                }
                return uiMOD.DIALOG_ACTION.StayOpen;
            }
        };
        this._dialogVM.createDialog('addressDialog', dialogOptions);

        //this data displayed in the right panel - contains available (existing in db) addresses
        this._addressInfosView = new dbMOD.DataView<DEMODB.AddressInfo>(
            {
                dataSource: this._addressInfosDb,
                fn_sort: function (a: DEMODB.AddressInfo, b: DEMODB.AddressInfo) { return a.AddressID - b.AddressID; },
                fn_filter: function (item: DEMODB.AddressInfo) {
                    return !item.CustomerAddresses.some(function (CustAdr) {
                        return self._currentCustomer === CustAdr.Customer;
                    });
                }
            });

        //enable paging in the data view
        this._addressInfosView.isPagingEnabled = true;
        this._addressInfosView.pageSize = 50;

        this._addressInfosView.addOnPropertyChange('currentItem', function (sender, args) {
            self.raisePropertyChanged('currentAddressInfo');
            self._linkCommand.raiseCanExecuteChanged();
        }, self.uniqueID);

        this._customerAddressVM.addOnPropertyChange('currentCustomer', function (sender, args) {
            self._currentCustomer = self._customerAddressVM.currentCustomer;
            self.raisePropertyChanged('customer');
            self._addNewCommand.raiseCanExecuteChanged();
        }, self.uniqueID);

        //this data is displayed on the left panel - addresses currently linked to the customer
        this.custAdressView.addOnPropertyChange('currentItem', function (sender, args) {
            self._unLinkCommand.raiseCanExecuteChanged();
        }, self.uniqueID);

        //add new or existing address
        this._addNewCommand = new RIAPP.Command(function (sender, param) {
            try {
                self._dialogVM.showDialog('addressDialog', self);
            } catch (ex) {
                self.handleError(ex, this);
            }
        }, self,
            function (sender, param) {
                //enable this command when customer is not null
                return !!self.customer;
            });

        //load searched address data from the server
        this._execSearchCommand = new RIAPP.Command(function (sender, args) {
            self.loadAddressInfos();
        }, self, null);

        //adds new address to the customer
        this._addNewAddressCommand = new RIAPP.Command(function (sender, args) {
            self._addNewAddress();
        }, self, null);

        //adds existed address to the customer
        this._linkCommand = new RIAPP.Command(function (sender, args) {
            self._linkAddress();
        }, self, function (s, a) {
            return !!self._addressInfosView.currentItem;
        });

        this._unLinkCommand = new RIAPP.Command(function (sender, args) {
            self._unLinkAddress();
        }, self, function (s, a) {
            return !!self.custAdressView.currentItem;
        });
    }
    protected _addGrid(grid: uiMOD.DataGrid): void {
        var self = this;
        if (!!this._dataGrid)
            this._removeGrid();
        this._dataGrid = grid;
    }
    protected _removeGrid(): void {
        if (!this._dataGrid)
            return;
        this._dataGrid.removeNSHandlers(this.uniqueID);
        this._dataGrid = null;
    }
    get isCanSubmit(): boolean { return true; }
    submitChanges(): RIAPP.IVoidPromise { return this.dbContext.submitChanges(); }
    rejectChanges(): void {
    }
    protected _cancelAddNewAddress() {
        var self = this;
        self._newAddress._aspect.cancelEdit();
        self._newAddress._aspect.rejectChanges();
        self._newAddress = null;
        self._isAddingNew = false;
        self.raisePropertyChanged('newAddress');
        self.raisePropertyChanged('isAddingNew');
    }
    //returns promise
    loadAddressInfos() {
        var query = this._addressInfosDb.createReadAddressInfoQuery();
        query.isClearPrevData = true;
        COMMON.addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
        query.orderBy('AddressLine1');
        return query.load();
    }
    _addNewAddress() {
        this._newAddress = this._customerAddressVM._addNewAddress();
        this._isAddingNew = true;
        this.raisePropertyChanged('newAddress');
        this.raisePropertyChanged('isAddingNew');
    }
    _linkAddress() {
        var self = this, adrInfo = this.currentAddressInfo, adrView = self.custAdressView, adrID: number;
        if (!adrInfo) {
            alert('_linkAddress error: adrInfoEntity is null');
            return;
        }
        adrID = adrInfo.AddressID;
        var existedAddr: boolean = adrView.items.some(function (item) {
            return item.AddressID === adrID;
        });

        if (existedAddr) {
            alert('Customer already has this address!');
            return;
        }

        //dont clear, append to the existing
        var promise = this._customerAddressVM._loadAddresses([adrID], false);
        promise.then(function (res) {
            var address = self._customerAddressVM.addressesDb.findEntity(adrID);
            if (!!address) {
                self._customerAddressVM._addNewCustAddress(address);
                //remove address from right panel
                self._removeAddressRP(adrID);
            }
        });
    }
    _unLinkAddress() {
        var item = this.custAdressView.currentItem;
        if (!item) {
            return;
        }
        var id = item.AddressID;
        //delete it from the left panel
        if (item._aspect.deleteItem())
            //and then add the address to the right panel (really adds an addressInfo, not the address entity)
            this._addAddressRP(id);
    }
    //adds an addressInfo to the right panel
    _addAddressRP(addressID: number) {
        //if address already on client, just make it be displayed in the view
        if (this._checkAddressInRP(addressID)) {
            var deferred = utils.defer.createDeferred<dbMOD.IQueryResult<DEMODB.AddressInfo>>();
            deferred.reject();
            return deferred.promise();
        }
        //if we are here, we need to load the address from the server
        var self = this, query = this._addressInfosDb.createReadAddressInfoQuery();
        //dont clear, append to the existing
        query.isClearPrevData = false;
        query.where('AddressID', RIAPP.FILTER_TYPE.Equals, [addressID]);
        var promise = query.load();
        promise.then(function () {
            self._checkAddressInRP(addressID);
        });
        return promise;
    }
    //make sure if the addressInfo already on the client, adds it to the view
    _checkAddressInRP(addressID: number) {
        //try to find it in the TDbSet
        var item = this._addressInfosDb.findEntity(addressID);
        if (!!item) {
            //if found, try append to the view
            var appended = this._addressInfosView.appendItems([item]);
            this._addressInfosView.currentItem = item;
            if (!!this._dataGrid)
                this._dataGrid.scrollToCurrent(uiMOD.ROW_POSITION.Up);
        }
        return !!item;
    }
    //remove the address from the right panel (it is done by removing the item from the view)
    _removeAddressRP(addressID: number) {
        var item = this._addressInfosView.findByPK(addressID);
        if (!!item) {
            this._addressInfosView.removeItem(item);
        }
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._addressInfosDb) {
            this._addressInfosDb.removeNSHandlers(this.uniqueID);
            this._addressInfosDb.clear();
            this._addressInfosDb = null;
        }
        if (!!this._addressInfosView) {
            this._addressInfosView.destroy();
            this._addressInfosView = null;
        }
        this.custAdressView.removeNSHandlers(this.uniqueID);
        if (!!this._customerAddressVM) {
            this._customerAddressVM.removeNSHandlers(this.uniqueID);
            this._customerAddressVM = null;
        }
        super.destroy();
    }
    get dbContext() { return this.app.dbContext; }
    get dbSets() { return this.dbContext.dbSets; }
    get addressInfosDb() { return this._addressInfosDb; }
    get addressInfosView() { return this._addressInfosView; }
    get addressesView() { return this._customerAddressVM.addressesView; }
    get custAdressView() { return this._customerAddressVM.custAdressView; }
    get currentAddressInfo() { return <DEMODB.AddressInfo>this._addressInfosView.currentItem; }
    get searchString() { return this._searchString; }
    set searchString(v) {
        if (this._searchString !== v) {
            this._searchString = v;
            this.raisePropertyChanged('searchString');
        }
    }
    get addNewCommand() { return this._addNewCommand; }
    get execSearchCommand() { return this._execSearchCommand; }
    get addNewAddressCommand() { return this._addNewAddressCommand; }
    //links an address to the customer
    get linkCommand() { return this._linkCommand; }
    get unLinkCommand() { return this._unLinkCommand; }
    get newAddress() { return this._newAddress; }
    get customer() { return this._currentCustomer; }
    get isAddingNew() { return this._isAddingNew; }
    get grid(): uiMOD.DataGrid { return this._dataGrid; }
    set grid(v: uiMOD.DataGrid) {
        if (!!v)
            this._addGrid(v);
        else
            this._removeGrid();
    }
    get searchToolTip() { return this._searchToolTip; }
}