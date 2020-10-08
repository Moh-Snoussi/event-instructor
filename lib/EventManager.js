"use strict";
// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValueResolver_1 = __importDefault(require("./ValueResolver"));
var InlineEventManager_1 = __importDefault(require("./InlineEventManager"));
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
     *
     * @returns {EventManager}
     */
    EventManager.prototype.singleton = function () {
        if (!EventManager.Singleton) {
            EventManager.Singleton = this;
            this.initialize();
        }
        return EventManager.Singleton;
    };
    EventManager.prototype.initialize = function () {
        this.valueResolver = new ValueResolver_1.default();
        new InlineEventManager_1.default(this);
    };
    EventManager.prototype.dataResolver = function (value) {
        var _a;
        // @ts-ignore
        return (_a = EventManager.Singleton.valueResolver) === null || _a === void 0 ? void 0 : _a.dataResolver.call(this, value);
    };
    EventManager.prototype.setDataResolver = function (resolver, resolverId) {
        return ValueResolver_1.default.setResolver(resolver, resolverId);
    };
    EventManager.prototype.unresolve = function (resolverIdentity) {
        return ValueResolver_1.default.unsetResolver(resolverIdentity);
    };
    EventManager.prototype.setResolverPriority = function (priority) {
        return ValueResolver_1.default.setOrder(priority);
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
     * returns HTMLElement from selector,
     * @param selector
     * @private
     */
    EventManager.getElement = function (selector) {
        if (selector === 'window') {
            return window;
        }
        if (selector === 'document') {
            return document;
        }
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
        var returns = [];
        // register the listeners
        subscribers.forEach(function (subscriber) {
            returns.push(self.setListener(subscriber, eventsInstructorIns));
        });
        return returns;
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
        var self = this;
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
                var resolverId_1;
                // @ts-ignore
                if (currentSubscriber.subscribers[events].hasOwnProperty('resolverId')) {
                    // @ts-ignore
                    resolverId_1 = currentSubscriber.subscribers[events].resolverId;
                }
                else {
                    if (selectorId === 'document') {
                        resolverId_1 = events;
                        currentSubscriber.subscribers[events].resolverId = event;
                    }
                    else {
                        resolverId_1 = ValueResolver_1.default.getResolverId(selectorId, events, false);
                        currentSubscriber.subscribers[events].resolverId = event;
                    }
                }
                var eventOptions = currentSubscriber.subscribers[events].options;
                var _loop_2 = function (currentEvent) {
                    EventManager.counter++;
                    var callBackName = instructorName + '_' + selectorId + '_' + eventsArray[currentEvent] + EventManager.counter;
                    if (currentSubscriber.subscribers[events].hasOwnProperty('callBack')) {
                        // @ts-ignore
                        window[callBackName] = function (event) {
                            // @ts-ignore
                            currentSubscriber.subscribers[events].callBack.call({
                                scope: eventInstructor,
                                dataResolver: self.dataResolver,
                                resolverId: resolverId_1
                            }, event);
                            currentSubscriber.subscribers[events].subscriberId = callBackName;
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
                    currentSubscriber.subscribers[events].subscriberId = callBackName;
                    if (currentSubscriber.subscribers[events].hasOwnProperty('callBackOnes')) {
                        var onesCallBackName_1 = callBackName + 'ones';
                        // @ts-ignore
                        window[onesCallBackName_1] = function (event) {
                            // @ts-ignore
                            event.target.removeEventListener(event.type, window[onesCallBackName_1]);
                            // @ts-ignore
                            currentSubscriber.subscribers[events].callBackOnes.call({
                                scope: eventInstructor,
                                dataResolver: self.dataResolver,
                                resolverId: resolverId_1
                            }, event);
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
                        currentSubscriber.subscribers[events].onesSubscriberId = onesCallBackName_1;
                    }
                    if (currentSubscriber.subscribers[events].hasOwnProperty('resolver')) {
                        var resolver = currentSubscriber.subscribers[events].resolver;
                        currentSubscriber.subscribers[events].unresolverId = this_1.setDataResolver(resolver, resolverId_1);
                    }
                };
                for (var currentEvent in eventsArray) {
                    _loop_2(currentEvent);
                }
            }
        };
        var this_1 = this;
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
        EventManager.eventsRegisteredEvent.fire();
    };
    /**
     *
     * @param eventObject
     */
    EventManager.prototype.publish = function (eventObject) {
        var ev = new CustomEvent(eventObject.name, { detail: eventObject.detail, cancelable: true });
        (eventObject.element ? eventObject.element : document).dispatchEvent(ev);
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
    EventManager.counter = 0;
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