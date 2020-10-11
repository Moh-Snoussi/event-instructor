<p align="center">

<h3 align="center">event-instructor</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

(WORK IN PROGRESS)

the package, is used as an event Manager to help organize events using the sub/pub pattern:

## quick start

`npm install event-instructor --save`

then in javascript:
```
import EventManager from "event-instructor"

const eventManger = new EventManager();

const selectorClickSubscriber = ('selector').subscribe('click', function ( event ){  console.log(event) }
```
 The usage can be categorized into two categories:

- inline usage
- Event-instructors-class usage

## Inline
Inline usage is like what was showing in the quick start section

### - Subscribe/addEventListener
```
const selectorClickSubscriber = ('selector').subscribe('click', function( event ){  console.log(event) }, options)
// the options are optional
// options are same as the options of the eventListener, read more about them in:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
```

### - Unsubscribe/removeEventListener
```
(selectorClickSubscriber).unsubscribe()
```

#### - Ones Subscriber
the subscriber will fire only ones:
```
('selector').subscribeOnes('click', function(event){ console.log('this is fired only ones')})
```
#### Listening to an event bound to the document
If the event is bound to the document then usage is little more simpler, use the name of the event instead of the selector name:
```
('customEvent').subscribe(function (event){ console.log(event) })
```

### Resolvers
Resolvers can be used inside a callBack function of a subscriber, it take a value and check if a different subscriber has a resolver function that will modify the returned value.
```
('customEvent').subscribe(function(event){ const resolvedValue = this.dataResolver('foo')
console.log('new resolved value: ', resolvedValue) })

('customEvent').subscribe(function resolver(oldValue, allResolverValueArray){ console.log(allResolverValueArray); return oldValue + 'Baz' })

eventManger.fire('customEvent', {})
```
the output of the above will be:

```
foo ["foo"]
new resolved value:  fooBaz
```

### Resolver order
you can set the order the resolver is executed, the highest order will has the return of all other resolvers

```
 ('customEvent').subscribe(function resolver(oldValue, allResolverValueArray){ 
   eventManger.valueResolver.setOrder(-10)
   return oldValue + 'Bar' 
 })
```
the output of the above will be:
```
foo ["foo", "Bar"]
new resolved value:  fooBarBaz
```

### Publishers

Publishers are simpler and all publisher are bound to the document object:

`EventManager.publish({name: 'eventName', detail: data})` 
or 
`EventManager.fire(eventName, data)`

you can publish a event and bound it a different element by adding the element to the element key:
`EventManager.publish({name: 'eventName', detail: data, element: element})` 



The above implementation of the event-instructor is fast and is not advised mainly because it will be hard to maintain and as you may already noticed that a new prototypes for the String is implemented, there for is advised to use the event-instructor class way, 

## Event-instructors-class

In the terminal:

`npm explore event-instructor npm run create:instructor`

this class will be generated

```
import EventManager, { Subscription, EventFire } from "event-instructor";

/**
 * Foo
 * Foo class to listen to something interesting
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
      // if selector not defined the document will be selected
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
the above class is meant to be as an example, resolvers and different options are optional.

then in entry point register all event-instructors: 
```
import EventManager from "event-instructor"
import {Foo} from "./DirectoryWhere/Foo" // change the directoryWhere
const eventManager = new EventManager(false) // false to don't modify the String prototype and don't allow inline subscribers

eventManager.setSubscribers([ Foo, anotherInstructor ])

```
The above class is a javascript instructor, the command that generates it is interactive and will ask to choose instructor name, language: Typescript, Javascript, Flow.

The project is developed using typescript, developers are likely to benefit from intellisense and auto completion.
