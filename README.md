<p align="center">

<h3 align="center">event-instructor</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

This module help writing javascript/typescript more efficient by using the pub/sub patern and by encapsulating eventListeners, it will group similar EventListeners into one. 


## 🏁 Install <a name = "install"></a>

```
npm install event-instructor --save
```

## Usage
```
npm explore event-instructor npm run create:instructor
```

the command will guide you, then the final result may look like this:
```
import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "./../../EventManager"

/**
 * Foo
 * $DESCRIPTION$
 */
export default class Foo implements EventInstructorInterface {

    /**
     *
     * @returns {Subscriptions}
     */
    getSubscribers(): Subscriptions {
        return {
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
                    // add another eventListener
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
        console.log('callback is called from ' + Foo.constructor.name)
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static FooEvent: EventFire = {
        name: 'FooEvent',
        fire: (detail) => {
            const self = Foo.FooEvent
            const eventManager: EventManager = new EventManager()
            eventManager.fire(self.name, detail)
        }
    }
}
```
the event publisher and subscribers need to be defined, then in the entry javascript (main.js / app.js) we subscribe as follow

```
const {EventManager} = require( "event-instructor" )
import {Foo} from "./DirectoryWhere/Foo" // change the directoryWhere
const eventManager = new EventManager();
eventManager
        .subscribe( Foo )
        //.subscribe( anotherInstructor )
        .listen() // register all subscribers and start listening to the events

```


