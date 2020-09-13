"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CallBackValueResolver = /** @class */ (function () {
    function CallBackValueResolver() {
    }
    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    CallBackValueResolver.getResolverId = function (selectorId, events) {
        return selectorId + '_' + events;
    };
    /**
     *
     * @param resolver
     * @param resolverId
     */
    CallBackValueResolver.setResolver = function (resolver, resolverId) {
        if (!CallBackValueResolver.resolvers.hasOwnProperty(resolverId)) {
            CallBackValueResolver.resolvers[resolverId] = [];
        }
        var index = -1;
        // @ts-ignore
        if (resolver.order) {
            // order is defined in the resolver
            // @ts-ignoreresolver
            index = resolver.order;
        }
        else if (typeof resolver === 'function') {
            resolver.callBack = resolver;
        }
        if (!CallBackValueResolver.resolvers[resolverId][index]) {
            CallBackValueResolver.resolvers[resolverId][index] = [];
        }
        CallBackValueResolver.resolvers[resolverId][index].push(resolver);
        // now we sort the resolver that priority is considered
        var ordered = {};
        Object.keys(CallBackValueResolver.resolvers[resolverId]).sort().forEach(function (key) {
            ordered[key] = CallBackValueResolver.resolvers[resolverId][key];
        });
        // reassigning sorted values
        CallBackValueResolver.resolvers[resolverId] = ordered;
    };
    /**
     * return value that is set in the
     * @param returns
     */
    CallBackValueResolver.valueResolver = function (returns) {
        var paramsArray = [];
        for (var order in CallBackValueResolver.resolvers[this.resolverId]) {
            if (CallBackValueResolver.resolvers[this.resolverId].hasOwnProperty(order)) {
                // the resolver function will have all returned value of all resolvers that has less priority
                CallBackValueResolver.resolvers[this.resolverId][order].forEach(function (resolverFunction) {
                    paramsArray.push(returns);
                    returns = resolverFunction.callBack(returns, paramsArray);
                });
            }
        }
        return returns;
    };
    /**
     * hold all resolver functions on proper order
     */
    CallBackValueResolver.resolvers = {};
    return CallBackValueResolver;
}());
exports.default = CallBackValueResolver;
//# sourceMappingURL=CallBackValueResolver.js.map