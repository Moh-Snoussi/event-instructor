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
    static order: number;
    private static counter;
    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    static getResolverId(selectorId: string, events: string): string;
    /**
     *
     * @param resolver
     * @param resolverId
     */
    setResolver(resolver: Resolver | undefined, resolverId: string | undefined): string;
    /**
     *
     * @param resolverIdentity
     */
    unsetResolver(resolverIdentity: string): boolean;
    /**
     * return value that is set in the
     * @param returns
     */
    dataResolver(returns: any): any;
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
    order: number;
    callBack: (latestResolver: any, allResolvers: Array<any>) => any;
}
declare type Resolver = ResolverFunction | ResolverObject;
export {};
//# sourceMappingURL=ValueResolver.d.ts.map