// import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"
import ValueResolver from "./../ValueResolver"

import EventManager, { EventFire, EventInstructorInterface, Subscription } from "./../EventManager"

/**
 * Foo
 * foobar
 */
export default class Foo implements EventInstructorInterface {

    /**
     *
     * @returns {Subscription}
     */
    getSubscribers(): Array<Subscription> {
        return this.subscriptions
    }

    subscriptions: Array<Subscription> = [
        {
            selector: 'window',
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
                callBack: function (event) {
                    var data = this.dataResolver.call(this, event.detail);

                    console.log("new value of date: ", data.time.getMilliseconds());
                },
                callBackOnes: function (event) {
                    console.log("this is fired only ones");
                },
                resolver: function (latest : any, allResolvers: Array<any>) {
                    // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                    // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called

                    console.log("all resolver data can be found here: ", allResolvers);
                    console.log("old resolver date: ", latest.time.getMilliseconds());
                    console.log("value resolver will create a new date");

                    // change the resolver value
                    return { time: 'FOOOOOO' };
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
        Foo.FooEvent.fire({ time: date })
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static FooEvent: EventFire = {
        name: 'FooEvent',
        fire: (detail: any) => {
            const self = Foo.FooEvent
            const eventManager: EventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}
