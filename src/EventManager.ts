// @flow

import ValueResolver, { Resolver } from "./ValueResolver"
import InlineEventManager from "./InlineEventManager"

require( 'events-polyfill' )

export default class EventManager
{

    /**
     * used to allow single instance
     * @private
     */
    private static Singleton: EventManager;

    /**
     * @internal
     */
    valueResolver: ValueResolver | undefined

    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    static unsubscribeList: { [ key: string ]: UnsubscribableStore } = {}

    /**
     * @internal
     */
    private publishers: any = {};

    /**
     * @internal
     */
    private static counter: number = 0

    /**
     * @internal
     */
    public static eventRegistered: boolean = false;

    /**
     *
     * @returns {void}
     */
    constructor( allowInline : boolean = true )
    {
        return this.singleton( allowInline )
    }

    /**
     * @internal
     *
     * @returns {EventManager}
     */
    singleton( allowInline : boolean ): EventManager
    {
        if ( !EventManager.Singleton ) {
            EventManager.Singleton = this;
            if (allowInline) {
                new InlineEventManager( this )
            }
            this.valueResolver = new ValueResolver

        }
        return EventManager.Singleton
    }


    /**
     * @internal
     * @param value 
     */
    public dataResolver( value: any ): void
    {
        // @ts-ignore
        return EventManager.Singleton.valueResolver?.dataResolver.call( this, value )
    }

    /**
     * 
     * @internal
     * @param resolver 
     * @param resolverId 
     */
    public setDataResolver( resolver: Resolver, resolverId: string ): string
    {

        return <string> ValueResolver.setResolver( resolver, resolverId )
    }

    /**
     * @internal
     * @param resolverIdentity 
     */
    public unresolve( resolverIdentity: string ): boolean
    {
       return <boolean> ValueResolver.unsetResolver( resolverIdentity )
    }

    /**
     * @internal
     * @param priority 
     */
    public setResolverPriority( priority: number ): void
    {
        return ValueResolver.setOrder( priority )
    }

    /**
     * return an id that contain the element and the event
     * 
     * @internal
     *
     * @param selector
     */
    public static getSelectorId( selector: EventElementSelector ): string
    {
        return typeof selector !== "string" ? selector.type + '___' + selector.value : selector
    }

    /**
     * returns HTMLElement from selector,
     * @internal
     * @param selector
     * @private
     */
    private static getElement( selector: EventElementSelector ): Document | Window | HTMLElement | null
    {
        if (selector === 'window') {
            return window
        }

        if (selector === 'document') {
            return document
        }
        // @ts-ignore
        return typeof selector === "string" ? document.querySelector( selector ) : document[ selector.type ]( selector.value )
    }


    /**
     * subscribes to an event-instructor class
     * use the following command on terminal to generate an event-instructor class
     * npm explore npm run create:constructor
     *
     * @param eventsInstructor
     */
    subscribe( eventsInstructor: Constructable<EventInstructorInterface> ): Array<Unsubscribable>
    {
        const eventsInstructorIns: EventInstructorInterface = new eventsInstructor()
        // check if getSubscribers is a defined method
        if ( typeof eventsInstructorIns.getSubscribers() === 'undefined' ) {
            throw new Error( 'getSubscribers is not defined on ' + eventsInstructorIns.constructor.name )
        }

        const subscribers: Array<Subscription> = eventsInstructorIns.getSubscribers()

        const self: EventManager = this
        let returns : Array<Unsubscribable>= [];
        // register the listeners
        subscribers.forEach( function ( subscriber ) {
            returns.push(self.setListener( subscriber, eventsInstructorIns ));
        } );

           if (!EventManager.eventRegistered) {
            EventManager.eventsRegisteredEvent.fire({date: new Date()})
            EventManager.eventRegistered = true;
        }

        return returns
    }

