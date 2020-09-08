import { EventFire, EventInstructorInterface, Subscriptions } from "event-instructor";
/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ implements EventInstructorInterface {
    /**
     *
     * @returns {Subscriptions}
     */
    getSubscribers(): Subscriptions;
    /**
     *
     * @param event
     */
    scopeCallback(event: Event): void;
    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static $NAME$Event: EventFire;
}
//# sourceMappingURL=EventInstructor.d.ts.map