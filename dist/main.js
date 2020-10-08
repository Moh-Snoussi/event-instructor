/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./fobar/Fobar.js":
/*!************************!*\
  !*** ./fobar/Fobar.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Fobar; });
/* harmony import */ var _lib_EventManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/EventManager */ "./lib/EventManager.js");
/* harmony import */ var _lib_EventManager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_EventManager__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * Fobar
 * always
 */

var Fobar = /*#__PURE__*/function () {
  function Fobar() {
    _classCallCheck(this, Fobar);

    _defineProperty(this, "subscriptions", [{
      subscribers: {
        load: {
          callBack: function callBack(event) {
            this.scope.documentLoadSubscriberCallBack(event);
          }
        }
      }
    }, _defineProperty({}, Fobar.FobarEvent.name, {
      callBack: function callBack(event) {
        var data = this.dataResolver.call(this, event.detail);
        console.log("new value of date: ", data.time.getMilliseconds());
      },
      callBackOnes: function callBackOnes(event) {
        console.log("this is fired only ones");
      },
      resolver: function resolver(latest, allResolvers) {
        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
        // so if you want to modify the value from a different Class just in the 
        // subscriptions listen to the Fobar.FobarEvent.name and add a resolver function
        console.log("all resolver data can be found here: ", allResolvers);
        console.log("old resolver date: ", latest.time.getMilliseconds());
        console.log("value resolver will create a new date"); // change the resolver value

        return {
          time: new Date()
        };
      }
    })]);
  }

  _createClass(Fobar, [{
    key: "getSubscribers",

    /**
     *
     * @returns {Array<Subscription>}
     */
    value: function getSubscribers() {
      return this.subscriptions;
    }
    /**
     * @type {Array<Subscription>}
     */

  }, {
    key: "documentLoadSubscriberCallBack",

    /**
     *
     * @param {Event}
     */
    value: function documentLoadSubscriberCallBack(event) {
      var date = new Date();
      console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Fobar.constructor.name, ", on date millisecond: " + date.getMilliseconds()); // publish an event

      Fobar.FobarEvent.fire({
        time: date
      });
    }
    /**
     * can be used to fire the event as Fobar.FobarEvent.fire(details)
     * or can be listened to in other Instructor by Fobar.FobarEvent.name
    * @type {EventFire}
     */

  }]);

  return Fobar;
}();

_defineProperty(Fobar, "FobarEvent", {
  name: 'FobarEvent',
  fire: function fire(detail) {
    var self = Fobar.FobarEvent;
    var eventManager = new _lib_EventManager__WEBPACK_IMPORTED_MODULE_0___default.a();
    eventManager.fire(self.name, detail);
  }
});



/***/ }),

/***/ "./lib/Bar/Bar.js":
/*!************************!*\
  !*** ./lib/Bar/Bar.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // import EventManager, {EventFire, EventInstructorInterface, Subscriptions} from "event-instructor"

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Foo_1 = __importDefault(__webpack_require__(/*! ./../Foo/Foo */ "./lib/Foo/Foo.js"));

var EventManager_1 = __importDefault(__webpack_require__(/*! ./../EventManager */ "./lib/EventManager.js"));
/**
 * Bar
 * hello
 */


var Bar =
/** @class */
function () {
  function Bar() {
    var _a;

    this.subscriptions = [{
      selector: 'document',
      subscribers: {
        load: {
          callBack: function callBack(event) {
            this.scope.documentLoadSubscriberCallBack(event);
          }
        }
      }
    }, (_a = {}, _a[Foo_1["default"].FooEvent.name] = {
      resolver: function resolver(latest, allResolvers) {
        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
        // so if you want to modify the value from a different Class just in the 
        // subscriptions listen to the Bar.BarEvent.name and add a resolver function
        console.log("this is bar: ", allResolvers);
        console.log("old resolver date: ", latest.time.getMilliseconds());
        console.log("value resolver will create a new date"); // change the resolver value

        return {
          time: new Date()
        };
      }
    }, _a)];
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
    console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Foo_1["default"].constructor.name, ", on date millisecond: " + date.getMilliseconds()); // publish an event

    Bar.BarEvent.fire({
      time: date
    });
  };
  /**
   * can be used to fire the event as Foo.FooEvent.fire(details)
   * or can be listened to in other Instructor by Foo.FooEvent.name
   */


  Bar.BarEvent = {
    name: 'BarEvent',
    fire: function fire(detail) {
      var self = Bar.BarEvent;
      var eventManager = new EventManager_1["default"]();
      eventManager.fire(self.name, detail);
    }
  };
  return Bar;
}();

exports["default"] = Bar;

/***/ }),

/***/ "./lib/EventManager.js":
/*!*****************************!*\
  !*** ./lib/EventManager.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // @flow

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValueResolver_1 = __importDefault(__webpack_require__(/*! ./ValueResolver */ "./lib/ValueResolver.js"));

var InlineEventManager_1 = __importDefault(__webpack_require__(/*! ./InlineEventManager */ "./lib/InlineEventManager.js"));

__webpack_require__(/*! events-polyfill */ "./node_modules/events-polyfill/index.js");

var EventManager =
/** @class */
function () {
  /**
   *
   * @returns {void}
   */
  function EventManager() {
    this.publishers = {};
    return this.singleton();
  }
  /**
   *
   * @returns {EventManager}
   */


  EventManager.prototype.singleton = function () {
    if (!EventManager.Singleton) {
      EventManager.Singleton = this;
      this.initialize();
    }

    return EventManager.Singleton;
  };

  EventManager.prototype.initialize = function () {
    this.valueResolver = new ValueResolver_1["default"]();
    new InlineEventManager_1["default"](this);
  };

  EventManager.prototype.dataResolver = function (value) {
    var _a; // @ts-ignore


    return (_a = EventManager.Singleton.valueResolver) === null || _a === void 0 ? void 0 : _a.dataResolver.call(this, value);
  };

  EventManager.prototype.setDataResolver = function (resolver, resolverId) {
    return ValueResolver_1["default"].setResolver(resolver, resolverId);
  };

  EventManager.prototype.unresolve = function (resolverIdentity) {
    return ValueResolver_1["default"].unsetResolver(resolverIdentity);
  };

  EventManager.prototype.setResolverPriority = function (priority) {
    return ValueResolver_1["default"].setOrder(priority);
  };
  /**
   * return an id that contain the element and the event
   *
   * @param selector
   */


  EventManager.getSelectorId = function (selector) {
    return typeof selector !== "string" ? selector.type + '___' + selector.value : selector;
  };
  /**
   * returns HTMLElement from selector,
   * @param selector
   * @private
   */


  EventManager.getElement = function (selector) {
    if (selector === 'window') {
      return window;
    }

    if (selector === 'document') {
      return document;
    } // @ts-ignore


    return typeof selector === "string" ? document.querySelector(selector) : document[selector.type](selector.value);
  };
  /**
   * will cleanup the subscriber and start listening
   *
   * @param eventsInstructor
   */


  EventManager.prototype.subscribe = function (eventsInstructor) {
    var eventsInstructorIns = new eventsInstructor(); // check if getSubscribers is a defined method

    if (typeof eventsInstructorIns.getSubscribers() === 'undefined') {
      throw new Error('getSubscribers is not defined on ' + eventsInstructorIns.constructor.name);
    }

    var subscribers = eventsInstructorIns.getSubscribers();
    var self = this;
    var returns = []; // register the listeners

    subscribers.forEach(function (subscriber) {
      returns.push(self.setListener(subscriber, eventsInstructorIns));
    });
    return returns;
  };
  /**
   *
   * @param currentSubscriber
   * @param eventInstructor
   */


  EventManager.prototype.setListener = function (currentSubscriber, eventInstructor) {
    var _a, _b;

    var element;
    var selectorId;
    var self = this; // if the selector has document then the Document object will be returned

    if (currentSubscriber.selector === 'document' || !currentSubscriber.selector) {
      element = document;
      selectorId = 'document';
    } else {
      element = EventManager.getElement(currentSubscriber.selector);
      selectorId = EventManager.getSelectorId(currentSubscriber.selector);
    }

    var instructorName = eventInstructor.constructor.name;
    var returns = (_a = {}, _a[instructorName] = (_b = {}, _b[selectorId] = {}, _b), _a);

    if (!currentSubscriber.subscribers) {
      currentSubscriber.subscribers = currentSubscriber;
    }

    var _loop_1 = function _loop_1(events) {
      var _a;

      returns[instructorName][selectorId] = (_a = {}, _a[events] = [], _a);

      if (currentSubscriber.subscribers.hasOwnProperty(events)) {
        // splitting if the key is string, this allow event like 'click touch'
        var eventsArray = events.split(' '); // adding ability to call this.scope inside the function

        currentSubscriber.subscribers[events].scope = eventInstructor;
        var resolverId_1; // @ts-ignore

        if (currentSubscriber.subscribers[events].hasOwnProperty('resolverId')) {
          // @ts-ignore
          resolverId_1 = currentSubscriber.subscribers[events].resolverId;
        } else {
          if (selectorId === 'document') {
            resolverId_1 = events;
            currentSubscriber.subscribers[events].resolverId = event;
          } else {
            resolverId_1 = ValueResolver_1["default"].getResolverId(selectorId, events, false);
            currentSubscriber.subscribers[events].resolverId = event;
          }
        }

        var eventOptions = currentSubscriber.subscribers[events].options;

        var _loop_2 = function _loop_2(currentEvent) {
          EventManager.counter++;
          var callBackName = instructorName + '_' + selectorId + '_' + eventsArray[currentEvent] + EventManager.counter;

          if (currentSubscriber.subscribers[events].hasOwnProperty('callBack')) {
            // @ts-ignore
            window[callBackName] = function (event) {
              // @ts-ignore
              currentSubscriber.subscribers[events].callBack.call({
                scope: eventInstructor,
                dataResolver: self.dataResolver,
                resolverId: resolverId_1
              }, event);
              currentSubscriber.subscribers[events].subscriberId = callBackName;
            }; // @ts-ignore


            element === null || element === void 0 ? void 0 : element.addEventListener(eventsArray[currentEvent], window[callBackName], eventOptions); // returned value will contain information that can be referred to when unsubscribe

            returns[instructorName][selectorId][events].push(callBackName);
            EventManager.unsubscribeList[callBackName] = {
              callBackName: callBackName,
              event: eventsArray[currentEvent],
              element: element,
              options: eventOptions
            };
          }

          currentSubscriber.subscribers[events].subscriberId = callBackName;

          if (currentSubscriber.subscribers[events].hasOwnProperty('callBackOnes')) {
            var onesCallBackName_1 = callBackName + 'ones'; // @ts-ignore

            window[onesCallBackName_1] = function (event) {
              // @ts-ignore
              event.target.removeEventListener(event.type, window[onesCallBackName_1]); // @ts-ignore

              currentSubscriber.subscribers[events].callBackOnes.call({
                scope: eventInstructor,
                dataResolver: self.dataResolver,
                resolverId: resolverId_1
              }, event);
            }; // @ts-ignore


            element === null || element === void 0 ? void 0 : element.addEventListener(eventsArray[currentEvent], window[onesCallBackName_1], eventOptions); // returned value will contain information that can be referred to when unsubscribe
            // @ts-ignore

            returns[instructorName][selectorId][events].push(callBackName);
            EventManager.unsubscribeList[onesCallBackName_1] = {
              callBackName: onesCallBackName_1,
              event: eventsArray[currentEvent],
              element: element,
              options: eventOptions
            };
            currentSubscriber.subscribers[events].onesSubscriberId = onesCallBackName_1;
          }

          if (currentSubscriber.subscribers[events].hasOwnProperty('resolver')) {
            var resolver = currentSubscriber.subscribers[events].resolver;
            currentSubscriber.subscribers[events].unresolverId = this_1.setDataResolver(resolver, resolverId_1);
          }
        };

        for (var currentEvent in eventsArray) {
          _loop_2(currentEvent);
        }
      }
    };

    var this_1 = this;

    for (var events in currentSubscriber.subscribers) {
      _loop_1(events);
    }

    return returns;
  };
  /**
   *
   * @param unsubscribable
   */


  EventManager.prototype.unsubscribe = function (unsubscribable) {
    var success = false;

    if (typeof unsubscribable === 'string') {
      success = EventManager.removeListener(unsubscribable);
    } else {
      var self_1 = this;

      for (var unsub in unsubscribable) {
        if (unsubscribable.hasOwnProperty(unsub)) {
          for (var elem in unsubscribable[unsub]) {
            if (unsubscribable[unsub].hasOwnProperty(elem)) {
              for (var event_1 in unsubscribable[unsub][elem]) {
                if (unsubscribable[unsub][elem].hasOwnProperty(event_1)) {
                  unsubscribable[unsub][elem][event_1].forEach(function (unsubscribableId) {
                    EventManager.removeListener(unsubscribableId);
                    success = true;
                  });
                }
              }
            }
          }
        }
      }
    }

    return success;
  };
  /**
   * remove an event listener
   * @param unsubscribableId
   */


  EventManager.removeListener = function (unsubscribableId) {
    var success = false;

    if (EventManager.unsubscribeList[unsubscribableId]) {
      success = true;
      var element = EventManager.unsubscribeList[unsubscribableId].element;
      var event_2 = EventManager.unsubscribeList[unsubscribableId].event;
      var callBackName = EventManager.unsubscribeList[unsubscribableId].callBackName;
      var options = EventManager.unsubscribeList[unsubscribableId].options; // @ts-ignore

      element === null || element === void 0 ? void 0 : element.removeEventListener(event_2, window[callBackName], options);
    }

    return success;
  };
  /**
   *
   * subscribe to an array of eventInstructors
   * @param subscribers
   */


  EventManager.prototype.setSubscribers = function (subscribers) {
    var self = this;
    subscribers.forEach(function (eventInstructor) {
      self.subscribe(eventInstructor);
    });
    EventManager.eventsRegisteredEvent.fire();
  };
  /**
   *
   * @param eventObject
   */


  EventManager.prototype.publish = function (eventObject) {
    var ev = new CustomEvent(eventObject.name, {
      detail: eventObject.detail,
      cancelable: true
    });
    (eventObject.element ? eventObject.element : document).dispatchEvent(ev);
    this.publishers[eventObject.name] = {
      detail: eventObject.detail
    };
  };
  /**
   *
   * @param eventName
   * @param detail
   */


  EventManager.prototype.fire = function (eventName, detail) {
    this.publish({
      name: eventName,
      detail: detail
    });
  };
  /**
   * hold events with their function name and options that can be used to unsubscribe from a particular event
   */


  EventManager.unsubscribeList = {};
  EventManager.counter = 0;
  /**
   *
   */

  EventManager.eventsRegisteredEvent = {
    name: 'eventsRegistered',
    fire: function fire(detail) {
      var currentEvent = EventManager.eventsRegisteredEvent;
      var eventManager = new EventManager();
      eventManager.fire(currentEvent.name, detail);
    }
  };
  return EventManager;
}();

exports["default"] = EventManager;

/***/ }),

/***/ "./lib/Foo/Foo.js":
/*!************************!*\
  !*** ./lib/Foo/Foo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventManager_1 = __importDefault(__webpack_require__(/*! ./../EventManager */ "./lib/EventManager.js"));
/**
 * Foo
 * foobar
 */


var Foo =
/** @class */
function () {
  function Foo() {
    var _a;

    this.subscriptions = [{
      selector: 'window',
      subscribers: {
        load: {
          callBack: function callBack(event) {
            this.scope.documentLoadSubscriberCallBack(event);
          }
        }
      }
    }, (_a = {}, _a[Foo.FooEvent.name] = {
      callBack: function callBack(event) {
        var data = this.dataResolver.call(this, event.detail);
        console.log("new value of date: ", data.time.getMilliseconds());
      },
      callBackOnes: function callBackOnes(event) {
        console.log("this is fired only ones");
      },
      resolver: function resolver(latest, allResolvers) {
        // the resolver can change the value of the data in the callBack function even if the resolver function in a different eventInstructor
        // it only need to have the same selector as the subscriber where CallBackValueResolver.valueResolver is called
        console.log("all resolver data can be found here: ", allResolvers);
        console.log("old resolver date: ", latest.time.getMilliseconds());
        console.log("value resolver will create a new date"); // change the resolver value

        return {
          time: 'FOOOOOO'
        };
      }
    }, _a)];
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
    console.log("eventListener of type: " + event.type, ", of the element: " + event.target, "is called from " + Foo.constructor.name, ", on date millisecond: " + date.getMilliseconds()); // publish an event

    Foo.FooEvent.fire({
      time: date
    });
  };
  /**
   * can be used to fire the event as Foo.FooEvent.fire(details)
   * or can be listened to in other Instructor by Foo.FooEvent.name
   */


  Foo.FooEvent = {
    name: 'FooEvent',
    fire: function fire(detail) {
      var self = Foo.FooEvent;
      var eventManager = new EventManager_1["default"]();
      eventManager.fire(self.name, detail);
    }
  };
  return Foo;
}();

exports["default"] = Foo;

/***/ }),

/***/ "./lib/InlineEventManager.js":
/*!***********************************!*\
  !*** ./lib/InlineEventManager.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventManager_1 = __importDefault(__webpack_require__(/*! ./EventManager */ "./lib/EventManager.js"));

var ValueResolver_1 = __importDefault(__webpack_require__(/*! ./ValueResolver */ "./lib/ValueResolver.js"));

