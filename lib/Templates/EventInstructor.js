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
    }
    /**
     *
     * @returns {Subscriptions}
     */
    $NAME$.prototype.getSubscribers = function () {
        var _a;
        return {
            // unique key can be anything that will be useful in debugging
            uniqueKey: {
                // the elementId we are subscribing to, can be an id or "document" or "window"
                elementId: {
                    // the event we are subscribing to, can be string separated by space eg: "click customEvent"
                    eventName: {
                        callBack: function (event) {
                            // @ts-ignore this scope is referencing this class
                            this.scope.scopeCallback(event);
                        },
                    }
                    // add another eventListener
                },
                document: (_a = {},
                    _a[$NAME$.$NAME$Event.name] = {
                        callBack: function (event) {
                            console.log('custom event is fired: ' + $NAME$.$NAME$Event.name, event);
                        }
                    },
                    _a)
                // add another ElementID
            }
            // add another entry
        };
    };
    /**
     *
     * @param event
     */
    $NAME$.prototype.scopeCallback = function (event) {
        console.log('callback is called from ' + $NAME$.constructor.name);
        $NAME$.$NAME$Event.fire({ time: new Date() });
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