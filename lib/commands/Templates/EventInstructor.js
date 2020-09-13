"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"
var CallBackValueResolver_1 = __importDefault(require("../../CallBackValueResolver"));
$STYLE$;
var EventManager_1 = __importDefault(require("./../../EventManager"));
/**
 * $NAME$
 * $DESCRIPTION$
 */
var $NAME$ = /** @class */ (function () {
    function $NAME$() {
        var _a;
        this.subscriptions = [
            {
                selector: 'body',
                subscribers: {
                    click: {
                        callBack: function (event) {
                            this.scope.documentLoadSubscriberCallBack(event);
                        }
                    }
                }
            },
            (_a = {},
                _a[$NAME$.$NAME$Event.name] = {
                    callBack: function (event) {
                        var data = CallBackValueResolver_1.default.valueResolver(event.detail);
                        console.log('new value of date: ', data);
                    },
                    callBackOnes: function (event) {
                        console.log('this is fired only ones');
                    },
                    resolver: function (latest, allResolvers) {
                        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
                        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
                        console.log('old resolver date: ', latest);
                        // change the resolver value
                        return new Date();
                    }
                },
                _a),
            {}
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
        console.log('eventListener of type: ' + event.type, 'of the element: ' + event.target, 'is called from ' + $NAME$.constructor.name, 'on: ' + date);
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
            var eventManager = new EventManager_1.default();
            eventManager.fire(self.name, detail);
        }
    };
    return $NAME$;
}());
exports.default = $NAME$;
//# sourceMappingURL=EventInstructor.js.map