<p align="center">

<h3 align="center">event-instructor</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

(WORK IN PROGRESS)
## quick start
It helps organize code using the sub/pub pattern:

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

Or if the event is bound on the document then you can include the event name and anonym function like this: ;
```
('event'). subscribe (function (event) { console.log(event) })
```

\\ An option can be passed as an object
\\ you can read more about the options here
const subscriber = ('selector').subscribe ('click', function (event){  console.log(event) }, {options})

\\ resolvers resolve a value that is requested on an event callback: 

('event').subscribe(function (event) { const resolvedValue = ValueResolver.resolve('foo')
console.log('new resolved value: ', resolvedValue) // fooBar})

('event').(resolved(oldValue, allResolverValueArray) { console.log(oldValue, allResolverValueArray)
Return oldValue + 'Bar' })
 For many resolvers you can set the priority of the resolver function

('event').(resolved(oldValue, allResolverValueArray) { console.log(oldValue, allResolverValueArray)
ValueResolver.setOrder(1)
Return oldValue + 'Bar' })

The resolvedValue will be 'fooBarBaz'

Publisher are simpler
EventManager.publish({name: 'eventName', options})


The above implementation is a fast usage and is not advised mainly because code can be hard to maintain and what I call events hell where things are subscriber and fired from anywhere, second reason is as you may already noticed that the new prototypes of the string is implemented, there for is advised to use the oop way, that will be described in the next section

The oop has a command line tool that can generate Eventnstructor
