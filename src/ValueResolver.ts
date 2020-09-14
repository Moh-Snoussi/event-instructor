/**
 *
 */
import InlineEventManager from "./InlineEventManager"

export default class ValueResolver
{
    /**
     * hold all resolver functions on proper order
     */
    static resolvers: any = {}

    /**
     * this property is set dynamically in the event Manager
     */
    static resolverId: string
    static order: number = -1

    private static counter = -1

    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    public static getResolverId( selectorId: string, events: string ): string
    {
        return selectorId + '_' + events
    }

    /**
     *
     * @param resolver
     * @param resolverId
     */
    public setResolver( resolver: Resolver | undefined, resolverId: string | undefined ): string
    {

        if ( !ValueResolver.resolvers.hasOwnProperty( resolverId ) ) {
            ValueResolver.resolvers[ resolverId ] = []
        }
        let index: number = -1
        // @ts-ignore
        if ( resolver.order || this.order >= 0 ) {
            // order is defined in the resolver
            // @ts-ignoreresolver
            index = this.order >= 0 ? this.order : resolver.order
            this.order = -1
        } else if ( typeof resolver === 'function' ) {
            resolver.callBack = resolver
        }
        // @ts-ignore
        ValueResolver.counter++
        const resolverIdentity = resolverId + '-_-' + ValueResolver.counter
        resolver.id = ValueResolver.counter

        if ( !ValueResolver.resolvers[ resolverId ][ index ] ) {
            ValueResolver.resolvers[ resolverId ][ index ] = []
        }
        ValueResolver.resolvers[ resolverId ][ index ].push( resolver )

        // now we sort the resolver that priority is considered
        const ordered: resolverStore = {}

        Object.keys( ValueResolver.resolvers[ resolverId ] ).sort().forEach( function ( key: string ) {
            ordered[ <number> <unknown> key ] = ValueResolver.resolvers[ resolverId ][ key ];
        } );
        // reassigning sorted values
        ValueResolver.resolvers[ resolverId ] = ordered

        return resolverIdentity
    }

    /**
     *
     * @param resolverIdentity
     */
    public unsetResolver( resolverIdentity: string | undefined ): boolean
    {
        let success = false

        const identifier: Array = resolverIdentity?.split( '-_-' )
        if ( ValueResolver.resolvers.hasOwnProperty( identifier[ 0 ] ) ) {

            for ( let resolverKey in ValueResolver.resolvers[ identifier[ 0 ] ] ) {
                let i = 0
                for ( let resolverFunction in ValueResolver.resolvers[ identifier[ 0 ] ][ resolverKey ] ) {

                    if ( <number> ValueResolver.resolvers[ identifier[ 0 ] ][ resolverKey ] [ resolverFunction ].id === parseInt( identifier [ 1 ] ) ) {
                        ValueResolver.resolvers[ identifier[ 0 ] ][ resolverKey ].splice( i, 1 );

                        success = true
                    }
                    i++
                }

            }
            return success
        }
    }


    /**
     * return value that is set in the
     * @param returns
     */
    public dataResolver( returns: any ): any
    {
        let paramsArray: Array<any> = []
        paramsArray.push( returns )
        for ( let order in ValueResolver.resolvers[ this.resolverId ] ) {
            if ( ValueResolver.resolvers[ this.resolverId ].hasOwnProperty( order ) ) {
                // the resolver function will have all returned value of all resolvers that has less priority
                ValueResolver.resolvers[ this.resolverId ][ order ].forEach( function ( resolverFunction ) {
                    returns = resolverFunction.callBack( returns, paramsArray )
                    paramsArray.push( returns )
                } )
            }
        }
        return returns
    }

    /**
     * used to set the order of the next resolver
     * @param order
     */
    public setOrder( order: number ): void
    {
        this.order = number
    }
}

export type resolverStore = { [ order: number ]: ( oldResolver: any ) => any }
export type Resolver = ( latestResolver: any, allResolvers: Array<any> ) => any | { order: number, callBack: ( latestResolver: any, allResolvers: Array<any> ) => any }
