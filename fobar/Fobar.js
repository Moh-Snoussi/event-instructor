import EventManager, {Subscription, EventFire} from "./../lib/EventManager"



/**
 * Fobar
 * always
 */
export default class Fobar {

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
            subscribers: {
                load: {
                    callBack: function (event) {
                        this.scope.documentLoadSubscriberCallBack(event)
                    }
                }
            }
        },
        {
            [Fobar.FobarEvent.name]: {
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
                    // subscriptions listen to the Fobar.FobarEvent.name and add a resolver function

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
            "is called from " + Fobar.constructor.name,
            ", on date millisecond: " + date.getMilliseconds()
        );
        // publish an event
        Fobar.FobarEvent.fire({ time: date })
    }

    /**
     * can be used to fire the event as Fobar.FobarEvent.fire(details)
     * or can be listened to in other Instructor by Fobar.FobarEvent.name
	 * @type {EventFire}
     */
    static FobarEvent = {
        name: 'FobarEvent',
        fire: (detail) => {
            const self = Fobar.FobarEvent
            const eventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}