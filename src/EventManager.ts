// @flow

import 'events-polyfill'

export default class EventManager {

    /**
     * used to allow sigle instance
     * @private
     */
    private static Singleton: EventManager;

    /**
     * data that will be for debugging
     * @private
     */
    private startDate: Date | undefined;

    /**
     *
     * @returns {void}
     */
    constructor() {
        return this.singleton()
    }

    /**
     *
     * @returns {EventManager}
     */
    singleton(): EventManager {
        if (!EventManager.Singleton) {
            EventManager.Singleton = this;
        }
        return EventManager.Singleton
    }

    /**
     *
     */
    dynamicElements: Object = {};

    /**
     *
     */
    elementIds: Set<string> = new Set();

    /**
     *
     */
    elementEvents: any = {};

    /**
     *
     */
    publishers: Object = {};

    /**
     * the function subscribe to events
     *
     * @param eventsInstructor
     */
    setSubscriber(eventsInstructor: Constructable<EventInstructorInterface>): EventManager {
        const elementsInstructor: EventInstructorInterface = new eventsInstructor()

        // check if getSubscribers is defined method
        if (typeof elementsInstructor.getSubscribers() === 'undefined') {
            throw new Error('getSubscribers is not defined on ' + elementsInstructor.constructor.name)
        }

        const subscribers: Subscriptions = elementsInstructor.getSubscribers()

        for (let subscriber in subscribers) {

            if (subscribers.hasOwnProperty(subscriber)) {
                const dynamicElements: any = {}
                // @ts-ignore
                dynamicElements[subscriber] = subscribers[subscriber]

                if (this.elementIds.size === 0) {
                    // needed for logging the executionTime that is found on eventsRegistered event
                    // size on start will be 0
                    this.startDate = new Date();
                }

                for (let dynamicElementId in dynamicElements[subscriber]) {
                    if (dynamicElements.hasOwnProperty(dynamicElementId)) {

                        if (!(this.elementIds.has(dynamicElementId))) {
                            this.elementEvents[dynamicElementId] = new Set();
                            this.elementIds.add(dynamicElementId);
                        }
                        for (let events in dynamicElements[dynamicElementId]) {
                            if (dynamicElements[dynamicElementId].hasOwnProperty(events)) {
                                const eventsArray = events.split(' ');
                                for (let currentIndex in eventsArray) {
                                    if (eventsArray.hasOwnProperty(currentIndex)) {
                                        const currentEvent = eventsArray[currentIndex];

                                        // reaction must be an object that contains the callback function, and optional preventDefault and stopPropagation if they are not provided they are set to false
                                        const reaction = dynamicElements[dynamicElementId][events];
                                        reaction.scope = elementsInstructor;

                                        if (this.elementEvents[dynamicElementId].has(currentEvent)) {
                                            this.dynamicElements[dynamicElementId][currentEvent].push(reaction);
                                        } else if (this.dynamicElements[dynamicElementId]) {
                                            this.dynamicElements[dynamicElementId][currentEvent] = [reaction];
                                        } else {
                                            this.dynamicElements[dynamicElementId] = {[currentEvent]: [reaction]};
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
        return this
    }

    /**
     *
     * @param subscribers
     */
    setSubscribers(subscribers: Array<Constructable<EventInstructorInterface>>): void {
        for (let subscriber in subscribers) {
            this.setSubscriber(subscribers[subscriber])
        }
        return this.listen();
    }

    /**
     *
     * @param eventObject
     */
    publish(eventObject: { name: string, detail: Object, element?: any }): void {
        const ev = new CustomEvent(eventObject.name, {detail: eventObject.detail, cancelable: true});
        (eventObject.element ? eventObject.element : document).dispatchEvent(ev);
        this.publishers[eventObject.name] = {detail: eventObject.detail}
    }

    /**
     *
     * @param eventName
     * @param detail
     */
    fire(eventName: string, detail: Object): void {
        this.publish({
            name: eventName,
            detail: detail
        })
    }

    /**
     * add all registered events
     */
    listen(): void {
        const startTime: any = new Date();
        for (let elementId in this.dynamicElements) {
            // @ts-ignore
            for (let currentEvent in this.dynamicElements[elementId]) {
                // @ts-ignore
                if (this.dynamicElements[elementId].hasOwnProperty(currentEvent)) {
                    // @ts-ignore
                    const elementReactions = this.dynamicElements[elementId][currentEvent];

                    let element = null;
                    if (elementId === 'window') {
                        element = window;
                    } else if (elementId === 'document') {
                        element = document;
                    } else {
                        element = document.getElementById(elementId);
                    }
                    // @ts-ignore
                    element.addEventListener(
                        currentEvent,
                        function (e) {
                            elementReactions.forEach(function (elementReaction) {
                                if (elementId)

                                    elementReaction.callBack(e);
                            });
                        });
                }
            }
        }
        const finishingDate: any = new Date();

        EventManager.eventsRegisteredEvent.fire({
            totalExecution: finishingDate - <any>this.startDate,
            registrationTime: finishingDate - startTime
        })
    }

    /**
     *
     */
    static eventsRegisteredEvent: EventFire = {
        name: 'eventsRegistered',
        fire: function (detail: any) {
            const currentEvent: EventFire = EventManager.eventsRegisteredEvent
            const eventManager = new EventManager()
            eventManager.fire(currentEvent.name, detail)
        }
    }
}

/**
 *
 */
export interface EventInstructorInterface {
    getSubscribers(): Subscriptions;
}

export interface Constructable<T> {
    new(...args: any): T;
}

export type EventFire = {
    name: string,
    fire: Function
}

export type Subscriptions = {
    /**
     * used to allow "uniqueKey" to appear in the ide suggestion
     */
    uniqueKey:
        {
            [elementId: string]:
                {
                    [eventName: string]: {
                        callBack: () => void
                    }
                }
        }
} | {
    /**
     * used to allow "elementId" to appear in the ide suggestion
     * the elementId can be a document or window as well
     */
    [uniqueKey: string]:
        {
            elementId:
                {
                    [eventName: string]: {
                        callBack: void
                    }
                }
        },
} | {

    /**
     * this type is used to autocomplete and suggest the eventName
     * used to allow "eventName" to appear in the ide suggestion
     */
    [uniqueKey: string]:
        {
            [elementId: string]:
                {
                    eventName: {
                        callBack: void
                    }
                }
        }
} | {

    /**
     * this type is used to autocomplete and suggest the eventName
     * used to allow "eventName" to appear in the ide suggestion
     */
    [uniqueKey: string]:
        {
            [elementId: string]:
                {
                    [eventName: string]: {
                        callBack: Function
                    }
                }
        },
}
