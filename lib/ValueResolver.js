"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ValueResolver = /** @class */ (function () {
    function ValueResolver() {
    }
    /**
     * return an unique resolver
     * @param selectorId
     * @param events
     */
    ValueResolver.getResolverId = function (selectorId, events) {
        return selectorId + '_' + events;
    };
    /**
     *
     * @param resolver
     * @param resolverId
     */
    ValueResolver.setResolver = function (resolver, resolverId) {
        if (!ValueResolver.resolvers.hasOwnProperty(resolverId)) {
            ValueResolver.resolvers[resolverId] = [];
        }
        var index = -1;
        // @ts-ignore
        if (resolver.order || this.order >= 0) {
            // order is defined in the resolver
            // @ts-ignoreresolver
            index = this.order >= 0 ? this.order : resolver.order;
            this.order = -1;
        }
        else if (typeof resolver === 'function') {
            resolver.callBack = resolver;
        }
        if (!ValueResolver.resolvers[resolverId][index]) {
            ValueResolver.resolvers[resolverId][index] = [];
        }
        ValueResolver.resolvers[resolverId][index].push(resolver);
        // now we sort the resolver that priority is considered
        var ordered = {};
        Object.keys(ValueResolver.resolvers[resolverId]).sort().forEach(function (key) {
            ordered[key] = ValueResolver.resolvers[resolverId][key];
        });
        // reassigning sorted values
        ValueResolver.resolvers[resolverId] = ordered;
    };
    /**
     * return value that is set in the
     * @param returns
     */
    ValueResolver.valueResolver = function (returns) {
        var paramsArray = [];
        for (var order in ValueResolver.resolvers[this.resolverId]) {
            if (ValueResolver.resolvers[this.resolverId].hasOwnProperty(order)) {
                // the resolver function will have all returned value of all resolvers that has less priority
                ValueResolver.resolvers[this.resolverId][order].forEach(function (resolverFunction) {
                    paramsArray.push(returns);
                    returns = resolverFunction.callBack(returns, paramsArray);
                });
            }
        }
        return returns;
    };
    /**
     * used to set the order of the next resolver
     * @param order
     */
    ValueResolver.prototype.setOrder = function (order) {
        this.order = number;
    };
    /**
     * hold all resolver functions on proper order
     */
    ValueResolver.resolvers = {};
    ValueResolver.order = -1;
    return ValueResolver;
}());
exports.default = ValueResolver;
//# sourceMappingURL=ValueResolver.js.map