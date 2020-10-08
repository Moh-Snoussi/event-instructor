"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_instructor_1 = __importDefault(require("event-instructor"));
$STYLE$;
/**
 * $NAME$
 * $DESCRIPTION$
 */
var $NAME$ = /** @class */ (function () {
    function $NAME$() {
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
                _a[$NAME$.$NAME$Event.name] = {
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
                        // so if you want to modify the value from a different Class just in the 
                        // subscriptions listen to the $NAME$.$NAME$Event.name and add a resolver function
                        console.log("all resolver data can be found here: ", allResolvers);
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
    $NAME$.prototype.getSubscribers = function () {
        return this.subscriptions;
    };
    /**
     *
     * @param event
     */
    $NAME$.prototype.documentLoadSubscriberCallBack = function (event) {
        var date = new Date();
        console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Foo.constructor.name, ", on date millisecond: " + date.getMilliseconds());
        // publish an event
        $NAME$.$NAME$Event.fire({ time: date });
    };
    /**
     * can be used to fire the event as Foo.FooEvent.fire(details)
     * or can be listened to in other Instructor by Foo.FooEvent.name
     */
    $NAME$.$NAME$Event = {
        name: '$NAME$Event',
        fire: function (detail) {
            var self = $NAME$.$NAME$Event;
            var eventManager = new event_instructor_1.default();
            eventManager.fire(self.name, detail);
        }
    };
    return $NAME$;
}());
exports.default = $NAME$;
//# sourceMappingURL=EventInstructor.js.map