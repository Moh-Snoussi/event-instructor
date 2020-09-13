import EventManager from "./../lib/EventManager"
import CallBackValueResolver from "../lib/CallBackValueResolver"


/**
 * Foo
 *
 *
 *
 */
class Bar
{

	/**
	 *
	 * @returns {Subscriptions}
	 */
	getSubscribers()
	{

		return this.subscription
	}

	subscription =
		[{
			// the elementId we ardocumente subscribing to, can be an id or "document" or "window"
			selector   : {type: 'querySelector', value: 'body'},
			// the event we are subscribing to, can be string separated by space eg: "click customEvent"
			subscribers: {
				click: {
					resolver      : {
						order   : 1,
						callBack: function ( oldValue ) {
							console.log( 'oldValue', oldValue )
							return oldValue + oldValue
						}
					}
				}
			}
		}]
}

/**
 * can be used to fire the event as Foo.FooEvent.fire(details)
 * or can be listened to in other Instructor by Foo.FooEvent.name
 */
Bar.FooEvent = {
	name: 'FooEvent',
	fire: ( detail ) => {
		const self = Foo.FooEvent
		const eventManager = new EventManager()
		eventManager.fire( self.name, detail )
	}
}

export default Bar