var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("domainModel", ["require", "exports", "jriapp", "jriapp_db"], function (require, exports, RIAPP, dbMOD) {
    "use strict";
    (function (TestEnum) {
        TestEnum[TestEnum["None"] = 0] = "None";
        TestEnum[TestEnum["OK"] = 1] = "OK";
        TestEnum[TestEnum["Error"] = 2] = "Error";
        TestEnum[TestEnum["Loading"] = 3] = "Loading";
    })(exports.TestEnum || (exports.TestEnum = {}));
    var TestEnum = exports.TestEnum;
    (function (TestEnum2) {
        TestEnum2[TestEnum2["None"] = 0] = "None";
        TestEnum2[TestEnum2["One"] = 1] = "One";
        TestEnum2[TestEnum2["Two"] = 2] = "Two";
        TestEnum2[TestEnum2["Three"] = 3] = "Three";
    })(exports.TestEnum2 || (exports.TestEnum2 = {}));
    var TestEnum2 = exports.TestEnum2;
    var TestModelListItem = (function (_super) {
        __extends(TestModelListItem, _super);
        function TestModelListItem() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(TestModelListItem.prototype, "Key", {
            get: function () { return this._aspect._getProp('Key'); },
            set: function (v) { this._aspect._setProp('Key', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestModelListItem.prototype, "SomeProperty1", {
            get: function () { return this._aspect._getProp('SomeProperty1'); },
            set: function (v) { this._aspect._setProp('SomeProperty1', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestModelListItem.prototype, "SomeProperty2", {
            get: function () { return this._aspect._getProp('SomeProperty2'); },
            set: function (v) { this._aspect._setProp('SomeProperty2', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestModelListItem.prototype, "SomeProperty3", {
            get: function () { return this._aspect._getProp('SomeProperty3'); },
            set: function (v) { this._aspect._setProp('SomeProperty3', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestModelListItem.prototype, "MoreComplexProperty", {
            get: function () { return this._aspect._getProp('MoreComplexProperty'); },
            set: function (v) { this._aspect._setProp('MoreComplexProperty', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestModelListItem.prototype, "EnumProperty", {
            get: function () { return this._aspect._getProp('EnumProperty'); },
            set: function (v) { this._aspect._setProp('EnumProperty', v); },
            enumerable: true,
            configurable: true
        });
        TestModelListItem.prototype.toString = function () {
            return 'TestModelListItem';
        };
        return TestModelListItem;
    }(RIAPP.CollectionItem));
    exports.TestModelListItem = TestModelListItem;
    var TestDictionary = (function (_super) {
        __extends(TestDictionary, _super);
        function TestDictionary() {
            _super.call(this, TestModelListItem, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
        }
        TestDictionary.prototype.findItem = function (key) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        TestDictionary.prototype.toString = function () {
            return 'TestDictionary';
        };
        return TestDictionary;
    }(RIAPP.BaseDictionary));
    exports.TestDictionary = TestDictionary;
    var TestList = (function (_super) {
        __extends(TestList, _super);
        function TestList() {
            _super.call(this, TestModelListItem, [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
        }
        TestList.prototype.toString = function () {
            return 'TestList';
        };
        return TestList;
    }(RIAPP.BaseList));
    exports.TestList = TestList;
    var KeyValListItem = (function (_super) {
        __extends(KeyValListItem, _super);
        function KeyValListItem() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(KeyValListItem.prototype, "key", {
            get: function () { return this._aspect._getProp('key'); },
            set: function (v) { this._aspect._setProp('key', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyValListItem.prototype, "val", {
            get: function () { return this._aspect._getProp('val'); },
            set: function (v) { this._aspect._setProp('val', v); },
            enumerable: true,
            configurable: true
        });
        KeyValListItem.prototype.toString = function () {
            return 'KeyValListItem';
        };
        return KeyValListItem;
    }(RIAPP.CollectionItem));
    exports.KeyValListItem = KeyValListItem;
    var KeyValDictionary = (function (_super) {
        __extends(KeyValDictionary, _super);
        function KeyValDictionary() {
            _super.call(this, KeyValListItem, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
        }
        KeyValDictionary.prototype.findItem = function (key) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        KeyValDictionary.prototype.toString = function () {
            return 'KeyValDictionary';
        };
        return KeyValDictionary;
    }(RIAPP.BaseDictionary));
    exports.KeyValDictionary = KeyValDictionary;
    var StrKeyValListItem = (function (_super) {
        __extends(StrKeyValListItem, _super);
        function StrKeyValListItem() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(StrKeyValListItem.prototype, "key", {
            get: function () { return this._aspect._getProp('key'); },
            set: function (v) { this._aspect._setProp('key', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StrKeyValListItem.prototype, "val", {
            get: function () { return this._aspect._getProp('val'); },
            set: function (v) { this._aspect._setProp('val', v); },
            enumerable: true,
            configurable: true
        });
        StrKeyValListItem.prototype.toString = function () {
            return 'StrKeyValListItem';
        };
        return StrKeyValListItem;
    }(RIAPP.CollectionItem));
    exports.StrKeyValListItem = StrKeyValListItem;
    var StrKeyValDictionary = (function (_super) {
        __extends(StrKeyValDictionary, _super);
        function StrKeyValDictionary() {
            _super.call(this, StrKeyValListItem, 'key', [{ name: 'key', dtype: 1 }, { name: 'val', dtype: 1 }]);
        }
        StrKeyValDictionary.prototype.findItem = function (key) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        StrKeyValDictionary.prototype.toString = function () {
            return 'StrKeyValDictionary';
        };
        return StrKeyValDictionary;
    }(RIAPP.BaseDictionary));
    exports.StrKeyValDictionary = StrKeyValDictionary;
    var RadioValListItem = (function (_super) {
        __extends(RadioValListItem, _super);
        function RadioValListItem() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(RadioValListItem.prototype, "key", {
            get: function () { return this._aspect._getProp('key'); },
            set: function (v) { this._aspect._setProp('key', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioValListItem.prototype, "value", {
            get: function () { return this._aspect._getProp('value'); },
            set: function (v) { this._aspect._setProp('value', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioValListItem.prototype, "comment", {
            get: function () { return this._aspect._getProp('comment'); },
            set: function (v) { this._aspect._setProp('comment', v); },
            enumerable: true,
            configurable: true
        });
        RadioValListItem.prototype.toString = function () {
            return 'RadioValListItem';
        };
        return RadioValListItem;
    }(RIAPP.CollectionItem));
    exports.RadioValListItem = RadioValListItem;
    var RadioValDictionary = (function (_super) {
        __extends(RadioValDictionary, _super);
        function RadioValDictionary() {
            _super.call(this, RadioValListItem, 'key', [{ name: 'key', dtype: 1 }, { name: 'value', dtype: 1 }, { name: 'comment', dtype: 1 }]);
        }
        RadioValDictionary.prototype.findItem = function (key) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        RadioValDictionary.prototype.toString = function () {
            return 'RadioValDictionary';
        };
        return RadioValDictionary;
    }(RIAPP.BaseDictionary));
    exports.RadioValDictionary = RadioValDictionary;
    var HistoryItemListItem = (function (_super) {
        __extends(HistoryItemListItem, _super);
        function HistoryItemListItem() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(HistoryItemListItem.prototype, "radioValue", {
            get: function () { return this._aspect._getProp('radioValue'); },
            set: function (v) { this._aspect._setProp('radioValue', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HistoryItemListItem.prototype, "time", {
            get: function () { return this._aspect._getProp('time'); },
            set: function (v) { this._aspect._setProp('time', v); },
            enumerable: true,
            configurable: true
        });
        HistoryItemListItem.prototype.toString = function () {
            return 'HistoryItemListItem';
        };
        return HistoryItemListItem;
    }(RIAPP.CollectionItem));
    exports.HistoryItemListItem = HistoryItemListItem;
    var HistoryList = (function (_super) {
        __extends(HistoryList, _super);
        function HistoryList() {
            _super.call(this, HistoryItemListItem, [{ name: 'radioValue', dtype: 1 }, { name: 'time', dtype: 6 }]);
        }
        HistoryList.prototype.toString = function () {
            return 'HistoryList';
        };
        return HistoryList;
    }(RIAPP.BaseList));
    exports.HistoryList = HistoryList;
    var Customer_ComplexProp1 = (function (_super) {
        __extends(Customer_ComplexProp1, _super);
        function Customer_ComplexProp1(name, parent) {
            _super.call(this, name, parent);
        }
        Object.defineProperty(Customer_ComplexProp1.prototype, "EmailAddress", {
            get: function () { return this.getValue('ComplexProp.ComplexProp.EmailAddress'); },
            set: function (v) { this.setValue('ComplexProp.ComplexProp.EmailAddress', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Customer_ComplexProp1.prototype, "Phone", {
            get: function () { return this.getValue('ComplexProp.ComplexProp.Phone'); },
            set: function (v) { this.setValue('ComplexProp.ComplexProp.Phone', v); },
            enumerable: true,
            configurable: true
        });
        Customer_ComplexProp1.prototype.toString = function () {
            return 'Customer_ComplexProp1';
        };
        return Customer_ComplexProp1;
    }(dbMOD.ChildComplexProperty));
    exports.Customer_ComplexProp1 = Customer_ComplexProp1;
    var Customer_ComplexProp = (function (_super) {
        __extends(Customer_ComplexProp, _super);
        function Customer_ComplexProp(name, owner) {
            _super.call(this, name, owner);
            this._ComplexProp = null;
        }
        Object.defineProperty(Customer_ComplexProp.prototype, "FirstName", {
            get: function () { return this.getValue('ComplexProp.FirstName'); },
            set: function (v) { this.setValue('ComplexProp.FirstName', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Customer_ComplexProp.prototype, "MiddleName", {
            get: function () { return this.getValue('ComplexProp.MiddleName'); },
            set: function (v) { this.setValue('ComplexProp.MiddleName', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Customer_ComplexProp.prototype, "LastName", {
            get: function () { return this.getValue('ComplexProp.LastName'); },
            set: function (v) { this.setValue('ComplexProp.LastName', v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Customer_ComplexProp.prototype, "Name", {
            get: function () { return this.getEntity()._getCalcFieldVal('ComplexProp.Name'); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Customer_ComplexProp.prototype, "ComplexProp", {
            get: function () { if (!this._ComplexProp) {
                this._ComplexProp = new Customer_ComplexProp1('ComplexProp', this);
            } return this._ComplexProp; },
            enumerable: true,
            configurable: true
        });
        Customer_ComplexProp.prototype.toString = function () {
            return 'Customer_ComplexProp';
        };
        return Customer_ComplexProp;
    }(dbMOD.RootComplexProperty));
    exports.Customer_ComplexProp = Customer_ComplexProp;
    var AddressDb = (function (_super) {
        __extends(AddressDb, _super);
        function AddressDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "Address" },
                childAssoc: ([]),
                parentAssoc: ([{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine2", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PostalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        AddressDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_1, _super);
                function class_1(aspect) {
                    _super.call(this, aspect);
                }
                class_1.prototype.toString = function () {
                    return 'AddressEntity';
                };
                Object.defineProperty(class_1.prototype, "AddressID", {
                    get: function () { return this._aspect._getFieldVal('AddressID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "AddressLine1", {
                    get: function () { return this._aspect._getFieldVal('AddressLine1'); },
                    set: function (v) { this._aspect._setFieldVal('AddressLine1', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "AddressLine2", {
                    get: function () { return this._aspect._getFieldVal('AddressLine2'); },
                    set: function (v) { this._aspect._setFieldVal('AddressLine2', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "City", {
                    get: function () { return this._aspect._getFieldVal('City'); },
                    set: function (v) { this._aspect._setFieldVal('City', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "StateProvince", {
                    get: function () { return this._aspect._getFieldVal('StateProvince'); },
                    set: function (v) { this._aspect._setFieldVal('StateProvince', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "CountryRegion", {
                    get: function () { return this._aspect._getFieldVal('CountryRegion'); },
                    set: function (v) { this._aspect._setFieldVal('CountryRegion', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "PostalCode", {
                    get: function () { return this._aspect._getFieldVal('PostalCode'); },
                    set: function (v) { this._aspect._setFieldVal('PostalCode', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_1.prototype, "CustomerAddresses", {
                    get: function () { return this._aspect._getNavFieldVal('CustomerAddresses'); },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }(RIAPP.CollectionItem));
        };
        AddressDb.prototype.findEntity = function (addressID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        AddressDb.prototype.toString = function () {
            return 'AddressDb';
        };
        AddressDb.prototype.createReadAddressByIdsQuery = function (args) {
            var query = this.createQuery('ReadAddressByIds');
            query.params = args;
            return query;
        };
        AddressDb.prototype.createReadAddressQuery = function () {
            return this.createQuery('ReadAddress');
        };
        return AddressDb;
    }(dbMOD.DbSet));
    exports.AddressDb = AddressDb;
    var AddressInfoDb = (function (_super) {
        __extends(AddressInfoDb, _super);
        function AddressInfoDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "AddressInfo" },
                childAssoc: ([]),
                parentAssoc: ([{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 200, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        AddressInfoDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_2, _super);
                function class_2(aspect) {
                    _super.call(this, aspect);
                }
                class_2.prototype.toString = function () {
                    return 'AddressInfoEntity';
                };
                Object.defineProperty(class_2.prototype, "AddressID", {
                    get: function () { return this._aspect._getFieldVal('AddressID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_2.prototype, "AddressLine1", {
                    get: function () { return this._aspect._getFieldVal('AddressLine1'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_2.prototype, "City", {
                    get: function () { return this._aspect._getFieldVal('City'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_2.prototype, "StateProvince", {
                    get: function () { return this._aspect._getFieldVal('StateProvince'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_2.prototype, "CountryRegion", {
                    get: function () { return this._aspect._getFieldVal('CountryRegion'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_2.prototype, "CustomerAddresses", {
                    get: function () { return this._aspect._getNavFieldVal('CustomerAddresses'); },
                    enumerable: true,
                    configurable: true
                });
                return class_2;
            }(RIAPP.CollectionItem));
        };
        AddressInfoDb.prototype.findEntity = function (addressID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        AddressInfoDb.prototype.toString = function () {
            return 'AddressInfoDb';
        };
        AddressInfoDb.prototype.createReadAddressInfoQuery = function () {
            return this.createQuery('ReadAddressInfo');
        };
        return AddressInfoDb;
    }(dbMOD.DbSet));
    exports.AddressInfoDb = AddressInfoDb;
    var CustomerDb = (function (_super) {
        __extends(CustomerDb, _super);
        function CustomerDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
                childAssoc: ([]),
                parentAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "NameStyle", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Title", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Suffix", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CompanyName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesPerson", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordHash", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordSalt", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "FirstName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "MiddleName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LastName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "ComplexProp.FirstName,ComplexProp.MiddleName,ComplexProp.LastName", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "EmailAddress", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Phone", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }] }] }, { "fieldName": "AddressCount", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 6, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        CustomerDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_3, _super);
                function class_3(aspect) {
                    _super.call(this, aspect);
                    this._ComplexProp = null;
                }
                class_3.prototype.toString = function () {
                    return 'CustomerEntity';
                };
                Object.defineProperty(class_3.prototype, "CustomerID", {
                    get: function () { return this._aspect._getFieldVal('CustomerID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "NameStyle", {
                    get: function () { return this._aspect._getFieldVal('NameStyle'); },
                    set: function (v) { this._aspect._setFieldVal('NameStyle', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "Title", {
                    get: function () { return this._aspect._getFieldVal('Title'); },
                    set: function (v) { this._aspect._setFieldVal('Title', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "Suffix", {
                    get: function () { return this._aspect._getFieldVal('Suffix'); },
                    set: function (v) { this._aspect._setFieldVal('Suffix', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "CompanyName", {
                    get: function () { return this._aspect._getFieldVal('CompanyName'); },
                    set: function (v) { this._aspect._setFieldVal('CompanyName', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "SalesPerson", {
                    get: function () { return this._aspect._getFieldVal('SalesPerson'); },
                    set: function (v) { this._aspect._setFieldVal('SalesPerson', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "PasswordHash", {
                    get: function () { return this._aspect._getFieldVal('PasswordHash'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "PasswordSalt", {
                    get: function () { return this._aspect._getFieldVal('PasswordSalt'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "ComplexProp", {
                    get: function () { if (!this._ComplexProp) {
                        this._ComplexProp = new Customer_ComplexProp('ComplexProp', this._aspect);
                    } return this._ComplexProp; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "AddressCount", {
                    get: function () { return this._aspect._getFieldVal('AddressCount'); },
                    set: function (v) { this._aspect._setFieldVal('AddressCount', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_3.prototype, "CustomerAddresses", {
                    get: function () { return this._aspect._getNavFieldVal('CustomerAddresses'); },
                    enumerable: true,
                    configurable: true
                });
                return class_3;
            }(RIAPP.CollectionItem));
        };
        CustomerDb.prototype.findEntity = function (customerID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        CustomerDb.prototype.toString = function () {
            return 'CustomerDb';
        };
        CustomerDb.prototype.createReadCustomerQuery = function (args) {
            var query = this.createQuery('ReadCustomer');
            query.params = args;
            return query;
        };
        CustomerDb.prototype.defineComplexProp_NameField = function (getFunc) { this._defineCalculatedField('ComplexProp.Name', getFunc); };
        return CustomerDb;
    }(dbMOD.DbSet));
    exports.CustomerDb = CustomerDb;
    var CustomerAddressDb = (function (_super) {
        __extends(CustomerAddressDb, _super);
        function CustomerAddressDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "CustomerAddress" },
                childAssoc: ([{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressType", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }, { "fieldName": "AddressInfo", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        CustomerAddressDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_4, _super);
                function class_4(aspect) {
                    _super.call(this, aspect);
                }
                class_4.prototype.toString = function () {
                    return 'CustomerAddressEntity';
                };
                Object.defineProperty(class_4.prototype, "CustomerID", {
                    get: function () { return this._aspect._getFieldVal('CustomerID'); },
                    set: function (v) { this._aspect._setFieldVal('CustomerID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "AddressID", {
                    get: function () { return this._aspect._getFieldVal('AddressID'); },
                    set: function (v) { this._aspect._setFieldVal('AddressID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "AddressType", {
                    get: function () { return this._aspect._getFieldVal('AddressType'); },
                    set: function (v) { this._aspect._setFieldVal('AddressType', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "Customer", {
                    get: function () { return this._aspect._getNavFieldVal('Customer'); },
                    set: function (v) { this._aspect._setNavFieldVal('Customer', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "Address", {
                    get: function () { return this._aspect._getNavFieldVal('Address'); },
                    set: function (v) { this._aspect._setNavFieldVal('Address', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_4.prototype, "AddressInfo", {
                    get: function () { return this._aspect._getNavFieldVal('AddressInfo'); },
                    set: function (v) { this._aspect._setNavFieldVal('AddressInfo', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_4;
            }(RIAPP.CollectionItem));
        };
        CustomerAddressDb.prototype.findEntity = function (customerID, addressID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        CustomerAddressDb.prototype.toString = function () {
            return 'CustomerAddressDb';
        };
        CustomerAddressDb.prototype.createReadAddressForCustomersQuery = function (args) {
            var query = this.createQuery('ReadAddressForCustomers');
            query.params = args;
            return query;
        };
        CustomerAddressDb.prototype.createReadCustomerAddressQuery = function () {
            return this.createQuery('ReadCustomerAddress');
        };
        return CustomerAddressDb;
    }(dbMOD.DbSet));
    exports.CustomerAddressDb = CustomerAddressDb;
    var LookUpProductDb = (function (_super) {
        __extends(LookUpProductDb, _super);
        function LookUpProductDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": true, "pageSize": 25, "dbSetName": "LookUpProduct" },
                childAssoc: ([]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        LookUpProductDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_5, _super);
                function class_5(aspect) {
                    _super.call(this, aspect);
                }
                class_5.prototype.toString = function () {
                    return 'LookUpProductEntity';
                };
                Object.defineProperty(class_5.prototype, "ProductID", {
                    get: function () { return this._aspect._getFieldVal('ProductID'); },
                    set: function (v) { this._aspect._setFieldVal('ProductID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_5.prototype, "Name", {
                    get: function () { return this._aspect._getFieldVal('Name'); },
                    set: function (v) { this._aspect._setFieldVal('Name', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_5;
            }(RIAPP.CollectionItem));
        };
        LookUpProductDb.prototype.findEntity = function (productID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        LookUpProductDb.prototype.toString = function () {
            return 'LookUpProductDb';
        };
        LookUpProductDb.prototype.createReadProductLookUpQuery = function () {
            return this.createQuery('ReadProductLookUp');
        };
        return LookUpProductDb;
    }(dbMOD.DbSet));
    exports.LookUpProductDb = LookUpProductDb;
    var ProductDb = (function (_super) {
        __extends(ProductDb, _super);
        function ProductDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": true, "pageSize": 25, "dbSetName": "Product" },
                childAssoc: ([]),
                parentAssoc: ([{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Color", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StandardCost", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ListPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "100,5000", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Size", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Weight", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductModelID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellStartDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "2000-01-01,2015-01-01", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellEndDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DiscontinuedDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsActive", "isPrimaryKey": 0, "dataType": 2, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "SellEndDate", "nested": null }, { "fieldName": "ThumbnailPhotoFileName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        ProductDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_6, _super);
                function class_6(aspect) {
                    _super.call(this, aspect);
                }
                class_6.prototype.toString = function () {
                    return 'ProductEntity';
                };
                Object.defineProperty(class_6.prototype, "ProductID", {
                    get: function () { return this._aspect._getFieldVal('ProductID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "Name", {
                    get: function () { return this._aspect._getFieldVal('Name'); },
                    set: function (v) { this._aspect._setFieldVal('Name', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ProductNumber", {
                    get: function () { return this._aspect._getFieldVal('ProductNumber'); },
                    set: function (v) { this._aspect._setFieldVal('ProductNumber', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "Color", {
                    get: function () { return this._aspect._getFieldVal('Color'); },
                    set: function (v) { this._aspect._setFieldVal('Color', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "StandardCost", {
                    get: function () { return this._aspect._getFieldVal('StandardCost'); },
                    set: function (v) { this._aspect._setFieldVal('StandardCost', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ListPrice", {
                    get: function () { return this._aspect._getFieldVal('ListPrice'); },
                    set: function (v) { this._aspect._setFieldVal('ListPrice', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "Size", {
                    get: function () { return this._aspect._getFieldVal('Size'); },
                    set: function (v) { this._aspect._setFieldVal('Size', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "Weight", {
                    get: function () { return this._aspect._getFieldVal('Weight'); },
                    set: function (v) { this._aspect._setFieldVal('Weight', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ProductCategoryID", {
                    get: function () { return this._aspect._getFieldVal('ProductCategoryID'); },
                    set: function (v) { this._aspect._setFieldVal('ProductCategoryID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ProductModelID", {
                    get: function () { return this._aspect._getFieldVal('ProductModelID'); },
                    set: function (v) { this._aspect._setFieldVal('ProductModelID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "SellStartDate", {
                    get: function () { return this._aspect._getFieldVal('SellStartDate'); },
                    set: function (v) { this._aspect._setFieldVal('SellStartDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "SellEndDate", {
                    get: function () { return this._aspect._getFieldVal('SellEndDate'); },
                    set: function (v) { this._aspect._setFieldVal('SellEndDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "DiscontinuedDate", {
                    get: function () { return this._aspect._getFieldVal('DiscontinuedDate'); },
                    set: function (v) { this._aspect._setFieldVal('DiscontinuedDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "IsActive", {
                    get: function () { return this._aspect._getCalcFieldVal('IsActive'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "ThumbnailPhotoFileName", {
                    get: function () { return this._aspect._getFieldVal('ThumbnailPhotoFileName'); },
                    set: function (v) { this._aspect._setFieldVal('ThumbnailPhotoFileName', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_6.prototype, "SalesOrderDetails", {
                    get: function () { return this._aspect._getNavFieldVal('SalesOrderDetails'); },
                    enumerable: true,
                    configurable: true
                });
                return class_6;
            }(RIAPP.CollectionItem));
        };
        ProductDb.prototype.findEntity = function (productID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        ProductDb.prototype.toString = function () {
            return 'ProductDb';
        };
        ProductDb.prototype.createReadProductByIdsQuery = function (args) {
            var query = this.createQuery('ReadProductByIds');
            query.params = args;
            return query;
        };
        ProductDb.prototype.createReadProductQuery = function (args) {
            var query = this.createQuery('ReadProduct');
            query.params = args;
            return query;
        };
        ProductDb.prototype.defineIsActiveField = function (getFunc) { this._defineCalculatedField('IsActive', getFunc); };
        return ProductDb;
    }(dbMOD.DbSet));
    exports.ProductDb = ProductDb;
    var ProductCategoryDb = (function (_super) {
        __extends(ProductCategoryDb, _super);
        function ProductCategoryDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "ProductCategory" },
                childAssoc: ([]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductCategoryID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        ProductCategoryDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_7, _super);
                function class_7(aspect) {
                    _super.call(this, aspect);
                }
                class_7.prototype.toString = function () {
                    return 'ProductCategoryEntity';
                };
                Object.defineProperty(class_7.prototype, "ProductCategoryID", {
                    get: function () { return this._aspect._getFieldVal('ProductCategoryID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_7.prototype, "ParentProductCategoryID", {
                    get: function () { return this._aspect._getFieldVal('ParentProductCategoryID'); },
                    set: function (v) { this._aspect._setFieldVal('ParentProductCategoryID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_7.prototype, "Name", {
                    get: function () { return this._aspect._getFieldVal('Name'); },
                    set: function (v) { this._aspect._setFieldVal('Name', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_7.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    set: function (v) { this._aspect._setFieldVal('rowguid', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_7.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    set: function (v) { this._aspect._setFieldVal('ModifiedDate', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_7;
            }(RIAPP.CollectionItem));
        };
        ProductCategoryDb.prototype.findEntity = function (productCategoryID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        ProductCategoryDb.prototype.toString = function () {
            return 'ProductCategoryDb';
        };
        ProductCategoryDb.prototype.createReadProductCategoryQuery = function () {
            return this.createQuery('ReadProductCategory');
        };
        return ProductCategoryDb;
    }(dbMOD.DbSet));
    exports.ProductCategoryDb = ProductCategoryDb;
    var ProductModelDb = (function (_super) {
        __extends(ProductModelDb, _super);
        function ProductModelDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "ProductModel" },
                childAssoc: ([]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductModelID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        ProductModelDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_8, _super);
                function class_8(aspect) {
                    _super.call(this, aspect);
                }
                class_8.prototype.toString = function () {
                    return 'ProductModelEntity';
                };
                Object.defineProperty(class_8.prototype, "ProductModelID", {
                    get: function () { return this._aspect._getFieldVal('ProductModelID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_8.prototype, "Name", {
                    get: function () { return this._aspect._getFieldVal('Name'); },
                    set: function (v) { this._aspect._setFieldVal('Name', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_8;
            }(RIAPP.CollectionItem));
        };
        ProductModelDb.prototype.findEntity = function (productModelID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        ProductModelDb.prototype.toString = function () {
            return 'ProductModelDb';
        };
        ProductModelDb.prototype.createReadProductModelQuery = function () {
            return this.createQuery('ReadProductModel');
        };
        return ProductModelDb;
    }(dbMOD.DbSet));
    exports.ProductModelDb = ProductModelDb;
    var SalesInfoDb = (function (_super) {
        __extends(SalesInfoDb, _super);
        function SalesInfoDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": true, "pageSize": 25, "dbSetName": "SalesInfo" },
                childAssoc: ([]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesPerson", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        SalesInfoDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_9, _super);
                function class_9(aspect) {
                    _super.call(this, aspect);
                }
                class_9.prototype.toString = function () {
                    return 'SalesInfoEntity';
                };
                Object.defineProperty(class_9.prototype, "SalesPerson", {
                    get: function () { return this._aspect._getFieldVal('SalesPerson'); },
                    set: function (v) { this._aspect._setFieldVal('SalesPerson', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_9;
            }(RIAPP.CollectionItem));
        };
        SalesInfoDb.prototype.findEntity = function (salesPerson) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        SalesInfoDb.prototype.toString = function () {
            return 'SalesInfoDb';
        };
        SalesInfoDb.prototype.createReadSalesInfoQuery = function () {
            return this.createQuery('ReadSalesInfo');
        };
        return SalesInfoDb;
    }(dbMOD.DbSet));
    exports.SalesInfoDb = SalesInfoDb;
    var SalesOrderDetailDb = (function (_super) {
        __extends(SalesOrderDetailDb, _super);
        function SalesOrderDetailDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderDetail" },
                childAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }]),
                parentAssoc: ([])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetailID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderQty", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 2, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPriceDiscount", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LineTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 17, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderHeader", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "SalesOrderID", "nested": null }, { "fieldName": "Product", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ProductID", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        SalesOrderDetailDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_10, _super);
                function class_10(aspect) {
                    _super.call(this, aspect);
                }
                class_10.prototype.toString = function () {
                    return 'SalesOrderDetailEntity';
                };
                Object.defineProperty(class_10.prototype, "SalesOrderID", {
                    get: function () { return this._aspect._getFieldVal('SalesOrderID'); },
                    set: function (v) { this._aspect._setFieldVal('SalesOrderID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "SalesOrderDetailID", {
                    get: function () { return this._aspect._getFieldVal('SalesOrderDetailID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "OrderQty", {
                    get: function () { return this._aspect._getFieldVal('OrderQty'); },
                    set: function (v) { this._aspect._setFieldVal('OrderQty', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "ProductID", {
                    get: function () { return this._aspect._getFieldVal('ProductID'); },
                    set: function (v) { this._aspect._setFieldVal('ProductID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "UnitPrice", {
                    get: function () { return this._aspect._getFieldVal('UnitPrice'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "UnitPriceDiscount", {
                    get: function () { return this._aspect._getFieldVal('UnitPriceDiscount'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "LineTotal", {
                    get: function () { return this._aspect._getFieldVal('LineTotal'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "SalesOrderHeader", {
                    get: function () { return this._aspect._getNavFieldVal('SalesOrderHeader'); },
                    set: function (v) { this._aspect._setNavFieldVal('SalesOrderHeader', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_10.prototype, "Product", {
                    get: function () { return this._aspect._getNavFieldVal('Product'); },
                    set: function (v) { this._aspect._setNavFieldVal('Product', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_10;
            }(RIAPP.CollectionItem));
        };
        SalesOrderDetailDb.prototype.findEntity = function (salesOrderID, salesOrderDetailID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        SalesOrderDetailDb.prototype.toString = function () {
            return 'SalesOrderDetailDb';
        };
        SalesOrderDetailDb.prototype.createReadSalesOrderDetailQuery = function () {
            return this.createQuery('ReadSalesOrderDetail');
        };
        return SalesOrderDetailDb;
    }(dbMOD.DbSet));
    exports.SalesOrderDetailDb = SalesOrderDetailDb;
    var SalesOrderHeaderDb = (function (_super) {
        __extends(SalesOrderHeaderDb, _super);
        function SalesOrderHeaderDb(dbContext) {
            var opts = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": [], "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderHeader" },
                childAssoc: ([{ "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }]),
                parentAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }])
            };
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "RevisionNumber", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DueDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Status", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OnlineOrderFlag", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PurchaseOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AccountNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "BillToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipMethod", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CreditCardApprovalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SubTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TaxAmt", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Freight", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TotalDue", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Comment", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 0, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ShipToAddressID", "nested": null }, { "fieldName": "Address1", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "BillToAddressID", "nested": null }]);
            _super.call(this, opts);
            this._createEntityType();
        }
        SalesOrderHeaderDb.prototype._createEntityType = function () {
            this._entityType = (function (_super) {
                __extends(class_11, _super);
                function class_11(aspect) {
                    _super.call(this, aspect);
                }
                class_11.prototype.toString = function () {
                    return 'SalesOrderHeaderEntity';
                };
                Object.defineProperty(class_11.prototype, "SalesOrderID", {
                    get: function () { return this._aspect._getFieldVal('SalesOrderID'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "RevisionNumber", {
                    get: function () { return this._aspect._getFieldVal('RevisionNumber'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "OrderDate", {
                    get: function () { return this._aspect._getFieldVal('OrderDate'); },
                    set: function (v) { this._aspect._setFieldVal('OrderDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "DueDate", {
                    get: function () { return this._aspect._getFieldVal('DueDate'); },
                    set: function (v) { this._aspect._setFieldVal('DueDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "ShipDate", {
                    get: function () { return this._aspect._getFieldVal('ShipDate'); },
                    set: function (v) { this._aspect._setFieldVal('ShipDate', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Status", {
                    get: function () { return this._aspect._getFieldVal('Status'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "OnlineOrderFlag", {
                    get: function () { return this._aspect._getFieldVal('OnlineOrderFlag'); },
                    set: function (v) { this._aspect._setFieldVal('OnlineOrderFlag', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "SalesOrderNumber", {
                    get: function () { return this._aspect._getFieldVal('SalesOrderNumber'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "PurchaseOrderNumber", {
                    get: function () { return this._aspect._getFieldVal('PurchaseOrderNumber'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "AccountNumber", {
                    get: function () { return this._aspect._getFieldVal('AccountNumber'); },
                    set: function (v) { this._aspect._setFieldVal('AccountNumber', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "CustomerID", {
                    get: function () { return this._aspect._getFieldVal('CustomerID'); },
                    set: function (v) { this._aspect._setFieldVal('CustomerID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "ShipToAddressID", {
                    get: function () { return this._aspect._getFieldVal('ShipToAddressID'); },
                    set: function (v) { this._aspect._setFieldVal('ShipToAddressID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "BillToAddressID", {
                    get: function () { return this._aspect._getFieldVal('BillToAddressID'); },
                    set: function (v) { this._aspect._setFieldVal('BillToAddressID', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "ShipMethod", {
                    get: function () { return this._aspect._getFieldVal('ShipMethod'); },
                    set: function (v) { this._aspect._setFieldVal('ShipMethod', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "CreditCardApprovalCode", {
                    get: function () { return this._aspect._getFieldVal('CreditCardApprovalCode'); },
                    set: function (v) { this._aspect._setFieldVal('CreditCardApprovalCode', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "SubTotal", {
                    get: function () { return this._aspect._getFieldVal('SubTotal'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "TaxAmt", {
                    get: function () { return this._aspect._getFieldVal('TaxAmt'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Freight", {
                    get: function () { return this._aspect._getFieldVal('Freight'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "TotalDue", {
                    get: function () { return this._aspect._getFieldVal('TotalDue'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Comment", {
                    get: function () { return this._aspect._getFieldVal('Comment'); },
                    set: function (v) { this._aspect._setFieldVal('Comment', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "rowguid", {
                    get: function () { return this._aspect._getFieldVal('rowguid'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "ModifiedDate", {
                    get: function () { return this._aspect._getFieldVal('ModifiedDate'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "SalesOrderDetails", {
                    get: function () { return this._aspect._getNavFieldVal('SalesOrderDetails'); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Customer", {
                    get: function () { return this._aspect._getNavFieldVal('Customer'); },
                    set: function (v) { this._aspect._setNavFieldVal('Customer', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Address", {
                    get: function () { return this._aspect._getNavFieldVal('Address'); },
                    set: function (v) { this._aspect._setNavFieldVal('Address', v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(class_11.prototype, "Address1", {
                    get: function () { return this._aspect._getNavFieldVal('Address1'); },
                    set: function (v) { this._aspect._setNavFieldVal('Address1', v); },
                    enumerable: true,
                    configurable: true
                });
                return class_11;
            }(RIAPP.CollectionItem));
        };
        SalesOrderHeaderDb.prototype.findEntity = function (salesOrderID) {
            return this.findByPK(RIAPP.Utils.arr.fromList(arguments));
        };
        SalesOrderHeaderDb.prototype.toString = function () {
            return 'SalesOrderHeaderDb';
        };
        SalesOrderHeaderDb.prototype.createReadSalesOrderHeaderQuery = function () {
            return this.createQuery('ReadSalesOrderHeader');
        };
        return SalesOrderHeaderDb;
    }(dbMOD.DbSet));
    exports.SalesOrderHeaderDb = SalesOrderHeaderDb;
    var DbSets = (function (_super) {
        __extends(DbSets, _super);
        function DbSets(dbContext) {
            _super.call(this, dbContext);
            this._createDbSet("Address", AddressDb);
            this._createDbSet("AddressInfo", AddressInfoDb);
            this._createDbSet("Customer", CustomerDb);
            this._createDbSet("CustomerAddress", CustomerAddressDb);
            this._createDbSet("LookUpProduct", LookUpProductDb);
            this._createDbSet("Product", ProductDb);
            this._createDbSet("ProductCategory", ProductCategoryDb);
            this._createDbSet("ProductModel", ProductModelDb);
            this._createDbSet("SalesInfo", SalesInfoDb);
            this._createDbSet("SalesOrderDetail", SalesOrderDetailDb);
            this._createDbSet("SalesOrderHeader", SalesOrderHeaderDb);
        }
        Object.defineProperty(DbSets.prototype, "Address", {
            get: function () { return this.getDbSet("Address"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "AddressInfo", {
            get: function () { return this.getDbSet("AddressInfo"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "Customer", {
            get: function () { return this.getDbSet("Customer"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "CustomerAddress", {
            get: function () { return this.getDbSet("CustomerAddress"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "LookUpProduct", {
            get: function () { return this.getDbSet("LookUpProduct"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "Product", {
            get: function () { return this.getDbSet("Product"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "ProductCategory", {
            get: function () { return this.getDbSet("ProductCategory"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "ProductModel", {
            get: function () { return this.getDbSet("ProductModel"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "SalesInfo", {
            get: function () { return this.getDbSet("SalesInfo"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "SalesOrderDetail", {
            get: function () { return this.getDbSet("SalesOrderDetail"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbSets.prototype, "SalesOrderHeader", {
            get: function () { return this.getDbSet("SalesOrderHeader"); },
            enumerable: true,
            configurable: true
        });
        return DbSets;
    }(dbMOD.DbSets));
    exports.DbSets = DbSets;
    var DbContext = (function (_super) {
        __extends(DbContext, _super);
        function DbContext() {
            _super.apply(this, arguments);
        }
        DbContext.prototype._initDbSets = function () {
            _super.prototype._initDbSets.call(this);
            this._dbSets = new DbSets(this);
            var associations = [{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }];
            this._initAssociations(associations);
            var methods = [{ "methodName": "ReadAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressByIds", "parameters": [{ "name": "addressIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressForCustomers", "parameters": [{ "name": "custIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomer", "parameters": [{ "name": "includeNav", "dataType": 2, "isArray": false, "isNullable": true, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomerAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProduct", "parameters": [{ "name": "param1", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductByIds", "parameters": [{ "name": "productIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductCategory", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductLookUp", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductModel", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderDetail", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderHeader", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "TestComplexInvoke", "parameters": [{ "name": "info", "dataType": 0, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "keys", "dataType": 0, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": false, "isQuery": false }, { "methodName": "TestInvoke", "parameters": [{ "name": "param1", "dataType": 10, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": false }];
            this._initMethods(methods);
        };
        Object.defineProperty(DbContext.prototype, "associations", {
            get: function () { return this._assoc; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbContext.prototype, "dbSets", {
            get: function () { return this._dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DbContext.prototype, "serviceMethods", {
            get: function () { return this._svcMethods; },
            enumerable: true,
            configurable: true
        });
        return DbContext;
    }(dbMOD.DbContext));
    exports.DbContext = DbContext;
});
define("addressVM", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var AddressVM = (function (_super) {
        __extends(AddressVM, _super);
        function AddressVM(orderVM) {
            _super.call(this, orderVM.app);
            var self = this;
            this._orderVM = orderVM;
            this._dbSet = this.dbSets.Address;
            this._orderVM.dbSet.addOnFill(function (sender, args) {
                self.loadAddressesForOrders(args.items);
            }, self.uniqueID);
            this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                self._onCurrentChanged();
            }, self.uniqueID);
        }
        AddressVM.prototype._onCurrentChanged = function () {
            this.raisePropertyChanged('currentItem');
        };
        AddressVM.prototype.loadAddressesForOrders = function (orders) {
            var ids1 = orders.map(function (item) {
                return item.ShipToAddressID;
            });
            var ids2 = orders.map(function (item) {
                return item.BillToAddressID;
            });
            var ids = ids1.concat(ids2).filter(function (id) {
                return id !== null;
            });
            return this.load(RIAPP.Utils.arr.distinct(ids), false);
        };
        AddressVM.prototype.load = function (ids, isClearTable) {
            var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
            query.isClearPrevData = isClearTable;
            return query.load();
        };
        AddressVM.prototype.clear = function () {
            this.dbSet.clear();
        };
        AddressVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
            this._customerDbSet.removeNSHandlers(this.uniqueID);
            this._orderVM.removeNSHandlers(this.uniqueID);
            this._orderVM = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(AddressVM.prototype, "_customerDbSet", {
            get: function () { return this._orderVM.customerVM.dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressVM.prototype, "currentItem", {
            get: function () { return this._dbSet.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressVM.prototype, "dbSet", {
            get: function () { return this._dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressVM.prototype, "orderVM", {
            get: function () { return this._orderVM; },
            enumerable: true,
            configurable: true
        });
        return AddressVM;
    }(RIAPP.ViewModel));
    exports.AddressVM = AddressVM;
});
define("productVM", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var ProductVM = (function (_super) {
        __extends(ProductVM, _super);
        function ProductVM(orderDetailVM) {
            _super.call(this, orderDetailVM.app);
            var self = this;
            this._orderDetailVM = orderDetailVM;
            this._dbSet = this.dbSets.Product;
            this._customerDbSet.addOnCleared(function (s, a) {
                self.clear();
            }, self.uniqueID);
            this._orderDetailVM.dbSet.addOnFill(function (sender, args) {
                self.loadProductsForOrderDetails(args.items);
            }, self.uniqueID);
            this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                self._onCurrentChanged();
            }, self.uniqueID);
        }
        ProductVM.prototype._onCurrentChanged = function () {
            this.raisePropertyChanged('currentItem');
        };
        ProductVM.prototype.clear = function () {
            this.dbSet.clear();
        };
        ProductVM.prototype.loadProductsForOrderDetails = function (orderDetails) {
            var ids = orderDetails.map(function (item) {
                return item.ProductID;
            }).filter(function (id) {
                return id !== null;
            });
            return this.load(RIAPP.Utils.arr.distinct(ids), false);
        };
        ProductVM.prototype.load = function (ids, isClearTable) {
            var query = this.dbSet.createReadProductByIdsQuery({ productIDs: ids });
            query.isClearPrevData = isClearTable;
            return query.load();
        };
        ProductVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
            this._customerDbSet.removeNSHandlers(this.uniqueID);
            this._orderDetailVM.removeNSHandlers(this.uniqueID);
            this._orderDetailVM = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(ProductVM.prototype, "_customerDbSet", {
            get: function () { return this._orderDetailVM.orderVM.customerVM.dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProductVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProductVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProductVM.prototype, "currentItem", {
            get: function () { return this._dbSet.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProductVM.prototype, "dbSet", {
            get: function () { return this._dbSet; },
            enumerable: true,
            configurable: true
        });
        return ProductVM;
    }(RIAPP.ViewModel));
    exports.ProductVM = ProductVM;
});
define("orderDetVM", ["require", "exports", "jriapp", "productVM"], function (require, exports, RIAPP, productVM_1) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var OrderDetailVM = (function (_super) {
        __extends(OrderDetailVM, _super);
        function OrderDetailVM(orderVM) {
            _super.call(this, orderVM.app);
            var self = this;
            this._dbSet = this.dbSets.SalesOrderDetail;
            this._orderVM = orderVM;
            this._currentOrder = null;
            this._orderVM.dbSet.addOnCleared(function (s, a) {
                self.clear();
            }, self.uniqueID);
            this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                self._onCurrentChanged();
            }, self.uniqueID);
            this._productVM = new productVM_1.ProductVM(this);
        }
        OrderDetailVM.prototype._onCurrentChanged = function () {
            this.raisePropertyChanged('currentItem');
        };
        OrderDetailVM.prototype.load = function () {
            this.clear();
            if (!this.currentOrder || this.currentOrder._aspect.isNew) {
                var deferred = utils.defer.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            var query = this.dbSet.createQuery('ReadSalesOrderDetail');
            query.where('SalesOrderID', 0, [this.currentOrder.SalesOrderID]);
            query.orderBy('SalesOrderDetailID');
            return query.load();
        };
        OrderDetailVM.prototype.clear = function () {
            this.dbSet.clear();
        };
        OrderDetailVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
            this.currentOrder = null;
            this._productVM.destroy();
            this._orderVM.dbSet.removeNSHandlers(this.uniqueID);
            this._orderVM.removeNSHandlers(this.uniqueID);
            this._orderVM = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(OrderDetailVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderDetailVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderDetailVM.prototype, "currentItem", {
            get: function () { return this._dbSet.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderDetailVM.prototype, "dbSet", {
            get: function () { return this._dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderDetailVM.prototype, "currentOrder", {
            get: function () { return this._currentOrder; },
            set: function (v) {
                if (v !== this._currentOrder) {
                    this._currentOrder = v;
                    this.raisePropertyChanged('currentOrder');
                    this.load();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderDetailVM.prototype, "orderVM", {
            get: function () { return this._orderVM; },
            enumerable: true,
            configurable: true
        });
        return OrderDetailVM;
    }(RIAPP.ViewModel));
    exports.OrderDetailVM = OrderDetailVM;
});
define("orderVM", ["require", "exports", "jriapp", "domainModel", "gridEvents", "addressVM", "orderDetVM"], function (require, exports, RIAPP, DEMODB, gridEvents_1, addressVM_1, orderDetVM_1) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var OrderVM = (function (_super) {
        __extends(OrderVM, _super);
        function OrderVM(customerVM) {
            _super.call(this, customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._dbSet = this.dbSets.SalesOrderHeader;
            this._currentCustomer = null;
            this._gridEvents = new gridEvents_1.OrderGridEvents(this);
            this._selectedTabIndex = null;
            this._orderStatuses = new DEMODB.KeyValDictionary();
            this._orderStatuses.fillItems([{ key: 0, val: 'New Order' }, { key: 1, val: 'Status 1' },
                { key: 2, val: 'Status 2' }, { key: 3, val: 'Status 3' },
                { key: 4, val: 'Status 4' }, { key: 5, val: 'Completed Order' }], true);
            this._tabs = null;
            this._customerVM.addHandler('row_expanded', function (sender, args) {
                if (args.isExpanded) {
                    self.currentCustomer = args.customer;
                }
                else {
                    self.currentCustomer = null;
                }
            }, self.uniqueID);
            this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                self._onCurrentChanged();
            }, self.uniqueID);
            this._dbSet.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to delete the order?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._dbSet.addOnItemAdded(function (sender, args) {
                var item = args.item;
                item.Customer = self.currentCustomer;
                item.OrderDate = moment().toDate();
                item.DueDate = moment().add(7, 'days').toDate();
                item.OnlineOrderFlag = false;
            }, self.uniqueID);
            this._addNewCommand = new RIAPP.Command(function (sender, param) {
                self._dbSet.addNew();
            }, self, function (sender, param) {
                return true;
            });
            this._addressVM = new addressVM_1.AddressVM(this);
            this._orderDetailVM = new orderDetVM_1.OrderDetailVM(this);
        }
        OrderVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['row_expanded'].concat(base_events);
        };
        OrderVM.prototype.addTabs = function (tabs) {
            this._tabs = tabs;
        };
        OrderVM.prototype.removeTabs = function () {
            this._tabs = null;
        };
        OrderVM.prototype.onTabSelected = function (tabs) {
            this._selectedTabIndex = tabs.tabIndex;
            this.raisePropertyChanged('selectedTabIndex');
            if (this._selectedTabIndex == 2) {
                this._orderDetailVM.currentOrder = this.dbSet.currentItem;
            }
        };
        OrderVM.prototype._onGridPageChanged = function () {
        };
        OrderVM.prototype._onGridRowSelected = function (item) {
        };
        OrderVM.prototype._onGridRowExpanded = function (item) {
            this.raiseEvent('row_expanded', { order: item, isExpanded: true });
            if (!!this._tabs)
                this.onTabSelected(this._tabs);
        };
        OrderVM.prototype._onGridRowCollapsed = function (item) {
            this.raiseEvent('row_expanded', { order: item, isExpanded: false });
        };
        OrderVM.prototype._onCurrentChanged = function () {
            this.raisePropertyChanged('currentItem');
        };
        OrderVM.prototype.clear = function () {
            this.dbSet.clear();
        };
        OrderVM.prototype.load = function () {
            this.clear();
            if (!this.currentCustomer || this.currentCustomer._aspect.isNew) {
                var deferred = utils.defer.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            var query = this.dbSet.createReadSalesOrderHeaderQuery();
            query.where('CustomerID', 0, [this.currentCustomer.CustomerID]);
            query.orderBy('OrderDate').thenBy('SalesOrderID');
            return query.load();
        };
        OrderVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
            this.currentCustomer = null;
            this._gridEvents.destroy();
            this._gridEvents = null;
            this._addressVM.destroy();
            this._addressVM = null;
            this._orderDetailVM.destroy();
            this._orderDetailVM = null;
            this._customerVM = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(OrderVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "currentItem", {
            get: function () { return this._dbSet.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "dbSet", {
            get: function () { return this._dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "addNewCommand", {
            get: function () { return this._addNewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "orderStatuses", {
            get: function () { return this._orderStatuses; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "currentCustomer", {
            get: function () { return this._currentCustomer; },
            set: function (v) {
                if (v !== this._currentCustomer) {
                    this._currentCustomer = v;
                    this.raisePropertyChanged('currentCustomer');
                    this.load();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "customerVM", {
            get: function () { return this._customerVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "orderDetailsVM", {
            get: function () { return this._orderDetailVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "selectedTabIndex", {
            get: function () { return this._selectedTabIndex; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "tabsEvents", {
            get: function () { return this; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderVM.prototype, "gridEvents", {
            get: function () { return this._gridEvents; },
            enumerable: true,
            configurable: true
        });
        return OrderVM;
    }(RIAPP.ViewModel));
    exports.OrderVM = OrderVM;
});
define("gridEvents", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var CustomerGridEvents = (function (_super) {
        __extends(CustomerGridEvents, _super);
        function CustomerGridEvents(customerVM) {
            _super.call(this);
            this._customerVM = customerVM;
            this._doFocus = null;
        }
        CustomerGridEvents.prototype.regFocusGridFunc = function (doFocus) {
            this._doFocus = doFocus;
        };
        CustomerGridEvents.prototype.onDataPageChanged = function () {
            this._customerVM._onGridPageChanged();
        };
        CustomerGridEvents.prototype.onRowSelected = function (item) {
            this._customerVM._onGridRowSelected(item);
        };
        CustomerGridEvents.prototype.onRowExpanded = function (item) {
            this._customerVM._onGridRowExpanded(item);
        };
        CustomerGridEvents.prototype.onRowCollapsed = function (item) {
            this._customerVM._onGridRowCollapsed(item);
        };
        CustomerGridEvents.prototype.focusGrid = function () {
            if (!!this._doFocus)
                this._doFocus();
        };
        CustomerGridEvents.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._doFocus = null;
            _super.prototype.destroy.call(this);
        };
        return CustomerGridEvents;
    }(RIAPP.BaseObject));
    exports.CustomerGridEvents = CustomerGridEvents;
    var OrderGridEvents = (function (_super) {
        __extends(OrderGridEvents, _super);
        function OrderGridEvents(orderVM) {
            _super.call(this);
            this._orderVM = orderVM;
            this._doFocus = null;
        }
        OrderGridEvents.prototype.regFocusGridFunc = function (doFocus) {
            this._doFocus = doFocus;
        };
        OrderGridEvents.prototype.onDataPageChanged = function () {
            this._orderVM._onGridPageChanged();
        };
        OrderGridEvents.prototype.onRowSelected = function (item) {
            this._orderVM._onGridRowSelected(item);
        };
        OrderGridEvents.prototype.onRowExpanded = function (item) {
            this._orderVM._onGridRowExpanded(item);
        };
        OrderGridEvents.prototype.onRowCollapsed = function (item) {
            this._orderVM._onGridRowCollapsed(item);
        };
        OrderGridEvents.prototype.focusGrid = function () {
            if (!!this._doFocus)
                this._doFocus();
        };
        OrderGridEvents.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._doFocus = null;
            _super.prototype.destroy.call(this);
        };
        return OrderGridEvents;
    }(RIAPP.BaseObject));
    exports.OrderGridEvents = OrderGridEvents;
});
define("animation", ["require", "exports", "jriapp"], function (require, exports, RIAPP) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    var FadeAnimation = (function (_super) {
        __extends(FadeAnimation, _super);
        function FadeAnimation(isAnimateFirstShow, duration) {
            _super.call(this);
            this._$animatedEl = null;
            this._effect = 'fade';
            this._duration = !!duration ? duration : 1000;
            this._isAnimateFirstShow = !!isAnimateFirstShow;
        }
        FadeAnimation.prototype.beforeShow = function (template, isFirstShow) {
        };
        FadeAnimation.prototype.show = function (template, isFirstShow) {
            this.stop();
            this._$animatedEl = $(template.el.parentElement);
            this._$animatedEl.hide();
            var deffered = utils.defer.createDeferred();
            this._$animatedEl.show(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        FadeAnimation.prototype.beforeHide = function (template) {
            this.stop();
            this._$animatedEl = $(template.el.parentElement);
        };
        FadeAnimation.prototype.hide = function (template) {
            var deffered = utils.defer.createDeferred();
            this._$animatedEl.hide(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        FadeAnimation.prototype.stop = function () {
            if (!!this._$animatedEl)
                this._$animatedEl.finish();
        };
        Object.defineProperty(FadeAnimation.prototype, "isAnimateFirstShow", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        FadeAnimation.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try {
                this.stop();
                this._$animatedEl = null;
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        return FadeAnimation;
    }(RIAPP.BaseObject));
    exports.FadeAnimation = FadeAnimation;
    var SlideAnimation = (function (_super) {
        __extends(SlideAnimation, _super);
        function SlideAnimation(isAnimateFirstShow, duration) {
            _super.call(this);
            this._$animatedEl = null;
            this._effect = 'slide';
            this._duration = !!duration ? duration : 1000;
            this._isAnimateFirstShow = !!isAnimateFirstShow;
        }
        SlideAnimation.prototype.beforeShow = function (template, isFirstShow) {
        };
        SlideAnimation.prototype.show = function (template, isFirstShow) {
            this.stop();
            this._$animatedEl = $(template.el.parentElement);
            var deffered = utils.defer.createDeferred();
            this._$animatedEl.show(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        SlideAnimation.prototype.beforeHide = function (template) {
            this.stop();
            this._$animatedEl = $(template.el.parentElement);
        };
        SlideAnimation.prototype.hide = function (template) {
            var deffered = utils.defer.createDeferred();
            this._$animatedEl.hide(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        SlideAnimation.prototype.stop = function () {
            if (!!this._$animatedEl)
                this._$animatedEl.finish();
        };
        Object.defineProperty(SlideAnimation.prototype, "isAnimateFirstShow", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        SlideAnimation.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try {
                this.stop();
                this._$animatedEl = null;
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        return SlideAnimation;
    }(RIAPP.BaseObject));
    exports.SlideAnimation = SlideAnimation;
    function initModule(app) {
        return {};
    }
    exports.initModule = initModule;
});
define("routes", ["require", "exports", "jriapp", "animation"], function (require, exports, RIAPP, ANIMATION) {
    "use strict";
    var MainRoute = (function (_super) {
        __extends(MainRoute, _super);
        function MainRoute() {
            _super.call(this);
            this._custTemplName = 'SPAcustTemplate';
            this._custDetTemplName = 'SPAcustDetailTemplate';
            this._viewName = this._custTemplName;
            this._animation = new ANIMATION.FadeAnimation(true);
        }
        MainRoute.prototype.goToAllCust = function () {
            this.viewName = this.custTemplName;
        };
        MainRoute.prototype.goToCustDet = function () {
            this.viewName = this.custDetTemplName;
        };
        MainRoute.prototype.reset = function () {
            this.viewName = this._custTemplName;
        };
        Object.defineProperty(MainRoute.prototype, "animation", {
            get: function () { return this._animation; },
            set: function (v) {
                if (v !== this._animation) {
                    this._animation = v;
                    this.raisePropertyChanged('animation');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainRoute.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainRoute.prototype, "custTemplName", {
            get: function () { return this._custTemplName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainRoute.prototype, "custDetTemplName", {
            get: function () { return this._custDetTemplName; },
            enumerable: true,
            configurable: true
        });
        return MainRoute;
    }(RIAPP.BaseObject));
    exports.MainRoute = MainRoute;
    var CustDetRoute = (function (_super) {
        __extends(CustDetRoute, _super);
        function CustDetRoute() {
            _super.call(this);
            this._infoTemplName = 'customerInfo';
            this._adrTemplName = 'customerAddr';
            this._viewName = this._infoTemplName;
            this._animation = new ANIMATION.SlideAnimation(false);
        }
        CustDetRoute.prototype.goToCustInfo = function () {
            this.viewName = this.infoTemplName;
        };
        CustDetRoute.prototype.goToAdrInfo = function () {
            this.viewName = this.adrTemplName;
        };
        CustDetRoute.prototype.reset = function () {
            this.viewName = this._infoTemplName;
        };
        Object.defineProperty(CustDetRoute.prototype, "animation", {
            get: function () { return this._animation; },
            set: function (v) {
                if (v !== this._animation) {
                    this._animation = v;
                    this.raisePropertyChanged('animation');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetRoute.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetRoute.prototype, "infoTemplName", {
            get: function () { return this._infoTemplName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetRoute.prototype, "adrTemplName", {
            get: function () { return this._adrTemplName; },
            enumerable: true,
            configurable: true
        });
        return CustDetRoute;
    }(RIAPP.BaseObject));
    exports.CustDetRoute = CustDetRoute;
    var AddressRoute = (function (_super) {
        __extends(AddressRoute, _super);
        function AddressRoute() {
            _super.call(this);
            this._linkAdrTemplate = 'linkAdrTemplate';
            this._newAdrTemplate = 'newAdrTemplate';
            this._viewName = this._linkAdrTemplate;
        }
        AddressRoute.prototype.goToLinkAdr = function () {
            this.viewName = this.linkAdrTemplate;
        };
        AddressRoute.prototype.goToNewAdr = function () {
            this.viewName = this.newAdrTemplate;
        };
        Object.defineProperty(AddressRoute.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressRoute.prototype, "linkAdrTemplate", {
            get: function () { return this._linkAdrTemplate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressRoute.prototype, "newAdrTemplate", {
            get: function () { return this._newAdrTemplate; },
            enumerable: true,
            configurable: true
        });
        return AddressRoute;
    }(RIAPP.BaseObject));
    exports.AddressRoute = AddressRoute;
});
define("custAddressVM", ["require", "exports", "jriapp", "jriapp_db", "addAddressVM"], function (require, exports, RIAPP, dbMOD, addAddressVM_1) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var CustomerAddressVM = (function (_super) {
        __extends(CustomerAddressVM, _super);
        function CustomerAddressVM(customerVM) {
            _super.call(this, customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._addAddressVM = null;
            this._currentCustomer = self._customerVM.currentItem;
            this._addressesDb = this.dbSets.Address;
            this._custAdressDb = this.dbSets.CustomerAddress;
            this._custAdressDb.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to unlink Address from this customer?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._custAdressDb.addOnBeginEdit(function (sender, args) {
                var item = args.item;
                var address = item.Address;
                if (!!address)
                    address._aspect.beginEdit();
            }, self.uniqueID);
            this._custAdressDb.addOnEndEdit(function (sender, args) {
                var item = args.item;
                var address = item.Address;
                if (!args.isCanceled) {
                    if (!!address)
                        address._aspect.endEdit();
                }
                else {
                    if (address)
                        address._aspect.cancelEdit();
                }
            }, self.uniqueID);
            this._addressesDb.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to delete the Customer\'s Address?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._addressesView = new dbMOD.DataView({
                dataSource: this._addressesDb,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; },
                fn_filter: function (item) {
                    if (!self._currentCustomer)
                        return false;
                    return item.CustomerAddresses.some(function (ca) {
                        return self._currentCustomer === ca.Customer;
                    });
                },
                fn_itemsProvider: function (ds) {
                    if (!self._currentCustomer)
                        return [];
                    var custAdrs = self._currentCustomer.CustomerAddresses;
                    return custAdrs.map(function (m) {
                        return m.Address;
                    }).filter(function (address) {
                        return !!address;
                    });
                }
            });
            this._custAdressView.addOnViewRefreshed(function (s, a) {
                self._addressesView.refresh();
            }, self.uniqueID);
            this._customerVM.addOnPropertyChange('currentItem', function (sender, args) {
                self._currentCustomer = self._customerVM.currentItem;
                self.raisePropertyChanged('currentCustomer');
            }, self.uniqueID);
        }
        CustomerAddressVM.prototype._loadAddresses = function (addressIDs, isClearTable) {
            var query = this._addressesDb.createReadAddressByIdsQuery({ addressIDs: addressIDs });
            query.isClearPrevData = isClearTable;
            return query.load();
        };
        CustomerAddressVM.prototype._addNewAddress = function () {
            var adr = this.addressesView.addNew();
            return adr;
        };
        CustomerAddressVM.prototype._addNewCustAddress = function (address) {
            var cust = this.currentCustomer;
            var ca = this.custAdressView.addNew();
            ca.CustomerID = cust.CustomerID;
            ca.AddressType = "Main Office";
            ca.Address = address;
            ca._aspect.endEdit();
            return ca;
        };
        CustomerAddressVM.prototype.load = function (customers) {
            var self = this, custArr = customers || [];
            var custIDs = custArr.map(function (item) {
                return item.CustomerID;
            });
            var query = this._custAdressDb.createReadAddressForCustomersQuery({ custIDs: custIDs });
            query.load();
        };
        CustomerAddressVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._addressesDb) {
                this._addressesDb.removeNSHandlers(this.uniqueID);
            }
            if (!!this._custAdressDb) {
                this._custAdressDb.removeNSHandlers(this.uniqueID);
            }
            if (!!this._customerVM) {
                this._customerVM.removeNSHandlers(this.uniqueID);
            }
            if (!!this._custAdressView) {
                this._custAdressView.removeNSHandlers(this.uniqueID);
            }
            if (this._addAddressVM) {
                this._addAddressVM.destroy();
                this._addAddressVM = null;
            }
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(CustomerAddressVM.prototype, "_custAdressView", {
            get: function () { return this._customerVM.custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addressesDb", {
            get: function () { return this._addressesDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "custAdressDb", {
            get: function () { return this._custAdressDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addressesView", {
            get: function () { return this._addressesView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "custAdressView", {
            get: function () { return this._custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addAddressVM", {
            get: function () {
                if (!this._addAddressVM) {
                    this._addAddressVM = new addAddressVM_1.AddAddressVM(this);
                }
                return this._addAddressVM;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "currentCustomer", {
            get: function () { return this._currentCustomer; },
            enumerable: true,
            configurable: true
        });
        return CustomerAddressVM;
    }(RIAPP.ViewModel));
    exports.CustomerAddressVM = CustomerAddressVM;
});
define("customerVM", ["require", "exports", "jriapp", "jriapp_db", "gridEvents", "routes", "custAddressVM", "orderVM"], function (require, exports, RIAPP, dbMOD, gridEvents_2, routes_1, custAddressVM_1, orderVM_1) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var CustomerVM = (function (_super) {
        __extends(CustomerVM, _super);
        function CustomerVM(app) {
            _super.call(this, app);
            var self = this;
            this._dbSet = this.dbSets.Customer;
            this._dbSet.isSubmitOnDelete = true;
            this._propWatcher = new RIAPP.PropWatcher();
            this._uiMainRoute = new routes_1.MainRoute();
            this._uiCustDetRoute = new routes_1.CustDetRoute();
            this._uiMainRoute.addOnPropertyChange('viewName', function (sender, a) {
                self._uiCustDetRoute.reset();
                if (sender.viewName == sender.custTemplName) {
                    setTimeout(function () {
                        if (!!self._gridEvents) {
                            self._gridEvents.focusGrid();
                        }
                    }, 0);
                }
            });
            this._gridEvents = new gridEvents_2.CustomerGridEvents(this);
            this._dbSet.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to delete customer?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._dbSet.addOnPageIndexChanged(function (sender, args) {
                self.raiseEvent('page_changed', {});
            }, self.uniqueID);
            this._dbSet.addOnItemAdded(function (s, args) {
                args.item.NameStyle = false;
                args.item.ComplexProp.LastName = "Dummy1";
                args.item.ComplexProp.FirstName = "Dummy2";
            });
            this._editCommand = new RIAPP.Command(function (sender, param) {
                self.currentItem._aspect.beginEdit();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            this._endEditCommand = new RIAPP.Command(function (sender, param) {
                if (self.currentItem._aspect.endEdit())
                    self.dbContext.submitChanges();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            this._cancelEditCommand = new RIAPP.Command(function (sender, param) {
                self.currentItem._aspect.cancelEdit();
                self.dbContext.rejectChanges();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            this._addNewCommand = new RIAPP.Command(function (sender, param) {
                self._dbSet.addNew();
            }, self, function (sender, param) {
                return true;
            });
            this._saveCommand = new RIAPP.Command(function (sender, param) {
                self.dbContext.submitChanges();
            }, self, function (s, p) {
                return self.dbContext.isHasChanges;
            });
            this._undoCommand = new RIAPP.Command(function (sender, param) {
                self.dbContext.rejectChanges();
            }, self, function (s, p) {
                return self.dbContext.isHasChanges;
            });
            this._loadCommand = new RIAPP.Command(function (sender, args) {
                self.load();
            }, self, null);
            this._switchViewCommand = new RIAPP.Command(function (sender, param) {
                self.uiMainRoute.viewName = param;
            }, self, null);
            this._switchDetViewCommand = new RIAPP.Command(function (sender, param) {
                self.uiCustDetRoute.viewName = param;
            }, self, null);
            this._propWatcher.addPropWatch(self.dbContext, 'isHasChanges', function (prop) {
                self._saveCommand.raiseCanExecuteChanged();
                self._undoCommand.raiseCanExecuteChanged();
            });
            this._propWatcher.addPropWatch(this._dbSet, 'currentItem', function (prop) {
                self._editCommand.raiseCanExecuteChanged();
                self._endEditCommand.raiseCanExecuteChanged();
                self._cancelEditCommand.raiseCanExecuteChanged();
                self._onCurrentChanged();
            });
            this._dbSet.addOnCleared(function (s, a) {
                self.dbSets.CustomerAddress.clear();
                self.dbSets.Address.clear();
            }, self.uniqueID);
            var custAssoc = self.dbContext.associations.getCustAddrToCustomer();
            this._custAdressView = new dbMOD.ChildDataView({
                association: custAssoc,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
            });
            this._ordersVM = new orderVM_1.OrderVM(this);
            this._customerAddressVM = new custAddressVM_1.CustomerAddressVM(this);
        }
        CustomerVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['row_expanded', 'page_changed'].concat(base_events);
        };
        CustomerVM.prototype._onCurrentChanged = function () {
            this._custAdressView.parentItem = this._dbSet.currentItem;
            this.raisePropertyChanged('currentItem');
        };
        CustomerVM.prototype._onGridPageChanged = function () {
        };
        CustomerVM.prototype._onGridRowSelected = function (item) {
        };
        CustomerVM.prototype._onGridRowExpanded = function (item) {
            this.raiseEvent('row_expanded', { customer: item, isExpanded: true });
        };
        CustomerVM.prototype._onGridRowCollapsed = function (item) {
            this.raiseEvent('row_expanded', { customer: item, isExpanded: false });
        };
        CustomerVM.prototype.load = function () {
            var query = this._dbSet.createReadCustomerQuery({ includeNav: true });
            query.pageSize = 50;
            query.orderBy('ComplexProp.LastName').thenBy('ComplexProp.MiddleName').thenBy('ComplexProp.FirstName');
            return this.dbContext.load(query);
        };
        CustomerVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._propWatcher.destroy();
            this._propWatcher = null;
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
            this._gridEvents.destroy();
            this._gridEvents = null;
            this._ordersVM.destroy();
            this._ordersVM = null;
            this._customerAddressVM.destroy();
            this._customerAddressVM = null;
            this._custAdressView.destroy();
            this._custAdressView = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(CustomerVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "dbSet", {
            get: function () { return this._dbSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "currentItem", {
            get: function () { return this._dbSet.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "editCommand", {
            get: function () { return this._editCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "endEditCommand", {
            get: function () { return this._endEditCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "cancelEditCommand", {
            get: function () { return this._cancelEditCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "addNewCommand", {
            get: function () { return this._addNewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "saveCommand", {
            get: function () { return this._saveCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "undoCommand", {
            get: function () { return this._undoCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "loadCommand", {
            get: function () { return this._loadCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "ordersVM", {
            get: function () { return this._ordersVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "custAdressView", {
            get: function () { return this._custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "customerAddressVM", {
            get: function () { return this._customerAddressVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "switchViewCommand", {
            get: function () { return this._switchViewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "switchDetViewCommand", {
            get: function () { return this._switchDetViewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "uiMainRoute", {
            get: function () { return this._uiMainRoute; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "uiCustDetRoute", {
            get: function () { return this._uiCustDetRoute; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "gridEvents", {
            get: function () { return this._gridEvents; },
            enumerable: true,
            configurable: true
        });
        return CustomerVM;
    }(RIAPP.ViewModel));
    exports.CustomerVM = CustomerVM;
});
define("app", ["require", "exports", "jriapp", "domainModel", "common", "customerVM"], function (require, exports, RIAPP, DEMODB, common_1, customerVM_1) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    var DemoApplication = (function (_super) {
        __extends(DemoApplication, _super);
        function DemoApplication(options) {
            _super.call(this, options);
            var self = this;
            this._dbContext = null;
            this._errorVM = null;
            this._customerVM = null;
        }
        DemoApplication.prototype.onStartUp = function () {
            var self = this, options = self.options;
            this._dbContext = new DEMODB.DbContext();
            this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
            function toText(str) {
                if (str === null)
                    return '';
                else
                    return str;
            }
            ;
            this._dbContext.dbSets.Customer.defineComplexProp_NameField(function (item) {
                return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
            });
            this.registerObject('dbContext', this._dbContext);
            this._errorVM = new common_1.ErrorViewModel(this);
            this._customerVM = new customerVM_1.CustomerVM(this);
            function handleError(sender, data) {
                self._handleError(sender, data);
            }
            ;
            this.addOnError(handleError);
            this._dbContext.addOnError(handleError);
            _super.prototype.onStartUp.call(this);
        };
        DemoApplication.prototype._handleError = function (sender, data) {
            debugger;
            data.isHandled = true;
            this.errorVM.error = data.error;
            this.errorVM.showDialog();
        };
        DemoApplication.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._errorVM.destroy();
                self._customerVM.destroy();
                self._dbContext.destroy();
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        Object.defineProperty(DemoApplication.prototype, "options", {
            get: function () { return this._options; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "dbContext", {
            get: function () { return this._dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "errorVM", {
            get: function () { return this._errorVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "customerVM", {
            get: function () { return this._customerVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "TEXT", {
            get: function () { return RIAPP.LocaleSTRS.TEXT; },
            enumerable: true,
            configurable: true
        });
        return DemoApplication;
    }(RIAPP.Application));
    exports.DemoApplication = DemoApplication;
});
define("addAddressVM", ["require", "exports", "jriapp", "jriapp_db", "jriapp_ui", "common", "routes"], function (require, exports, RIAPP, dbMOD, uiMOD, COMMON, routes_2) {
    "use strict";
    var utils = RIAPP.Utils, $ = RIAPP.$;
    var AddAddressVM = (function (_super) {
        __extends(AddAddressVM, _super);
        function AddAddressVM(customerAddressVM) {
            _super.call(this, customerAddressVM.app);
            var self = this;
            this._customerAddressVM = customerAddressVM;
            this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
            this._currentCustomer = self._customerAddressVM.currentCustomer;
            this._searchToolTip = 'enter any address part then press search button';
            this._newAddress = null;
            this._dataGrid = null;
            this._searchString = null;
            this._uiAddressRoute = new routes_2.AddressRoute();
            this._dialogVM = new uiMOD.DialogVM(self.app);
            var dialogOptions = {
                templateID: 'addAddressTemplate',
                width: 950,
                height: 600,
                title: 'add new customer address',
                submitOnOK: true,
                fn_OnClose: function (dialog) {
                    if (dialog.result != 'ok') {
                        if (!!self._newAddress) {
                            self._cancelAddNewAddress();
                        }
                        self.dbContext.rejectChanges();
                    }
                    self._addressInfosDb.clear();
                    self.searchString = null;
                },
                fn_OnOK: function (dialog) {
                    if (self.uiAddressRoute.viewName != self.uiAddressRoute.newAdrTemplate) {
                        return 0;
                    }
                    if (!self._newAddress._aspect.endEdit())
                        return 1;
                    var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                    custAdress._aspect.endEdit();
                    self._newAddress = null;
                    self.uiAddressRoute.goToLinkAdr();
                    self.raisePropertyChanged('newAddress');
                    return 1;
                },
                fn_OnCancel: function (dialog) {
                    if (self.uiAddressRoute.viewName != self.uiAddressRoute.newAdrTemplate) {
                        return 0;
                    }
                    if (!!self._newAddress) {
                        self._cancelAddNewAddress();
                    }
                    return 1;
                }
            };
            this._dialogVM.createDialog('addressDialog', dialogOptions);
            this._addressInfosView = new dbMOD.DataView({
                dataSource: this._addressInfosDb,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; },
                fn_filter: function (item) {
                    return !item.CustomerAddresses.some(function (CustAdr) {
                        return self._currentCustomer === CustAdr.Customer;
                    });
                }
            });
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
            this.custAdressView.addOnPropertyChange('currentItem', function (sender, args) {
                self._unLinkCommand.raiseCanExecuteChanged();
            }, self.uniqueID);
            this._addNewCommand = new RIAPP.Command(function (sender, param) {
                try {
                    var opts = utils.core.merge(param, { width: 950, height: 600 });
                    var dialog = self._dialogVM.showDialog('addressDialog', self);
                    dialog.width = opts.width;
                    dialog.height = opts.height;
                }
                catch (ex) {
                    self.handleError(ex, this);
                }
            }, self, function (sender, param) {
                return !!self.customer;
            });
            this._execSearchCommand = new RIAPP.Command(function (sender, args) {
                self.loadAddressInfos();
            }, self, null);
            this._addNewAddressCommand = new RIAPP.Command(function (sender, args) {
                self._addNewAddress();
            }, self, null);
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
        AddAddressVM.prototype._addGrid = function (grid) {
            var self = this;
            if (!!this._dataGrid)
                this._removeGrid();
            this._dataGrid = grid;
        };
        AddAddressVM.prototype._removeGrid = function () {
            if (!this._dataGrid)
                return;
            this._dataGrid.removeNSHandlers(this.uniqueID);
            this._dataGrid = null;
        };
        AddAddressVM.prototype._cancelAddNewAddress = function () {
            var self = this;
            self._newAddress._aspect.cancelEdit();
            self._newAddress._aspect.rejectChanges();
            self._newAddress = null;
            self.uiAddressRoute.goToLinkAdr();
            self.raisePropertyChanged('newAddress');
        };
        AddAddressVM.prototype._addNewAddress = function () {
            this._newAddress = this._customerAddressVM._addNewAddress();
            this.uiAddressRoute.goToNewAdr();
            this.raisePropertyChanged('newAddress');
        };
        AddAddressVM.prototype._linkAddress = function () {
            var self = this, adrInfo = this.currentAddressInfo, adrView = self.custAdressView, adrID;
            if (!adrInfo) {
                alert('_linkAddress error: adrInfoEntity is null');
                return;
            }
            adrID = adrInfo.AddressID;
            var existedAddr = adrView.items.some(function (item) {
                return item.AddressID === adrID;
            });
            if (existedAddr) {
                alert('Customer already has this address!');
                return;
            }
            var promise = this._customerAddressVM._loadAddresses([adrID], false);
            promise.then(function (res) {
                var address = self._customerAddressVM.addressesDb.findEntity(adrID);
                if (!!address) {
                    self._customerAddressVM._addNewCustAddress(address);
                    self._removeAddressRP(adrID);
                }
            });
        };
        AddAddressVM.prototype._unLinkAddress = function () {
            var item = this.custAdressView.currentItem;
            if (!item) {
                return;
            }
            var id = item.AddressID;
            if (item._aspect.deleteItem())
                this._addAddressRP(id);
        };
        AddAddressVM.prototype._addAddressRP = function (addressID) {
            if (this._checkAddressInRP(addressID)) {
                var deferred = utils.defer.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            var self = this, query = this._addressInfosDb.createReadAddressInfoQuery();
            query.isClearPrevData = false;
            query.where('AddressID', 0, [addressID]);
            var promise = query.load();
            promise.then(function () {
                self._checkAddressInRP(addressID);
            });
            return promise;
        };
        AddAddressVM.prototype._checkAddressInRP = function (addressID) {
            var item = this._addressInfosDb.findEntity(addressID);
            if (!!item) {
                var appended = this._addressInfosView.appendItems([item]);
                this._addressInfosView.currentItem = item;
                if (!!this._dataGrid)
                    this._dataGrid.scrollToCurrent(0);
            }
            return !!item;
        };
        AddAddressVM.prototype._removeAddressRP = function (addressID) {
            var item = this._addressInfosView.findByPK(addressID);
            if (!!item) {
                this._addressInfosView.removeItem(item);
            }
        };
        AddAddressVM.prototype.loadAddressInfos = function () {
            var query = this._addressInfosDb.createReadAddressInfoQuery();
            query.isClearPrevData = true;
            COMMON.addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
            query.orderBy('AddressLine1');
            return query.load();
        };
        AddAddressVM.prototype.submitChanges = function () { return this.dbContext.submitChanges(); };
        AddAddressVM.prototype.rejectChanges = function () { };
        AddAddressVM.prototype.destroy = function () {
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
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(AddAddressVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "isCanSubmit", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressInfosDb", {
            get: function () { return this._addressInfosDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressInfosView", {
            get: function () { return this._addressInfosView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressesView", {
            get: function () { return this._customerAddressVM.addressesView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "custAdressView", {
            get: function () { return this._customerAddressVM.custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "currentAddressInfo", {
            get: function () { return this._addressInfosView.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "searchString", {
            get: function () { return this._searchString; },
            set: function (v) {
                if (this._searchString !== v) {
                    this._searchString = v;
                    this.raisePropertyChanged('searchString');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addNewCommand", {
            get: function () { return this._addNewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "execSearchCommand", {
            get: function () { return this._execSearchCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addNewAddressCommand", {
            get: function () { return this._addNewAddressCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "linkCommand", {
            get: function () { return this._linkCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "unLinkCommand", {
            get: function () { return this._unLinkCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "newAddress", {
            get: function () { return this._newAddress; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "customer", {
            get: function () { return this._currentCustomer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "grid", {
            get: function () { return this._dataGrid; },
            set: function (v) {
                if (!!v)
                    this._addGrid(v);
                else
                    this._removeGrid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "searchToolTip", {
            get: function () { return this._searchToolTip; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "uiAddressRoute", {
            get: function () { return this._uiAddressRoute; },
            enumerable: true,
            configurable: true
        });
        return AddAddressVM;
    }(RIAPP.ViewModel));
    exports.AddAddressVM = AddAddressVM;
});
define("gridElView", ["require", "exports", "jriapp", "jriapp_ui"], function (require, exports, RIAPP, uiMOD) {
    "use strict";
    var bootstrap = RIAPP.bootstrap, utils = RIAPP.Utils;
    var GridElView = (function (_super) {
        __extends(GridElView, _super);
        function GridElView(options) {
            _super.call(this, options);
            var self = this, grid = self.grid;
            if (!!grid) {
                grid.addOnPageChanged(function (s, a) {
                    self._onGridPageChanged();
                }, self.uniqueID);
                grid.addOnRowSelected(function (s, a) {
                    self._onGridRowSelected(a.row);
                }, self.uniqueID);
                grid.addOnRowExpanded(function (s, a) {
                    self._onGridRowExpanded(a.collapsedRow, a.expandedRow, a.isExpanded);
                }, self.uniqueID);
            }
        }
        GridElView.prototype._onGridPageChanged = function () {
            if (!!this._myGridEvents) {
                this._myGridEvents.onDataPageChanged();
            }
        };
        GridElView.prototype._onGridRowSelected = function (row) {
            if (!!this._myGridEvents) {
                this._myGridEvents.onRowSelected(row.item);
            }
        };
        GridElView.prototype._onGridRowExpanded = function (oldRow, row, isExpanded) {
            if (!!this._myGridEvents) {
                if (isExpanded) {
                    this._myGridEvents.onRowExpanded(row.item);
                }
                else {
                    this._myGridEvents.onRowCollapsed(oldRow.item);
                }
            }
        };
        GridElView.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._myGridEvents) {
                this._myGridEvents.regFocusGridFunc(null);
            }
            this._myGridEvents = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(GridElView.prototype, "myGridEvents", {
            get: function () { return this._myGridEvents; },
            set: function (v) {
                var self = this;
                if (this._myGridEvents !== v) {
                    if (!!this._myGridEvents) {
                        this._myGridEvents.regFocusGridFunc(null);
                    }
                    this._myGridEvents = v;
                    this.raisePropertyChanged('myGridEvents');
                    if (!!this._myGridEvents) {
                        this._myGridEvents.regFocusGridFunc(function () {
                            if (!!self.grid) {
                                self.grid.focus();
                            }
                        });
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return GridElView;
    }(uiMOD.DataGridElView));
    exports.GridElView = GridElView;
    function initModule(app) {
        app.registerElView('my_grid', GridElView);
    }
    exports.initModule = initModule;
});
define("prodAutocomplete", ["require", "exports", "autocomplete"], function (require, exports, AUTOCOMPLETE) {
    "use strict";
    var ProductAutoComplete = (function (_super) {
        __extends(ProductAutoComplete, _super);
        function ProductAutoComplete(options) {
            _super.call(this, options);
            var self = this;
            this._lastLoadedID = null;
            this._lookupSource = this._getDbContext().getDbSet('Product');
            this._lookupSource.addOnCollChanged(function (sender, args) {
                self._updateValue();
            }, self.uniqueID);
        }
        ProductAutoComplete.prototype._updateSelection = function () {
            if (!!this.dataContext) {
                var id = this.currentSelection;
                this.dataContext.ProductID = id;
            }
        };
        ProductAutoComplete.prototype._onHide = function () {
            _super.prototype._onHide.call(this);
            this._updateValue();
        };
        ProductAutoComplete.prototype._updateValue = function () {
            if (!this.dataContext) {
                this.value = '';
                return;
            }
            var productID = this.dataContext.ProductID;
            var product = this._lookupSource.findEntity(productID);
            if (!!product) {
                this.value = product.Name;
            }
            else {
                this.value = '';
                if (this._lastLoadedID !== productID) {
                    this._lastLoadedID = productID;
                    var query = this._lookupSource.createReadProductByIdsQuery({ productIDs: [productID] });
                    query.isClearPrevData = false;
                    query.load();
                }
            }
        };
        Object.defineProperty(ProductAutoComplete.prototype, "dataContext", {
            get: function () { return this._dataContext; },
            set: function (v) {
                var self = this;
                if (this._dataContext !== v) {
                    if (!!this._dataContext) {
                        this._dataContext.removeNSHandlers(this.uniqueID);
                    }
                    this._dataContext = v;
                    if (!!this._dataContext) {
                        this._dataContext.addOnPropertyChange('ProductID', function (sender, a) {
                            self._updateValue();
                        }, this.uniqueID);
                    }
                    self._updateValue();
                    this.raisePropertyChanged('dataContext');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProductAutoComplete.prototype, "currentSelection", {
            get: function () {
                if (!!this.gridDataSource.currentItem)
                    return this.gridDataSource.currentItem['ProductID'];
                else
                    return null;
            },
            enumerable: true,
            configurable: true
        });
        return ProductAutoComplete;
    }(AUTOCOMPLETE.AutoCompleteElView));
    exports.ProductAutoComplete = ProductAutoComplete;
    function initModule(app) {
        app.registerElView('productAutocomplete', ProductAutoComplete);
    }
    exports.initModule = initModule;
    ;
});
define("main", ["require", "exports", "jriapp", "app", "common", "autocomplete", "gridElView", "prodAutocomplete"], function (require, exports, RIAPP, app_1, COMMON, AUTOCOMPLETE, GRIDELVIEW, PRODAUTOCOMPLETE) {
    "use strict";
    RIAPP.bootstrap.addOnError(function (sender, args) {
        debugger;
        alert(args.error.message);
    });
    function start(options) {
        options.modulesInits = {
            "COMMON": COMMON.initModule,
            "AUTOCOMPLETE": AUTOCOMPLETE.initModule,
            "GRIDELVIEW": GRIDELVIEW.initModule,
            "PRODAUTOCOMPLETE": PRODAUTOCOMPLETE.initModule
        };
        return RIAPP.bootstrap.startApp(function () {
            return new app_1.DemoApplication(options);
        }, function (app) {
            app.registerTemplateGroup('custGroup', {
                url: options.spa_template1_url,
                names: ["SPAcustTemplate", "goToInfoColTemplate", "SPAcustDetailTemplate", "customerEditTemplate", "customerDetailsTemplate", "orderEditTemplate",
                    "orderDetEditTemplate", "orderDetailsTemplate", "productTemplate1", "productTemplate2",
                    "prodAutocompleteTemplate"]
            });
            app.registerTemplateGroup('custInfoGroup', {
                url: options.spa_template2_url,
                names: ["customerInfo", "salespersonTemplate1", "salespersonTemplate2", "salePerAutocompleteTemplate"]
            });
            app.registerTemplateGroup('custAdrGroup', {
                url: options.spa_template3_url,
                names: ["customerAddr", "addressTemplate", "addAddressTemplate", "linkAdrTemplate", "newAdrTemplate"]
            });
        }).then(function (app) {
            return app.customerVM.load();
        });
    }
    exports.start = start;
});
