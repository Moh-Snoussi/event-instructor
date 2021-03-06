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
    static order: number | null = null

    private static counter = -1

    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    public static getResolverId( selectorId: string, events: string, increment : boolean = false ): string
    {
        let addition : string | number = ""
        if (increment) {

            addition = ValueResolver.counter++
        }
        return selectorId + '_' + events + addition
    }

    /**
     *
     * @param resolver
     * @param resolverId
     */
    public static setResolver( resolver: Resolver, resolverId: string ): string
    {

        if ( !ValueResolver.resolvers.hasOwnProperty( resolverId ) ) {
            ValueResolver.resolvers[ resolverId ] = []
        }
        let index: number = -1
        // @ts-ignore
        if ( resolver.order) {
            // order is defined in the resolver
            // @ts-ignore resolver
            index = resolver.order
            ValueResolver.order = -1
        } else if ( typeof resolver === 'function' ) {
            resolver.callBack = resolver
        }

        if ( ValueResolver.order !== null )
        {
            index = ValueResolver.order
            ValueResolver.order = null
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

        Object.keys( ValueResolver.resolvers[ resolverId ] ).sort().reverse().forEach( function ( key: string ) {
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
    public static unsetResolver( resolverIdentity: string ): boolean
    {
        let success : boolean = false

        const identifier: string[] = resolverIdentity.split( '-_-' )
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
        }
        return success
    }


    /**
     * return value that is set in the
     * @param returns
     */
    public dataResolver( returns: any ): any
    {
        let paramsArray: Array<any> = []
        paramsArray.push( returns )
        //@ts-ignore
        for ( let order in ValueResolver.resolvers[ this.resolverId ] ) {
            //@ts-ignore
            if ( ValueResolver.resolvers[ this.resolverId ].hasOwnProperty( order ) ) {
                // the resolver function will have all returned value of all resolvers that has less priority
                //@ts-ignore
                ValueResolver.resolvers[ this.resolverId ][ order ].forEach( function ( resolverFunction : Resolver ) {
                    if ('callBack' in resolverFunction) {
                        returns = resolverFunction.callBack( returns, paramsArray )
                    }
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
    public static setOrder( order: number ): void
    {
        ValueResolver.order = order
    }

        /**
     * used to set the order of the next resolver
     * @param order
     */
    public setOrder( order: number ): void
    {
        ValueResolver.order = order
    }
}

export type resolverStore = { [ order: number ]: ( oldResolver: any ) => any }
interface ResolverFunction {( latestResolver: any, allResolvers: Array<any> ): any }
interface ResolverObject {
    /**
     * @internal
     */
    id?: number,

    /**
     * the order of the resolver, can be any negative/positive number
     * the higher the later the resolver function will be executed
     *
     */
    order: number,

    /**
     *
     * if any Subscriber listen to the same event in it's callBack or callBackOnes uses const data = this.dataResolver('Foo')
     * then the resolver callBack function will take two argument the lastResolver (in this case is 'Foo') and allResolverArray (['Foo'])
     * and it's returned value will be used in the event callBack or callBackOnes in this.dataResolver('Foo')
     * this mean in our case if the resolver function return 'Bar' then in the event callBack: const data = this.dataResolver('Foo')  // data will be FooBar
     *
     * @param latestResolver contains the last returned value
     * @param allResolvers contains all returned value from all resolver
     */
    callBack: ( latestResolver: any, allResolvers: Array<any> ) => any }
export type Resolver = ResolverFunction & ResolverObject