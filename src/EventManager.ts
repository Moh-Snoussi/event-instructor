// @flow

import ValueResolver, { InlineResolver, Resolver } from "./CallBackValueResolver"

require( 'events-polyfill' )

export default class EventManager
{

    /**
     * used to allow single instance
     * @private
     */
    private static Singleton: EventManager;

    /**
     * hold events with their function name and options that can be used to unsubscribe from a particular event
     */
    private static unsubscribeList: { [ key: string ]: UnsubscribableStore } = {}

    private publishers: any = {};
    private static incrementer: Number = 0

    /**
     *
     * @returns {void}
     */
    constructor()
    {
        return this.singleton()
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringSubscriber()
    {
        const self: EventManager = this

        String.prototype.subscribe = function (
            eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
            callBackOrResolver: ( ( event: Event | CustomEvent, resolvers: InlineResolver ) => void ) | boolean,
            resolverOrOption: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
            eventOptionsOrOnes: EventListenerOptions | boolean,
            ones: boolean ): string | null {
            return self.handleInlineSubscriber.call( this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones )
        }
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringEventValueResolver(): void
    {
        const self: EventManager = this

        String.prototype.valueResolver = function ( resolver: Resolver ): string | null {
            return self.handleInlineSubscriber.call( this, resolver )
        }
    }

    private handleInlineSubscriber(
        eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
        callBackOrResolver?: ( ( event: Event | CustomEvent, resolvers: InlineResolver ) => void ) | boolean,
        resolverOrOption?: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
        eventOptionsOrOnes?: EventListenerOptions | boolean,
        ones?: boolean ): string | null
    {
        // eventManager is singleton, the following will not initialize an instance,
        // this is required as we will be calling this function by binding the scope that will include the string
        // ('foo').subscribe <== the scope here is the string foo this === 'foo'
        const self: EventManager = new EventManager()

        let selector: String
        let eventName: String
        let element: Document | HTMLElement | null
        let callBack: Function
        let resolver: Resolver
        let options: EventListenerOptions
        let onlyOnes: boolean = false

        let resolverIsSet: boolean = false
        let callBackIsSet: boolean = false

        const args: IArguments = arguments

        for ( let arg of args ) {
            if ( typeof arg !== 'undefined' ) {
                if ( typeof arg === 'string' ) {
                    selector = this
                    element = document.querySelector( selector )
                    eventName = arg

                } else if ( arg === args[ 0 ] && typeof arg === 'function' && arg.name === 'resolver' ) {
                    ValueResolver.setResolver( arg, <string> <unknown> this )
                    return <string> <unknown> this;
                } else if ( !element ) {
                    selector = 'document'
                    element = document
                    eventName = this
                }

                if ( typeof arg === 'function' ) {
                    if ( arg.name === '' || arg.name !== 'resolver' || resolverIsSet ) {
                        callBack = arg
                        callBackIsSet = true
                    } else if ( arg.name === 'resolver' || callBackIsSet ) {
                        resolver = arg
                        resolverIsSet = true
                    }
                } else if ( typeof arg === 'boolean' ) {
                    onlyOnes = arg
                } else if ( typeof options === 'object' ) {
                    options = arg
                }
            }
        }

        let selectorId: string = EventManager.getSelectorId( {
            type: <string> selector,
            value: <string> eventName
        } )

        let callBackName: string

        const resolverId : string = ValueResolver.getResolverId(selector, eventName)

        if ( resolverIsSet ) {
            ValueResolver.setResolver( resolver, resolverId )
        }

        selectorId += EventManager.incrementer++

        if ( callBackIsSet ) {
            callBackName = 'inline_' + selectorId

            window[ callBackName ] = function ( event ) {
                // @ts-ignore
                if ( onlyOnes ) {
                    event.target.removeEventListener( event.type, window[ callBackName ] )
                }
                // @ts-ignore
                callBack.call({resolverId: resolverId}, event )
            }

            element?.addEventListener( eventName, window[ callBackName ], options )

            EventManager.unsubscribeList[ callBackName ] = {
                callBackName: callBackName,
                event: <string> eventName,
                element: element,
                options: options,
            }
        }

        return callBackName || selectorId
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnsubscriber()
    {
        const self: EventManager = this

        String.prototype.unsubscribe = function (): boolean {
            return self.unsubscribe( <string> this )
        }
    }

    private setStringSubscribeOnes()
    {
        const self: EventManager = this

        String.prototype.subscribeOnes = function (
            eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
            callBackOrResolver: ( ( event: Event | CustomEvent, resolvers: InlineResolver ) => void ) | boolean,
            resolverOrOption: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
            eventOptionsOrOnes: EventListenerOptions | boolean ): string | null {

            return self.handleInlineSubscriber.call( this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, true )
        }
    }

    /**
     *
     * @returns {EventManager}
     */
    singleton(): EventManager
    {
        if ( !EventManager.Singleton ) {
            EventManager.Singleton = this;
            this.setStringSubscriber()
            this.setStringSubscribeOnes()
            this.setStringEventValueResolver()
            this.setStringUnsubscriber()
        }
        return EventManager.Singleton
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
     * get html element from selector id, please note selector id is not html element id,
     * selector id is an identifier used internally to get the required element
     *
     * @param selectorId
     */
    private static getElementFromSelectorId( selectorId: string ): HTMLElement | null
    {
        let element: HTMLElement | null

        const selectors = selectorId.split( '___' )
        if ( selectors.length > 1 ) {
            // @ts-ignore
            element = document[ selectors[ 0 ] ]( selectors[ 1 ] )
        } else {
            element = document.querySelector( selectorId )
        }
        return element
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
        const eventsInstructorIns
            :
            EventInstructorInterface = new eventsInstructor()

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
                currentSubscriber.subscribers[ events ].resolverId = ValueResolver.getResolverId( selectorId, events )

                const eventOptions: any = currentSubscriber.subscribers[ events ].options
                for ( const currentEvent in eventsArray ) {

                    const callBackName: string = instructorName + '_' + selectorId + '_' + eventsArray[ currentEvent ]

                    if ( currentSubscriber.subscribers[ events ].hasOwnProperty( 'callBack' ) ) {
                        // @ts-ignore
                        window[ callBackName ] = function ( event ) {
                            // @ts-ignore
                            currentSubscriber.subscribers[ events ].callBack( event )
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
                        ValueResolver.setResolver( resolver, currentSubscriber.subscribers[ events ].resolverId )
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