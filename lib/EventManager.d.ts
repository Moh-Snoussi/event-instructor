import ValueResolver, { Resolver } from "./ValueResolver";
export default class EventManager {
    /**
     * used to allow single instance
     * @private
     */
    private static Singleton;
    /**
     *
     */
    valueResolver: ValueResolver | undefined;
    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    static unsubscribeList: {
        [key: string]: UnsubscribableStore;
    };
    private publishers;
    private static counter;
    static eventRegistered: boolean;
    /**
     *
     * @returns {void}
     */
    constructor();
    /**
     *
     * @returns {EventManager}
     */
    singleton(): EventManager;
    initialize(): void;
    dataResolver(value: any): void;
    setDataResolver(resolver: Resolver, resolverId: string): string;
    unresolve(resolverIdentity: string): boolean;
    setResolverPriority(priority: number): void;
    /**
     * return an id that contain the element and the event
     *
     * @param selector
     */
    static getSelectorId(selector: EventElementSelector): string;
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
    subscribe(eventsInstructor: Constructable<EventInstructorInterface>): Array<Unsubscribable>;
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
interface EventFunctions {
    callBack?: (event: Event | CustomEvent) => void;
    subscriberId?: string;
    callBackOnes?: (event: Event | CustomEvent) => void;
    onesSubscriberId?: string;
    resolver?: Resolver;
    resolverId?: string;
    unresolverId?: string;
    scope?: EventInstructorInterface | any;
    options?: any;
    [key: string]: any;
}
interface SubscriptionObject {
    selector?: EventElementSelector;
    subscribers?: {
        [k in EventType]?: EventFunctions;
    };
}
declare type SubscriptionEvents = {
    [j in EventType]: EventFunctions;
};
export declare type Subscription = SubscriptionObject | SubscriptionEvents;
export declare type EventType = keyof GlobalEventHandlersEventMap & string;
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
declare type UnsubscribableStore = {
    callBackName: string;
    event: string;
    element: HTMLElement | Document | null;
    options: EventListenerOptions;
};
export {};
//# sourceMappingURL=EventManager.d.ts.map