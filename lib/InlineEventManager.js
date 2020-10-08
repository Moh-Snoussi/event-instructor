"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = __importDefault(require("./EventManager"));
var ValueResolver_1 = __importDefault(require("./ValueResolver"));
var InlineEventManager = /** @class */ (function () {
    /**
     *
     * @param eventManager
     */
    function InlineEventManager(eventManager) {
        this.eventManager = eventManager;
        this.setStringSubscriber();
        this.setStringSubscribeOnes();
        this.setStringEventValueResolver();
        this.setStringUnsubscriber();
        this.setStringUnresolve();
    }
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    InlineEventManager.prototype.setStringSubscriber = function () {
        var self = this;
        // @typescript -ingore
        String.prototype.subscribe = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
            return self.handleInlineSubscriber(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones);
        };
    };
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    InlineEventManager.prototype.setStringEventValueResolver = function () {
        var self = this;
        String.prototype.valueResolver = function (resolver) {
            return self.handleInlineSubscriber.call(this, resolver);
        };
    };
    InlineEventManager.prototype.handleInlineSubscriber = function (selectorOrEvent, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
        var self = this;
        var selector;
        var eventName;
        var element;
        var callBack;
        var resolver;
        var options;
        var onlyOnes = false;
        var resolverIsSet = false;
        var callBackIsSet = false;
        var args = arguments;
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (typeof arg !== 'undefined') {
                if (typeof arg === 'string' && arg === args[1]) {
                    selector = selectorOrEvent;
                    element = document.querySelector(selector);
                    eventName = arg;
                }
                else if (arg === args[1] && typeof arg === 'function' && arg.name === 'resolver') {
                    ValueResolver_1.default.setResolver(arg, this);
                    return this;
                }
                else if (!element) {
                    selector = 'document';
                    element = document;
                    eventName = selectorOrEvent;
                }
                if (typeof arg === 'function') {
                    if (arg.name === '' || arg.name !== 'resolver' || resolverIsSet) {
                        callBack = arg;
                        callBackIsSet = true;
                    }
                    else if (arg.name === 'resolver' || callBackIsSet) {
                        resolver = arg;
                        resolverIsSet = true;
                    }
                }
                else if (typeof arg === 'boolean') {
                    onlyOnes = arg;
                }
                else if (typeof options === 'object') {
                    options = arg;
                }
            }
        }
        var selectorId = EventManager_1.default.getSelectorId({
            type: selector,
            value: eventName
        });
        var callBackName;
        var resolverId = ValueResolver_1.default.getResolverId(selector, eventName);
        if (callBackIsSet) {
            callBackName = 'inline_' + selectorId;
            window[callBackName] = function (event) {
                // @ts-ignore
                if (onlyOnes) {
                    event.target.removeEventListener(event.type, window[callBackName]);
                }
                // @ts-ignore
                callBack.call({ dataResolver: self.eventManager.dataResolver, resolverId: resolverId }, event);
            };
            // @ts-ignore
            element === null || element === void 0 ? void 0 : element.addEventListener(eventName, window[callBackName], options);
            EventManager_1.default.unsubscribeList[callBackName] = {
                callBackName: callBackName,
                event: eventName,
                element: element,
                options: options,
            };
        }
        if (resolverIsSet) {
            // @ts-ignore
            selectorId = this.eventManager.valueResolver.setResolver(resolver, resolverId);
        }
        return callBackName || selectorId;
    };
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    InlineEventManager.prototype.setStringUnsubscriber = function () {
        var eventManager = new EventManager_1.default();
        String.prototype.unsubscribe = function () {
            return eventManager.unsubscribe(this);
        };
    };
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    InlineEventManager.prototype.setStringUnresolve = function () {
        var eventManager = new EventManager_1.default();
        String.prototype.unresolve = function () {
            return eventManager.unresolve(this);
        };
    };
    InlineEventManager.prototype.setStringSubscribeOnes = function () {
        var self = this;
        String.prototype.subscribeOnes = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes) {
            return self.handleInlineSubscriber.call(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, true);
        };
    };
    return InlineEventManager;
}());
exports.default = InlineEventManager;
//# sourceMappingURL=InlineEventManager.js.map