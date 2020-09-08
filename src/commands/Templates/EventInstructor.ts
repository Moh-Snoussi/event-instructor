import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"
$STYLE$

/**
 * $NAME$
 * $DESCRIPTION$
 */
export default class $NAME$ implements EventInstructorInterface {

    /**
     *
     * @returns {Subscriptions}
     */
    getSubscribers(): Subscriptions {
        return {
            // unique key can be anything that will be useful in debugging
            uniqueKey: {
                // the elementId we are subscribing to, can be an id or "document" or "window"
                selector: {
                    // the event we are subscribing to, can be string separated by space eg: "click customEvent"
                    eventName: {
                        callBack: function (event: Event) {
                            // @ts-ignore this scope is referencing this class
                            this.scope.scopeCallback(event)
                        },
                    }
                    // add another eventListener
                },
                document: {
                    [$NAME$.$NAME$Event.name]: {
                        callBack: function (event: CustomEvent) {
                            console.log('custom event is fired: ' + $NAME$.$NAME$Event.name, event)
                        }
                    }
                }
                // add another ElementID
            }
            // add another entry
        }
    }

    /**
     *
     * @param event
     */
    public scopeCallback(event: Event): void {
        console.log('callback is called from ' + $NAME$.constructor.name)
        $NAME$.$NAME$Event.fire({time: new Date()})
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
