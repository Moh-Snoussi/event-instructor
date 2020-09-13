/**
 *
 */

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
    public static setResolver( resolver: Resolver | undefined, resolverId: string | undefined ): void
    {

        if ( !ValueResolver.resolvers.hasOwnProperty( resolverId ) ) {
            ValueResolver.resolvers[ resolverId ] = []
        }
        let index: number = -1
        // @ts-ignore
        if ( resolver.order || this.order >= 0) {
            // order is defined in the resolver
            // @ts-ignoreresolver
            index = this.order >= 0 ? this.order : resolver.order
            this.order = -1
        } else if ( typeof resolver === 'function' ) {
            resolver.callBack = resolver
        }

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
    }

    /**
     * return value that is set in the
     * @param returns
     */
    static valueResolver( returns: any ): any
    {
        let paramsArray: Array<any> = []
        for ( let order in ValueResolver.resolvers[ this.resolverId ] ) {
            if ( ValueResolver.resolvers[ this.resolverId ].hasOwnProperty( order ) ) {
                // the resolver function will have all returned value of all resolvers that has less priority
                ValueResolver.resolvers[ this.resolverId ][ order ].forEach( function ( resolverFunction ) {
                    paramsArray.push( returns )
                    returns = resolverFunction.callBack( returns, paramsArray )
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
