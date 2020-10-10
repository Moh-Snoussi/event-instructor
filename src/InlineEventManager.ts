import EventManager, { EventType } from "./EventManager"
import ValueResolver, { Resolver } from "./ValueResolver"

export default class InlineEventManager
{

    /**
     *
     */
    private eventManager : EventManager

    /**
     *
     * @param eventManager
     */
    constructor(eventManager : EventManager)
    {
        this.eventManager = eventManager
        this.setStringSubscriber()
        this.setStringSubscribeOnes()
        this.setStringEventValueResolver()
        this.setStringUnsubscriber()
        this.setStringUnresolve()
    }
    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringSubscriber()
    {
        const self: InlineEventManager = this

                // @ts-ignore
        String.prototype.subscribe = function (
            eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
            callBackOrResolver: ( ( event: Event | CustomEvent, resolvers: Resolver ) => void ) | boolean,
            resolverOrOption: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
            eventOptionsOrOnes: EventListenerOptions | boolean,
            ones: boolean ): string | null {
                        // @ts-ignore
            return self.handleInlineSubscriber( this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones )
        }
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringEventValueResolver(): void
    {
        const self: InlineEventManager = this
        // @ts-ignore
        String.prototype.valueResolver = function ( resolver: Resolver ): string | null {
                    // @ts-ignore
            return self.handleInlineSubscriber.call( this, resolver )
        }
    }

    private handleInlineSubscriber(
        selectorOrEvent: string,
        eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
        callBackOrResolver?: ( ( event: Event | CustomEvent, resolvers: Resolver ) => void ) | boolean,
        resolverOrOption?: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
        eventOptionsOrOnes?: EventListenerOptions | boolean,
        ones?: boolean ): string | null
    {
        const self : InlineEventManager = this
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

                // @ts-ignore
        for ( let arg of args ) {
            if ( typeof arg !== 'undefined' ) {
                if ( typeof arg === 'string' && arg === args[ 1 ]) {
                    selector = selectorOrEvent
                            // @ts-ignore
                    element = document.querySelector( selector )
                    eventName = arg

                } else if ( arg === args[ 1 ] && typeof arg === 'function' && arg.name === 'resolver' ) {
                    ValueResolver.setResolver( arg, <string> <unknown> this )
                    return <string> <unknown> this;
                            // @ts-ignore
                } else if ( !element ) {
                    selector = 'document'
                    element = document
                    eventName = selectorOrEvent
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
                            // @ts-ignore
                } else if ( typeof options === 'object' ) {
                    options = arg
                }
            }
        }

                // @ts-ignore
        let selectorId: string = EventManager.getSelectorId( {
                    // @ts-ignore
            type: <string> selector,
                    // @ts-ignore
            value: <string> eventName
        } )

        let callBackName: string

                // @ts-ignore
        const resolverId : string = ValueResolver.getResolverId(selector, eventName)

        if ( callBackIsSet ) {
            callBackName = 'inline_' + selectorId

                    // @ts-ignore
            window[ callBackName ] = function ( event ) {
                // @ts-ignore
                if ( onlyOnes ) {
                            // @ts-ignore
                    event.target.removeEventListener( event.type, window[ callBackName ] )
                }
                // @ts-ignore
                callBack.call({dataResolver : self.eventManager.dataResolver, resolverId: resolverId}, event )
            }

            // @ts-ignore
            element?.addEventListener( eventName, window[ callBackName ], options )

            EventManager.unsubscribeList[ callBackName ] = {
                callBackName: callBackName,
                        // @ts-ignore
                event: <string> eventName,
                        // @ts-ignore
                element: element,
                        // @ts-ignore
                options: options,
            }
        }

        if ( resolverIsSet ) {
            // @ts-ignore
            selectorId = this.eventManager.setDataResolver( resolver, resolverId )

        }

                // @ts-ignore
        return callBackName || selectorId
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnsubscriber()
    {
        const eventManager: EventManager = new EventManager()

                // @ts-ignore
        String.prototype.unsubscribe = function (): boolean {
            return eventManager.unsubscribe( <string> this )
        }
    }

    /**
     * allows a string to have a subscriber prototype
     * ('selector').subscribe(function(){})
     */
    private setStringUnresolve()
    {
        const eventManager: EventManager = new EventManager()
        // @ts-ignore
        String.prototype.unresolve = function (): boolean {
            return eventManager.unresolve( <string> this )
        }
    }

    private setStringSubscribeOnes()
    {
        const self: InlineEventManager = this

        // @ts-ignore
        String.prototype.subscribeOnes = function (
            eventOrCallBack: EventType | ( ( event: Event | CustomEvent ) => void ) | boolean,
            callBackOrResolver: ( ( event: Event | CustomEvent, resolvers: Resolver ) => void ) | boolean,
            resolverOrOption: ( ( resolvers: Resolver ) => void ) | EventListenerOptions | boolean,
            eventOptionsOrOnes: EventListenerOptions | boolean ): string | null {

                // @ts-ignore
            return self.handleInlineSubscriber.call( this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, true )
        }
    }
}