import EventManager, {Subscription, EventType} from "./../lib/EventManager"
import CallBackValueResolver from "../lib/CallBackValueResolver"


/**
 * Foo
 *
 *
 *
 */
class Foo
{

	/**
	 *
	 * @returns {Subscription[]}
	 */
	getSubscribers()
	{
		return this.subscriptions
	}

	subscriptions = [
		{
			selector: 'body',
			subscribers: {
				click: {
					callBack: function ( event ) {
						this.scope.documentLoadSubscriberCallBack( event )
					}
				}
			}
		},
		{
			[ Foo.FooEvent.name ]: {
				callBack: function ( event ) {
					var data = CallBackValueResolver.valueResolver.call(this, event.detail )

					console.log( 'new value of date: ', data.time.getMilliseconds() )
				},
				callBackOnes: function ( event ) {
					console.log( 'this is fired only ones' )
				},
				resolver: function ( latest, allResolvers) {
					// the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
					// it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called

					console.log('all resolver data can be found here: ',allResolvers)
					console.log( 'old resolver date: ', latest.time.getMilliseconds())
					console.log('value resolver will create a new date')

					// change the resolver value
					return {time:new Date()}
				}
			}
		}

	]


	/**
	 *
	 * @param event
	 */
	documentLoadSubscriberCallBack( event )
	{
		const date = new Date()

		console.log( 'eventListener of type: ' + event.type,
			', of the element: ' + event.target,
			'is called from ' + Foo.constructor.name,
			', on date millisecond: ' + date.getMilliseconds()
		)

		// publish an event
		Foo.FooEvent.fire( { time: date } )
	}

}

/**
 * can be used to fire the event as Foo.FooEvent.fire(details)
 * or can be listened to in other Instructor by Foo.FooEvent.name
 */
Foo.FooEvent = {
	name: 'FooEvent',
	fire: ( detail ) => {
		const self = Foo.FooEvent
		const eventManager = new EventManager()
		eventManager.fire( self.name, detail )
	}
}

export default Foo