    /**
     *
     * @internal
     * @param currentSubscriber
     * @param eventInstructor
     */
    private setListener( currentSubscriber: Subscription, eventInstructor: EventInstructorInterface ): Unsubscribable
    {
        let element: HTMLElement | Document | null
        let selectorId: string
        const self: EventManager = this
        // if the selector has document then the Document object will be returned
        // @ts-ignore
        if ( currentSubscriber.selector === 'document' || !currentSubscriber.selector ) {
            element = document
            selectorId = 'document'

        } else {
                    // @ts-ignore
            element = EventManager.getElement( currentSubscriber.selector )
                    // @ts-ignore
            selectorId = EventManager.getSelectorId( currentSubscriber.selector )
        }

        const instructorName: string = eventInstructor.constructor.name

        let returns: Unsubscribable = {
            [ instructorName ]: {
                [ selectorId ]: {}
            }
        }
        // @ts-ignore
        if ( !currentSubscriber.subscribers ) {
                    // @ts-ignore
            currentSubscriber.subscribers = currentSubscriber
        }
        // @ts-ignore
        for ( const events in currentSubscriber.subscribers ) {

            if (events === 'selector') {
                continue
            }
            returns[ instructorName ] [ selectorId ] = { [ events ]: [] }

                    // @ts-ignore
            if ( currentSubscriber.subscribers.hasOwnProperty( events ) ) {
                // splitting if the key is string, this allow event like 'click touch'
                const eventsArray = events.split( ' ' )
                // adding ability to call this.scope inside the function
                        // @ts-ignore
                currentSubscriber.subscribers[ events ].scope = eventInstructor

                let resolverId: string
                // @ts-ignore
                if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'resolverId' ) ) {
                    // @ts-ignore
                    resolverId = currentSubscriber.subscribers[ events ].resolverId
                } else {
                    if (selectorId === 'document') {
                        resolverId = events
                                // @ts-ignore
                       currentSubscriber.subscribers[ events ].resolverId = event 
                    } else {
                    resolverId = ValueResolver.getResolverId( selectorId, events, false )
                            // @ts-ignore
                    currentSubscriber.subscribers[ events ].resolverId = event
                    }
                }

                        // @ts-ignore
                const eventOptions: any = currentSubscriber.subscribers[ events ].options
                for ( const currentEvent in eventsArray ) {
                    EventManager.counter++

                    const callBackName: string = instructorName + '_' + selectorId + '_' + eventsArray[ currentEvent ] + EventManager.counter
                            // @ts-ignore
                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'callBack' ) ) {
                        // @ts-ignore
                        window[ callBackName ] = function ( event ) {
                            // @ts-ignore
                            currentSubscriber.subscribers[ events ].callBack.call( {
                                scope: eventInstructor,
                                dataResolver: self.dataResolver,
                                resolverId: resolverId
                            }, event )
                                    // @ts-ignore
                            currentSubscriber.subscribers[ events ].subscriberId = callBackName
                        }
                        // @ts-ignore
                        element?.addEventListener( eventsArray[ currentEvent ], window[ callBackName ], eventOptions )
                        
                        // returned value will contain information that can be referred to when unsubscribe
                        returns[ instructorName ][ selectorId ][ events ].push( callBackName )
                        
                        EventManager.unsubscribeList[ callBackName ] = {
                            callBackName: callBackName,
                            event: eventsArray[ currentEvent ],
                            element: element,
                            options: eventOptions,
                        }
                    }
                            // @ts-ignore
                    currentSubscriber.subscribers[ events ].subscriberId = callBackName
                    
