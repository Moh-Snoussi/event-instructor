// import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"

import Foo from "./../Foo/Foo"
import EventManager, { EventFire, EventInstructorInterface, Subscription } from "./../EventManager"

/**
 * Bar
 * hello
 */
export default class Bar implements EventInstructorInterface {

    /**
     *
     * @returns {Subscription}
     */
    getSubscribers(): Array<Subscription> {
        return this.subscriptions
    }

    subscriptions: Array<Subscription> = [
        {
            selector: 'document',
            subscribers: {
                load: {
                    callBack: function (event) {
                        this.scope.documentLoadSubscriberCallBack(event)
                    }
                }
            }
        },
        {
            [Foo.FooEvent.name]: {
                resolver: function (latest : any, allResolvers: Array<any>) {
                    // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                    // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
                    // so if you want to modify the value from a different Class just in the 
                    // subscriptions listen to the Bar.BarEvent.name and add a resolver function

                    console.log("this is bar: ", allResolvers);
                    console.log("old resolver date: ", latest.time.getMilliseconds());
                    console.log("value resolver will create a new date");

                    // change the resolver value
                    return { time: new Date() };
                }
            }
        }
    ]

    /**
     *
     * @param event
     */
    public documentLoadSubscriberCallBack(event: Event): void {

        const date = new Date();

        console.log(
            "eventListener of type: " + event.type,
            ", of the element: " + event.target,
            "is called from " + Foo.constructor.name,
            ", on date millisecond: " + date.getMilliseconds()
        );
        // publish an event
        Bar.BarEvent.fire({ time: date })
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static BarEvent: EventFire = {
        name: 'BarEvent',
        fire: (detail: any) => {
            const self = Bar.BarEvent
            const eventManager: EventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}
