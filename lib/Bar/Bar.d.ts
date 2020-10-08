import { EventFire, EventInstructorInterface, Subscription } from "./../EventManager";
/**
 * Bar
 * hello
 */
export default class Bar implements EventInstructorInterface {
    /**
     *
     * @returns {Subscription}
     */
    getSubscribers(): Array<Subscription>;
    subscriptions: Array<Subscription>;
    /**
     *
     * @param event
     */
    documentLoadSubscriberCallBack(event: Event): void;
    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static BarEvent: EventFire;
}
//# sourceMappingURL=Bar.d.ts.map