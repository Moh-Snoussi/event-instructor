$STYLE$

import {EventManager} from "event-instructor"
import {Subscriptions} from "event-instructor/Types";
import ElementsInstructor from "event-instructor/ElementsInstructor";

/**
 * $NAME$
 *
 * $DESCRIPTION$
 *
 */
export default class $NAME$ extends ElementsInstructor
{

	/**
	 *
	 * @returns {Subscriptions}
	 */
	getSubscribers()
	{
		return this.subscriptions
	}


	/**
	 *
	 */
	subscriptions = {
		// unique key can be anything that will be useful in debugging
		uniqueKey: {
			// the elementId we are subscribing to, can be an id or "document" or "window"
			elementId: {
				// the event we are subscribing to, can be string separated by space eg: "click customEvent"
				eventName: {
					callBack: function (event) {
						this.scope.scopeCallback(event)
					},
				}
			}
		}
	}

	/**
	 *
	 * @param event
	 */
	scopeCallback(event)
	{
		// will add the attributes of the element that are defined in the dynamicElements
		this.instruct(this.dynamicElements)

		// will remove the attributes that was previously added
		// this.instruct(this.dynamicElements, true)
	}

	/**
	 * can be used to fire the event as Foo.FooEvent.fire(details)
	 * or can be listened to in other Instructor by Foo.FooEvent.name
	 */
	static $NAME$Event = {
		name: '$NAME$Event',
		fire: ( detail )  => {
			const self = $NAME$.$NAME$Event
			const eventManager = new EventManager()
			eventManager.fire( self.name, detail )
		}
	}

	/**
	 * key is the element id value is the attributes that need to be inserted
	 */
	dynamicElements = {
		$NAME$: {classList: 'blink'},
	}
}