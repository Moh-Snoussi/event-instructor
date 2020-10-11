import { Resolver } from "./ValueResolver";
export default class EventManager {
    /**
     * used to allow single instance
     * @private
     */
    private static Singleton;
    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    static unsubscribeList: {
        [key: string]: UnsubscribableStore;
    };
    /**
     *
     * @returns {void}
     */
    constructor(allowInline?: boolean);
    /**
     * subscribes to an event-instructor class
     * use the following command on terminal to generate an event-instructor class
     * npm explore npm run create:constructor
     *
     * @param eventsInstructor
     */
    subscribe(eventsInstructor: Constructable<EventInstructorInterface>): Array<Unsubscribable>;
    /**
     *
     * unsubscribe an event
     * require the subscriber id, that can be found in EventManager.unsubscribeList
     *
     * @param unsubscribable
     */
    unsubscribe(unsubscribable: Unsubscribable | string): boolean;
    /**
     *
     * subscribe to an array of eventInstructors classes,
     * the eventInstructor class does not need to be initialized
     *
     * an eventInstructor can be created using the command line:
     * npm explore event-instructor npm run create:instructor
     *
     * ex: import Foo form "./Foo"; eventManager.setSubscribers([Foo])
     *
     * @param subscribers
     */
    setSubscribers(subscribers: Array<Constructable<EventInstructorInterface>>): void;
    /**
     * publish an event, same as dispatching a custom event
     *
     * @param eventObject
     *
     * the event Object has
     * - name of the event
     * - detail that are passed with the event
     * - the element that the event is bound to, default document
     */
    publish(eventObject: {
        name: string;
        detail: Object;
        element?: any;
    }): void;
    /**
     * used to publish an event, same as dispatching a custom event
     *
     * @param eventName event name
     * @param detail detail need to be passed
     */
    fire(eventName: string, detail: Object): void;
    /**
     * the current event is fired before the "window load"
     * it will be published if a given events are registered
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