import {EventManager} from "event-instructor"
import {Subscriptions} from "event-instructor/Types";
import ElementsInstructor from "event-instructor/ElementsInstructor";

$STYLE$

/**
 * $NAME$
 *
 * $DESCRIPTION$
 *
 */
class $NAME$
{

	/**
	 *
	 * @returns {Subscriptions}
	 */
	getSubscribers()
	{
		return {
			// unique key can be anything that will be useful in debugging
			uniqueKey: {
				// the elementId we are subscribing to, can be an id or "document" or "window"
				elementId: {
					// the event we are subscribing to, can be string separated by space eg: "click customEvent"
					eventName: {
						callBack: function ( event ) {
							this.scope.scopeCallback( event )
						}
					}
				}
			}
		}
	}

	/**
	 *
	 * @param event
	 */
	scopeCallback( event )
	{
		console.log( "I am fired from ".$NAME$ )
	}
}

/**
 * can be used to fire the event as Foo.FooEvent.fire(details)
 * or can be listened to in other Instructor by Foo.FooEvent.name
 */
$NAME$.$NAME$Event = {
	name: '$NAME$Event',
	fire: ( detail ) => {
		const self = $NAME$.$NAME$Event
		const eventManager = new EventManager()
		eventManager.fire( self.name, detail )
	}
}

export default $NAME$