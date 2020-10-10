<p align="center">

<h3 align="center">event-instructor</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

(WORK IN PROGRESS)
It helps organize code using the sub/pub pattern:

## quick start
`npm install event-instructor --save`
then in javascript:
```
import EventManager from "event-instructor"

const eventManger = new EventManager();
```

Sub : subscribe is like addEventListner

Pub : publish is like dispatching CustomEvent

Usage can be categorized into two categories : 
- inline implementation
- oop implementation

### Inline
Listening to an event:

```
const selectorClickSubscriber = ('selector').subscribe ('click', function (event){  console.log(event) }
```

Unsubscribing:

```
(selectorClickSubscriber).unsubscribe()
```

Listening to the event only ones:
```
('selector').subscribeOnes('click', function (event){ console.log('this is fired only ones')})
```

Or if the event is bound on the document then you can include the event name and anonym function:
```
('event').subscribe (function (event) { console.log(event) })

\\ An option can be passed as an object
\\ you can read more about the options here
const subscriber = ('selector').subscribe ('click', function (event){  console.log(event) }, {options})

\\ resolvers resolve a value that is requested on an event callback: 

('event').subscribe(function (event) { const resolvedValue = ValueResolver.resolve('foo')
console.log('new resolved value: ', resolvedValue) // fooBar})

('event').(resolver(oldValue, allResolverValueArray) { console.log(oldValue, allResolverValueArray)
Return oldValue + 'Bar' })
 // For many resolvers you can set the priority of the resolver function
('event').(resolver(oldValue, allResolverValueArray) { console.log(oldValue, allResolverValueArray)
ValueResolver.setOrder(1)
Return oldValue + 'Baz' })
//The resolvedValue will be 'fooBazBar'
```

Publishers are simpler and all publisher are bound to the document object
`EventManager.publish({name: 'eventName', detail: data})`


The above implementation of the event-instructor is fast and is not advised mainly because it will be hard to maintain and as you may already noticed that a new prototypes for the String is implemented, there for is advised to use the Class way, 

simply in the terminal:
`npm explore event-instructor npm run create:instructor`
this class will be generated
```
import EventManager, { Subscription, EventFire } from "event-instructor";

;

/**
 * Foo
 * Foo class to listen to something intersting
 */
export default class Foo {
  /**
   *
   * @returns {Array<Subscription>}
   */
  getSubscribers() {
    return this.subscriptions;
  }

  /**
   * @type {Array<Subscription>}
   */
  subscriptions = [
    {
      selector: "window",
      load: {
        callBack: function ( event ) {
          console.log( event, new Date().getMilliseconds(), "foo" );
        }
      }
    },
    {
      [EventManager.eventRegisteredEvent.name]: {
        callBack: function ( event ) {
          this.scope.documentLoadSubscriberCallBack( event );
        },
      },
    },
    {
      [Foo.FooEvent.name]: {
        callBack: function ( event ) {
          console.log( "Event listener of type " + event.type + " is fired!" );

          var data = this.dataResolver.call( this, event.detail );

          console.log( "new value of date: ", data.time.getMilliseconds() );
        },
        callBackOnes: function ( event ) {
          console.log( "this is fired only ones" );
        },
        resolver: function ( latest, allResolvers ) {
          // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
          // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
          // so if you want to modify the value from a different Class just in the
          // subscriptions listen to the Foo.FooEvent.name and add a resolver function

          console.log("all resolver data can be found here: ", allResolvers);
          console.log("old resolver date: ", latest.time.getMilliseconds());
          console.log("value resolver will create a new date");

          // change the resolver value
          return { time: new Date() };
        },
      },
    },
  ];

  /**
   *
   * @param {Event}
   */
  documentLoadSubscriberCallBack( event ) {
    const date = new Date();

    console.log(
      "eventListener of type: " + event.type,
      ", of the element: " + event.target,
      "is called from  Foo",
      ", on date millisecond: " + date.getMilliseconds()
    );
    // publish an event
    Foo.FooEvent.fire( { time: date } );
  }

  /**
   * can be used to fire the event as Foo.FooEvent.fire(details)
   * or can be listened to in other Instructor by Foo.FooEvent.name
   * @type {EventFire}
   */
  static FooEvent = {
    name: "FooEvent",
    fire: ( detail ) => {
      const self = Foo.FooEvent;
      const eventManager = new EventManager();
      eventManager.fire( self.name, detail );
    },
  };
}
```

then in you entry point: 
```
const {EventManager} = require( "event-instructor" )
import {Foo} from "./DirectoryWhere/Foo" // change the directoryWhere
const eventManager = new EventManager()

eventManager.setSubscribers([ Foo, anotherInstructor ])  /

```