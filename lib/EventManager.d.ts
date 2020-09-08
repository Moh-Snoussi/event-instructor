import 'events-polyfill';
export default class EventManager {
    /**
     * used to allow sigle instance
     * @private
     */
    private static Singleton;
    /**
     * data that will be for debugging
     * @private
     */
    private startDate;
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
    /**
     *
     */
    dynamicElements: Object;
    /**
     *
     */
    elementIds: Set<string>;
    /**
     *
     */
    elementEvents: Object;
    /**
     *
     */
    publishers: Object;
    /**
     * the function subscribe to events
     *
     * @param eventsInstructor
     */
    subscribe(eventsInstructor: Constructable<EventInstructorInterface>): EventManager;
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
     * add all registered events
     */
    listen(): void;
    /**
     *
     */
    static eventsRegisteredEvent: EventFire;
}
/**
 *
 */
export interface EventInstructorInterface {
    getSubscribers(): Subscriptions;
}
export interface Constructable<T> {
    new (...args: any): T;
}
export declare type EventFire = {
    name: string;
    fire: Function;
};
export declare type Subscriptions = {
    /**
     * used to allow "uniqueKey" to appear in the ide suggestion
     */
    uniqueKey: {
        [elementId: string]: {
            [eventName: string]: {
                callBack: () => void;
            };
        };
    };
} | {
    /**
     * used to allow "elementId" to appear in the ide suggestion
     * the elementId can be a document or window as well
     */
    [uniqueKey: string]: {
        elementId: {
            [eventName: string]: {
                callBack: void;
            };
        };
    };
} | {
    /**
     * this type is used to autocomplete and suggest the eventName
     * used to allow "eventName" to appear in the ide suggestion
     */
    [uniqueKey: string]: {
        [elementId: string]: {
            eventName: {
                callBack: void;
            };
        };
    };
} | {
    /**
     * this type is used to autocomplete and suggest the eventName
     * used to allow "eventName" to appear in the ide suggestion
     */
    [uniqueKey: string]: {
        [elementId: string]: {
            [eventName: string]: {
                callBack: Function;
            };
        };
    };
};
//# sourceMappingURL=EventManager.d.ts.map