var InlineEventManager =
/** @class */
function () {
  /**
   *
   * @param eventManager
   */
  function InlineEventManager(eventManager) {
    this.eventManager = eventManager;
    this.setStringSubscriber();
    this.setStringSubscribeOnes();
    this.setStringEventValueResolver();
    this.setStringUnsubscriber();
    this.setStringUnresolve();
  }
  /**
   * allows a string to have a subscriber prototype
   * ('selector').subscribe(function(){})
   */


  InlineEventManager.prototype.setStringSubscriber = function () {
    var self = this; // @typescript -ingore

    String.prototype.subscribe = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
      return self.handleInlineSubscriber(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones);
    };
  };
  /**
   * allows a string to have a subscriber prototype
   * ('selector').subscribe(function(){})
   */


  InlineEventManager.prototype.setStringEventValueResolver = function () {
    var self = this;

    String.prototype.valueResolver = function (resolver) {
      return self.handleInlineSubscriber.call(this, resolver);
    };
  };

  InlineEventManager.prototype.handleInlineSubscriber = function (selectorOrEvent, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, ones) {
    var self = this;
    var selector;
    var eventName;
    var element;
    var callBack;
    var resolver;
    var options;
    var onlyOnes = false;
    var resolverIsSet = false;
    var callBackIsSet = false;
    var args = arguments;

    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
      var arg = args_1[_i];

      if (typeof arg !== 'undefined') {
        if (typeof arg === 'string' && arg === args[1]) {
          selector = selectorOrEvent;
          element = document.querySelector(selector);
          eventName = arg;
        } else if (arg === args[1] && typeof arg === 'function' && arg.name === 'resolver') {
          ValueResolver_1["default"].setResolver(arg, this);
          return this;
        } else if (!element) {
          selector = 'document';
          element = document;
          eventName = selectorOrEvent;
        }

        if (typeof arg === 'function') {
          if (arg.name === '' || arg.name !== 'resolver' || resolverIsSet) {
            callBack = arg;
            callBackIsSet = true;
          } else if (arg.name === 'resolver' || callBackIsSet) {
            resolver = arg;
            resolverIsSet = true;
          }
        } else if (typeof arg === 'boolean') {
          onlyOnes = arg;
        } else if (_typeof(options) === 'object') {
          options = arg;
        }
      }
    }

    var selectorId = EventManager_1["default"].getSelectorId({
      type: selector,
      value: eventName
    });
    var callBackName;
    var resolverId = ValueResolver_1["default"].getResolverId(selector, eventName);

    if (callBackIsSet) {
      callBackName = 'inline_' + selectorId;

      window[callBackName] = function (event) {
        // @ts-ignore
        if (onlyOnes) {
          event.target.removeEventListener(event.type, window[callBackName]);
        } // @ts-ignore


        callBack.call({
          dataResolver: self.eventManager.dataResolver,
          resolverId: resolverId
        }, event);
      }; // @ts-ignore


      element === null || element === void 0 ? void 0 : element.addEventListener(eventName, window[callBackName], options);
      EventManager_1["default"].unsubscribeList[callBackName] = {
        callBackName: callBackName,
        event: eventName,
        element: element,
        options: options
      };
    }

    if (resolverIsSet) {
      // @ts-ignore
      selectorId = this.eventManager.valueResolver.setResolver(resolver, resolverId);
    }

    return callBackName || selectorId;
  };
  /**
   * allows a string to have a subscriber prototype
   * ('selector').subscribe(function(){})
   */


  InlineEventManager.prototype.setStringUnsubscriber = function () {
    var eventManager = new EventManager_1["default"]();

    String.prototype.unsubscribe = function () {
      return eventManager.unsubscribe(this);
    };
  };
  /**
   * allows a string to have a subscriber prototype
   * ('selector').subscribe(function(){})
   */


  InlineEventManager.prototype.setStringUnresolve = function () {
    var eventManager = new EventManager_1["default"]();

    String.prototype.unresolve = function () {
      return eventManager.unresolve(this);
    };
  };

  InlineEventManager.prototype.setStringSubscribeOnes = function () {
    var self = this;

    String.prototype.subscribeOnes = function (eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes) {
      return self.handleInlineSubscriber.call(this, eventOrCallBack, callBackOrResolver, resolverOrOption, eventOptionsOrOnes, true);
    };
  };

  return InlineEventManager;
}();

exports["default"] = InlineEventManager;

/***/ }),

/***/ "./lib/ValueResolver.js":
/*!******************************!*\
  !*** ./lib/ValueResolver.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValueResolver =
/** @class */
function () {
  function ValueResolver() {}
  /**
   * return an unique resolver
   * @param selectorId
   * @param events
   */


  ValueResolver.getResolverId = function (selectorId, events, increment) {
    if (increment === void 0) {
      increment = true;
    }

    var addition = "";

    if (increment) {
      addition = ValueResolver.counter++;
    }

    return selectorId + '_' + events + addition;
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

    var index = -1; // @ts-ignore

    if (resolver.order || this.order >= 0) {
      // order is defined in the resolver
      // @ts-ignoreresolver
      index = this.order >= 0 ? this.order : resolver.order;
      ValueResolver.order = -1;
    } else if (typeof resolver === 'function') {
      resolver.callBack = resolver;
    } // @ts-ignore


    ValueResolver.counter++;
    var resolverIdentity = resolverId + '-_-' + ValueResolver.counter;
    resolver.id = ValueResolver.counter;

    if (!ValueResolver.resolvers[resolverId][index]) {
      ValueResolver.resolvers[resolverId][index] = [];
    }

    ValueResolver.resolvers[resolverId][index].push(resolver); // now we sort the resolver that priority is considered

    var ordered = {};
    Object.keys(ValueResolver.resolvers[resolverId]).sort().forEach(function (key) {
      ordered[key] = ValueResolver.resolvers[resolverId][key];
    }); // reassigning sorted values

    ValueResolver.resolvers[resolverId] = ordered;
    return resolverIdentity;
  };
  /**
   *
   * @param resolverIdentity
   */


  ValueResolver.unsetResolver = function (resolverIdentity) {
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
    }

    return success;
  };
  /**
   * return value that is set in the
   * @param returns
   */


  ValueResolver.prototype.dataResolver = function (returns) {
    var paramsArray = [];
    paramsArray.push(returns); //@ts-ignore

    for (var order in ValueResolver.resolvers[this.resolverId]) {
      //@ts-ignore
      if (ValueResolver.resolvers[this.resolverId].hasOwnProperty(order)) {
        // the resolver function will have all returned value of all resolvers that has less priority
        //@ts-ignore
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


  ValueResolver.setOrder = function (order) {
    ValueResolver.order = order;
  };
  /**
   * hold all resolver functions on proper order
   */


  ValueResolver.resolvers = {};
  ValueResolver.order = -1;
  ValueResolver.counter = -1;
  return ValueResolver;
}();

exports["default"] = ValueResolver;

/***/ }),

/***/ "./node_modules/events-polyfill/index.js":
/*!***********************************************!*\
  !*** ./node_modules/events-polyfill/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return require(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    module.exports = function () {
      if (typeof EventTarget === 'undefined') {
        window.EventTarget = Node;
      }
      /**
       * Event listener interceptor
       */


      var EventListenerInterceptor = {
        interceptors: [] // { target: EventTarget, interceptors: [{ add: Function, remove: Function }, ...] }

      };
      /**
       * Returns if exists a previously registered listener from a target and the normalized arguments
       * @param target
       * @param normalizedArguments
       * @return {*}
       */

      EventListenerInterceptor.getRegisteredEventListener = function (target, normalizedArguments) {
        var key = normalizedArguments.type + '-' + (normalizedArguments.options.capture ? '1' : '0');

        if (target.__eventListeners !== void 0 && target.__eventListeners[key] !== void 0) {
          var map = target.__eventListeners[key];

          for (var i = 0; i < map.length; i++) {
            if (map[i].listener === normalizedArguments.listener) {
              return map[i];
            }
          }
        }

        return null;
      };
      /**
       * Registers a listener on a target with some options
       * @param target
       * @param normalizedArguments
       */


      EventListenerInterceptor.registerEventListener = function (target, normalizedArguments) {
        var key = normalizedArguments.type + '-' + (normalizedArguments.options.capture ? '1' : '0');

        if (target.__eventListeners === void 0) {
          target.__eventListeners = {};
        }

        if (target.__eventListeners[key] === void 0) {
          target.__eventListeners[key] = [];
        }

        target.__eventListeners[key].push(normalizedArguments);
      };
      /**
       * Unregisters a listener on a target with some options
       * @param target
       * @param normalizedArguments
       */


      EventListenerInterceptor.unregisterEventListener = function (target, normalizedArguments) {
        var key = normalizedArguments.type + '-' + (normalizedArguments.options.capture ? '1' : '0');

        if (target.__eventListeners !== void 0 && target.__eventListeners[key] !== void 0) {
          var map = target.__eventListeners[key];

          for (var i = 0; i < map.length; i++) {
            if (map[i].listener === normalizedArguments.listener) {
              map.splice(i, 1);
            }
          }

          if (map.length === 0) {
            delete target.__eventListeners[key];
          }
        }
      };

      EventListenerInterceptor.normalizeListenerCallback = function (listener) {
        if (typeof listener === 'function' || listener === null || listener === void 0) {
          return listener;
        } else if (_typeof(listener) === 'object' && typeof listener.handleEvent === 'function') {
          return listener.handleEvent;
        } else {
          // to support Symbol
          return function (event) {
            listener(event);
          };
        }
      };

      EventListenerInterceptor.normalizeListenerOptions = function (options) {
        switch (_typeof(options)) {
          case 'boolean':
            options = {
              capture: options
            };
            break;

          case 'undefined':
            options = {
              capture: false
            };
            break;

          case 'object':
            if (options === null) {
              options = {
                capture: false
              };
            }

            break;

          default:
            throw new Error('Unsupported options type for addEventListener');
        }

        options.once = Boolean(options.once);
        options.passive = Boolean(options.passive);
        options.capture = Boolean(options.capture);
        return options;
      };

      EventListenerInterceptor.normalizeListenerArguments = function (type, listener, options) {
        return {
          type: type,
          listener: this.normalizeListenerCallback(listener),
          options: this.normalizeListenerOptions(options)
        };
      };

      EventListenerInterceptor.intercept = function (target, interceptors) {
        // get an interceptor with this target or null
        var interceptor = null;

        for (var i = 0; i < this.interceptors.length; i++) {
          if (this.interceptors[i].target === target) {
            interceptor = this.interceptors[i];
          }
        } // if no interceptor already set


        if (interceptor === null) {
          interceptor = {
            target: target,
            interceptors: [interceptors]
          };
          this.interceptors.push(interceptor);
          this.interceptAddEventListener(target, interceptor);
          this.interceptRemoveEventListener(target, interceptor);
        } else {
          // if an interceptor already set, simply add interceptors to the list
          interceptor.interceptors.push(interceptors);
        } // var release = function() {
        //   target.prototype.addEventListener = addEventListener;
        //   target.prototype.removeEventListener = removeEventListener;
        // };
        // this.interceptors.push(release);
        // return release;

      };

      EventListenerInterceptor.interceptAddEventListener = function (target, interceptor) {
        var _this = this;

        var addEventListener = target.prototype.addEventListener;

        target.prototype.addEventListener = function (type, listener, options) {
          var normalizedArguments = _this.normalizeListenerArguments(type, listener, options);

          var registeredEventListener = _this.getRegisteredEventListener(this, normalizedArguments);

          if (!registeredEventListener) {
            normalizedArguments.polyfilled = {
              type: normalizedArguments.type,
              listener: normalizedArguments.listener,
              options: {
                capture: normalizedArguments.options.capture,
                once: normalizedArguments.options.once,
                passive: normalizedArguments.options.passive
              }
            };

            for (var i = 0; i < interceptor.interceptors.length; i++) {
              var interceptors = interceptor.interceptors[i];

              if (typeof interceptors.add === 'function') {
                interceptors.add(normalizedArguments);
              }
            } // console.log('normalizedArguments', normalizedArguments.polyfilled);


            _this.registerEventListener(this, normalizedArguments);

            addEventListener.call(this, normalizedArguments.polyfilled.type, normalizedArguments.polyfilled.listener, normalizedArguments.polyfilled.options);
          }
        };

        return function () {
          target.prototype.addEventListener = addEventListener;
        };
      };

      EventListenerInterceptor.interceptRemoveEventListener = function (target, interceptor) {
        var _this = this;

        var removeEventListener = target.prototype.removeEventListener;

        target.prototype.removeEventListener = function (type, listener, options) {
          var normalizedArguments = _this.normalizeListenerArguments(type, listener, options);

          var registeredEventListener = _this.getRegisteredEventListener(this, normalizedArguments);

          if (registeredEventListener) {
            _this.unregisterEventListener(this, normalizedArguments);

            removeEventListener.call(this, registeredEventListener.polyfilled.type, registeredEventListener.polyfilled.listener, registeredEventListener.polyfilled.options);
          } else {
            removeEventListener.call(this, type, listener, options);
          }
        };

        return function () {
          target.prototype.removeEventListener = removeEventListener;
        };
      };

      EventListenerInterceptor.interceptAll = function (interceptors) {
        this.intercept(EventTarget, interceptors);

        if (!(window instanceof EventTarget)) {
          this.intercept(Window, interceptors);
        }
      };

      EventListenerInterceptor.releaseAll = function () {
        for (var i = 0, l = this.interceptors.length; i < l; i++) {
          this.interceptors();
        }
      };

      EventListenerInterceptor.error = function (error) {
        // throw error;
        console.error(error);
      };

      return EventListenerInterceptor;
    }();
  }, {}],
  2: [function (require, module, exports) {
    (function (EventListenerInterceptor) {
      /**
       * Event listener type support
       */
      EventListenerInterceptor.isSupportedOnEvent = function (target, type) {
        return 'on' + type in target;
      };

      EventListenerInterceptor.isSupportedTransitionEvent = function (target, type) {
        return EventListenerInterceptor.isSupportedOnEvent(target, type) || 'style' in target && target.style['transition'] !== void 0;
      };

      EventListenerInterceptor.isSupportedFullScreenEvent = function (target, type) {
        if (EventListenerInterceptor.isSupportedOnEvent(target, type)) {
          return true;
        } else {
          if (/^ms/.test(type.toLowerCase())) {
            return 'msRequestFullscreen' in document.body;
          } else if (/^moz/.test(type)) {
            return 'mozRequestFullscreen' in document.body;
          } else if (/^webkit/.test(type)) {
            return 'webkitRequestFullscreen' in document.body;
          } else {
            return false;
          }
        }
      };

      EventListenerInterceptor.generateEventTypes = function () {
        var _this = this;

        this.eventTypes = {}; // map of types that resolved to something else

        this.vendorPrefixes = ['', 'webkit', 'moz', 'ms', 'o'];
        this.eventTypes['wheel'] = ['wheel', 'mousewheel', 'DOMMouseScroll'].map(function (type) {
          return {
            type: type,
            isSupported: _this.isSupportedOnEvent
          };
        });
        this.eventTypes['fullscreenchange'] = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange', 'msfullscreenchange'].map(function (type) {
          return {
            type: type,
            isSupported: _this.isSupportedFullScreenEvent
          };
        });
        this.eventTypes['fullscreenerror'] = ['fullscreenerror', 'mozfullscreenerror', 'webkitfullscreenerror', 'MSFullscreenError', 'msfullscreenerror'].map(function (type) {
          return {
            type: type,
            isSupported: _this.isSupportedFullScreenEvent
          };
        });
        ['pointerlockchange', 'pointerlockerror', 'animationstart', 'animationiteration', 'animationend', 'pointercancel', 'pointerdown', 'pointerhover', 'pointermove', 'pointerout', 'pointerover', 'pointerup'].forEach(function (type) {
          _this.eventTypes[type] = _this.vendorPrefixes.map(function (prefix) {
            return {
              type: prefix + type,
              isSupported: _this.isSupportedOnEvent
            };
          });
        });
        ['transitionstart', 'transitionrun', 'transitionend'].forEach(function (type) {
          _this.eventTypes[type] = _this.vendorPrefixes.map(function (prefix) {
            return {
              type: prefix + type,
              isSupported: _this.isSupportedTransitionEvent
            };
          });
        });
      };

      EventListenerInterceptor.getSupportedEventType = function (target, type) {
        var types = this.eventTypes[type];

        if (types === void 0) {
          return type;
        } else {
          var _type;

          for (var i = 0; i < types.length; i++) {
            _type = types[i];

            if (_type.isSupported(target, _type.type)) {
              // console.log('use : ' + eventTypesPolyfiller[i].type);
              return _type.type;
            }
          } // this.error(new Error('Event listener type ' + String(type) + ' on ' + String(target) + ' is not supported by current environment'));


          return type;
        }
      };

      EventListenerInterceptor.polyfillListenerEventTypes = function () {
        this.generateEventTypes();

        var _this = this;

        this.interceptAll({
          add: function add(normalizedArguments) {
            normalizedArguments.polyfilled.type = _this.getSupportedEventType(this, normalizedArguments.polyfilled.type);
          }
        });
      };

      EventListenerInterceptor.polyfillListenerEventTypes();
    })(require('./EventListenerInterceptor.js'));
  }, {
    "./EventListenerInterceptor.js": 1
  }],
  3: [function (require, module, exports) {
    (function (EventListenerInterceptor) {
      /**
       * Event listener options support
       */
      EventListenerInterceptor.detectSupportedOptions = function () {
        var _this = this;

        this.supportedOptions = {
          once: false,
          passive: false,
          capture: false,
          all: false,
          some: false
        };
        document.createDocumentFragment().addEventListener('test', function () {}, {
          get once() {
            _this.supportedOptions.once = true;
            return false;
          },

          get passive() {
            _this.supportedOptions.passive = true;
            return false;
          },

          get capture() {
            _this.supportedOptions.capture = true;
            return false;
          }

        }); // useful shortcuts to detect if options are all/some supported

        this.supportedOptions.all = this.supportedOptions.once && this.supportedOptions.passive && this.supportedOptions.capture;
        this.supportedOptions.some = this.supportedOptions.once || this.supportedOptions.passive || this.supportedOptions.capture;
      };

      EventListenerInterceptor.polyfillListenerOptions = function () {
        this.detectSupportedOptions();

        if (!this.supportedOptions.all) {
          var _this = this;

          this.interceptAll({
            add: function add(normalizedArguments) {
              // console.log('intercepted', normalizedArguments);
              var once = normalizedArguments.options.once && !_this.supportedOptions.once;
              var passive = normalizedArguments.options.passive && !_this.supportedOptions.passive;

              if (once || passive) {
                var listener = normalizedArguments.polyfilled.listener;

                normalizedArguments.polyfilled.listener = function (event) {
                  if (once) {
                    this.removeEventListener(normalizedArguments.type, normalizedArguments.listener, normalizedArguments.options);
                  }

                  if (passive) {
                    event.preventDefault = function () {
                      throw new Error('Unable to preventDefault inside passive event listener invocation.');
                    };
                  }

                  return listener.call(this, event);
                };
              }

              if (!_this.supportedOptions.some) {
                normalizedArguments.polyfilled.options = normalizedArguments.options.capture;
              }
            }
          });
        }
      };

      EventListenerInterceptor.polyfillListenerOptions(); // var onclick = function() {
      //   console.log('click');
      // };
      // document.body.addEventListener('click', onclick, false);
      // document.body.addEventListener('click', onclick, { once: true });
      // document.body.addEventListener('click', onclick, { once: true });
      // document.body.addEventListener('click', onclick, false);
      // document.body.addEventListener('click', onclick, false);
    })(require('./EventListenerInterceptor.js'));
  }, {
    "./EventListenerInterceptor.js": 1
  }],
  4: [function (require, module, exports) {
    module.exports = function () {
      return function ApplyThisPrototype(event, target) {
        if (_typeof(target) === 'object' && target !== null) {
          var proto = Object.getPrototypeOf(target);
          var property;

          for (property in proto) {
            if (!(property in event)) {
              var descriptor = Object.getOwnPropertyDescriptor(proto, property);

              if (descriptor) {
                Object.defineProperty(event, property, descriptor);
              }
            }
          }

          for (property in target) {
            if (!(property in event)) {
              event[property] = target[property];
            }
          }
        }
      };
    }();
  }, {}],
  5: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      /**
       * Polyfill CustomEvent
       */
      try {
        var event = new window.CustomEvent('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var CustomEventOriginal = window.CustomEvent || window.Event;

        var CustomEvent = function CustomEvent(eventName, params) {
          params = params || {};
          var event = document.createEvent('CustomEvent');
          event.initCustomEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.detail === void 0 ? {} : params.detail);
          ApplyThisPrototype(event, this);
          return event;
        };

        CustomEvent.prototype = CustomEventOriginal.prototype;
        window.CustomEvent = CustomEvent;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  6: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      // ✓, ✗

      /**
       * Polyfill Event
       */
      try {
        var event = new window.Event('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var EventOriginal = window.Event;

        var Event = function Event(eventName, params) {
          params = params || {};
          var event = document.createEvent('Event');
          event.initEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.detail === void 0 ? {} : params.detail);
          ApplyThisPrototype(event, this);
          return event;
        };

        Event.prototype = EventOriginal.prototype;
        window.Event = Event;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  7: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      /**
       * Polyfill FocusEvent : https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent
       *  - relatedTarget ✓
       */
      try {
        var event = new window.FocusEvent('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var FocusEventOriginal = window.FocusEvent || window.Event;

        var FocusEvent = function FocusEvent(eventName, params) {
          params = params || {};
          var event = document.createEvent('FocusEvent'); // https://msdn.microsoft.com/en-us/library/ff975954(v=vs.85).aspx

          event.initFocusEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.view === void 0 ? window : params.view, params.detail === void 0 ? {} : params.detail, params.relatedTarget === void 0 ? null : params.relatedTarget);
          ApplyThisPrototype(event, this);
          return event;
        };

        FocusEvent.prototype = FocusEventOriginal.prototype;
        window.FocusEvent = FocusEvent;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  8: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      /**
       * Polyfill KeyboardEvent : https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
       *  - key ✓
       *  - char ✓
       *  - code ✓
       *  - location ✓
       *  - ctrlKey ✓
       *  - shiftKey ✓
       *  - altKey ✓
       *  - metaKey ✓
       *  - repeat ✓
       *  - isComposing ✗
       *  - charCode ✓
       *  - keyCode ✓
       *  - which ✓
       */
      try {
        var event = new window.KeyboardEvent('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var KeyboardEventOriginal = window.KeyboardEvent || window.Event;

        var KeyboardEvent = function KeyboardEvent(eventName, params) {
          params = params || {};
          var event = document.createEvent('KeyboardEvent'); // https://msdn.microsoft.com/en-us/library/ff975297(v=vs.85).aspx

          event.initKeyboardEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.view === void 0 ? window : params.view, params.key === void 0 ? '' : params.key, params.location === void 0 ? 0 : params.location, (params.ctrlKey === true ? 'Control ' : '') + (params.altKey === true ? 'Alt ' : '') + (params.shiftKey === true ? 'Shift ' : '') + (params.metaKey === true ? 'Meta ' : ''), params.repeat === void 0 ? false : params.repeat, params.locale === void 0 ? navigator.language : params.locale);
          event.keyCode = params.keyCode === void 0 ? 0 : params.keyCode;
          event.code = params.code === void 0 ? '' : params.code;
          event.charCode = params.charCode === void 0 ? 0 : params.charCode;
          event["char"] = params.charCode === void 0 ? '' : params.charCode;
          event.which = params.which === void 0 ? 0 : params.which;
          ApplyThisPrototype(event, this);
          return event;
        };

        KeyboardEvent.prototype = KeyboardEventOriginal.prototype;
        window.KeyboardEvent = KeyboardEvent;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  9: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      /**
       * Polyfill MouseEvent : https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
       *  - screenX ✓
       *  - screenY ✓
       *  - clientX ✓
       *  - clientY ✓
       *  - ctrlKey ✓
       *  - shiftKey ✓
       *  - altKey ✓
       *  - metaKey ✓
       *  - button ✓
       *  - buttons ✓
       *  - region ✓
       */
      try {
        var event = new window.MouseEvent('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var MouseEventOriginal = window.MouseEvent || window.Event;

        var MouseEvent = function MouseEvent(eventName, params) {
          params = params || {};
          var event = document.createEvent('MouseEvent'); // https://msdn.microsoft.com/en-us/library/ff975292(v=vs.85).aspx

          event.initMouseEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.view === void 0 ? window : params.view, params.detail === void 0 ? 0 : params.detail, params.screenX === void 0 ? 0 : params.screenX, params.screenY === void 0 ? 0 : params.screenY, params.clientX === void 0 ? 0 : params.clientX, params.clientY === void 0 ? 0 : params.clientY, params.ctrlKey === void 0 ? false : params.ctrlKey, params.altKey === void 0 ? false : params.altKey, params.shiftKey === void 0 ? false : params.shiftKey, params.metaKey === void 0 ? false : params.metaKey, params.button === void 0 ? 0 : params.button, params.relatedTarget === void 0 ? null : params.relatedTarget);
          event.buttons = params.buttons === void 0 ? 0 : params.buttons;
          event.region = params.region === void 0 ? null : params.region;
          ApplyThisPrototype(event, this);
          return event;
        };

        MouseEvent.prototype = MouseEventOriginal.prototype;
        window.MouseEvent = MouseEvent;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  10: [function (require, module, exports) {
    (function (ApplyThisPrototype) {
      /**
       * Polyfill PointerEvent
       *  - pointerId ✓
       *  - width ✓
       *  - height ✓
       *  - pressure ✓
       *  - tangentialPressure ✓
       *  - tiltX ✓
       *  - tiltY ✓
       *  - twist ✓
       *  - pointerType ✓
       *  - isPrimary ✓
       */
      try {
        var event = new window.PointerEvent('event', {
          bubbles: true,
          cancelable: true
        });
      } catch (error) {
        var PointerEventOriginal = window.PointerEvent || window.Event;

        var PointerEvent = function PointerEvent(eventName, params) {
          params = params || {};
          var event = document.createEvent('PointerEvent'); // https://msdn.microsoft.com/en-us/library/jj192039(v=vs.85).aspx

          event.initPointerEvent(eventName, params.bubbles === void 0 ? false : params.bubbles, params.cancelable === void 0 ? false : params.cancelable, params.view === void 0 ? window : params.view, params.detail === void 0 ? 0 : params.detail, params.screenX === void 0 ? 0 : params.screenX, params.screenY === void 0 ? 0 : params.screenY, params.clientX === void 0 ? 0 : params.clientX, params.clientY === void 0 ? 0 : params.clientY, params.ctrlKey === void 0 ? false : params.ctrlKey, params.altKey === void 0 ? false : params.altKey, params.shiftKey === void 0 ? false : params.shiftKey, params.metaKey === void 0 ? false : params.metaKey, params.button === void 0 ? 0 : params.button, params.relatedTarget === void 0 ? null : params.relatedTarget, params.offsetX === void 0 ? 0 : params.offsetX, params.offsetY === void 0 ? 0 : params.offsetY, params.width === void 0 ? 1 : params.width, params.height === void 0 ? 1 : params.height, params.pressure === void 0 ? 0 : params.pressure, params.twist === void 0 ? 0 : params.twist, params.tiltX === void 0 ? 0 : params.tiltX, params.tiltY === void 0 ? 0 : params.tiltY, params.pointerId === void 0 ? 0 : params.pointerId, params.pointerType === void 0 ? '' : params.pointerType, params.hwTimestamp === void 0 ? 0 : params.hwTimestamp, params.isPrimary === void 0 ? false : params.isPrimary);
          event.tangentialPressure = params.tangentialPressure === void 0 ? 0 : params.tangentialPressure;
          ApplyThisPrototype(event, this);
          return event;
        };

        PointerEvent.prototype = PointerEventOriginal.prototype;
        var rotationDescriptor = Object.getOwnPropertyDescriptor(PointerEvent.prototype, 'rotation');

        if (rotationDescriptor) {
          Object.defineProperty(PointerEvent.prototype, 'twist', rotationDescriptor);
        }

        window.PointerEvent = PointerEvent;
      }
    })(require('./ApplyThisPrototype.js'));
  }, {
    "./ApplyThisPrototype.js": 4
  }],
  11: [function (require, module, exports) {
    require('./Event.js');

    require('./CustomEvent.js');

    require('./MouseEvent.js');

    require('./KeyboardEvent.js');

    require('./FocusEvent.js');

    require('./PointerEvent.js');
  }, {
    "./CustomEvent.js": 5,
    "./Event.js": 6,
    "./FocusEvent.js": 7,
    "./KeyboardEvent.js": 8,
    "./MouseEvent.js": 9,
    "./PointerEvent.js": 10
  }],
  12: [function (require, module, exports) {
    require('./constructors/index.js');

    require('./ListenerOptions.js');

    require('./ListenerEventTypes.js');
  }, {
    "./ListenerEventTypes.js": 2,
    "./ListenerOptions.js": 3,
    "./constructors/index.js": 11
  }]
}, {}, [12]);

/***/ }),

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_EventManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/EventManager */ "./lib/EventManager.js");
/* harmony import */ var _lib_EventManager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_EventManager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_ValueResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/ValueResolver */ "./lib/ValueResolver.js");
/* harmony import */ var _lib_ValueResolver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_ValueResolver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_Foo_Foo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/Foo/Foo */ "./lib/Foo/Foo.js");
/* harmony import */ var _lib_Foo_Foo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_Foo_Foo__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_Bar_Bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../lib/Bar/Bar */ "./lib/Bar/Bar.js");
/* harmony import */ var _lib_Bar_Bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_Bar_Bar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fobar_Fobar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../fobar/Fobar */ "./fobar/Fobar.js");

 // change the directoryWhere




