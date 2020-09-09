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
    private unsubscribeList: any;
    private cleanUpBeforeListen: boolean | undefined;

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
     * to
     */
    elementEvents: any = {};

    /**
     *
     */
    publishers: Object = {};

    /**
     * will cleanup the subscriber and start listening
     *
     * @param eventsInstructor
     */
    subscribe(eventsInstructor: Constructable<EventInstructorInterface>): void {
        if (!this.cleanUpBeforeListen) {
            this.startDate = new Date();
        }

        const elementsInstructor: EventInstructorInterface = new eventsInstructor()

        // check if getSubscribers is defined method
        if (typeof elementsInstructor.getSubscribers() === 'undefined') {
            throw new Error('getSubscribers is not defined on ' + elementsInstructor.constructor.name)
        }

        const subscribers: Subscriptions = elementsInstructor.getSubscribers()

        for (const subscribersKey in subscribers) {
            if (subscribers.hasOwnProperty(subscribersKey)) {
                // @ts-ignore
                const currentSubscriber = subscribers[subscribersKey];

                for (const events in currentSubscriber.subscribers) {
                    if (currentSubscriber.subscribers.hasOwnProperty(events)) {
                        const eventsArray = events.split(' ')
                        const reaction = currentSubscriber.subscribers[events];
                        reaction.scope = elementsInstructor;
                        const unsubscribable: boolean = currentSubscriber.subscribers.unsubscribable ?? false
                        const options: any = currentSubscriber.subscribers.options ?? false
                        const fireOnes: boolean = currentSubscriber.subscribers.fireOnes ?? false
                        const selectorId: any = currentSubscriber.selector.type ? currentSubscriber.selector.type + '€' + currentSubscriber.selector.value : currentSubscriber.selector

                        for (const currentEvent in eventsArray) {
                            if (unsubscribable || fireOnes) {
                                this.handleUnsubscribable(
                                    subscribersKey,
                                    currentSubscriber.selector,
                                    currentEvent,
                                    currentSubscriber.subscribers.callBack,
                                    options,
                                    fireOnes
                                )
                            } else if(!this.cleanUpBeforeListen) {
                                this.getElement(currentSubscriber.selector)?.addEventListener(currentEvent, currentSubscriber.subscribers.callBack, options)
                            }
                            else if (this.elementEvents[selectorId]?.has(currentEvent)) {
                                // same event is already registered
                                // @ts-ignore
                                this.dynamicElements[selectorId][currentEvent].push(reaction);

                            } else { // @ts-ignore
                                if (this.dynamicElements[selectorId]) {
                                                                // the element is already set but does not have any eventListener
                                                                // @ts-ignore
                                    this.dynamicElements[selectorId][currentEvent] = [reaction];
                                                            } else {
                                                                // @ts-ignore
                                    this.dynamicElements[selectorId] = {[currentEvent]: [reaction]};
                                                            }
                            }
                            this.elementEvents[selectorId].add(currentEvent);
                        }
                    }
                }

            }
        }
        if (!this.cleanUpBeforeListen) {
            this.listen();
        }
    }

    /**
     *
     * @param eventsInstructor
     * @param events
     */
    unsubscribe(eventsInstructor: Constructable<EventInstructorInterface>, events?: Array<string>) {
        for (const instructor in eventsInstructor) {
            if (this.unsubscribeList.find(instructor)) {
                if (events) {
                    for (const event in events) {
                        if (this.unsubscribeList[instructor].find(event)) {
                            const unsubscribable = this.unsubscribeList[instructor][event]
                            // @ts-ignore
                            this.getElement(unsubscribable.selector)?.removeEventListener(event, window[unsubscribable.callBackName], unsubscribable.options)
                        }
                    }
                } else {
                    for (const unsubscribeListKey in this.unsubscribeList[instructor]) {
                        let currentUnsubscribed = this.unsubscribeList[instructor][unsubscribeListKey]
                        // @ts-ignore
                        this.getElement(currentUnsubscribed.selector)?.removeEventListener(unsubscribeListKey, window[currentUnsubscribed.callBackName], currentUnsubscribed.options)
                    }
                }
            }
        }
    }


    /**
     *
     * @param subscriberKey
     * @param selector
     * @param eventTrigger
     * @param callBack
     * @param fireOnes
     * @param options
     */
    handleUnsubscribable(subscriberKey: string,
                         selector: string | { type: string, value: string },
                         eventTrigger: string,
                         callBack: Function,
                         options: any = false,
                         fireOnes: boolean = false,
    ): void {
        // @ts-ignore
        const element: HTMLElement = this.getElement(selector)
        const callBackName: string = subscriberKey + '_' + eventTrigger
        this.unsubscribeList[subscriberKey][eventTrigger] = {
            callBackName: callBackName,
            selector: selector,
            options: options
        }
        // @ts-ignore
        window[callBackName] = function (event) {
            callBack(event);
            if (fireOnes) {
                // @ts-ignore
                element.removeEventListener(eventTrigger, window[callBackName], options)
            }
        }
        // @ts-ignore
        element.addEventListener(eventTrigger, window[callBackName], options)
    }

    /**
     *
     * @param subscribers
     */
    setSubscribers(subscribers: Array<Constructable<EventInstructorInterface>>): void {
        this.cleanUpBeforeListen = true;
        this.startDate = new Date();
        for (let subscriber in subscribers) {
            this.subscribe(subscribers[subscriber]);
        }
        return this.listen();
    }

    /**
     *
     * @param eventObject
     */
    publish(eventObject: { name: string, detail: Object, element?: any }): void
    {
        const ev = new CustomEvent(eventObject.name, {detail: eventObject.detail, cancelable: true});
        (eventObject.element ? eventObject.element : document).dispatchEvent(ev);
        // @ts-ignore
        this.publishers[eventObject.name] = {detail: eventObject.detail}
    }

    /**
     *
     * @param eventName
     * @param detail
     */
    fire(eventName: string, detail: Object): void
    {
        this.publish({
            name: eventName,
            detail: detail
        })
    }

    /**
     * add all registered events
     */
    listen(): void
    {
        const startTime
            :
            any = new Date();
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
                            elementReactions.forEach(function (elementReaction: { callBack: (arg0: Event) => void; }) {
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
        this.cleanUpBeforeListen = false;
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

    /**
     *
     * @param selector
     * @private
     */
    private getElement(selector: any): HTMLElement | null {
        // @ts-ignore
        return typeof selector === "object" ? document[selector.key](selector.value) : document.querySelector(selector.value)
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
