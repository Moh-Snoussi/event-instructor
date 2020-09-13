"use strict";
// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CallBackValueResolver_1 = __importDefault(require("./CallBackValueResolver"));
require('events-polyfill');
var EventManager = /** @class */ (function () {
    /**
     *
     * @returns {void}
     */
    function EventManager() {
        this.publishers = {};
        return this.singleton();
    }
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    EventManager.prototype.setStringSubscriber = function () {
        var self = this;
        String.prototype.subscribe = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
            return self.handleInlineSubscriber.call(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones);
        };
    };
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    EventManager.prototype.setStringEventValueResolver = function () {
        var self = this;
        String.prototype.valueResolver = function (resolver) {
            return self.handleInlineSubscriber.call(this, resolver);
        };
    };
    EventManager.prototype.handleInlineSubscriber = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
        // eventManager is singleton, the following will not initialize an instance,
        // this is required as we will be calling this function by binding the scope that will include the string
        // ('foo').subscribe <== the scope here is the string foo this === 'foo'
        var self = new EventManager();
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
                if (typeof arg === 'string') {
                    selector = this;
                    element = document.querySelector(selector);
                    eventName = arg;
                }
                else if (arg === args[0] && typeof arg === 'function' && arg.name === 'resolver') {
                    CallBackValueResolver_1.default.setResolver(arg, this);
                    return this;
                }
                else if (!element) {
                    selector = 'document';
                    element = document;
                    eventName = this;
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
        var selectorId = EventManager.getSelectorId({
            type: selector,
            value: eventName
        });
        var callBackName;
        var resolverId = CallBackValueResolver_1.default.getResolverId(selector, eventName);
        if (resolverIsSet) {
            CallBackValueResolver_1.default.setResolver(resolver, resolverId);
        }
        selectorId += EventManager.incrementer++;
        if (callBackIsSet) {
            callBackName = 'inline_' + selectorId;
            window[callBackName] = function (event) {
                // @ts-ignore
                if (onlyOnes) {
                    event.target.removeEventListener(event.type, window[callBackName]);
                }
                // @ts-ignore
                callBack.call({ resolverId: resolverId }, event);
            };
            element === null || element === void 0 ? void 0 : element.addEventListener(eventName, window[callBackName], options);
            EventManager.unsubscribeList[callBackName] = {
                callBackName: callBackName,
                event: eventName,
                element: element,
                options: options,
            };
        }
        return callBackName || selectorId;
    };
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    EventManager.prototype.setStringUnsubscriber = function () {
        var self = this;
        String.prototype.unsubscribe = function () {
            return self.unsubscribe(this);
        };
    };
    EventManager.prototype.setStringSubscribeOnes = function () {
        var self = this;
        String.prototype.subscribeOnes = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes) {
            return self.handleInlineSubscriber.call(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, true);
        };
    };
    /**
     *
     * @returns {EventManager}
     */
    EventManager.prototype.singleton = function () {
        if (!EventManager.Singleton) {
            EventManager.Singleton = this;
            this.setStringSubscriber();
            this.setStringSubscribeOnes();
            this.setStringEventValueResolver();
            this.setStringUnsubscriber();
        }
        return EventManager.Singleton;
    };
    /**
     * return an id that contain the element and the event
     *
     * @param selector
     */
    EventManager.getSelectorId = function (selector) {
        return typeof selector !== "string" ? selector.type + '___' + selector.value : selector;
    };
    /**
     * get html element from selector id, please note selector id is not html element id,
     * selector id is an identifier used internally to get the required element
     *
     * @param selectorId
     */
    EventManager.getElementFromSelectorId = function (selectorId) {
        var element;
        var selectors = selectorId.split('___');
        if (selectors.length > 1) {
            // @ts-ignore
            element = document[selectors[0]](selectors[1]);
        }
        else {
            element = document.querySelector(selectorId);
        }
        return element;
    };
    /**
     * returns HTMLElement from selector,
     * @param selector
     * @private
     */
    EventManager.getElement = function (selector) {
        // @ts-ignore
        return typeof selector === "string" ? document.querySelector(selector) : document[selector.type](selector.value);
    };
    /**
     * will cleanup the subscriber and start listening
     *
     * @param eventsInstructor
     */
    EventManager.prototype.subscribe = function (eventsInstructor) {
        var eventsInstructorIns = new eventsInstructor();
        // check if getSubscribers is a defined method
        if (typeof eventsInstructorIns.getSubscribers() === 'undefined') {
            throw new Error('getSubscribers is not defined on ' + eventsInstructorIns.constructor.name);
        }
        var subscribers = eventsInstructorIns.getSubscribers();
        var self = this;
        // register the listeners
        subscribers.forEach(function (subscriber) {
            self.setListener(subscriber, eventsInstructorIns);
        });
    };
    /**
     *
     * @param currentSubscriber
     * @param eventInstructor
     */
    EventManager.prototype.setListener = function (currentSubscriber, eventInstructor) {
        var _a, _b;
        var element;
        var selectorId;
        // if the selector has document then the Document object will be returned
        if (currentSubscriber.selector === 'document' || !currentSubscriber.selector) {
            element = document;
            selectorId = 'document';
        }
        else {
            element = EventManager.getElement(currentSubscriber.selector);
            selectorId = EventManager.getSelectorId(currentSubscriber.selector);
        }
        var instructorName = eventInstructor.constructor.name;
        var returns = (_a = {},
            _a[instructorName] = (_b = {},
                _b[selectorId] = {},
                _b),
            _a);
        if (!currentSubscriber.subscribers) {
            currentSubscriber.subscribers = currentSubscriber;
        }
        var _loop_1 = function (events) {
            var _a;
            returns[instructorName][selectorId] = (_a = {}, _a[events] = [], _a);
            if (currentSubscriber.subscribers.hasOwnProperty(events)) {
                // splitting if the key is string, this allow event like 'click touch'
                var eventsArray = events.split(' ');
                // adding ability to call this.scope inside the function
                currentSubscriber.subscribers[events].scope = eventInstructor;
                currentSubscriber.subscribers[events].resolverId = CallBackValueResolver_1.default.getResolverId(selectorId, events);
                var eventOptions = currentSubscriber.subscribers[events].options;
                var _loop_2 = function (currentEvent) {
                    var callBackName = instructorName + '_' + selectorId + '_' + eventsArray[currentEvent];
                    if (currentSubscriber.subscribers[events].hasOwnProperty('callBack')) {
                        // @ts-ignore
                        window[callBackName] = function (event) {
                            // @ts-ignore
                            currentSubscriber.subscribers[events].callBack(event);
                        };
                        // @ts-ignore
                        element === null || element === void 0 ? void 0 : element.addEventListener(eventsArray[currentEvent], window[callBackName], eventOptions);
                        // returned value will contain information that can be referred to when unsubscribe
                        returns[instructorName][selectorId][events].push(callBackName);
                        EventManager.unsubscribeList[callBackName] = {
                            callBackName: callBackName,
                            event: eventsArray[currentEvent],
                            element: element,
                            options: eventOptions,
                        };
                    }
                    if (currentSubscriber.subscribers[events].hasOwnProperty('callBackOnes')) {
                        var onesCallBackName_1 = callBackName + 'ones';
                        // @ts-ignore
                        window[onesCallBackName_1] = function (event) {
                            // @ts-ignore
                            event.target.removeEventListener(event.type, window[onesCallBackName_1]);
                            // @ts-ignore
                            currentSubscriber.subscribers[events].callBackOnes(event);
                        };
                        // @ts-ignore
                        element === null || element === void 0 ? void 0 : element.addEventListener(eventsArray[currentEvent], window[onesCallBackName_1], eventOptions);
                        // returned value will contain information that can be referred to when unsubscribe
                        // @ts-ignore
                        returns[instructorName][selectorId][events].push(callBackName);
                        EventManager.unsubscribeList[onesCallBackName_1] = {
                            callBackName: onesCallBackName_1,
                            event: eventsArray[currentEvent],
                            element: element,
                            options: eventOptions,
                        };
                    }
                    if (currentSubscriber.subscribers[events].hasOwnProperty('resolver')) {
                        var resolver = currentSubscriber.subscribers[events].resolver;
                        CallBackValueResolver_1.default.setResolver(resolver, currentSubscriber.subscribers[events].resolverId);
                    }
                };
                for (var currentEvent in eventsArray) {
                    _loop_2(currentEvent);
                }
            }
        };
        for (var events in currentSubscriber.subscribers) {
            _loop_1(events);
        }
        return returns;
    };
    /**
     *
     * @param unsubscribable
     */
    EventManager.prototype.unsubscribe = function (unsubscribable) {
        var success = false;
        if (typeof unsubscribable === 'string') {
            success = EventManager.removeListener(unsubscribable);
        }
        else {
            var self_1 = this;
            for (var unsub in unsubscribable) {
                if (unsubscribable.hasOwnProperty(unsub)) {
                    for (var elem in unsubscribable[unsub])
                        if (unsubscribable[unsub].hasOwnProperty(elem)) {
                            for (var event_1 in unsubscribable[unsub][elem])
                                if (unsubscribable[unsub][elem].hasOwnProperty(event_1)) {
                                    unsubscribable[unsub][elem][event_1].forEach(function (unsubscribableId) {
                                        EventManager.removeListener(unsubscribableId);
                                        success = true;
                                    });
                                }
                        }
                }
            }
        }
        return success;
    };
    /**
     * remove an event listener
     * @param unsubscribableId
     */
    EventManager.removeListener = function (unsubscribableId) {
        var success = false;
        if (EventManager.unsubscribeList[unsubscribableId]) {
            success = true;
            var element = EventManager.unsubscribeList[unsubscribableId].element;
            var event_2 = EventManager.unsubscribeList[unsubscribableId].event;
            var callBackName = EventManager.unsubscribeList[unsubscribableId].callBackName;
            var options = EventManager.unsubscribeList[unsubscribableId].options;
            // @ts-ignore
            element === null || element === void 0 ? void 0 : element.removeEventListener(event_2, window[callBackName], options);
        }
        return success;
    };
    /**
     *
     * subscribe to an array of eventInstructors
     * @param subscribers
     */
    EventManager.prototype.setSubscribers = function (subscribers) {
        var self = this;
        subscribers.forEach(function (eventInstructor) {
            self.subscribe(eventInstructor);
        });
    };
    /**
     *
     * @param eventObject
     */
    EventManager.prototype.publish = function (eventObject) {
        var ev = new CustomEvent(eventObject.name, { detail: eventObject.detail, cancelable: true });
        (eventObject.element ? eventObject.element : document).dispatchEvent(ev);
        // @ts-ignore
        this.publishers[eventObject.name] = { detail: eventObject.detail };
    };
    /**
     *
     * @param eventName
     * @param detail
     */
    EventManager.prototype.fire = function (eventName, detail) {
        this.publish({
            name: eventName,
            detail: detail
        });
    };
    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    EventManager.unsubscribeList = {};
    EventManager.incrementer = 0;
    /**
     *
     */
    EventManager.eventsRegisteredEvent = {
        name: 'eventsRegistered',
        fire: function (detail) {
            var currentEvent = EventManager.eventsRegisteredEvent;
            var eventManager = new EventManager();
            eventManager.fire(currentEvent.name, detail);
        }
    };
    return EventManager;
}());
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map