var eventManager = new _lib_EventManager__WEBPACK_IMPORTED_MODULE_0___default.a();
'body'.subscribe('click', function (event) {
  console.log('intersting', event);
  console.log(this.dataResolver.call(this, 5));
});
eventManager.setSubscribers([_fobar_Fobar__WEBPACK_IMPORTED_MODULE_4__["default"]]);
window.eventManager = eventManager;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZm9iYXIvRm9iYXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9CYXIvQmFyLnRzIiwid2VicGFjazovLy8uLi9zcmMvRXZlbnRNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvRm9vL0Zvby50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0lubGluZUV2ZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1ZhbHVlUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy1wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvaW5kZXguanMiXSwibmFtZXMiOlsiRm9iYXIiLCJzdWJzY3JpYmVycyIsImxvYWQiLCJjYWxsQmFjayIsImV2ZW50Iiwic2NvcGUiLCJkb2N1bWVudExvYWRTdWJzY3JpYmVyQ2FsbEJhY2siLCJGb2JhckV2ZW50IiwibmFtZSIsImRhdGEiLCJkYXRhUmVzb2x2ZXIiLCJjYWxsIiwiZGV0YWlsIiwiY29uc29sZSIsImxvZyIsInRpbWUiLCJnZXRNaWxsaXNlY29uZHMiLCJjYWxsQmFja09uZXMiLCJyZXNvbHZlciIsImxhdGVzdCIsImFsbFJlc29sdmVycyIsIkRhdGUiLCJzdWJzY3JpcHRpb25zIiwiZGF0ZSIsInR5cGUiLCJ0YXJnZXQiLCJjb25zdHJ1Y3RvciIsImZpcmUiLCJzZWxmIiwiZXZlbnRNYW5hZ2VyIiwiRXZlbnRNYW5hZ2VyIiwiciIsImUiLCJuIiwidCIsIm8iLCJpIiwiZiIsImMiLCJyZXF1aXJlIiwidSIsImEiLCJFcnJvciIsImNvZGUiLCJwIiwiZXhwb3J0cyIsImxlbmd0aCIsIm1vZHVsZSIsIkV2ZW50VGFyZ2V0Iiwid2luZG93IiwiTm9kZSIsIkV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvciIsImludGVyY2VwdG9ycyIsImdldFJlZ2lzdGVyZWRFdmVudExpc3RlbmVyIiwibm9ybWFsaXplZEFyZ3VtZW50cyIsImtleSIsIm9wdGlvbnMiLCJjYXB0dXJlIiwiX19ldmVudExpc3RlbmVycyIsIm1hcCIsImxpc3RlbmVyIiwicmVnaXN0ZXJFdmVudExpc3RlbmVyIiwicHVzaCIsInVucmVnaXN0ZXJFdmVudExpc3RlbmVyIiwic3BsaWNlIiwibm9ybWFsaXplTGlzdGVuZXJDYWxsYmFjayIsImhhbmRsZUV2ZW50Iiwibm9ybWFsaXplTGlzdGVuZXJPcHRpb25zIiwib25jZSIsIkJvb2xlYW4iLCJwYXNzaXZlIiwibm9ybWFsaXplTGlzdGVuZXJBcmd1bWVudHMiLCJpbnRlcmNlcHQiLCJpbnRlcmNlcHRvciIsImludGVyY2VwdEFkZEV2ZW50TGlzdGVuZXIiLCJpbnRlcmNlcHRSZW1vdmVFdmVudExpc3RlbmVyIiwiX3RoaXMiLCJhZGRFdmVudExpc3RlbmVyIiwicHJvdG90eXBlIiwicmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIiLCJwb2x5ZmlsbGVkIiwiYWRkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImludGVyY2VwdEFsbCIsIldpbmRvdyIsInJlbGVhc2VBbGwiLCJsIiwiZXJyb3IiLCJpc1N1cHBvcnRlZE9uRXZlbnQiLCJpc1N1cHBvcnRlZFRyYW5zaXRpb25FdmVudCIsInN0eWxlIiwiaXNTdXBwb3J0ZWRGdWxsU2NyZWVuRXZlbnQiLCJ0ZXN0IiwidG9Mb3dlckNhc2UiLCJkb2N1bWVudCIsImJvZHkiLCJnZW5lcmF0ZUV2ZW50VHlwZXMiLCJldmVudFR5cGVzIiwidmVuZG9yUHJlZml4ZXMiLCJpc1N1cHBvcnRlZCIsImZvckVhY2giLCJwcmVmaXgiLCJnZXRTdXBwb3J0ZWRFdmVudFR5cGUiLCJ0eXBlcyIsIl90eXBlIiwicG9seWZpbGxMaXN0ZW5lckV2ZW50VHlwZXMiLCJkZXRlY3RTdXBwb3J0ZWRPcHRpb25zIiwic3VwcG9ydGVkT3B0aW9ucyIsImFsbCIsInNvbWUiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwicG9seWZpbGxMaXN0ZW5lck9wdGlvbnMiLCJwcmV2ZW50RGVmYXVsdCIsIkFwcGx5VGhpc1Byb3RvdHlwZSIsInByb3RvIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJwcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJDdXN0b21FdmVudE9yaWdpbmFsIiwiRXZlbnQiLCJldmVudE5hbWUiLCJwYXJhbXMiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsIkV2ZW50T3JpZ2luYWwiLCJpbml0RXZlbnQiLCJGb2N1c0V2ZW50IiwiRm9jdXNFdmVudE9yaWdpbmFsIiwiaW5pdEZvY3VzRXZlbnQiLCJ2aWV3IiwicmVsYXRlZFRhcmdldCIsIktleWJvYXJkRXZlbnQiLCJLZXlib2FyZEV2ZW50T3JpZ2luYWwiLCJpbml0S2V5Ym9hcmRFdmVudCIsImxvY2F0aW9uIiwiY3RybEtleSIsImFsdEtleSIsInNoaWZ0S2V5IiwibWV0YUtleSIsInJlcGVhdCIsImxvY2FsZSIsIm5hdmlnYXRvciIsImxhbmd1YWdlIiwia2V5Q29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJNb3VzZUV2ZW50IiwiTW91c2VFdmVudE9yaWdpbmFsIiwiaW5pdE1vdXNlRXZlbnQiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiYnV0dG9uIiwiYnV0dG9ucyIsInJlZ2lvbiIsIlBvaW50ZXJFdmVudCIsIlBvaW50ZXJFdmVudE9yaWdpbmFsIiwiaW5pdFBvaW50ZXJFdmVudCIsIm9mZnNldFgiLCJvZmZzZXRZIiwid2lkdGgiLCJoZWlnaHQiLCJwcmVzc3VyZSIsInR3aXN0IiwidGlsdFgiLCJ0aWx0WSIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwiaHdUaW1lc3RhbXAiLCJpc1ByaW1hcnkiLCJ0YW5nZW50aWFsUHJlc3N1cmUiLCJyb3RhdGlvbkRlc2NyaXB0b3IiLCJzdWJzY3JpYmUi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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBQ2lEOztBQUNqRDtBQUNBO0FBQ0E7QUFDQSxJQUFNVixZQUFZLEdBQUcsSUFBSUMsd0RBQUosRUFBckI7QUFDRSxNQUFELENBQVNxSixTQUFULENBQW1CLE9BQW5CLEVBQTRCLFVBQVMvSyxLQUFULEVBQWU7QUFDNUNTLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEJWLEtBQTFCO0FBQ0NTLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtKLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCLEVBQTRCLENBQTVCLENBQVo7QUFBNEMsQ0FGNUM7QUFHRGtCLFlBQVksQ0FDVnVKLGNBREYsQ0FDa0IsQ0FBQ0Msb0RBQUQsQ0FEbEI7QUFHQ3BJLE1BQU0sQ0FBQ3BCLFlBQVAsR0FBc0JBLFlBQXRCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IEV2ZW50TWFuYWdlciwge1N1YnNjcmlwdGlvbiwgRXZlbnRGaXJlfSBmcm9tIFwiLi8uLi9saWIvRXZlbnRNYW5hZ2VyXCJcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEZvYmFyXHJcbiAqIGFsd2F5c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9iYXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTdWJzY3JpcHRpb24+fVxyXG4gICAgICovXHJcblx0Z2V0U3Vic2NyaWJlcnMoKVxyXG5cdHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtBcnJheTxTdWJzY3JpcHRpb24+fVxyXG5cdCAqL1xyXG4gICAgc3Vic2NyaXB0aW9ucyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmRvY3VtZW50TG9hZFN1YnNjcmliZXJDYWxsQmFjayhldmVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgW0ZvYmFyLkZvYmFyRXZlbnQubmFtZV06IHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YVJlc29sdmVyLmNhbGwodGhpcywgZXZlbnQuZGV0YWlsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXcgdmFsdWUgb2YgZGF0ZTogXCIsIGRhdGEudGltZS5nZXRNaWxsaXNlY29uZHMoKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2tPbmVzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgZmlyZWQgb25seSBvbmVzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVyOiBmdW5jdGlvbiAobGF0ZXN0LCBhbGxSZXNvbHZlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcmVzb2x2ZXIgY2FuIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGRhdGEgaW4gdGhlIGNhbGxCYWNrIGZ1bmN0aW9uIGV2ZW4gaWYgdGhlIHJlc29sdmVyIGZ1bmN0aW9uIGluIGEgZGlmZmVyZW50IGV2ZW50SW5zdHJ1Y3RvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IG9ubHkgbmVlZCB0byBoYXZlIHRoZSBzYW1lIHNlbGVjdG9yIGFzIHRoZSBzdWJzY3JpYmVyIHdoZXJlIENhbGxCYWNrVmFsdWVSZXNvbHZlci52YWx1ZVJlc29sdmVyIGlzIGNhbGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGlmIHlvdSB3YW50IHRvIG1vZGlmeSB0aGUgdmFsdWUgZnJvbSBhIGRpZmZlcmVudCBDbGFzcyBqdXN0IGluIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWJzY3JpcHRpb25zIGxpc3RlbiB0byB0aGUgRm9iYXIuRm9iYXJFdmVudC5uYW1lIGFuZCBhZGQgYSByZXNvbHZlciBmdW5jdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXNvbHZlciBkYXRhIGNhbiBiZSBmb3VuZCBoZXJlOiBcIiwgYWxsUmVzb2x2ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9sZCByZXNvbHZlciBkYXRlOiBcIiwgbGF0ZXN0LnRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmFsdWUgcmVzb2x2ZXIgd2lsbCBjcmVhdGUgYSBuZXcgZGF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSByZXNvbHZlciB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHRpbWU6IG5ldyBEYXRlKCkgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fVxyXG4gICAgICovXHJcblx0ZG9jdW1lbnRMb2FkU3Vic2NyaWJlckNhbGxCYWNrKGV2ZW50KVxyXG5cdHtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBcImV2ZW50TGlzdGVuZXIgb2YgdHlwZTogXCIgKyBldmVudC50eXBlLFxyXG4gICAgICAgICAgICBcIiwgb2YgdGhlIGVsZW1lbnQ6IFwiICsgZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgICAgICBcImlzIGNhbGxlZCBmcm9tIFwiICsgRm9iYXIuY29uc3RydWN0b3IubmFtZSxcclxuICAgICAgICAgICAgXCIsIG9uIGRhdGUgbWlsbGlzZWNvbmQ6IFwiICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gcHVibGlzaCBhbiBldmVudFxyXG4gICAgICAgIEZvYmFyLkZvYmFyRXZlbnQuZmlyZSh7IHRpbWU6IGRhdGUgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbiBiZSB1c2VkIHRvIGZpcmUgdGhlIGV2ZW50IGFzIEZvYmFyLkZvYmFyRXZlbnQuZmlyZShkZXRhaWxzKVxyXG4gICAgICogb3IgY2FuIGJlIGxpc3RlbmVkIHRvIGluIG90aGVyIEluc3RydWN0b3IgYnkgRm9iYXIuRm9iYXJFdmVudC5uYW1lXHJcblx0ICogQHR5cGUge0V2ZW50RmlyZX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIEZvYmFyRXZlbnQgPSB7XHJcbiAgICAgICAgbmFtZTogJ0ZvYmFyRXZlbnQnLFxyXG4gICAgICAgIGZpcmU6IChkZXRhaWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IEZvYmFyLkZvYmFyRXZlbnRcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpXHJcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5maXJlKHNlbGYubmFtZSwgZGV0YWlsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiO1xuLy8gaW1wb3J0IEV2ZW50TWFuYWdlciwge0V2ZW50RmlyZSwgRXZlbnRJbnN0cnVjdG9ySW50ZXJmYWNlLCBTdWJzY3JpcHRpb25zfSBmcm9tIFwiZXZlbnQtaW5zdHJ1Y3RvclwiXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRm9vXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vLi4vRm9vL0Zvb1wiKSk7XG52YXIgRXZlbnRNYW5hZ2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vLi4vRXZlbnRNYW5hZ2VyXCIpKTtcbi8qKlxuICogQmFyXG4gKiBoZWxsb1xuICovXG52YXIgQmFyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhcigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdkb2N1bWVudCcsXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuZG9jdW1lbnRMb2FkU3Vic2NyaWJlckNhbGxCYWNrKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoX2EgPSB7fSxcbiAgICAgICAgICAgICAgICBfYVtGb29fMS5kZWZhdWx0LkZvb0V2ZW50Lm5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlcjogZnVuY3Rpb24gKGxhdGVzdCwgYWxsUmVzb2x2ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcmVzb2x2ZXIgY2FuIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGRhdGEgaW4gdGhlIGNhbGxCYWNrIGZ1bmN0aW9uIGV2ZW4gaWYgdGhlIHJlc29sdmVyIGZ1bmN0aW9uIGluIGEgZGlmZmVyZW50IGV2ZW50SW5zdHJ1Y3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQgb25seSBuZWVkIHRvIGhhdmUgdGhlIHNhbWUgc2VsZWN0b3IgYXMgdGhlIHN1YnNjcmliZXIgd2hlcmUgQ2FsbEJhY2tWYWx1ZVJlc29sdmVyLnZhbHVlUmVzb2x2ZXIgaXMgY2FsbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyBpZiB5b3Ugd2FudCB0byBtb2RpZnkgdGhlIHZhbHVlIGZyb20gYSBkaWZmZXJlbnQgQ2xhc3MganVzdCBpbiB0aGUgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJzY3JpcHRpb25zIGxpc3RlbiB0byB0aGUgQmFyLkJhckV2ZW50Lm5hbWUgYW5kIGFkZCBhIHJlc29sdmVyIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgYmFyOiBcIiwgYWxsUmVzb2x2ZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2xkIHJlc29sdmVyIGRhdGU6IFwiLCBsYXRlc3QudGltZS5nZXRNaWxsaXNlY29uZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIHJlc29sdmVyIHdpbGwgY3JlYXRlIGEgbmV3IGRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHJlc29sdmVyIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB0aW1lOiBuZXcgRGF0ZSgpIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9hKVxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdWJzY3JpcHRpb259XG4gICAgICovXG4gICAgQmFyLnByb3RvdHlwZS5nZXRTdWJzY3JpYmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgQmFyLnByb3RvdHlwZS5kb2N1bWVudExvYWRTdWJzY3JpYmVyQ2FsbEJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50TGlzdGVuZXIgb2YgdHlwZTogXCIgKyBldmVudC50eXBlLCBcIiwgb2YgdGhlIGVsZW1lbnQ6IFwiICsgZXZlbnQudGFyZ2V0LCBcImlzIGNhbGxlZCBmcm9tIFwiICsgRm9vXzEuZGVmYXVsdC5jb25zdHJ1Y3Rvci5uYW1lLCBcIiwgb24gZGF0ZSBtaWxsaXNlY29uZDogXCIgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpKTtcbiAgICAgICAgLy8gcHVibGlzaCBhbiBldmVudFxuICAgICAgICBCYXIuQmFyRXZlbnQuZmlyZSh7IHRpbWU6IGRhdGUgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBjYW4gYmUgdXNlZCB0byBmaXJlIHRoZSBldmVudCBhcyBGb28uRm9vRXZlbnQuZmlyZShkZXRhaWxzKVxuICAgICAqIG9yIGNhbiBiZSBsaXN0ZW5lZCB0byBpbiBvdGhlciBJbnN0cnVjdG9yIGJ5IEZvby5Gb29FdmVudC5uYW1lXG4gICAgICovXG4gICAgQmFyLkJhckV2ZW50ID0ge1xuICAgICAgICBuYW1lOiAnQmFyRXZlbnQnLFxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IEJhci5CYXJFdmVudDtcbiAgICAgICAgICAgIHZhciBldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmZpcmUoc2VsZi5uYW1lLCBkZXRhaWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQmFyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEJhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIEBmbG93XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVmFsdWVSZXNvbHZlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1ZhbHVlUmVzb2x2ZXJcIikpO1xudmFyIElubGluZUV2ZW50TWFuYWdlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0lubGluZUV2ZW50TWFuYWdlclwiKSk7XG5yZXF1aXJlKCdldmVudHMtcG9seWZpbGwnKTtcbnZhciBFdmVudE1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFdmVudE1hbmFnZXIoKSB7XG4gICAgICAgIHRoaXMucHVibGlzaGVycyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5zaW5nbGV0b24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRNYW5hZ2VyfVxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUV2ZW50TWFuYWdlci5TaW5nbGV0b24pIHtcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5TaW5nbGV0b24gPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEV2ZW50TWFuYWdlci5TaW5nbGV0b247XG4gICAgfTtcbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmFsdWVSZXNvbHZlciA9IG5ldyBWYWx1ZVJlc29sdmVyXzEuZGVmYXVsdCgpO1xuICAgICAgICBuZXcgSW5saW5lRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdCh0aGlzKTtcbiAgICB9O1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuZGF0YVJlc29sdmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gKF9hID0gRXZlbnRNYW5hZ2VyLlNpbmdsZXRvbi52YWx1ZVJlc29sdmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGF0YVJlc29sdmVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH07XG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXREYXRhUmVzb2x2ZXIgPSBmdW5jdGlvbiAocmVzb2x2ZXIsIHJlc29sdmVySWQpIHtcbiAgICAgICAgcmV0dXJuIFZhbHVlUmVzb2x2ZXJfMS5kZWZhdWx0LnNldFJlc29sdmVyKHJlc29sdmVyLCByZXNvbHZlcklkKTtcbiAgICB9O1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5yZXNvbHZlID0gZnVuY3Rpb24gKHJlc29sdmVySWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIFZhbHVlUmVzb2x2ZXJfMS5kZWZhdWx0LnVuc2V0UmVzb2x2ZXIocmVzb2x2ZXJJZGVudGl0eSk7XG4gICAgfTtcbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldFJlc29sdmVyUHJpb3JpdHkgPSBmdW5jdGlvbiAocHJpb3JpdHkpIHtcbiAgICAgICAgcmV0dXJuIFZhbHVlUmVzb2x2ZXJfMS5kZWZhdWx0LnNldE9yZGVyKHByaW9yaXR5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybiBhbiBpZCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnQgYW5kIHRoZSBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLmdldFNlbGVjdG9ySWQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiA/IHNlbGVjdG9yLnR5cGUgKyAnX19fJyArIHNlbGVjdG9yLnZhbHVlIDogc2VsZWN0b3I7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIEhUTUxFbGVtZW50IGZyb20gc2VsZWN0b3IsXG4gICAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3IgPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogZG9jdW1lbnRbc2VsZWN0b3IudHlwZV0oc2VsZWN0b3IudmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogd2lsbCBjbGVhbnVwIHRoZSBzdWJzY3JpYmVyIGFuZCBzdGFydCBsaXN0ZW5pbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudHNJbnN0cnVjdG9yXG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnRzSW5zdHJ1Y3Rvcikge1xuICAgICAgICB2YXIgZXZlbnRzSW5zdHJ1Y3RvcklucyA9IG5ldyBldmVudHNJbnN0cnVjdG9yKCk7XG4gICAgICAgIC8vIGNoZWNrIGlmIGdldFN1YnNjcmliZXJzIGlzIGEgZGVmaW5lZCBtZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudHNJbnN0cnVjdG9ySW5zLmdldFN1YnNjcmliZXJzKCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN1YnNjcmliZXJzIGlzIG5vdCBkZWZpbmVkIG9uICcgKyBldmVudHNJbnN0cnVjdG9ySW5zLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpYmVycyA9IGV2ZW50c0luc3RydWN0b3JJbnMuZ2V0U3Vic2NyaWJlcnMoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICAvLyByZWdpc3RlciB0aGUgbGlzdGVuZXJzXG4gICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybnMucHVzaChzZWxmLnNldExpc3RlbmVyKHN1YnNjcmliZXIsIGV2ZW50c0luc3RydWN0b3JJbnMpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3VycmVudFN1YnNjcmliZXJcbiAgICAgKiBAcGFyYW0gZXZlbnRJbnN0cnVjdG9yXG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRMaXN0ZW5lciA9IGZ1bmN0aW9uIChjdXJyZW50U3Vic2NyaWJlciwgZXZlbnRJbnN0cnVjdG9yKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICB2YXIgc2VsZWN0b3JJZDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBpZiB0aGUgc2VsZWN0b3IgaGFzIGRvY3VtZW50IHRoZW4gdGhlIERvY3VtZW50IG9iamVjdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zZWxlY3RvciA9PT0gJ2RvY3VtZW50JyB8fCAhY3VycmVudFN1YnNjcmliZXIuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgICAgIHNlbGVjdG9ySWQgPSAnZG9jdW1lbnQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudCA9IEV2ZW50TWFuYWdlci5nZXRFbGVtZW50KGN1cnJlbnRTdWJzY3JpYmVyLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHNlbGVjdG9ySWQgPSBFdmVudE1hbmFnZXIuZ2V0U2VsZWN0b3JJZChjdXJyZW50U3Vic2NyaWJlci5zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluc3RydWN0b3JOYW1lID0gZXZlbnRJbnN0cnVjdG9yLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHZhciByZXR1cm5zID0gKF9hID0ge30sXG4gICAgICAgICAgICBfYVtpbnN0cnVjdG9yTmFtZV0gPSAoX2IgPSB7fSxcbiAgICAgICAgICAgICAgICBfYltzZWxlY3RvcklkXSA9IHt9LFxuICAgICAgICAgICAgICAgIF9iKSxcbiAgICAgICAgICAgIF9hKTtcbiAgICAgICAgaWYgKCFjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVycykge1xuICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnMgPSBjdXJyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChldmVudHMpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybnNbaW5zdHJ1Y3Rvck5hbWVdW3NlbGVjdG9ySWRdID0gKF9hID0ge30sIF9hW2V2ZW50c10gPSBbXSwgX2EpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzLmhhc093blByb3BlcnR5KGV2ZW50cykpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGxpdHRpbmcgaWYgdGhlIGtleSBpcyBzdHJpbmcsIHRoaXMgYWxsb3cgZXZlbnQgbGlrZSAnY2xpY2sgdG91Y2gnXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50c0FycmF5ID0gZXZlbnRzLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgLy8gYWRkaW5nIGFiaWxpdHkgdG8gY2FsbCB0aGlzLnNjb3BlIGluc2lkZSB0aGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLnNjb3BlID0gZXZlbnRJbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIHZhciByZXNvbHZlcklkXzE7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLmhhc093blByb3BlcnR5KCdyZXNvbHZlcklkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlcklkXzEgPSBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLnJlc29sdmVySWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3JJZCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZXJJZF8xID0gZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5yZXNvbHZlcklkID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlcklkXzEgPSBWYWx1ZVJlc29sdmVyXzEuZGVmYXVsdC5nZXRSZXNvbHZlcklkKHNlbGVjdG9ySWQsIGV2ZW50cywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5yZXNvbHZlcklkID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50T3B0aW9ucyA9IGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10ub3B0aW9ucztcbiAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChjdXJyZW50RXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxCYWNrTmFtZSA9IGluc3RydWN0b3JOYW1lICsgJ18nICsgc2VsZWN0b3JJZCArICdfJyArIGV2ZW50c0FycmF5W2N1cnJlbnRFdmVudF0gKyBFdmVudE1hbmFnZXIuY291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10uaGFzT3duUHJvcGVydHkoJ2NhbGxCYWNrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1tjYWxsQmFja05hbWVdID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10uY2FsbEJhY2suY2FsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBldmVudEluc3RydWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSZXNvbHZlcjogc2VsZi5kYXRhUmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVySWQ6IHJlc29sdmVySWRfMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLnN1YnNjcmliZXJJZCA9IGNhbGxCYWNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNBcnJheVtjdXJyZW50RXZlbnRdLCB3aW5kb3dbY2FsbEJhY2tOYW1lXSwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybmVkIHZhbHVlIHdpbGwgY29udGFpbiBpbmZvcm1hdGlvbiB0aGF0IGNhbiBiZSByZWZlcnJlZCB0byB3aGVuIHVuc3Vic2NyaWJlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zW2luc3RydWN0b3JOYW1lXVtzZWxlY3RvcklkXVtldmVudHNdLnB1c2goY2FsbEJhY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3RbY2FsbEJhY2tOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFja05hbWU6IGNhbGxCYWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnRzQXJyYXlbY3VycmVudEV2ZW50XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2ZW50T3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5zdWJzY3JpYmVySWQgPSBjYWxsQmFja05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLmhhc093blByb3BlcnR5KCdjYWxsQmFja09uZXMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZXNDYWxsQmFja05hbWVfMSA9IGNhbGxCYWNrTmFtZSArICdvbmVzJztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1tvbmVzQ2FsbEJhY2tOYW1lXzFdID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LnR5cGUsIHdpbmRvd1tvbmVzQ2FsbEJhY2tOYW1lXzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5jYWxsQmFja09uZXMuY2FsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBldmVudEluc3RydWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSZXNvbHZlcjogc2VsZi5kYXRhUmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVySWQ6IHJlc29sdmVySWRfMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNBcnJheVtjdXJyZW50RXZlbnRdLCB3aW5kb3dbb25lc0NhbGxCYWNrTmFtZV8xXSwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybmVkIHZhbHVlIHdpbGwgY29udGFpbiBpbmZvcm1hdGlvbiB0aGF0IGNhbiBiZSByZWZlcnJlZCB0byB3aGVuIHVuc3Vic2NyaWJlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zW2luc3RydWN0b3JOYW1lXVtzZWxlY3RvcklkXVtldmVudHNdLnB1c2goY2FsbEJhY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3Rbb25lc0NhbGxCYWNrTmFtZV8xXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFja05hbWU6IG9uZXNDYWxsQmFja05hbWVfMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnRzQXJyYXlbY3VycmVudEV2ZW50XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2ZW50T3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLm9uZXNTdWJzY3JpYmVySWQgPSBvbmVzQ2FsbEJhY2tOYW1lXzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10uaGFzT3duUHJvcGVydHkoJ3Jlc29sdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvbHZlciA9IGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10ucmVzb2x2ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLnVucmVzb2x2ZXJJZCA9IHRoaXNfMS5zZXREYXRhUmVzb2x2ZXIocmVzb2x2ZXIsIHJlc29sdmVySWRfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGN1cnJlbnRFdmVudCBpbiBldmVudHNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBfbG9vcF8yKGN1cnJlbnRFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhpc18xID0gdGhpcztcbiAgICAgICAgZm9yICh2YXIgZXZlbnRzIGluIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGV2ZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1bnN1YnNjcmliYWJsZVxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAodW5zdWJzY3JpYmFibGUpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiB1bnN1YnNjcmliYWJsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBFdmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodW5zdWJzY3JpYmFibGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHNlbGZfMSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKHZhciB1bnN1YiBpbiB1bnN1YnNjcmliYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh1bnN1YnNjcmliYWJsZS5oYXNPd25Qcm9wZXJ0eSh1bnN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZWxlbSBpbiB1bnN1YnNjcmliYWJsZVt1bnN1Yl0pXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5zdWJzY3JpYmFibGVbdW5zdWJdLmhhc093blByb3BlcnR5KGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZXZlbnRfMSBpbiB1bnN1YnNjcmliYWJsZVt1bnN1Yl1bZWxlbV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bnN1YnNjcmliYWJsZVt1bnN1Yl1bZWxlbV0uaGFzT3duUHJvcGVydHkoZXZlbnRfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJhYmxlW3Vuc3ViXVtlbGVtXVtldmVudF8xXS5mb3JFYWNoKGZ1bmN0aW9uICh1bnN1YnNjcmliYWJsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHVuc3Vic2NyaWJhYmxlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gdW5zdWJzY3JpYmFibGVJZFxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uICh1bnN1YnNjcmliYWJsZUlkKSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGlmIChFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W3Vuc3Vic2NyaWJhYmxlSWRdKSB7XG4gICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gRXZlbnRNYW5hZ2VyLnVuc3Vic2NyaWJlTGlzdFt1bnN1YnNjcmliYWJsZUlkXS5lbGVtZW50O1xuICAgICAgICAgICAgdmFyIGV2ZW50XzIgPSBFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W3Vuc3Vic2NyaWJhYmxlSWRdLmV2ZW50O1xuICAgICAgICAgICAgdmFyIGNhbGxCYWNrTmFtZSA9IEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3RbdW5zdWJzY3JpYmFibGVJZF0uY2FsbEJhY2tOYW1lO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W3Vuc3Vic2NyaWJhYmxlSWRdLm9wdGlvbnM7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudF8yLCB3aW5kb3dbY2FsbEJhY2tOYW1lXSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIHN1YnNjcmliZSB0byBhbiBhcnJheSBvZiBldmVudEluc3RydWN0b3JzXG4gICAgICogQHBhcmFtIHN1YnNjcmliZXJzXG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdWJzY3JpYmVycyA9IGZ1bmN0aW9uIChzdWJzY3JpYmVycykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50SW5zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgc2VsZi5zdWJzY3JpYmUoZXZlbnRJbnN0cnVjdG9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5ldmVudHNSZWdpc3RlcmVkRXZlbnQuZmlyZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRPYmplY3RcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgdmFyIGV2ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50T2JqZWN0Lm5hbWUsIHsgZGV0YWlsOiBldmVudE9iamVjdC5kZXRhaWwsIGNhbmNlbGFibGU6IHRydWUgfSk7XG4gICAgICAgIChldmVudE9iamVjdC5lbGVtZW50ID8gZXZlbnRPYmplY3QuZWxlbWVudCA6IGRvY3VtZW50KS5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgdGhpcy5wdWJsaXNoZXJzW2V2ZW50T2JqZWN0Lm5hbWVdID0geyBkZXRhaWw6IGV2ZW50T2JqZWN0LmRldGFpbCB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIGRldGFpbFxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGRldGFpbCkge1xuICAgICAgICB0aGlzLnB1Ymxpc2goe1xuICAgICAgICAgICAgbmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBob2xkIGV2ZW50cyB3aXRoIHRoZWlyIGZ1bmN0aW9uIG5hbWUgYW5kIG9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byB1bnN1YnNjcmliZSBmcm9tIGEgcGFydGljdWxhciBldmVudFxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3QgPSB7fTtcbiAgICBFdmVudE1hbmFnZXIuY291bnRlciA9IDA7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIuZXZlbnRzUmVnaXN0ZXJlZEV2ZW50ID0ge1xuICAgICAgICBuYW1lOiAnZXZlbnRzUmVnaXN0ZXJlZCcsXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RXZlbnQgPSBFdmVudE1hbmFnZXIuZXZlbnRzUmVnaXN0ZXJlZEV2ZW50O1xuICAgICAgICAgICAgdmFyIGV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5maXJlKGN1cnJlbnRFdmVudC5uYW1lLCBkZXRhaWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50TWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50TWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFdmVudE1hbmFnZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi8uLi9FdmVudE1hbmFnZXJcIikpO1xuLyoqXG4gKiBGb29cbiAqIGZvb2JhclxuICovXG52YXIgRm9vID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvbygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmRvY3VtZW50TG9hZFN1YnNjcmliZXJDYWxsQmFjayhldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKF9hID0ge30sXG4gICAgICAgICAgICAgICAgX2FbRm9vLkZvb0V2ZW50Lm5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICBjYWxsQmFjazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YVJlc29sdmVyLmNhbGwodGhpcywgZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IHZhbHVlIG9mIGRhdGU6IFwiLCBkYXRhLnRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYWxsQmFja09uZXM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIGZpcmVkIG9ubHkgb25lc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZXI6IGZ1bmN0aW9uIChsYXRlc3QsIGFsbFJlc29sdmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHJlc29sdmVyIGNhbiBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBkYXRhIGluIHRoZSBjYWxsQmFjayBmdW5jdGlvbiBldmVuIGlmIHRoZSByZXNvbHZlciBmdW5jdGlvbiBpbiBhIGRpZmZlcmVudCBldmVudEluc3RydWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0IG9ubHkgbmVlZCB0byBoYXZlIHRoZSBzYW1lIHNlbGVjdG9yIGFzIHRoZSBzdWJzY3JpYmVyIHdoZXJlIENhbGxCYWNrVmFsdWVSZXNvbHZlci52YWx1ZVJlc29sdmVyIGlzIGNhbGxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVzb2x2ZXIgZGF0YSBjYW4gYmUgZm91bmQgaGVyZTogXCIsIGFsbFJlc29sdmVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9sZCByZXNvbHZlciBkYXRlOiBcIiwgbGF0ZXN0LnRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZSByZXNvbHZlciB3aWxsIGNyZWF0ZSBhIG5ldyBkYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSByZXNvbHZlciB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdGltZTogJ0ZPT09PT08nIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9hKVxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdWJzY3JpcHRpb259XG4gICAgICovXG4gICAgRm9vLnByb3RvdHlwZS5nZXRTdWJzY3JpYmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgRm9vLnByb3RvdHlwZS5kb2N1bWVudExvYWRTdWJzY3JpYmVyQ2FsbEJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50TGlzdGVuZXIgb2YgdHlwZTogXCIgKyBldmVudC50eXBlLCBcIiwgb2YgdGhlIGVsZW1lbnQ6IFwiICsgZXZlbnQudGFyZ2V0LCBcImlzIGNhbGxlZCBmcm9tIFwiICsgRm9vLmNvbnN0cnVjdG9yLm5hbWUsIFwiLCBvbiBkYXRlIG1pbGxpc2Vjb25kOiBcIiArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xuICAgICAgICAvLyBwdWJsaXNoIGFuIGV2ZW50XG4gICAgICAgIEZvby5Gb29FdmVudC5maXJlKHsgdGltZTogZGF0ZSB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNhbiBiZSB1c2VkIHRvIGZpcmUgdGhlIGV2ZW50IGFzIEZvby5Gb29FdmVudC5maXJlKGRldGFpbHMpXG4gICAgICogb3IgY2FuIGJlIGxpc3RlbmVkIHRvIGluIG90aGVyIEluc3RydWN0b3IgYnkgRm9vLkZvb0V2ZW50Lm5hbWVcbiAgICAgKi9cbiAgICBGb28uRm9vRXZlbnQgPSB7XG4gICAgICAgIG5hbWU6ICdGb29FdmVudCcsXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gRm9vLkZvb0V2ZW50O1xuICAgICAgICAgICAgdmFyIGV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuZmlyZShzZWxmLm5hbWUsIGRldGFpbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBGb287XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRm9vO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9vLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEV2ZW50TWFuYWdlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50TWFuYWdlclwiKSk7XG52YXIgVmFsdWVSZXNvbHZlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1ZhbHVlUmVzb2x2ZXJcIikpO1xudmFyIElubGluZUV2ZW50TWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudE1hbmFnZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBJbmxpbmVFdmVudE1hbmFnZXIoZXZlbnRNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gZXZlbnRNYW5hZ2VyO1xuICAgICAgICB0aGlzLnNldFN0cmluZ1N1YnNjcmliZXIoKTtcbiAgICAgICAgdGhpcy5zZXRTdHJpbmdTdWJzY3JpYmVPbmVzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nRXZlbnRWYWx1ZVJlc29sdmVyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nVW5zdWJzY3JpYmVyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nVW5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGFsbG93cyBhIHN0cmluZyB0byBoYXZlIGEgc3Vic2NyaWJlciBwcm90b3R5cGVcbiAgICAgKiAoJ3NlbGVjdG9yJykuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7fSlcbiAgICAgKi9cbiAgICBJbmxpbmVFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldFN0cmluZ1N1YnNjcmliZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gQHR5cGVzY3JpcHQgLWluZ29yZVxuICAgICAgICBTdHJpbmcucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudE9yQ2FsbEJhY2ssIGNhbGxCYWNrT3JSZXNvbHZlciwgcmVzb2x2ZXJPck9wdGlvbiwgZXZlbnRPcHRpb25zT3JPbmVzLCBvbmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5oYW5kbGVJbmxpbmVTdWJzY3JpYmVyKHRoaXMsIGV2ZW50T3JDYWxsQmFjaywgY2FsbEJhY2tPclJlc29sdmVyLCByZXNvbHZlck9yT3B0aW9uLCBldmVudE9wdGlvbnNPck9uZXMsIG9uZXMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogYWxsb3dzIGEgc3RyaW5nIHRvIGhhdmUgYSBzdWJzY3JpYmVyIHByb3RvdHlwZVxuICAgICAqICgnc2VsZWN0b3InKS5zdWJzY3JpYmUoZnVuY3Rpb24oKXt9KVxuICAgICAqL1xuICAgIElubGluZUV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2V0U3RyaW5nRXZlbnRWYWx1ZVJlc29sdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFN0cmluZy5wcm90b3R5cGUudmFsdWVSZXNvbHZlciA9IGZ1bmN0aW9uIChyZXNvbHZlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuaGFuZGxlSW5saW5lU3Vic2NyaWJlci5jYWxsKHRoaXMsIHJlc29sdmVyKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIElubGluZUV2ZW50TWFuYWdlci5wcm90b3R5cGUuaGFuZGxlSW5saW5lU3Vic2NyaWJlciA9IGZ1bmN0aW9uIChzZWxlY3Rvck9yRXZlbnQsIGV2ZW50T3JDYWxsQmFjaywgY2FsbEJhY2tPclJlc29sdmVyLCByZXNvbHZlck9yT3B0aW9uLCBldmVudE9wdGlvbnNPck9uZXMsIG9uZXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZWN0b3I7XG4gICAgICAgIHZhciBldmVudE5hbWU7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICB2YXIgY2FsbEJhY2s7XG4gICAgICAgIHZhciByZXNvbHZlcjtcbiAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgIHZhciBvbmx5T25lcyA9IGZhbHNlO1xuICAgICAgICB2YXIgcmVzb2x2ZXJJc1NldCA9IGZhbHNlO1xuICAgICAgICB2YXIgY2FsbEJhY2tJc1NldCA9IGZhbHNlO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhcmdzXzEgPSBhcmdzOyBfaSA8IGFyZ3NfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBhcmcgPSBhcmdzXzFbX2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnICYmIGFyZyA9PT0gYXJnc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yT3JFdmVudDtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZyA9PT0gYXJnc1sxXSAmJiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nICYmIGFyZy5uYW1lID09PSAncmVzb2x2ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIFZhbHVlUmVzb2x2ZXJfMS5kZWZhdWx0LnNldFJlc29sdmVyKGFyZywgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdkb2N1bWVudCc7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gc2VsZWN0b3JPckV2ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnLm5hbWUgPT09ICcnIHx8IGFyZy5uYW1lICE9PSAncmVzb2x2ZXInIHx8IHJlc29sdmVySXNTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrID0gYXJnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2tJc1NldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnLm5hbWUgPT09ICdyZXNvbHZlcicgfHwgY2FsbEJhY2tJc1NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZXIgPSBhcmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlcklzU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgb25seU9uZXMgPSBhcmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gYXJnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZWN0b3JJZCA9IEV2ZW50TWFuYWdlcl8xLmRlZmF1bHQuZ2V0U2VsZWN0b3JJZCh7XG4gICAgICAgICAgICB0eXBlOiBzZWxlY3RvcixcbiAgICAgICAgICAgIHZhbHVlOiBldmVudE5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjYWxsQmFja05hbWU7XG4gICAgICAgIHZhciByZXNvbHZlcklkID0gVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQuZ2V0UmVzb2x2ZXJJZChzZWxlY3RvciwgZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKGNhbGxCYWNrSXNTZXQpIHtcbiAgICAgICAgICAgIGNhbGxCYWNrTmFtZSA9ICdpbmxpbmVfJyArIHNlbGVjdG9ySWQ7XG4gICAgICAgICAgICB3aW5kb3dbY2FsbEJhY2tOYW1lXSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAob25seU9uZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQudHlwZSwgd2luZG93W2NhbGxCYWNrTmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgY2FsbEJhY2suY2FsbCh7IGRhdGFSZXNvbHZlcjogc2VsZi5ldmVudE1hbmFnZXIuZGF0YVJlc29sdmVyLCByZXNvbHZlcklkOiByZXNvbHZlcklkIH0sIGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdpbmRvd1tjYWxsQmFja05hbWVdLCBvcHRpb25zKTtcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlcl8xLmRlZmF1bHQudW5zdWJzY3JpYmVMaXN0W2NhbGxCYWNrTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgY2FsbEJhY2tOYW1lOiBjYWxsQmFja05hbWUsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvbHZlcklzU2V0KSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBzZWxlY3RvcklkID0gdGhpcy5ldmVudE1hbmFnZXIudmFsdWVSZXNvbHZlci5zZXRSZXNvbHZlcihyZXNvbHZlciwgcmVzb2x2ZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxCYWNrTmFtZSB8fCBzZWxlY3RvcklkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogYWxsb3dzIGEgc3RyaW5nIHRvIGhhdmUgYSBzdWJzY3JpYmVyIHByb3RvdHlwZVxuICAgICAqICgnc2VsZWN0b3InKS5zdWJzY3JpYmUoZnVuY3Rpb24oKXt9KVxuICAgICAqL1xuICAgIElubGluZUV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2V0U3RyaW5nVW5zdWJzY3JpYmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudE1hbmFnZXIudW5zdWJzY3JpYmUodGhpcyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBhbGxvd3MgYSBzdHJpbmcgdG8gaGF2ZSBhIHN1YnNjcmliZXIgcHJvdG90eXBlXG4gICAgICogKCdzZWxlY3RvcicpLnN1YnNjcmliZShmdW5jdGlvbigpe30pXG4gICAgICovXG4gICAgSW5saW5lRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdHJpbmdVbnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdCgpO1xuICAgICAgICBTdHJpbmcucHJvdG90eXBlLnVucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudE1hbmFnZXIudW5yZXNvbHZlKHRoaXMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgSW5saW5lRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdHJpbmdTdWJzY3JpYmVPbmVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFN0cmluZy5wcm90b3R5cGUuc3Vic2NyaWJlT25lcyA9IGZ1bmN0aW9uIChldmVudE9yQ2FsbEJhY2ssIGNhbGxCYWNrT3JSZXNvbHZlciwgcmVzb2x2ZXJPck9wdGlvbiwgZXZlbnRPcHRpb25zT3JPbmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5oYW5kbGVJbmxpbmVTdWJzY3JpYmVyLmNhbGwodGhpcywgZXZlbnRPckNhbGxCYWNrLCBjYWxsQmFja09yUmVzb2x2ZXIsIHJlc29sdmVyT3JPcHRpb24sIGV2ZW50T3B0aW9uc09yT25lcywgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gSW5saW5lRXZlbnRNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IElubGluZUV2ZW50TWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlubGluZUV2ZW50TWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICpcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFZhbHVlUmVzb2x2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmFsdWVSZXNvbHZlcigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcmV0dXJuIGFuIHVuaXF1ZSByZXNvbHZlclxuICAgICAqIEBwYXJhbSBzZWxlY3RvcklkXG4gICAgICogQHBhcmFtIGV2ZW50c1xuICAgICAqL1xuICAgIFZhbHVlUmVzb2x2ZXIuZ2V0UmVzb2x2ZXJJZCA9IGZ1bmN0aW9uIChzZWxlY3RvcklkLCBldmVudHMsIGluY3JlbWVudCkge1xuICAgICAgICBpZiAoaW5jcmVtZW50ID09PSB2b2lkIDApIHsgaW5jcmVtZW50ID0gdHJ1ZTsgfVxuICAgICAgICB2YXIgYWRkaXRpb24gPSBcIlwiO1xuICAgICAgICBpZiAoaW5jcmVtZW50KSB7XG4gICAgICAgICAgICBhZGRpdGlvbiA9IFZhbHVlUmVzb2x2ZXIuY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RvcklkICsgJ18nICsgZXZlbnRzICsgYWRkaXRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvbHZlclxuICAgICAqIEBwYXJhbSByZXNvbHZlcklkXG4gICAgICovXG4gICAgVmFsdWVSZXNvbHZlci5zZXRSZXNvbHZlciA9IGZ1bmN0aW9uIChyZXNvbHZlciwgcmVzb2x2ZXJJZCkge1xuICAgICAgICBpZiAoIVZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzLmhhc093blByb3BlcnR5KHJlc29sdmVySWQpKSB7XG4gICAgICAgICAgICBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tyZXNvbHZlcklkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChyZXNvbHZlci5vcmRlciB8fCB0aGlzLm9yZGVyID49IDApIHtcbiAgICAgICAgICAgIC8vIG9yZGVyIGlzIGRlZmluZWQgaW4gdGhlIHJlc29sdmVyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlcmVzb2x2ZXJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5vcmRlciA+PSAwID8gdGhpcy5vcmRlciA6IHJlc29sdmVyLm9yZGVyO1xuICAgICAgICAgICAgVmFsdWVSZXNvbHZlci5vcmRlciA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZXNvbHZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmVzb2x2ZXIuY2FsbEJhY2sgPSByZXNvbHZlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIFZhbHVlUmVzb2x2ZXIuY291bnRlcisrO1xuICAgICAgICB2YXIgcmVzb2x2ZXJJZGVudGl0eSA9IHJlc29sdmVySWQgKyAnLV8tJyArIFZhbHVlUmVzb2x2ZXIuY291bnRlcjtcbiAgICAgICAgcmVzb2x2ZXIuaWQgPSBWYWx1ZVJlc29sdmVyLmNvdW50ZXI7XG4gICAgICAgIGlmICghVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbcmVzb2x2ZXJJZF1baW5kZXhdKSB7XG4gICAgICAgICAgICBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tyZXNvbHZlcklkXVtpbmRleF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tyZXNvbHZlcklkXVtpbmRleF0ucHVzaChyZXNvbHZlcik7XG4gICAgICAgIC8vIG5vdyB3ZSBzb3J0IHRoZSByZXNvbHZlciB0aGF0IHByaW9yaXR5IGlzIGNvbnNpZGVyZWRcbiAgICAgICAgdmFyIG9yZGVyZWQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbcmVzb2x2ZXJJZF0pLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIG9yZGVyZWRba2V5XSA9IFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3Jlc29sdmVySWRdW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICAvLyByZWFzc2lnbmluZyBzb3J0ZWQgdmFsdWVzXG4gICAgICAgIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3Jlc29sdmVySWRdID0gb3JkZXJlZDtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVySWRlbnRpdHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvbHZlcklkZW50aXR5XG4gICAgICovXG4gICAgVmFsdWVSZXNvbHZlci51bnNldFJlc29sdmVyID0gZnVuY3Rpb24gKHJlc29sdmVySWRlbnRpdHkpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSByZXNvbHZlcklkZW50aXR5LnNwbGl0KCctXy0nKTtcbiAgICAgICAgaWYgKFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXJbMF0pKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByZXNvbHZlcktleSBpbiBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tpZGVudGlmaWVyWzBdXSkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByZXNvbHZlckZ1bmN0aW9uIGluIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW2lkZW50aWZpZXJbMF1dW3Jlc29sdmVyS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbaWRlbnRpZmllclswXV1bcmVzb2x2ZXJLZXldW3Jlc29sdmVyRnVuY3Rpb25dLmlkID09PSBwYXJzZUludChpZGVudGlmaWVyWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbaWRlbnRpZmllclswXV1bcmVzb2x2ZXJLZXldLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm4gdmFsdWUgdGhhdCBpcyBzZXQgaW4gdGhlXG4gICAgICogQHBhcmFtIHJldHVybnNcbiAgICAgKi9cbiAgICBWYWx1ZVJlc29sdmVyLnByb3RvdHlwZS5kYXRhUmVzb2x2ZXIgPSBmdW5jdGlvbiAocmV0dXJucykge1xuICAgICAgICB2YXIgcGFyYW1zQXJyYXkgPSBbXTtcbiAgICAgICAgcGFyYW1zQXJyYXkucHVzaChyZXR1cm5zKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGZvciAodmFyIG9yZGVyIGluIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3RoaXMucmVzb2x2ZXJJZF0pIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3RoaXMucmVzb2x2ZXJJZF0uaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHJlc29sdmVyIGZ1bmN0aW9uIHdpbGwgaGF2ZSBhbGwgcmV0dXJuZWQgdmFsdWUgb2YgYWxsIHJlc29sdmVycyB0aGF0IGhhcyBsZXNzIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbdGhpcy5yZXNvbHZlcklkXVtvcmRlcl0uZm9yRWFjaChmdW5jdGlvbiAocmVzb2x2ZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ2NhbGxCYWNrJyBpbiByZXNvbHZlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zID0gcmVzb2x2ZXJGdW5jdGlvbi5jYWxsQmFjayhyZXR1cm5zLCBwYXJhbXNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zQXJyYXkucHVzaChyZXR1cm5zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHVzZWQgdG8gc2V0IHRoZSBvcmRlciBvZiB0aGUgbmV4dCByZXNvbHZlclxuICAgICAqIEBwYXJhbSBvcmRlclxuICAgICAqL1xuICAgIFZhbHVlUmVzb2x2ZXIuc2V0T3JkZXIgPSBmdW5jdGlvbiAob3JkZXIpIHtcbiAgICAgICAgVmFsdWVSZXNvbHZlci5vcmRlciA9IG9yZGVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaG9sZCBhbGwgcmVzb2x2ZXIgZnVuY3Rpb25zIG9uIHByb3BlciBvcmRlclxuICAgICAqL1xuICAgIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzID0ge307XG4gICAgVmFsdWVSZXNvbHZlci5vcmRlciA9IC0xO1xuICAgIFZhbHVlUmVzb2x2ZXIuY291bnRlciA9IC0xO1xuICAgIHJldHVybiBWYWx1ZVJlc29sdmVyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZhbHVlUmVzb2x2ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1WYWx1ZVJlc29sdmVyLmpzLm1hcCIsIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gIGlmKHR5cGVvZiBFdmVudFRhcmdldCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdpbmRvdy5FdmVudFRhcmdldCA9IE5vZGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBsaXN0ZW5lciBpbnRlcmNlcHRvclxyXG4gICAqL1xyXG5cclxuICB2YXIgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yID0ge1xyXG4gICAgaW50ZXJjZXB0b3JzOiBbXSAvLyB7IHRhcmdldDogRXZlbnRUYXJnZXQsIGludGVyY2VwdG9yczogW3sgYWRkOiBGdW5jdGlvbiwgcmVtb3ZlOiBGdW5jdGlvbiB9LCAuLi5dIH1cclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiBleGlzdHMgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgbGlzdGVuZXIgZnJvbSBhIHRhcmdldCBhbmQgdGhlIG5vcm1hbGl6ZWQgYXJndW1lbnRzXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwYXJhbSBub3JtYWxpemVkQXJndW1lbnRzXHJcbiAgICogQHJldHVybiB7Kn1cclxuICAgKi9cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuZ2V0UmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQsIG5vcm1hbGl6ZWRBcmd1bWVudHMpIHtcclxuICAgIHZhciBrZXkgPSBub3JtYWxpemVkQXJndW1lbnRzLnR5cGUgKyAnLScgKyAobm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLmNhcHR1cmUgPyAnMScgOiAnMCcpO1xyXG4gICAgaWYoXHJcbiAgICAgICh0YXJnZXQuX19ldmVudExpc3RlbmVycyAhPT0gdm9pZCAwKSAmJlxyXG4gICAgICAodGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnNba2V5XSAhPT0gdm9pZCAwKVxyXG4gICAgKSB7XHJcbiAgICAgIHZhciBtYXAgPSB0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldO1xyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYobWFwW2ldLmxpc3RlbmVyID09PSBub3JtYWxpemVkQXJndW1lbnRzLmxpc3RlbmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gbWFwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXJzIGEgbGlzdGVuZXIgb24gYSB0YXJnZXQgd2l0aCBzb21lIG9wdGlvbnNcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICogQHBhcmFtIG5vcm1hbGl6ZWRBcmd1bWVudHNcclxuICAgKi9cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IucmVnaXN0ZXJFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odGFyZ2V0LCBub3JtYWxpemVkQXJndW1lbnRzKSB7XHJcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplZEFyZ3VtZW50cy50eXBlICsgJy0nICsgKG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5jYXB0dXJlID8gJzEnIDogJzAnKTtcclxuXHJcbiAgICBpZih0YXJnZXQuX19ldmVudExpc3RlbmVycyA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnNba2V5XSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzW2tleV0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldLnB1c2gobm9ybWFsaXplZEFyZ3VtZW50cyk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVW5yZWdpc3RlcnMgYSBsaXN0ZW5lciBvbiBhIHRhcmdldCB3aXRoIHNvbWUgb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKiBAcGFyYW0gbm9ybWFsaXplZEFyZ3VtZW50c1xyXG4gICAqL1xyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci51bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCwgbm9ybWFsaXplZEFyZ3VtZW50cykge1xyXG4gICAgdmFyIGtleSA9IG5vcm1hbGl6ZWRBcmd1bWVudHMudHlwZSArICctJyArIChub3JtYWxpemVkQXJndW1lbnRzLm9wdGlvbnMuY2FwdHVyZSA/ICcxJyA6ICcwJyk7XHJcbiAgICBpZihcclxuICAgICAgKHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzICE9PSAgdm9pZCAwKSAmJlxyXG4gICAgICAodGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnNba2V5XSAhPT0gdm9pZCAwKVxyXG4gICAgKSB7XHJcbiAgICAgIHZhciBtYXAgPSB0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldO1xyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYobWFwW2ldLmxpc3RlbmVyID09PSBub3JtYWxpemVkQXJndW1lbnRzLmxpc3RlbmVyKSB7XHJcbiAgICAgICAgICBtYXAuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYobWFwLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3Iubm9ybWFsaXplTGlzdGVuZXJDYWxsYmFjayA9IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XHJcbiAgICBpZigodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB8fCAobGlzdGVuZXIgPT09IG51bGwpIHx8IChsaXN0ZW5lciA9PT0gdm9pZCAwKSkge1xyXG4gICAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgICB9IGVsc2UgaWYoKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCcpICYmICh0eXBlb2YgbGlzdGVuZXIuaGFuZGxlRXZlbnQgPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIHJldHVybiBsaXN0ZW5lci5oYW5kbGVFdmVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHRvIHN1cHBvcnQgU3ltYm9sXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3Iubm9ybWFsaXplTGlzdGVuZXJPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgc3dpdGNoKHR5cGVvZiBvcHRpb25zKSB7XHJcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgIG9wdGlvbnMgPSB7IGNhcHR1cmU6IG9wdGlvbnMgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICBvcHRpb25zID0geyBjYXB0dXJlOiBmYWxzZSB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsKSB7XHJcbiAgICAgICAgICBvcHRpb25zID0geyBjYXB0dXJlOiBmYWxzZSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIG9wdGlvbnMgdHlwZSBmb3IgYWRkRXZlbnRMaXN0ZW5lcicpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMub25jZSAgICAgID0gQm9vbGVhbihvcHRpb25zLm9uY2UpO1xyXG4gICAgb3B0aW9ucy5wYXNzaXZlICAgPSBCb29sZWFuKG9wdGlvbnMucGFzc2l2ZSk7XHJcbiAgICBvcHRpb25zLmNhcHR1cmUgICA9IEJvb2xlYW4ob3B0aW9ucy5jYXB0dXJlKTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3Iubm9ybWFsaXplTGlzdGVuZXJBcmd1bWVudHMgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgbGlzdGVuZXI6IHRoaXMubm9ybWFsaXplTGlzdGVuZXJDYWxsYmFjayhsaXN0ZW5lciksXHJcbiAgICAgIG9wdGlvbnM6IHRoaXMubm9ybWFsaXplTGlzdGVuZXJPcHRpb25zKG9wdGlvbnMpXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG5cclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmludGVyY2VwdCA9IGZ1bmN0aW9uKHRhcmdldCwgaW50ZXJjZXB0b3JzKSB7XHJcbiAgICAvLyBnZXQgYW4gaW50ZXJjZXB0b3Igd2l0aCB0aGlzIHRhcmdldCBvciBudWxsXHJcbiAgICB2YXIgaW50ZXJjZXB0b3IgPSBudWxsO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmludGVyY2VwdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZih0aGlzLmludGVyY2VwdG9yc1tpXS50YXJnZXQgPT09IHRhcmdldCkge1xyXG4gICAgICAgIGludGVyY2VwdG9yID0gdGhpcy5pbnRlcmNlcHRvcnNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBubyBpbnRlcmNlcHRvciBhbHJlYWR5IHNldFxyXG4gICAgaWYgKGludGVyY2VwdG9yID09PSBudWxsKSB7XHJcbiAgICAgIGludGVyY2VwdG9yID0geyB0YXJnZXQ6IHRhcmdldCwgaW50ZXJjZXB0b3JzOiBbaW50ZXJjZXB0b3JzXSB9O1xyXG4gICAgICB0aGlzLmludGVyY2VwdG9ycy5wdXNoKGludGVyY2VwdG9yKTtcclxuXHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0QWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGludGVyY2VwdG9yKTtcclxuICAgICAgdGhpcy5pbnRlcmNlcHRSZW1vdmVFdmVudExpc3RlbmVyKHRhcmdldCwgaW50ZXJjZXB0b3IpO1xyXG4gICAgfSBlbHNlIHsgLy8gaWYgYW4gaW50ZXJjZXB0b3IgYWxyZWFkeSBzZXQsIHNpbXBseSBhZGQgaW50ZXJjZXB0b3JzIHRvIHRoZSBsaXN0XHJcbiAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdG9ycy5wdXNoKGludGVyY2VwdG9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmFyIHJlbGVhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcclxuICAgIC8vICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICAgIC8vIH07XHJcbiAgICAvLyB0aGlzLmludGVyY2VwdG9ycy5wdXNoKHJlbGVhc2UpO1xyXG4gICAgLy8gcmV0dXJuIHJlbGVhc2U7XHJcbiAgfTtcclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmludGVyY2VwdEFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQsIGludGVyY2VwdG9yKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIHZhciBhZGRFdmVudExpc3RlbmVyID0gdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xyXG4gICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIG5vcm1hbGl6ZWRBcmd1bWVudHMgPSBfdGhpcy5ub3JtYWxpemVMaXN0ZW5lckFyZ3VtZW50cyh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbiAgICAgIHZhciByZWdpc3RlcmVkRXZlbnRMaXN0ZW5lciA9IF90aGlzLmdldFJlZ2lzdGVyZWRFdmVudExpc3RlbmVyKHRoaXMsIG5vcm1hbGl6ZWRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgaWYgKCFyZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcikge1xyXG5cclxuICAgICAgICBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQgPSB7XHJcbiAgICAgICAgICB0eXBlOiBub3JtYWxpemVkQXJndW1lbnRzLnR5cGUsXHJcbiAgICAgICAgICBsaXN0ZW5lcjogbm9ybWFsaXplZEFyZ3VtZW50cy5saXN0ZW5lcixcclxuICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgY2FwdHVyZTogbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLmNhcHR1cmUsXHJcbiAgICAgICAgICAgIG9uY2U6IG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5vbmNlLFxyXG4gICAgICAgICAgICBwYXNzaXZlOiBub3JtYWxpemVkQXJndW1lbnRzLm9wdGlvbnMucGFzc2l2ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJjZXB0b3IuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgaW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0b3IuaW50ZXJjZXB0b3JzW2ldO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvcnMuYWRkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGludGVyY2VwdG9ycy5hZGQobm9ybWFsaXplZEFyZ3VtZW50cyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbm9ybWFsaXplZEFyZ3VtZW50cycsIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZCk7XHJcblxyXG4gICAgICAgIF90aGlzLnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcih0aGlzLCBub3JtYWxpemVkQXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lci5jYWxsKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC50eXBlLFxyXG4gICAgICAgICAgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkLmxpc3RlbmVyLFxyXG4gICAgICAgICAgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkLm9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmludGVyY2VwdFJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQsIGludGVyY2VwdG9yKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIHZhciByZW1vdmVFdmVudExpc3RlbmVyID0gdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xyXG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIG5vcm1hbGl6ZWRBcmd1bWVudHMgPSBfdGhpcy5ub3JtYWxpemVMaXN0ZW5lckFyZ3VtZW50cyh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbiAgICAgIHZhciByZWdpc3RlcmVkRXZlbnRMaXN0ZW5lciA9IF90aGlzLmdldFJlZ2lzdGVyZWRFdmVudExpc3RlbmVyKHRoaXMsIG5vcm1hbGl6ZWRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgaWYgKHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgX3RoaXMudW5yZWdpc3RlckV2ZW50TGlzdGVuZXIodGhpcywgbm9ybWFsaXplZEFyZ3VtZW50cyk7XHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgIHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyLnBvbHlmaWxsZWQudHlwZSxcclxuICAgICAgICAgIHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyLnBvbHlmaWxsZWQubGlzdGVuZXIsXHJcbiAgICAgICAgICByZWdpc3RlcmVkRXZlbnRMaXN0ZW5lci5wb2x5ZmlsbGVkLm9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaW50ZXJjZXB0QWxsID0gZnVuY3Rpb24oaW50ZXJjZXB0b3JzKSB7XHJcbiAgICB0aGlzLmludGVyY2VwdChFdmVudFRhcmdldCwgaW50ZXJjZXB0b3JzKTtcclxuICAgIGlmKCEod2luZG93IGluc3RhbmNlb2YgRXZlbnRUYXJnZXQpKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0KFdpbmRvdywgaW50ZXJjZXB0b3JzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IucmVsZWFzZUFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yKHZhciBpID0gMCwgbCA9IHRoaXMuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICB0aGlzLmludGVyY2VwdG9ycygpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgLy8gdGhyb3cgZXJyb3I7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yO1xyXG59KSgpO1xyXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvcikge1xyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGxpc3RlbmVyIHR5cGUgc3VwcG9ydFxyXG4gICAqL1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaXNTdXBwb3J0ZWRPbkV2ZW50ID0gZnVuY3Rpb24odGFyZ2V0LCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKCgnb24nICsgdHlwZSkgaW4gdGFyZ2V0KTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaXNTdXBwb3J0ZWRUcmFuc2l0aW9uRXZlbnQgPSBmdW5jdGlvbih0YXJnZXQsIHR5cGUpIHtcclxuICAgIHJldHVybiBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaXNTdXBwb3J0ZWRPbkV2ZW50KHRhcmdldCwgdHlwZSkgfHwgKCgnc3R5bGUnIGluIHRhcmdldCkgJiYgKHRhcmdldC5zdHlsZVsndHJhbnNpdGlvbiddICE9PSB2b2lkIDApKTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaXNTdXBwb3J0ZWRGdWxsU2NyZWVuRXZlbnQgPSBmdW5jdGlvbih0YXJnZXQsIHR5cGUpIHtcclxuICAgIGlmKEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pc1N1cHBvcnRlZE9uRXZlbnQodGFyZ2V0LCB0eXBlKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKC9ebXMvLnRlc3QodHlwZS50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgIHJldHVybiAnbXNSZXF1ZXN0RnVsbHNjcmVlbicgaW4gZG9jdW1lbnQuYm9keTtcclxuICAgICAgfSBlbHNlIGlmKC9ebW96Ly50ZXN0KHR5cGUpKSB7XHJcbiAgICAgICAgcmV0dXJuICdtb3pSZXF1ZXN0RnVsbHNjcmVlbicgaW4gZG9jdW1lbnQuYm9keTtcclxuICAgICAgfSBlbHNlIGlmKC9ed2Via2l0Ly50ZXN0KHR5cGUpKSB7XHJcbiAgICAgICAgcmV0dXJuICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbicgaW4gZG9jdW1lbnQuYm9keTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmdlbmVyYXRlRXZlbnRUeXBlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmV2ZW50VHlwZXMgPSB7fTsgLy8gbWFwIG9mIHR5cGVzIHRoYXQgcmVzb2x2ZWQgdG8gc29tZXRoaW5nIGVsc2VcclxuICAgIHRoaXMudmVuZG9yUHJlZml4ZXMgPSBbJycsICd3ZWJraXQnLCAnbW96JywgJ21zJywgJ28nXTtcclxuXHJcblxyXG4gICAgdGhpcy5ldmVudFR5cGVzWyd3aGVlbCddID0gWyd3aGVlbCcsICdtb3VzZXdoZWVsJywgJ0RPTU1vdXNlU2Nyb2xsJ10ubWFwKGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgaXNTdXBwb3J0ZWQ6IF90aGlzLmlzU3VwcG9ydGVkT25FdmVudCB9IDtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZXZlbnRUeXBlc1snZnVsbHNjcmVlbmNoYW5nZSddID0gWydmdWxsc2NyZWVuY2hhbmdlJywgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAnbXNmdWxsc2NyZWVuY2hhbmdlJ10ubWFwKGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgaXNTdXBwb3J0ZWQ6IF90aGlzLmlzU3VwcG9ydGVkRnVsbFNjcmVlbkV2ZW50IH0gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ldmVudFR5cGVzWydmdWxsc2NyZWVuZXJyb3InXSA9IFsnZnVsbHNjcmVlbmVycm9yJywgJ21vemZ1bGxzY3JlZW5lcnJvcicsICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InLCAnTVNGdWxsc2NyZWVuRXJyb3InLCAnbXNmdWxsc2NyZWVuZXJyb3InXS5tYXAoZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpc1N1cHBvcnRlZDogX3RoaXMuaXNTdXBwb3J0ZWRGdWxsU2NyZWVuRXZlbnQgfSA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbXHJcbiAgICAgICdwb2ludGVybG9ja2NoYW5nZScsICdwb2ludGVybG9ja2Vycm9yJyxcclxuICAgICAgJ2FuaW1hdGlvbnN0YXJ0JywgJ2FuaW1hdGlvbml0ZXJhdGlvbicsICdhbmltYXRpb25lbmQnLFxyXG4gICAgICAncG9pbnRlcmNhbmNlbCcsICdwb2ludGVyZG93bicsICdwb2ludGVyaG92ZXInLCAncG9pbnRlcm1vdmUnLCAncG9pbnRlcm91dCcsICdwb2ludGVyb3ZlcicsICdwb2ludGVydXAnXHJcbiAgICBdLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICBfdGhpcy5ldmVudFR5cGVzW3R5cGVdID0gX3RoaXMudmVuZG9yUHJlZml4ZXNcclxuICAgICAgICAubWFwKGZ1bmN0aW9uKHByZWZpeCkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogKHByZWZpeCArIHR5cGUpLCBpc1N1cHBvcnRlZDogX3RoaXMuaXNTdXBwb3J0ZWRPbkV2ZW50IH0gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgWyd0cmFuc2l0aW9uc3RhcnQnLCAndHJhbnNpdGlvbnJ1bicsICd0cmFuc2l0aW9uZW5kJ10uZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgIF90aGlzLmV2ZW50VHlwZXNbdHlwZV0gPSBfdGhpcy52ZW5kb3JQcmVmaXhlc1xyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocHJlZml4KSB7XHJcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiAocHJlZml4ICsgdHlwZSksIGlzU3VwcG9ydGVkOiBfdGhpcy5pc1N1cHBvcnRlZFRyYW5zaXRpb25FdmVudCB9IDtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5nZXRTdXBwb3J0ZWRFdmVudFR5cGUgPSBmdW5jdGlvbih0YXJnZXQsIHR5cGUpIHtcclxuICAgIHZhciB0eXBlcyA9IHRoaXMuZXZlbnRUeXBlc1t0eXBlXTtcclxuICAgIGlmKHR5cGVzID09PSB2b2lkIDApIHtcclxuICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3R5cGU7XHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIF90eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgaWYoX3R5cGUuaXNTdXBwb3J0ZWQodGFyZ2V0LCBfdHlwZS50eXBlKSkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZSA6ICcgKyBldmVudFR5cGVzUG9seWZpbGxlcltpXS50eXBlKTtcclxuICAgICAgICAgIHJldHVybiBfdHlwZS50eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdGhpcy5lcnJvcihuZXcgRXJyb3IoJ0V2ZW50IGxpc3RlbmVyIHR5cGUgJyArIFN0cmluZyh0eXBlKSArICcgb24gJyArIFN0cmluZyh0YXJnZXQpICsgJyBpcyBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgZW52aXJvbm1lbnQnKSk7XHJcbiAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IucG9seWZpbGxMaXN0ZW5lckV2ZW50VHlwZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2VuZXJhdGVFdmVudFR5cGVzKCk7XHJcblxyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmludGVyY2VwdEFsbCh7XHJcbiAgICAgIGFkZDogZnVuY3Rpb24obm9ybWFsaXplZEFyZ3VtZW50cykge1xyXG4gICAgICAgIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC50eXBlID0gX3RoaXMuZ2V0U3VwcG9ydGVkRXZlbnRUeXBlKHRoaXMsIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC50eXBlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5wb2x5ZmlsbExpc3RlbmVyRXZlbnRUeXBlcygpO1xyXG5cclxufSkocmVxdWlyZSgnLi9FdmVudExpc3RlbmVySW50ZXJjZXB0b3IuanMnKSk7XG59LHtcIi4vRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmpzXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvcikge1xyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgc3VwcG9ydFxyXG4gICAqL1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuZGV0ZWN0U3VwcG9ydGVkT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnN1cHBvcnRlZE9wdGlvbnMgPSB7XHJcbiAgICAgIG9uY2U6IGZhbHNlLFxyXG4gICAgICBwYXNzaXZlOiBmYWxzZSxcclxuICAgICAgY2FwdHVyZTogZmFsc2UsXHJcblxyXG4gICAgICBhbGw6IGZhbHNlLFxyXG4gICAgICBzb21lOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIGZ1bmN0aW9uKCkge30sIHtcclxuICAgICAgZ2V0IG9uY2UoKSB7XHJcbiAgICAgICAgX3RoaXMuc3VwcG9ydGVkT3B0aW9ucy5vbmNlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldCBwYXNzaXZlKCkge1xyXG4gICAgICAgIF90aGlzLnN1cHBvcnRlZE9wdGlvbnMucGFzc2l2ZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXQgY2FwdHVyZSgpIHtcclxuICAgICAgICBfdGhpcy5zdXBwb3J0ZWRPcHRpb25zLmNhcHR1cmUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdXNlZnVsIHNob3J0Y3V0cyB0byBkZXRlY3QgaWYgb3B0aW9ucyBhcmUgYWxsL3NvbWUgc3VwcG9ydGVkXHJcbiAgICB0aGlzLnN1cHBvcnRlZE9wdGlvbnMuYWxsICA9IHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5vbmNlICYmIHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5wYXNzaXZlICYmIHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5jYXB0dXJlO1xyXG4gICAgdGhpcy5zdXBwb3J0ZWRPcHRpb25zLnNvbWUgPSB0aGlzLnN1cHBvcnRlZE9wdGlvbnMub25jZSB8fCB0aGlzLnN1cHBvcnRlZE9wdGlvbnMucGFzc2l2ZSB8fCB0aGlzLnN1cHBvcnRlZE9wdGlvbnMuY2FwdHVyZTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IucG9seWZpbGxMaXN0ZW5lck9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZGV0ZWN0U3VwcG9ydGVkT3B0aW9ucygpO1xyXG4gICAgaWYgKCF0aGlzLnN1cHBvcnRlZE9wdGlvbnMuYWxsKSB7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICB0aGlzLmludGVyY2VwdEFsbCh7XHJcbiAgICAgICAgYWRkOiBmdW5jdGlvbihub3JtYWxpemVkQXJndW1lbnRzKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW50ZXJjZXB0ZWQnLCBub3JtYWxpemVkQXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICB2YXIgb25jZSA9IG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5vbmNlICYmICFfdGhpcy5zdXBwb3J0ZWRPcHRpb25zLm9uY2U7XHJcbiAgICAgICAgICB2YXIgcGFzc2l2ZSA9IG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5wYXNzaXZlICYmICFfdGhpcy5zdXBwb3J0ZWRPcHRpb25zLnBhc3NpdmU7XHJcblxyXG4gICAgICAgICAgaWYgKG9uY2UgfHwgcGFzc2l2ZSkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQubGlzdGVuZXI7XHJcblxyXG4gICAgICAgICAgICBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQubGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgIGlmKG9uY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihub3JtYWxpemVkQXJndW1lbnRzLnR5cGUsIG5vcm1hbGl6ZWRBcmd1bWVudHMubGlzdGVuZXIsIG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihwYXNzaXZlKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwcmV2ZW50RGVmYXVsdCBpbnNpZGUgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBpbnZvY2F0aW9uLicpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIV90aGlzLnN1cHBvcnRlZE9wdGlvbnMuc29tZSkge1xyXG4gICAgICAgICAgICBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQub3B0aW9ucyA9IG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5jYXB0dXJlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5wb2x5ZmlsbExpc3RlbmVyT3B0aW9ucygpO1xyXG5cclxuXHJcbiAgLy8gdmFyIG9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAvLyAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG4gIC8vIH07XHJcblxyXG4gIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbmNsaWNrLCBmYWxzZSk7XHJcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uY2xpY2ssIHsgb25jZTogdHJ1ZSB9KTtcclxuICAvLyBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljaywgeyBvbmNlOiB0cnVlIH0pO1xyXG4gIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbmNsaWNrLCBmYWxzZSk7XHJcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uY2xpY2ssIGZhbHNlKTtcclxuXHJcbn0pKHJlcXVpcmUoJy4vRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmpzJykpO1xufSx7XCIuL0V2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5qc1wiOjF9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiBBcHBseVRoaXNQcm90b3R5cGUoZXZlbnQsIHRhcmdldCkge1xyXG4gICAgaWYgKCh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JykgJiYgKHRhcmdldCAhPT0gbnVsbCkpIHtcclxuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XHJcbiAgICAgIHZhciBwcm9wZXJ0eTtcclxuXHJcbiAgICAgIGZvciAocHJvcGVydHkgaW4gcHJvdG8pIHtcclxuICAgICAgICBpZiAoIShwcm9wZXJ0eSBpbiBldmVudCkpIHtcclxuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvcGVydHkpO1xyXG4gICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKHByb3BlcnR5IGluIHRhcmdldCkge1xyXG4gICAgICAgIGlmICghKHByb3BlcnR5IGluIGV2ZW50KSkge1xyXG4gICAgICAgICAgZXZlbnRbcHJvcGVydHldID0gdGFyZ2V0W3Byb3BlcnR5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxufSx7fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgQ3VzdG9tRXZlbnRcclxuICAgKi9cclxuICB0cnkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgnZXZlbnQnLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHZhciBDdXN0b21FdmVudE9yaWdpbmFsID0gd2luZG93LkN1c3RvbUV2ZW50IHx8IHdpbmRvdy5FdmVudDtcclxuICAgIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgcGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcbiAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChcclxuICAgICAgICBldmVudE5hbWUsXHJcbiAgICAgICAgKHBhcmFtcy5idWJibGVzID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYnViYmxlcyxcclxuICAgICAgICAocGFyYW1zLmNhbmNlbGFibGUgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jYW5jZWxhYmxlLFxyXG4gICAgICAgIChwYXJhbXMuZGV0YWlsID09PSB2b2lkIDApID8ge30gOiBwYXJhbXMuZGV0YWlsXHJcbiAgICAgICk7XHJcbiAgICAgIEFwcGx5VGhpc1Byb3RvdHlwZShldmVudCwgdGhpcyk7XHJcbiAgICAgIHJldHVybiBldmVudDtcclxuICAgIH07XHJcbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSBDdXN0b21FdmVudE9yaWdpbmFsLnByb3RvdHlwZTtcclxuICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xyXG4gIH1cclxufSkocmVxdWlyZSgnLi9BcHBseVRoaXNQcm90b3R5cGUuanMnKSk7XG59LHtcIi4vQXBwbHlUaGlzUHJvdG90eXBlLmpzXCI6NH1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKEFwcGx5VGhpc1Byb3RvdHlwZSkge1xyXG4gIC8vIOKckywg4pyXXHJcblxyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIEV2ZW50XHJcbiAgICovXHJcbiAgdHJ5IHtcclxuICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuRXZlbnQoJ2V2ZW50JywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgIHZhciBFdmVudE9yaWdpbmFsID0gd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBwYXJhbXMpIHtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcclxuICAgICAgZXZlbnQuaW5pdEV2ZW50KFxyXG4gICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICAocGFyYW1zLmJ1YmJsZXMgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5idWJibGVzLFxyXG4gICAgICAgIChwYXJhbXMuY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmNhbmNlbGFibGUsXHJcbiAgICAgICAgKHBhcmFtcy5kZXRhaWwgPT09IHZvaWQgMCkgPyB7fSA6IHBhcmFtcy5kZXRhaWxcclxuICAgICAgKTtcclxuICAgICAgQXBwbHlUaGlzUHJvdG90eXBlKGV2ZW50LCB0aGlzKTtcclxuICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfTtcclxuICAgIEV2ZW50LnByb3RvdHlwZSA9IEV2ZW50T3JpZ2luYWwucHJvdG90eXBlO1xyXG4gICAgd2luZG93LkV2ZW50ID0gRXZlbnQ7XHJcbiAgfVxyXG59KShyZXF1aXJlKCcuL0FwcGx5VGhpc1Byb3RvdHlwZS5qcycpKTtcbn0se1wiLi9BcHBseVRoaXNQcm90b3R5cGUuanNcIjo0fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgRm9jdXNFdmVudCA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Gb2N1c0V2ZW50L0ZvY3VzRXZlbnRcclxuICAgKiAgLSByZWxhdGVkVGFyZ2V0IOKck1xyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgd2luZG93LkZvY3VzRXZlbnQoJ2V2ZW50JywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB2YXIgRm9jdXNFdmVudE9yaWdpbmFsID0gd2luZG93LkZvY3VzRXZlbnQgfHwgd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIEZvY3VzRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIHBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XHJcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdGb2N1c0V2ZW50Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2ZmOTc1OTU0KHY9dnMuODUpLmFzcHhcclxuICAgICAgZXZlbnQuaW5pdEZvY3VzRXZlbnQoXHJcbiAgICAgICAgZXZlbnROYW1lLFxyXG4gICAgICAgIChwYXJhbXMuYnViYmxlcyA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmJ1YmJsZXMsXHJcbiAgICAgICAgKHBhcmFtcy5jYW5jZWxhYmxlID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY2FuY2VsYWJsZSxcclxuICAgICAgICAocGFyYW1zLnZpZXcgPT09IHZvaWQgMCkgPyB3aW5kb3cgOiBwYXJhbXMudmlldyxcclxuICAgICAgICAocGFyYW1zLmRldGFpbCA9PT0gdm9pZCAwKSA/IHt9IDogcGFyYW1zLmRldGFpbCxcclxuICAgICAgICAocGFyYW1zLnJlbGF0ZWRUYXJnZXQgPT09IHZvaWQgMCkgPyBudWxsIDogcGFyYW1zLnJlbGF0ZWRUYXJnZXRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIEFwcGx5VGhpc1Byb3RvdHlwZShldmVudCwgdGhpcyk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9O1xyXG4gICAgRm9jdXNFdmVudC5wcm90b3R5cGUgPSBGb2N1c0V2ZW50T3JpZ2luYWwucHJvdG90eXBlO1xyXG4gICAgd2luZG93LkZvY3VzRXZlbnQgPSBGb2N1c0V2ZW50O1xyXG4gIH1cclxufSkocmVxdWlyZSgnLi9BcHBseVRoaXNQcm90b3R5cGUuanMnKSk7XG59LHtcIi4vQXBwbHlUaGlzUHJvdG90eXBlLmpzXCI6NH1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKEFwcGx5VGhpc1Byb3RvdHlwZSkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIEtleWJvYXJkRXZlbnQgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9LZXlib2FyZEV2ZW50XHJcbiAgICogIC0ga2V5IOKck1xyXG4gICAqICAtIGNoYXIg4pyTXHJcbiAgICogIC0gY29kZSDinJNcclxuICAgKiAgLSBsb2NhdGlvbiDinJNcclxuICAgKiAgLSBjdHJsS2V5IOKck1xyXG4gICAqICAtIHNoaWZ0S2V5IOKck1xyXG4gICAqICAtIGFsdEtleSDinJNcclxuICAgKiAgLSBtZXRhS2V5IOKck1xyXG4gICAqICAtIHJlcGVhdCDinJNcclxuICAgKiAgLSBpc0NvbXBvc2luZyDinJdcclxuICAgKiAgLSBjaGFyQ29kZSDinJNcclxuICAgKiAgLSBrZXlDb2RlIOKck1xyXG4gICAqICAtIHdoaWNoIOKck1xyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgd2luZG93LktleWJvYXJkRXZlbnQoJ2V2ZW50JywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB2YXIgS2V5Ym9hcmRFdmVudE9yaWdpbmFsID0gd2luZG93LktleWJvYXJkRXZlbnQgfHwgd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIEtleWJvYXJkRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIHBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XHJcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdLZXlib2FyZEV2ZW50Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2ZmOTc1Mjk3KHY9dnMuODUpLmFzcHhcclxuICAgICAgZXZlbnQuaW5pdEtleWJvYXJkRXZlbnQoXHJcbiAgICAgICAgZXZlbnROYW1lLFxyXG4gICAgICAgIChwYXJhbXMuYnViYmxlcyA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmJ1YmJsZXMsXHJcbiAgICAgICAgKHBhcmFtcy5jYW5jZWxhYmxlID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY2FuY2VsYWJsZSxcclxuICAgICAgICAocGFyYW1zLnZpZXcgPT09IHZvaWQgMCkgPyB3aW5kb3cgOiBwYXJhbXMudmlldyxcclxuICAgICAgICAocGFyYW1zLmtleSA9PT0gdm9pZCAwKSA/ICcnIDogcGFyYW1zLmtleSxcclxuICAgICAgICAocGFyYW1zLmxvY2F0aW9uID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5sb2NhdGlvbixcclxuICAgICAgICAoKHBhcmFtcy5jdHJsS2V5ID09PSB0cnVlKSA/ICdDb250cm9sICcgOiAnJykgK1xyXG4gICAgICAgICgocGFyYW1zLmFsdEtleSA9PT0gdHJ1ZSkgPyAnQWx0ICcgOiAnJykgK1xyXG4gICAgICAgICgocGFyYW1zLnNoaWZ0S2V5ID09PSB0cnVlKSA/ICdTaGlmdCAnIDogJycpICtcclxuICAgICAgICAoKHBhcmFtcy5tZXRhS2V5ID09PSB0cnVlKSA/ICdNZXRhICcgOiAnJyksXHJcbiAgICAgICAgKHBhcmFtcy5yZXBlYXQgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5yZXBlYXQsXHJcbiAgICAgICAgKHBhcmFtcy5sb2NhbGUgPT09IHZvaWQgMCkgPyBuYXZpZ2F0b3IubGFuZ3VhZ2UgOiBwYXJhbXMubG9jYWxlXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBldmVudC5rZXlDb2RlICAgPSAocGFyYW1zLmtleUNvZGUgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmtleUNvZGU7XHJcbiAgICAgIGV2ZW50LmNvZGUgICAgICA9IChwYXJhbXMuY29kZSA9PT0gdm9pZCAwKSA/ICcnIDogcGFyYW1zLmNvZGU7XHJcbiAgICAgIGV2ZW50LmNoYXJDb2RlICA9IChwYXJhbXMuY2hhckNvZGUgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmNoYXJDb2RlO1xyXG4gICAgICBldmVudC5jaGFyICAgICAgPSAocGFyYW1zLmNoYXJDb2RlID09PSB2b2lkIDApID8gJycgOiBwYXJhbXMuY2hhckNvZGU7XHJcbiAgICAgIGV2ZW50LndoaWNoICAgICA9IChwYXJhbXMud2hpY2ggPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLndoaWNoO1xyXG5cclxuICAgICAgQXBwbHlUaGlzUHJvdG90eXBlKGV2ZW50LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudDtcclxuICAgIH07XHJcbiAgICBLZXlib2FyZEV2ZW50LnByb3RvdHlwZSA9IEtleWJvYXJkRXZlbnRPcmlnaW5hbC5wcm90b3R5cGU7XHJcbiAgICB3aW5kb3cuS2V5Ym9hcmRFdmVudCA9IEtleWJvYXJkRXZlbnQ7XHJcbiAgfVxyXG5cclxufSkocmVxdWlyZSgnLi9BcHBseVRoaXNQcm90b3R5cGUuanMnKSk7XG59LHtcIi4vQXBwbHlUaGlzUHJvdG90eXBlLmpzXCI6NH1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKEFwcGx5VGhpc1Byb3RvdHlwZSkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIE1vdXNlRXZlbnQgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9Nb3VzZUV2ZW50XHJcbiAgICogIC0gc2NyZWVuWCDinJNcclxuICAgKiAgLSBzY3JlZW5ZIOKck1xyXG4gICAqICAtIGNsaWVudFgg4pyTXHJcbiAgICogIC0gY2xpZW50WSDinJNcclxuICAgKiAgLSBjdHJsS2V5IOKck1xyXG4gICAqICAtIHNoaWZ0S2V5IOKck1xyXG4gICAqICAtIGFsdEtleSDinJNcclxuICAgKiAgLSBtZXRhS2V5IOKck1xyXG4gICAqICAtIGJ1dHRvbiDinJNcclxuICAgKiAgLSBidXR0b25zIOKck1xyXG4gICAqICAtIHJlZ2lvbiDinJNcclxuICAgKi9cclxuICB0cnkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IHdpbmRvdy5Nb3VzZUV2ZW50KCdldmVudCcsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdmFyIE1vdXNlRXZlbnRPcmlnaW5hbCA9IHdpbmRvdy5Nb3VzZUV2ZW50IHx8IHdpbmRvdy5FdmVudDtcclxuICAgIHZhciBNb3VzZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBwYXJhbXMpIHtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9mZjk3NTI5Mih2PXZzLjg1KS5hc3B4XHJcbiAgICAgIGV2ZW50LmluaXRNb3VzZUV2ZW50KFxyXG4gICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICAocGFyYW1zLmJ1YmJsZXMgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5idWJibGVzLFxyXG4gICAgICAgIChwYXJhbXMuY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmNhbmNlbGFibGUsXHJcbiAgICAgICAgKHBhcmFtcy52aWV3ID09PSB2b2lkIDApID8gd2luZG93IDogcGFyYW1zLnZpZXcsXHJcbiAgICAgICAgKHBhcmFtcy5kZXRhaWwgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmRldGFpbCxcclxuICAgICAgICAocGFyYW1zLnNjcmVlblggPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnNjcmVlblgsXHJcbiAgICAgICAgKHBhcmFtcy5zY3JlZW5ZID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5zY3JlZW5ZLFxyXG4gICAgICAgIChwYXJhbXMuY2xpZW50WCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuY2xpZW50WCxcclxuICAgICAgICAocGFyYW1zLmNsaWVudFkgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmNsaWVudFksXHJcbiAgICAgICAgKHBhcmFtcy5jdHJsS2V5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY3RybEtleSxcclxuICAgICAgICAocGFyYW1zLmFsdEtleSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmFsdEtleSxcclxuICAgICAgICAocGFyYW1zLnNoaWZ0S2V5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuc2hpZnRLZXksXHJcbiAgICAgICAgKHBhcmFtcy5tZXRhS2V5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMubWV0YUtleSxcclxuICAgICAgICAocGFyYW1zLmJ1dHRvbiA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuYnV0dG9uLFxyXG4gICAgICAgIChwYXJhbXMucmVsYXRlZFRhcmdldCA9PT0gdm9pZCAwKSA/IG51bGwgOiBwYXJhbXMucmVsYXRlZFRhcmdldFxyXG4gICAgICApO1xyXG5cclxuICAgICAgZXZlbnQuYnV0dG9ucyA9IChwYXJhbXMuYnV0dG9ucyA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuYnV0dG9ucztcclxuICAgICAgZXZlbnQucmVnaW9uICA9IChwYXJhbXMucmVnaW9uID09PSB2b2lkIDApID8gbnVsbCA6IHBhcmFtcy5yZWdpb247XHJcblxyXG4gICAgICBBcHBseVRoaXNQcm90b3R5cGUoZXZlbnQsIHRoaXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfTtcclxuICAgIE1vdXNlRXZlbnQucHJvdG90eXBlID0gTW91c2VFdmVudE9yaWdpbmFsLnByb3RvdHlwZTtcclxuICAgIHdpbmRvdy5Nb3VzZUV2ZW50ID0gTW91c2VFdmVudDtcclxuICB9XHJcbn0pKHJlcXVpcmUoJy4vQXBwbHlUaGlzUHJvdG90eXBlLmpzJykpO1xufSx7XCIuL0FwcGx5VGhpc1Byb3RvdHlwZS5qc1wiOjR9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgUG9pbnRlckV2ZW50XHJcbiAgICogIC0gcG9pbnRlcklkIOKck1xyXG4gICAqICAtIHdpZHRoIOKck1xyXG4gICAqICAtIGhlaWdodCDinJNcclxuICAgKiAgLSBwcmVzc3VyZSDinJNcclxuICAgKiAgLSB0YW5nZW50aWFsUHJlc3N1cmUg4pyTXHJcbiAgICogIC0gdGlsdFgg4pyTXHJcbiAgICogIC0gdGlsdFkg4pyTXHJcbiAgICogIC0gdHdpc3Qg4pyTXHJcbiAgICogIC0gcG9pbnRlclR5cGUg4pyTXHJcbiAgICogIC0gaXNQcmltYXJ5IOKck1xyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgd2luZG93LlBvaW50ZXJFdmVudCgnZXZlbnQnLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHZhciBQb2ludGVyRXZlbnRPcmlnaW5hbCA9IHdpbmRvdy5Qb2ludGVyRXZlbnQgfHwgd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIFBvaW50ZXJFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgcGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1BvaW50ZXJFdmVudCcpO1xyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9qajE5MjAzOSh2PXZzLjg1KS5hc3B4XHJcbiAgICAgIGV2ZW50LmluaXRQb2ludGVyRXZlbnQoXHJcbiAgICAgICAgZXZlbnROYW1lLFxyXG4gICAgICAgIChwYXJhbXMuYnViYmxlcyA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmJ1YmJsZXMsXHJcbiAgICAgICAgKHBhcmFtcy5jYW5jZWxhYmxlID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY2FuY2VsYWJsZSxcclxuICAgICAgICAocGFyYW1zLnZpZXcgPT09IHZvaWQgMCkgPyB3aW5kb3cgOiBwYXJhbXMudmlldyxcclxuICAgICAgICAocGFyYW1zLmRldGFpbCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuZGV0YWlsLFxyXG4gICAgICAgIChwYXJhbXMuc2NyZWVuWCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuc2NyZWVuWCxcclxuICAgICAgICAocGFyYW1zLnNjcmVlblkgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnNjcmVlblksXHJcbiAgICAgICAgKHBhcmFtcy5jbGllbnRYID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5jbGllbnRYLFxyXG4gICAgICAgIChwYXJhbXMuY2xpZW50WSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuY2xpZW50WSxcclxuICAgICAgICAocGFyYW1zLmN0cmxLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jdHJsS2V5LFxyXG4gICAgICAgIChwYXJhbXMuYWx0S2V5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYWx0S2V5LFxyXG4gICAgICAgIChwYXJhbXMuc2hpZnRLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5zaGlmdEtleSxcclxuICAgICAgICAocGFyYW1zLm1ldGFLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5tZXRhS2V5LFxyXG4gICAgICAgIChwYXJhbXMuYnV0dG9uID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5idXR0b24sXHJcbiAgICAgICAgKHBhcmFtcy5yZWxhdGVkVGFyZ2V0ID09PSB2b2lkIDApID8gbnVsbCA6IHBhcmFtcy5yZWxhdGVkVGFyZ2V0LFxyXG5cclxuICAgICAgICAocGFyYW1zLm9mZnNldFggID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5vZmZzZXRYLFxyXG4gICAgICAgIChwYXJhbXMub2Zmc2V0WSAgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLm9mZnNldFksXHJcbiAgICAgICAgKHBhcmFtcy53aWR0aCA9PT0gdm9pZCAwKSA/IDEgOiBwYXJhbXMud2lkdGgsXHJcbiAgICAgICAgKHBhcmFtcy5oZWlnaHQgPT09IHZvaWQgMCkgPyAxIDogcGFyYW1zLmhlaWdodCxcclxuICAgICAgICAocGFyYW1zLnByZXNzdXJlID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5wcmVzc3VyZSxcclxuICAgICAgICAocGFyYW1zLnR3aXN0ID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy50d2lzdCxcclxuICAgICAgICAocGFyYW1zLnRpbHRYID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy50aWx0WCxcclxuICAgICAgICAocGFyYW1zLnRpbHRZID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy50aWx0WSxcclxuICAgICAgICAocGFyYW1zLnBvaW50ZXJJZCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMucG9pbnRlcklkLFxyXG4gICAgICAgIChwYXJhbXMucG9pbnRlclR5cGUgPT09IHZvaWQgMCkgPyAnJyA6IHBhcmFtcy5wb2ludGVyVHlwZSxcclxuICAgICAgICAocGFyYW1zLmh3VGltZXN0YW1wID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5od1RpbWVzdGFtcCxcclxuICAgICAgICAocGFyYW1zLmlzUHJpbWFyeSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmlzUHJpbWFyeVxyXG4gICAgICApO1xyXG5cclxuICAgICAgZXZlbnQudGFuZ2VudGlhbFByZXNzdXJlID0gKHBhcmFtcy50YW5nZW50aWFsUHJlc3N1cmUgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnRhbmdlbnRpYWxQcmVzc3VyZTtcclxuXHJcbiAgICAgIEFwcGx5VGhpc1Byb3RvdHlwZShldmVudCwgdGhpcyk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIFBvaW50ZXJFdmVudC5wcm90b3R5cGUgPSBQb2ludGVyRXZlbnRPcmlnaW5hbC5wcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIHJvdGF0aW9uRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoUG9pbnRlckV2ZW50LnByb3RvdHlwZSwgJ3JvdGF0aW9uJyk7XHJcbiAgICBpZiAocm90YXRpb25EZXNjcmlwdG9yKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQb2ludGVyRXZlbnQucHJvdG90eXBlLCAndHdpc3QnLCByb3RhdGlvbkRlc2NyaXB0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5Qb2ludGVyRXZlbnQgPSBQb2ludGVyRXZlbnQ7XHJcbiAgfVxyXG59KShyZXF1aXJlKCcuL0FwcGx5VGhpc1Byb3RvdHlwZS5qcycpKTtcbn0se1wiLi9BcHBseVRoaXNQcm90b3R5cGUuanNcIjo0fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi9FdmVudC5qcycpO1xyXG5yZXF1aXJlKCcuL0N1c3RvbUV2ZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vTW91c2VFdmVudC5qcycpO1xyXG5yZXF1aXJlKCcuL0tleWJvYXJkRXZlbnQuanMnKTtcclxucmVxdWlyZSgnLi9Gb2N1c0V2ZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vUG9pbnRlckV2ZW50LmpzJyk7XG59LHtcIi4vQ3VzdG9tRXZlbnQuanNcIjo1LFwiLi9FdmVudC5qc1wiOjYsXCIuL0ZvY3VzRXZlbnQuanNcIjo3LFwiLi9LZXlib2FyZEV2ZW50LmpzXCI6OCxcIi4vTW91c2VFdmVudC5qc1wiOjksXCIuL1BvaW50ZXJFdmVudC5qc1wiOjEwfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi9jb25zdHJ1Y3RvcnMvaW5kZXguanMnKTtcclxucmVxdWlyZSgnLi9MaXN0ZW5lck9wdGlvbnMuanMnKTtcclxucmVxdWlyZSgnLi9MaXN0ZW5lckV2ZW50VHlwZXMuanMnKTtcclxuXG59LHtcIi4vTGlzdGVuZXJFdmVudFR5cGVzLmpzXCI6MixcIi4vTGlzdGVuZXJPcHRpb25zLmpzXCI6MyxcIi4vY29uc3RydWN0b3JzL2luZGV4LmpzXCI6MTF9XX0se30sWzEyXSk7XG4iLCJpbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gXCIuLi9saWIvRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgVmFsdWVSZXNvbHZlciBmcm9tIFwiLi4vbGliL1ZhbHVlUmVzb2x2ZXJcIiAvLyBjaGFuZ2UgdGhlIGRpcmVjdG9yeVdoZXJlXG5pbXBvcnQgRm9vIGZyb20gXCIuLy4uL2xpYi9Gb28vRm9vXCI7XG5pbXBvcnQgQmFyIGZyb20gXCIuLy4uL2xpYi9CYXIvQmFyXCI7XG5pbXBvcnQgRm9CYXIgZnJvbSBcIi4vLi4vZm9iYXIvRm9iYXJcIlxuY29uc3QgZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICgnYm9keScpLnN1YnNjcmliZSgnY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5jb25zb2xlLmxvZygnaW50ZXJzdGluZycsIGV2ZW50KTtcblx0Y29uc29sZS5sb2codGhpcy5kYXRhUmVzb2x2ZXIuY2FsbCh0aGlzLDUpKX0pXG5ldmVudE1hbmFnZXJcblx0LnNldFN1YnNjcmliZXJzKCBbRm9CYXJdIClcblxuXHR3aW5kb3cuZXZlbnRNYW5hZ2VyID0gZXZlbnRNYW5hZ2VyXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9