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
     *
     */
    valueResolver: ValueResolver | undefined

    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    static unsubscribeList: { [ key: string ]: UnsubscribableStore } = {}

    private publishers: any = {};

    /**
     *
     * @returns {void}
     */
    constructor()
    {
        return this.singleton()
    }

    /**
     *
     * @returns {EventManager}
     */
    singleton(): EventManager
    {
        if ( !EventManager.Singleton ) {
            EventManager.Singleton = this;
            this.initialize()

        }
        return EventManager.Singleton
    }

    public initialize(): void
    {
        this.valueResolver = new ValueResolver()
        new InlineEventManager( this )
    }

    public dataResolver( value: any ): void
    {
        // @ts-ignore
        return EventManager.Singleton.valueResolver?.dataResolver.call( this, value )
    }

    public setDataResolver( resolver: Resolver, resolverId: string ): string
    {

        return <string> this.valueResolver?.setResolver( resolver, resolverId )
    }

    public unresolve( resolverIdentity: string ): boolean
    {
       return <boolean> this.valueResolver?.unsetResolver( resolverIdentity )
    }

    public setResolverPriority( priority: number ): void
    {
        return this.valueResolver?.setOrder( priority )
    }

    /**
     * return an id that contain the element and the event
     *
     * @param selector
     */
    public static getSelectorId( selector: EventElementSelector
    ):
        string
    {
        return typeof selector !== "string" ? selector.type + '___' + selector.value : selector
    }

    /**
     * returns HTMLElement from selector,
     * @param selector
     * @private
     */
    private static

    getElement( selector: EventElementSelector ): HTMLElement | null
    {
        // @ts-ignore
        return typeof selector === "string" ? document.querySelector( selector ) : document[ selector.type ]( selector.value )
    }


    /**
     * will cleanup the subscriber and start listening
     *
     * @param eventsInstructor
     */
    subscribe( eventsInstructor: Constructable<EventInstructorInterface> ): void
    {
        const eventsInstructorIns: EventInstructorInterface = new eventsInstructor()
        // check if getSubscribers is a defined method
        if ( typeof eventsInstructorIns.getSubscribers() === 'undefined' ) {
            throw new Error( 'getSubscribers is not defined on ' + eventsInstructorIns.constructor.name )
        }

        const subscribers: Array<Subscription> = eventsInstructorIns.getSubscribers()

        const self: EventManager = this
        // register the listeners
        subscribers.forEach( function ( subscriber ) {
            self.setListener( subscriber, eventsInstructorIns );
        } );
    }

    /**
     *
     * @param currentSubscriber
     * @param eventInstructor
     */
    private setListener( currentSubscriber: Subscription, eventInstructor: EventInstructorInterface ): Unsubscribable
    {
        let element: HTMLElement | Document | null
        let selectorId: string
        const self: EventManager = this
        // if the selector has document then the Document object will be returned
        if ( currentSubscriber.selector === 'document' || !currentSubscriber.selector ) {
            element = document
            selectorId = 'document'

        } else {
            element = EventManager.getElement( currentSubscriber.selector )
            selectorId = EventManager.getSelectorId( currentSubscriber.selector )
        }

        const instructorName: string = eventInstructor.constructor.name

        let returns: Unsubscribable = {
            [ instructorName ]: {
                [ selectorId ]: {}
            }
        }

        if ( !currentSubscriber.subscribers ) {
            currentSubscriber.subscribers = currentSubscriber
        }

        for ( const events in currentSubscriber.subscribers ) {

            returns[ instructorName ] [ selectorId ] = { [ events ]: [] }

            if ( currentSubscriber.subscribers.hasOwnProperty( events ) ) {
                // splitting if the key is string, this allow event like 'click touch'
                const eventsArray = events.split( ' ' )
                // adding ability to call this.scope inside the function
                currentSubscriber.subscribers[ events ].scope = eventInstructor

                let resolverId: string
                // @ts-ignore
                if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'resolverId' ) ) {
                    // @ts-ignore
                    resolverId = currentSubscriber.subscribers[ events ].resolverId
                } else {
                    resolverId = ValueResolver.getResolverId( selectorId, events )
                }

                const eventOptions: any = currentSubscriber.subscribers[ events ].options
                for ( const currentEvent in eventsArray ) {

                    const callBackName: string = instructorName + '_' + selectorId + '_' + eventsArray[ currentEvent ]

                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'callBack' ) ) {
                        // @ts-ignore
                        window[ callBackName ] = function ( event ) {
                            // @ts-ignore
                            currentSubscriber.subscribers[ events ].callBack.bind( {
                                dataResolver: self.dataResolver,
                                resolverId: resolverId
                            }, event )
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

                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'callBackOnes' ) ) {

                        const onesCallBackName = callBackName + 'ones';

                        // @ts-ignore
                        window[ onesCallBackName ] = function ( event ) {
                            // @ts-ignore
                            event.target.removeEventListener( event.type, window[ onesCallBackName ] );
                            // @ts-ignore
                            currentSubscriber.subscribers[ events ].callBackOnes( event )
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
                    }
                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'resolver' ) ) {
                        const resolver = currentSubscriber.subscribers[ events ].resolver
                        this.setDataResolver( resolver, resolverId )
                    }
                }
            }
        }
        return returns
    }

    /**
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
            const options: string = EventManager.unsubscribeList[ unsubscribableId ].options

            // @ts-ignore
            element?.removeEventListener( event, window[ callBackName ], options )
        }
        return success
    }

    /**
     *
     * subscribe to an array of eventInstructors
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
    }

    /**
     *
     * @param eventObject
     */
    publish( eventObject: { name: string, detail: Object, element?: any } ): void
    {
        const ev = new CustomEvent( eventObject.name, { detail: eventObject.detail, cancelable: true } );
        ( eventObject.element ? eventObject.element : document ).dispatchEvent( ev );

// @ts-ignore
        this.publishers[ eventObject.name ] = { detail: eventObject.detail }
    }

    /**
     *
     * @param eventName
     * @param detail
     */
    fire( eventName
              :
              string, detail
              :
              Object
    ):
        void
    {
        this.publish( {
            name: eventName,
            detail: detail
        } )
    }

    /**
     *
     */
    static
    eventsRegisteredEvent: EventFire = {
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

export type EventFunctions = {
    callBack?: ( event: Event | CustomEvent ) => void,
    callBackOnes?: ( event: Event | CustomEvent ) => void,
    resolver?: Resolver,
    resolverId?: string,
    scope?: EventInstructorInterface | any,
    options?: any
}

export type Subscription = {
    selector?: EventElementSelector,
    subscribers?:
        {
            [k in EventType]: EventFunctions
        },
} | {
    [j in EventType]: EventFunctions
}

export type EventType = keyof GlobalEventHandlersEventMap | string

type EditableSelector = {
    type: string,
    value: string
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