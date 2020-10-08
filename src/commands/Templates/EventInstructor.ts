import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"

$STYLE$

/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ implements EventInstructorInterface {

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
            [$NAME$.$NAME$Event.name]: {
                callBack: function (event : Event) {
                    var data = this.dataResolver.call(this, event.detail);

                    console.log("new value of date: ", data.time.getMilliseconds());
                },
                callBackOnes: function (event : Event) {
                    console.log("this is fired only ones");
                },
                resolver: function (latest : any, allResolvers: Array<any>) {
                    // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                    // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
                    // so if you want to modify the value from a different Class just in the 
                    // subscriptions listen to the $NAME$.$NAME$Event.name and add a resolver function

                    console.log("all resolver data can be found here: ", allResolvers);
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
        $NAME$.$NAME$Event.fire({ time: date })
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static $NAME$Event: EventFire = {
        name: '$NAME$Event',
        fire: (detail: any) => {
            const self = $NAME$.$NAME$Event
            const eventManager: EventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}
