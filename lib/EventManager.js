"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
require("events-polyfill");
var EventManager = /** @class */ (function () {
    /**
     *
     * @returns {void}
     */
    function EventManager() {
        /**
         *
         */
        this.dynamicElements = {};
        /**
         *
         */
        this.elementIds = new Set();
        /**
         *
         */
        this.elementEvents = {};
        /**
         *
         */
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
        }
        return EventManager.Singleton;
    };
    /**
     * the function subscribe to events
     *
     * @param eventsInstructor
     */
    EventManager.prototype.setSubscriber = function ( eventsInstructor) {
        var _a;
        var elementsInstructor = new eventsInstructor();
        // check if getSubscribers is defined method
        if (typeof elementsInstructor.getSubscribers() === 'undefined') {
            throw new Error('getSubscribers is not defined on ' + elementsInstructor.constructor.name);
        }
        var subscribers = elementsInstructor.getSubscribers();
        for (var subscriber in subscribers) {
            if (subscribers.hasOwnProperty(subscriber)) {
                var dynamicElements = subscribers[subscriber];
                if (this.elementIds.size === 0) {
                    // needed for logging the executionTime that is found on eventsRegistered event
                    // size on start will be 0
                    this.startDate = new Date();
                }
                for (var dynamicElementId in dynamicElements) {
                    if (dynamicElements.hasOwnProperty(dynamicElementId)) {
                        if (!(this.elementIds.has(dynamicElementId))) {
                            this.elementEvents[dynamicElementId] = new Set();
                            this.elementIds.add(dynamicElementId);
                        }
                        for (var events in dynamicElements[dynamicElementId]) {
                            if (dynamicElements[dynamicElementId].hasOwnProperty(events)) {
                                var eventsArray = events.split(' ');
                                for (var currentIndex in eventsArray) {
                                    if (eventsArray.hasOwnProperty(currentIndex)) {
                                        var currentEvent = eventsArray[currentIndex];
                                        // reaction must be an object that contains the callback function, and optional preventDefault and stopPropagation if they are not provided they are set to false
                                        var reaction = dynamicElements[dynamicElementId][events];
                                        reaction.scope = elementsInstructor;
                                        if (this.elementEvents[dynamicElementId].has(currentEvent)) {
                                            this.dynamicElements[dynamicElementId][currentEvent].push(reaction);
                                        }
                                        else if (this.dynamicElements[dynamicElementId]) {
                                            this.dynamicElements[dynamicElementId][currentEvent] = [reaction];
                                        }
                                        else {
                                            this.dynamicElements[dynamicElementId] = (_a = {}, _a[currentEvent] = [reaction], _a);
                                        }
                                        this.elementEvents[dynamicElementId].add(currentEvent);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return this;
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
     * add all registered events
     */
    EventManager.prototype.listen = function () {
        var startTime = new Date();
        for (var elementId in this.dynamicElements) {
            var _loop_1 = function (currentEvent) {
                if (this_1.dynamicElements[elementId].hasOwnProperty(currentEvent)) {
                    var elementReactions_1 = this_1.dynamicElements[elementId][currentEvent];
                    var element = null;
                    if (elementId === 'window') {
                        element = window;
                    }
                    else if (elementId === 'document') {
                        element = document;
                    }
                    else {
                        element = document.getElementById(elementId);
                    }
                    element.addEventListener(currentEvent, function (e) {
                        elementReactions_1.forEach(function (elementReaction) {
                            if (elementReaction.preventDefault) {
                                e.preventDefault();
                            }
                            if (elementReaction.stopPropagation) {
                                e.stopPropagation();
                            }
                            elementReaction.callBack(e);
                        });
                    });
                }
            };
            var this_1 = this;
            for (var currentEvent in this.dynamicElements[elementId]) {
                _loop_1(currentEvent);
            }
        }
        var finishingDate = new Date();
        EventManager.eventsRegisteredEvent.fire({
            totalExecution: finishingDate - this.startDate,
            registrationTime: finishingDate - startTime
        });
    };
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