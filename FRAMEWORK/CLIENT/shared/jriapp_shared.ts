﻿/** The MIT License (MIT) Copyright(c) 2016 Maxim V.Tsapov */
export * from "./jriapp_shared/const";
export * from "./jriapp_shared/int";
export * from "./jriapp_shared/errors";
export * from "./jriapp_shared/iasync";
export * from "./jriapp_shared/object";

export { STRS as LocaleSTRS, ERRS as LocaleERRS } from "./jriapp_shared/lang";

export { BaseCollection } from "./jriapp_shared/collection/base";
export { CollectionItem } from "./jriapp_shared/collection/item";
export { ItemAspect } from "./jriapp_shared/collection/aspect";
export {
    ListItemAspect, IListItem, BaseList, IListItemAspectConstructor, IListItemConstructor
} from "./jriapp_shared/collection/list";
export { BaseDictionary } from "./jriapp_shared/collection/dictionary";
export { ValidationError } from "./jriapp_shared/collection/validation";

export { Utils } from "./jriapp_shared/utils/utils";
export { WaitQueue, IWaitQueueItem } from "./jriapp_shared/utils/waitqueue";
export { Debounce } from "./jriapp_shared/utils/debounce";
export { Lazy, TValueFactory } from "./jriapp_shared/utils/lazy";