                            // @ts-ignore
                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'callBackOnes' ) ) {
                        
                        const onesCallBackName = callBackName + 'ones';
                        
                        // @ts-ignore
                        window[ onesCallBackName ] = function ( event ) {
                            // @ts-ignore
                            event.target.removeEventListener( event.type, window[ onesCallBackName ] );
                            // @ts-ignore
                            currentSubscriber.subscribers[ events ].callBackOnes.call( {
                                scope: eventInstructor,
                                dataResolver: self.dataResolver,
                                resolverId: resolverId
                            },
                            event)
                        }
                        // @ts-ignore
                        element?.addEventListener( eventsArray[ currentEvent ], window[ onesCallBackName ], eventOptions )
                        
                        // returned value will contain information that can be referred to when unsubscribe
                        // @ts-ignore
                        returns[ instructorName ][ selectorId ][ events ].push( callBackName )
                        
                        EventManager.unsubscribeList[ onesCallBackName ] = {
                            callBackName: onesCallBackName,
                            event: eventsArray[ currentEvent ],
                            element: element,
                            options: eventOptions,
                        }
                                // @ts-ignore
                        currentSubscriber.subscribers[ events ].onesSubscriberId = onesCallBackName
                    }
                            // @ts-ignore
                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'resolver' ) ) {
                                // @ts-ignore
                        const resolver = currentSubscriber.subscribers[ events ].resolver
                                // @ts-ignore
                        currentSubscriber.subscribers[ events ].unresolverId = this.setDataResolver( resolver, resolverId )
                    }
                }
            }
        }

        return returns
    }

    /**
     *
     * unsubscribe an event
     * require the subscriber id, that can be found in EventManager.unsubscribeList
     * 
     * @param unsubscribable
     */
    unsubscribe( unsubscribable: Unsubscribable | string ): boolean
    {
        let success: boolean = false
        if ( typeof unsubscribable === 'string' ) {
            success = EventManager.removeListener( unsubscribable )

        } else {
            const self: EventManager = this

            for ( const unsub in unsubscribable ) {
                if ( unsubscribable.hasOwnProperty( unsub ) ) {
                    for ( let elem in unsubscribable[ unsub ] )
                        if ( unsubscribable[ unsub ].hasOwnProperty( elem ) ) {
                            for ( let event in unsubscribable[ unsub ][ elem ] )
                                if ( unsubscribable[ unsub ][ elem ].hasOwnProperty( event ) ) {
                                    unsubscribable[ unsub ][ elem ][ event ].forEach( function ( unsubscribableId: string ) {
                                        EventManager.removeListener( unsubscribableId )
                                        success = true
                                    } )
                                }
                        }
                }
            }
        }
        return success
    }

    /**
     * remove an event listener
     * @internal
     * @param unsubscribableId
     */
    private static removeListener( unsubscribableId: string ): boolean
    {
        let success: boolean = false

        if ( EventManager.unsubscribeList[ unsubscribableId ] ) {
            success = true
            const element: HTMLElement | Document | null = EventManager.unsubscribeList[ unsubscribableId ].element
            const event: string = EventManager.unsubscribeList[ unsubscribableId ].event
            const callBackName: string = EventManager.unsubscribeList[ unsubscribableId ].callBackName
            const options: any = EventManager.unsubscribeList[ unsubscribableId ].options

            // @ts-ignore
            element?.removeEventListener( event, window[ callBackName ], options )
        }
        return success
    }

    /**
     *
     * subscribe to an array of eventInstructors classes,
     * the eventInstructor class does not need to be initialized
     * 
     * an eventInstructor can be created using the command line:
     * npm explore event-instructor npm run create:instructor
     * 
     * ex: import Foo form "./Foo"; eventManager.setSubscribers([Foo])
     * 
     * @param subscribers
     */
    setSubscribers( subscribers: Array<Constructable<EventInstructorInterface>> ): void
    {
        const self
            :
            EventManager = this
        subscribers.forEach( function ( eventInstructor: Constructable<EventInstructorInterface> ) {
            self.subscribe( eventInstructor );
        } )

           if (!EventManager.eventRegistered) {
            EventManager.eventsRegisteredEvent.fire({date: new Date()})
            EventManager.eventRegistered = true;
        }
    }

    /**
     * publish an event, same as dispatching a custom event
     *
     * @param eventObject
     * 
     * the event Object has
     * - name of the event
     * - detail that are passed with the event
     * - the element that the event is bound to, default document
     */
    publish( eventObject: { name: string, detail: Object, element?: any } ): void
    {
        const ev = new CustomEvent( eventObject.name, { detail: eventObject.detail, cancelable: true } );
        ( eventObject.element ? eventObject.element : document ).dispatchEvent( ev );

        this.publishers[ eventObject.name ] = { detail: eventObject.detail }
    }

    /**
     * used to publish an event, same as dispatching a custom event
     *
     * @param eventName event name
     * @param detail detail need to be passed
     */
    fire( eventName : string, detail : Object ): void
    {
        this.publish( {
            name: eventName,
            detail: detail
        } )
    }

    /**
     * the current event is fired before the "window load"
     * it will be published if a given events are registered
     *
     */
    public static eventsRegisteredEvent: EventFire = {
        name: 'eventsRegistered',
        fire: function ( detail: any ) {
            const currentEvent: EventFire = EventManager.eventsRegisteredEvent
            const eventManager = new EventManager()
            eventManager.fire( currentEvent.name, detail )
        }
    }
}


/**
 *
 */
export interface EventInstructorInterface
{
    getSubscribers(): Array<Subscription>;
}

export interface Constructable<T>
{
    new( ...args: any ): T;
}

export type EventFire = {
    name: string,
    fire: Function
}

interface EventFunctions {
    callBack?: ( event: Event | CustomEvent ) => void,
    subscriberId?: string,
    callBackOnes?: ( event: Event | CustomEvent ) => void,
    onesSubscriberId?: string,
    resolver?: Resolver,
    resolverId?: string,
    unresolverId?: string,
    scope?: EventInstructorInterface | any,
    options?: any,
    [key: string]: any
}

type SubscriptionObject = {
    [key in EventType]: EventFunctions;
} | {
    selector?: EventElementSelector;
    subscribers?: SubscriptionEvents;
};

type SubscriptionEvents =
{
    [j in EventType]: EventFunctions
}



export type Subscription = SubscriptionObject | SubscriptionEvents

export type EventType = keyof GlobalEventHandlersEventMap & string

type EditableSelector = {
    type: string,
    value: string,
}

type EventElementSelector = EditableSelector | string

type Unsubscribable = {
    [ instructorName: string ]: {
        [ elementId: string ]: {
            [ event: string ]: Array<string>
        }
    }
}

type UnsubscribableStore = {
    callBackName: string,
    event: string,
    element: HTMLElement | Document | null,
    options: EventListenerOptions,
}