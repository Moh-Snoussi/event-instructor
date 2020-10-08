import EventManager, {Subscription, EventFire} from "event-instructor"

$STYLE$

/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ {

    /**
     *
     * @returns {Array<Subscription>}
     */
	getSubscribers()
	{
        return this.subscriptions
	}
	
	/**
	 * @type {Array<Subscription>}
	 */
    subscriptions = [
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
                callBack: function (event) {
                    var data = this.dataResolver.call(this, event.detail);

                    console.log("new value of date: ", data.time.getMilliseconds());
                },
                callBackOnes: function (event) {
                    console.log("this is fired only ones");
                },
                resolver: function (latest, allResolvers) {
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
     * @param {Event}
     */
	documentLoadSubscriberCallBack(event)
	{

        const date = new Date();

        console.log(
            "eventListener of type: " + event.type,
            ", of the element: " + event.target,
            "is called from " + $NAME$.constructor.name,
            ", on date millisecond: " + date.getMilliseconds()
        );
        // publish an event
        $NAME$.$NAME$Event.fire({ time: date })
    }

    /**
     * can be used to fire the event as $NAME$.$NAME$Event.fire(details)
     * or can be listened to in other Instructor by $NAME$.$NAME$Event.name
	 * @type {EventFire}
     */
    static $NAME$Event = {
        name: '$NAME$Event',
        fire: (detail) => {
            const self = $NAME$.$NAME$Event
            const eventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}