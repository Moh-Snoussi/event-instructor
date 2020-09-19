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
        return selectorId + '_' + events + ValueResolver.counter++;
    };
    /**
     *
     * @param resolver
     * @param resolverId
     */
    ValueResolver.prototype.setResolver = function (resolver, resolverId) {
        if (!ValueResolver.resolvers.hasOwnProperty(resolverId)) {
            ValueResolver.resolvers[resolverId] = [];
        }
        var index = -1;
        // @ts-ignore
        if (resolver.order || this.order >= 0) {
            // order is defined in the resolver
            // @ts-ignoreresolver
            index = this.order >= 0 ? this.order : resolver.order;
            ValueResolver.order = -1;
        }
        else if (typeof resolver === 'function') {
            resolver.callBack = resolver;
        }
        // @ts-ignore
        ValueResolver.counter++;
        var resolverIdentity = resolverId + '-_-' + ValueResolver.counter;
        resolver.id = ValueResolver.counter;
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
        return resolverIdentity;
    };
    /**
     *
     * @param resolverIdentity
     */
    ValueResolver.prototype.unsetResolver = function (resolverIdentity) {
        var success = false;
        var identifier = resolverIdentity.split('-_-');
        if (ValueResolver.resolvers.hasOwnProperty(identifier[0])) {
            for (var resolverKey in ValueResolver.resolvers[identifier[0]]) {
                var i = 0;
                for (var resolverFunction in ValueResolver.resolvers[identifier[0]][resolverKey]) {
                    if (ValueResolver.resolvers[identifier[0]][resolverKey][resolverFunction].id === parseInt(identifier[1])) {
                        ValueResolver.resolvers[identifier[0]][resolverKey].splice(i, 1);
                        success = true;
                    }
                    i++;
                }
            }
            return success;
        }
    };
    /**
     * return value that is set in the
     * @param returns
     */
    ValueResolver.prototype.dataResolver = function (returns) {
        var paramsArray = [];
        paramsArray.push(returns);
        for (var order in ValueResolver.resolvers[this.resolverId]) {
            if (ValueResolver.resolvers[this.resolverId].hasOwnProperty(order)) {
                // the resolver function will have all returned value of all resolvers that has less priority
                ValueResolver.resolvers[this.resolverId][order].forEach(function (resolverFunction) {
                    if ('callBack' in resolverFunction) {
                        returns = resolverFunction.callBack(returns, paramsArray);
                    }
                    paramsArray.push(returns);
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
        ValueResolver.order = order;
    };
    /**
     * hold all resolver functions on proper order
     */
    ValueResolver.resolvers = {};
    ValueResolver.order = -1;
    ValueResolver.counter = -1;
    return ValueResolver;
}());
exports.default = ValueResolver;
//# sourceMappingURL=ValueResolver.js.map