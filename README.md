<p align="center">

<h3 align="center">event-instructor</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

This module help writing javascript/typescript more efficient by using the pub/sub patern.

We register different event listner in different classes, then all event-listners will be grouped, this mean if you have many event-listners for the same event and element, the module will group them together in a one event listner


## 🏁 Install <a name = "install"></a>

```
npm install event-instructor --save
```

## Usage
```
npm explore event-instructor npm run create:instructor
```

the command will guide you the it will generate an Instructor class that look like this:
```
import "foo.less"

import {EventManager} from "event-instructor"
import {Subscriptions, DynamicElements, EventFire} from "event-instructor/Types";
import ElementsInstructor from "event-instructor/ElementsInstructor";

/**
 * Foo
 *
 * demonstrationClass
 *
 */
export default class Foo extends ElementsInstructor
{

    /**
     *
     * @returns {Subscriptions}
     */
    getSubscribers(): Subscriptions
    {
        return this.subscriptions
    }


    /**
     *
     */
    subscriptions: Subscriptions = {
        // unique key can be anything that will be useful in debugging
        uniqueKey: {
            // the elementId we are subscribing to, can be an id of an element or a "document" or a "window"
            elementId: {
                // the event we are subscribing to, can be string separated by comma eg: "click, customEvent"
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
    public scopeCallback(event: Event): void
    {
      console.log('FooInstructor is listening')

        // will toggle the attribues that are defined in the dynamicElements
        // this will add blink to the classes of the element that have Foo as id: see this.dynamicElements
        this.instruct(this.dynamicElements)

        // this.instruct(this.dynamicElements, true)
        // will remove added blink from the classes
    }

    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    static FooEvent: EventFire = {
        name: 'FooEvent',
        fire: ( detail )  => {
            const self = Foo.FooEvent
            const eventManager : EventManager = new EventManager()
            eventManager.fire( self.name, detail )
        }
    }

    /**
     */
    dynamicElements: DynamicElements = {
      // Foo is the element Id;
        Foo: {classList: 'blink'},
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
        .subscribe( anotherInstructor ) // you can subscribe to another Instructor
        .listen() // register all subscribers and start listening to the events

```


