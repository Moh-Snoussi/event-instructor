/**
 *
 */
export default class ValueResolver {
    /**
     * hold all resolver functions on proper order
     */
    static resolvers: any;
    /**
     * this property is set dynamically in the event Manager
     */
    static resolverId: string;
    static order: number | null;
    private static counter;
    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    static getResolverId(selectorId: string, events: string, increment?: boolean): string;
    /**
     *
     * @param resolver
     * @param resolverId
     */
    static setResolver(resolver: Resolver, resolverId: string): string;
    /**
     *
     * @param resolverIdentity
     */
    static unsetResolver(resolverIdentity: string): boolean;
    /**
     * return value that is set in the
     * @param returns
     */
    dataResolver(returns: any): any;
    /**
     * used to set the order of the next resolver
     * @param order
     */
    static setOrder(order: number): void;
    /**
 * used to set the order of the next resolver
 * @param order
 */
    setOrder(order: number): void;
}
export declare type resolverStore = {
    [order: number]: (oldResolver: any) => any;
};
interface ResolverFunction {
    (latestResolver: any, allResolvers: Array<any>): any;
}
interface ResolverObject {
    /**
     * the order of the resolver, can be any negative/positive number
     * the higher the later the resolver function will be executed
     *
     */
    order: number;
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
    callBack: (latestResolver: any, allResolvers: Array<any>) => any;
}
export declare type Resolver = ResolverFunction & ResolverObject;
export {};
//# sourceMappingURL=ValueResolver.d.ts.map