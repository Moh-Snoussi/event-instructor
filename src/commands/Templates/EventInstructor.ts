// import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"
import ValueResolver from "../../CallBackValueResolver"

$STYLE$

import EventManager, { EventFire, EventInstructorInterface, Subscription } from "./../../EventManager"

/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ implements EventInstructorInterface
{

    /**
     *
     * @returns {Subscription}
     */
    getSubscribers(): Array<Subscription>
    {
        return this.subscriptions
    }

    subscriptions: Array<Subscription> = [
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
            [ $NAME$.$NAME$Event.name ]: {
                callBack: function ( event ): void {
                    var data = ValueResolver.valueResolver( event.detail )

                    console.log( 'new value of date: ', data )
                },
                callBackOnes: function ( event ): void {
                    console.log( 'this is fired only ones' )
                },
                resolver: function ( latest: any, allResolvers: Array<any> ): any {
                    // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                    // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called

                    console.log( 'old resolver date: ', latest )

                    // change the resolver value
                    return new Date()
                }
            }
        },
        {

        }
    ]


    /**
     *
     * @param event
     */
    public documentLoadSubscriberCallBack( event: Event ): Date
    {
        const date = new Date()

        console.log( 'eventListener of type: ' + event.type,
            'of the element: ' + event.target,
            'is called from ' + $NAME$.constructor.name,
            'on: ' + date
        )

        // publish an event
        $NAME$.$NAME$Event.fire( { time: date } )
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static $NAME$Event: EventFire = {
        name: '$NAME$Event',
        fire: ( detail: any ) => {
            const self = $NAME$.$NAME$Event
            const eventManager: EventManager = new EventManager()
            eventManager.fire( self.name, detail )
        }
    }
}
