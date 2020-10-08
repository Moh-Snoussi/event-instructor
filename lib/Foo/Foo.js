"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = __importDefault(require("./../EventManager"));
/**
 * Foo
 * foobar
 */
var Foo = /** @class */ (function () {
    function Foo() {
        var _a;
        this.subscriptions = [
            {
                selector: 'window',
                subscribers: {
                    load: {
                        callBack: function (event) {
                            this.scope.documentLoadSubscriberCallBack(event);
                        }
                    }
                }
            },
            (_a = {},
                _a[Foo.FooEvent.name] = {
                    callBack: function (event) {
                        var data = this.dataResolver.call(this, event.detail);
                        console.log("new value of date: ", data.time.getMilliseconds());
                    },
                    callBackOnes: function (event) {
                        console.log("this is fired only ones");
                    },
                    resolver: function (latest, allResolvers) {
                        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
                        console.log("all resolver data can be found here: ", allResolvers);
                        console.log("old resolver date: ", latest.time.getMilliseconds());
                        console.log("value resolver will create a new date");
                        // change the resolver value
                        return { time: 'FOOOOOO' };
                    }
                },
                _a)
        ];
    }
    /**
     *
     * @returns {Subscription}
     */
    Foo.prototype.getSubscribers = function () {
        return this.subscriptions;
    };
    /**
     *
     * @param event
     */
    Foo.prototype.documentLoadSubscriberCallBack = function (event) {
        var date = new Date();
        console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Foo.constructor.name, ", on date millisecond: " + date.getMilliseconds());
        // publish an event
        Foo.FooEvent.fire({ time: date });
    };
    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    Foo.FooEvent = {
        name: 'FooEvent',
        fire: function (detail) {
            var self = Foo.FooEvent;
            var eventManager = new EventManager_1.default();
            eventManager.fire(self.name, detail);
        }
    };
    return Foo;
}());
exports.default = Foo;
//# sourceMappingURL=Foo.js.map