/**
 *
 */
export default class CallBackValueResolver {
    /**
     * hold all resolver functions on proper order
     */
    private static resolvers;
    /**
     * this property is set dynamically in the event Manager
     */
    private static resolverId;
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
    static setResolver(resolver: Resolver | undefined, resolverId: string | undefined): void;
    /**
     * return value that is set in the
     * @param returns
     */
    static valueResolver(returns: any): any;
}
export declare type resolverStore = {
    [order: number]: (oldResolver: any) => any;
};
export declare type Resolver = (latestResolver: any, allResolvers: Array<any>) => any | {
    order: number;
    callBack: (latestResolver: any, allResolvers: Array<any>) => any;
};
export declare type InlineResolver = {
    latestResolver: any;
    allResolvers: Array<any>;
    order: number;
};
//# sourceMappingURL=CallBackValueResolver.d.ts.map