"use strict";
// import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Foo_1 = __importDefault(require("./../Foo/Foo"));
var EventManager_1 = __importDefault(require("./../EventManager"));
/**
 * Bar
 * hello
 */
var Bar = /** @class */ (function () {
    function Bar() {
        var _a;
        this.subscriptions = [
            {
                selector: 'document',
                subscribers: {
                    load: {
                        callBack: function (event) {
                            this.scope.documentLoadSubscriberCallBack(event);
                        }
                    }
                }
            },
            (_a = {},
                _a[Foo_1.default.FooEvent.name] = {
                    resolver: function (latest, allResolvers) {
                        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
                        // so if you want to modify the value from a different Class just in the 
                        // subscriptions listen to the Bar.BarEvent.name and add a resolver function
                        console.log("this is bar: ", allResolvers);
                        console.log("old resolver date: ", latest.time.getMilliseconds());
                        console.log("value resolver will create a new date");
                        // change the resolver value
                        return { time: new Date() };
                    }
                },
                _a)
        ];
    }
    /**
     *
     * @returns {Subscription}
     */
    Bar.prototype.getSubscribers = function () {
        return this.subscriptions;
    };
    /**
     *
     * @param event
     */
    Bar.prototype.documentLoadSubscriberCallBack = function (event) {
        var date = new Date();
        console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Foo_1.default.constructor.name, ", on date millisecond: " + date.getMilliseconds());
        // publish an event
        Bar.BarEvent.fire({ time: date });
    };
    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    Bar.BarEvent = {
        name: 'BarEvent',
        fire: function (detail) {
            var self = Bar.BarEvent;
            var eventManager = new EventManager_1.default();
            eventManager.fire(self.name, detail);
        }
    };
    return Bar;
}());
exports.default = Bar;
//# sourceMappingURL=Bar.js.map