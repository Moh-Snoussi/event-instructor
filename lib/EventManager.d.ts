import { Resolver } from "./CallBackValueResolver";
export default class EventManager {
    /**
     * used to allow single instance
     * @private
     */
    private static Singleton;
    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    private static unsubscribeList;
    private publishers;
    private static incrementer;
    /**
     *
     * @returns {void}
     */
    constructor();
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringSubscriber;
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringEventValueResolver;
    private handleInlineSubscriber;
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnsubscriber;
    private setStringSubscribeOnes;
    /**
     *
     * @returns {EventManager}
     */
    singleton(): EventManager;
    /**
     * return an id that contain the element and the event
     *
     * @param selector
     */
    static getSelectorId(selector: EventElementSelector): string;
    /**
     * get html element from selector id, please note selector id is not html element id,
     * selector id is an identifier used internally to get the required element
     *
     * @param selectorId
     */
    private static getElementFromSelectorId;
    /**
     * returns HTMLElement from selector,
     * @param selector
     * @private
     */
    private static getElement;
    /**
     * will cleanup the subscriber and start listening
     *
     * @param eventsInstructor
     */
    subscribe(eventsInstructor: Constructable<EventInstructorInterface>): void;
    /**
     *
     * @param currentSubscriber
     * @param eventInstructor
     */
    private setListener;
    /**
     *
     * @param unsubscribable
     */
    unsubscribe(unsubscribable: Unsubscribable | string): boolean;
    /**
     * remove an event listener
     * @param unsubscribableId
     */
    private static removeListener;
    /**
     *
     * subscribe to an array of eventInstructors
     * @param subscribers
     */
    setSubscribers(subscribers: Array<Constructable<EventInstructorInterface>>): void;
    /**
     *
     * @param eventObject
     */
    publish(eventObject: {
        name: string;
        detail: Object;
        element?: any;
    }): void;
    /**
     *
     * @param eventName
     * @param detail
     */
    fire(eventName: string, detail: Object): void;
    /**
     *
     */
    static eventsRegisteredEvent: EventFire;
}
/**
 *
 */
export interface EventInstructorInterface {
    getSubscribers(): Array<Subscription>;
}
export interface Constructable<T> {
    new (...args: any): T;
}
export declare type EventFire = {
    name: string;
    fire: Function;
};
export declare type EventFunctions = {
    callBack?: (event: Event | CustomEvent) => void;
    callBackOnes?: (event: Event | CustomEvent) => void;
    resolver?: Resolver;
    resolverId?: string;
    scope?: EventInstructorInterface | any;
    options?: any;
};
export declare type Subscription = {
    selector?: EventElementSelector;
    subscribers?: {
        [k in EventType]: EventFunctions;
    };
} | {
    [j in EventType]: EventFunctions;
};
export declare type EventType = keyof GlobalEventHandlersEventMap | string;
declare type EditableSelector = {
    type: string;
    value: string;
};
declare type EventElementSelector = EditableSelector | string;
declare type Unsubscribable = {
    [instructorName: string]: {
        [elementId: string]: {
            [event: string]: Array<string>;
        };
    };
};
export {};
//# sourceMappingURL=EventManager.d.ts.map