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
        /**
         * the name of the event
         */
        name: string;
        /**
         * the data that will be passed to the event listener, this data can be found in the event listener event.detail
         */
        detail: Object;
        /**
         * the element that the event is bound to, default document
         */
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
/**
 * an object that has the name of the need to be published and the publish function as fire
 */
export declare type EventFire = {
    /**
     * a string that contain the name of the event
     */
    name: string;
    /**
     * a function that need to has eventManger.fire('eventName', {details}) or eventManager.publish({name: eventName, detail: detail, element: element})
     * example:
     * const self = Foo.FooEvent
     * const eventManager = new EventManager()
     * eventManager.fire( self.name, detail )
     */
    fire: Function;
};
interface EventFunctions {
    /**
     * A call back function that will be executed every time the event that is the direct key of the object where the callback belongs is fired
     * @param event
     */
    callBack?: (event: Event | CustomEvent) => void;
    /**
     * A call back function that will be called only one time when the event that is defined in the key of the object where the callBackOnes belongs is fired
     * The callBack will be simply removed in the first execution
     * @param event
     */
    callBackOnes?: (event: Event | CustomEvent) => void;
    /**
     * if any Subscriber listen to the same event in it's callBack or callBackOnes uses const data = this.dataResolver('Foo')
     * then the resolver function will take two argument the lastResolver (in this case is 'Foo') and allResolverArray (['Foo'])
     * and it's returned value will be used in the event callBack or callBackOnes in this.dataResolver('Foo')
     * this mean in our case if the resolver function return 'Bar' then: const data = this.dataResolver('Foo') // data will be FooBar
     *
     * the resolver can be an anonym function or can be an object that has a callBack key with a function that take two argument the lastResolver and allResolverArray
     * and order key that has a number the higher is the number the later the resolver will execute in case of many resolver
     */
    resolver?: Resolver;
    /**
     * the options of the event, the same options like in the document.addEventListener('Foo', callBack, options)
     * you can read more about addEventListener and it's options in https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     */
    options?: EventListenerOptions;
}
/**
 * a Subscription can have a selector and the event that need to be listened to
 *
 * - selector: can be a string like "#itemId" then the querySelector will be used as it is the default selector type,
 * the selector can also be string "document" or "window",
 * if the selector is an object then it must have a the selector type as key and the selector as it's value
 * selector: {getElementById: "itemId"}
 * If the selector is not found then the document object will be considered
 *
 * - the event that will be listened to is a key of an object that contains the callBack or other options
 */
declare type SubscriptionObject = {
    [key in EventType]: EventFunctions;
} | {
    /**
     * Can be a string like "#itemId" then the querySelector will be used as it is the default selector type,
     * Can also be string "document" or "window"
     * if the selector is an object then it must have a the selector type as key and the selector as it's value
     * selector: {getElementById: "itemId"}
     * If the selector is not found then the document object will be considered
     */
    selector?: EventElementSelector;
    /**
     * if different callBacks for different event of the same selector is required then used
     * example: {selector: "#itemId", subscribers: {click: {callBack: function...}, mouseout: {callBack: function...}}}
     */
    subscribers?: SubscriptionEvents;
};
/**
 * a Subscription can have a selector and the event that need to be listened to
 *
 * - selector: can be a string like "#itemId" then the querySelector will be used as it is the default selector type,
 * if the selector is an object then it must have a the selector type as key and the selector as it's value
 * selector: {getElementById: "itemId"}
 * If the selector is not found then the document object will be considered
 *
 * - the event that will be listened to is a key of an object that contains the callBack or other options
 */
declare type SubscriptionEvents = {
    [j in EventType]: EventFunctions;
};
/**
 * a Subscription can have a selector and the event that need to be listened to
 *
 * - selector: can be a string like "#itemId" then the querySelector will be used as it is the default selector type,
 * if the selector is an object then it must have a the selector type as key and the selector as it's value
 * selector: {getElementById: "itemId"}
 * If the selector is not found then the document object will be considered
 *
 * - the event that will be listened to is a key of an object that contains the callBack or other options
 */
export declare type Subscription = SubscriptionObject | SubscriptionEvents;
/**
 * the event you want to listen to,
 * can be a DomEvent or a custom event,
 * if the event name is a javascript property then wrap it in braces [FooEvent.name]
 * if you want to listen to multiple event at ones then separate them by space 'mouseover mouseout' or if the events are javascript property then [[FooEvent.name, BarEvent.name].join(' ')]
 */
export declare type EventType = keyof GlobalEventHandlersEventMap & string;
/**
 * editable selector has the selector type as the key and the selector as a value
 * allowed selectors: querySelector is the default if this selector is required then you can simply use is value as selector: "#itemId",
 * querySelectorAll, getElementById and getElementsByClassName: selector: {getElementById: "itemId"}
 */
declare type EditableSelector = {
    [k in "querySelector" | "querySelectorAll" | "getElementById" | "getElementsByClassName"]: string;
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