import { EventFire, EventInstructorInterface, Subscription } from "./../../EventManager";
/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ implements EventInstructorInterface {
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
    static $NAME$Event: EventFire;
}
//# sourceMappingURL=EventInstructor.d.ts.map