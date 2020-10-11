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
    id?: number;
    order: number;
    callBack: (latestResolver: any, allResolvers: Array<any>) => any;
}
export declare type Resolver = ResolverFunction & ResolverObject;
export {};
//# sourceMappingURL=ValueResolver.d.ts.map