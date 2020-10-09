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

    if (!EventManager.eventRegistered) {
      EventManager.eventsRegisteredEvent.fire({
        date: new Date()
      });
      EventManager.eventRegistered = true;
    }

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

      if (events === 'selector') {
        return "continue";
      }

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

    if (!EventManager.eventRegistered) {
      EventManager.eventsRegisteredEvent.fire({
        date: new Date()
      });
      EventManager.eventRegistered = true;
    }
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
  EventManager.eventRegistered = false;
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
!(function webpackMissingModule() { var e = new Error("Cannot find module './../lib/Foo/Foo'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

 // change the directoryWhere


var eventManager = new _lib_EventManager__WEBPACK_IMPORTED_MODULE_0___default.a(); // ('body').subscribe('click', function(event){
// 	console.log('intersting', event);
// 	console.log(this.dataResolver.call(this,5))})

eventManager.setSubscribers([!(function webpackMissingModule() { var e = new Error("Cannot find module './../lib/Foo/Foo'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())]);
window.eventManager = eventManager;
window.foo = !(function webpackMissingModule() { var e = new Error("Cannot find module './../lib/Foo/Foo'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9FdmVudE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbmxpbmVFdmVudE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9WYWx1ZVJlc29sdmVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudHMtcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2luZGV4LmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiRXZlbnRUYXJnZXQiLCJ3aW5kb3ciLCJOb2RlIiwiRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yIiwiaW50ZXJjZXB0b3JzIiwiZ2V0UmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJub3JtYWxpemVkQXJndW1lbnRzIiwia2V5IiwidHlwZSIsIm9wdGlvbnMiLCJjYXB0dXJlIiwiX19ldmVudExpc3RlbmVycyIsIm1hcCIsImxpc3RlbmVyIiwicmVnaXN0ZXJFdmVudExpc3RlbmVyIiwicHVzaCIsInVucmVnaXN0ZXJFdmVudExpc3RlbmVyIiwic3BsaWNlIiwibm9ybWFsaXplTGlzdGVuZXJDYWxsYmFjayIsImhhbmRsZUV2ZW50IiwiZXZlbnQiLCJub3JtYWxpemVMaXN0ZW5lck9wdGlvbnMiLCJvbmNlIiwiQm9vbGVhbiIsInBhc3NpdmUiLCJub3JtYWxpemVMaXN0ZW5lckFyZ3VtZW50cyIsImludGVyY2VwdCIsImludGVyY2VwdG9yIiwiaW50ZXJjZXB0QWRkRXZlbnRMaXN0ZW5lciIsImludGVyY2VwdFJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfdGhpcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm90b3R5cGUiLCJyZWdpc3RlcmVkRXZlbnRMaXN0ZW5lciIsInBvbHlmaWxsZWQiLCJhZGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW50ZXJjZXB0QWxsIiwiV2luZG93IiwicmVsZWFzZUFsbCIsImwiLCJlcnJvciIsImNvbnNvbGUiLCJpc1N1cHBvcnRlZE9uRXZlbnQiLCJpc1N1cHBvcnRlZFRyYW5zaXRpb25FdmVudCIsInN0eWxlIiwiaXNTdXBwb3J0ZWRGdWxsU2NyZWVuRXZlbnQiLCJ0ZXN0IiwidG9Mb3dlckNhc2UiLCJkb2N1bWVudCIsImJvZHkiLCJnZW5lcmF0ZUV2ZW50VHlwZXMiLCJldmVudFR5cGVzIiwidmVuZG9yUHJlZml4ZXMiLCJpc1N1cHBvcnRlZCIsImZvckVhY2giLCJwcmVmaXgiLCJnZXRTdXBwb3J0ZWRFdmVudFR5cGUiLCJ0eXBlcyIsIl90eXBlIiwicG9seWZpbGxMaXN0ZW5lckV2ZW50VHlwZXMiLCJkZXRlY3RTdXBwb3J0ZWRPcHRpb25zIiwic3VwcG9ydGVkT3B0aW9ucyIsImFsbCIsInNvbWUiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwicG9seWZpbGxMaXN0ZW5lck9wdGlvbnMiLCJwcmV2ZW50RGVmYXVsdCIsIkFwcGx5VGhpc1Byb3RvdHlwZSIsInByb3RvIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJwcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJDdXN0b21FdmVudE9yaWdpbmFsIiwiRXZlbnQiLCJldmVudE5hbWUiLCJwYXJhbXMiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRldGFpbCIsIkV2ZW50T3JpZ2luYWwiLCJpbml0RXZlbnQiLCJGb2N1c0V2ZW50IiwiRm9jdXNFdmVudE9yaWdpbmFsIiwiaW5pdEZvY3VzRXZlbnQiLCJ2aWV3IiwicmVsYXRlZFRhcmdldCIsIktleWJvYXJkRXZlbnQiLCJLZXlib2FyZEV2ZW50T3JpZ2luYWwiLCJpbml0S2V5Ym9hcmRFdmVudCIsImxvY2F0aW9uIiwiY3RybEtleSIsImFsdEtleSIsInNoaWZ0S2V5IiwibWV0YUtleSIsInJlcGVhdCIsImxvY2FsZSIsIm5hdmlnYXRvciIsImxhbmd1YWdlIiwia2V5Q29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJNb3VzZUV2ZW50IiwiTW91c2VFdmVudE9yaWdpbmFsIiwiaW5pdE1vdXNlRXZlbnQiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiYnV0dG9uIiwiYnV0dG9ucyIsInJlZ2lvbiIsIlBvaW50ZXJFdmVudCIsIlBvaW50ZXJFdmVudE9yaWdpbmFsIiwiaW5pdFBvaW50ZXJFdmVudCIsIm9mZnNldFgiLCJvZmZzZXRZIiwid2lkdGgiLCJoZWlnaHQiLCJwcmVzc3VyZSIsInR3aXN0IiwidGlsdFgiLCJ0aWx0WSIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwiaHdUaW1lc3RhbXAiLCJpc1ByaW1hcnkiLCJ0YW5nZW50aWFsUHJlc3N1cmUiLCJyb3RhdGlvbkRlc2NyaXB0b3IiLCJldmVudE1hbmFnZXIiLCJFdmVudE1hbmFnZXIiLCJzZXRTdWJzY3JpYmVycyIsIkZvbyIsImZvbyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFB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b0cseUJBQW9CO0FBQXhILEdBUGtDLENBbnVCd2E7QUEwdUI3VSxNQUFHLENBQUMsVUFBU0EsT0FBVCxFQUFpQlMsTUFBakIsRUFBd0JILE9BQXhCLEVBQWdDO0FBQ25LTixXQUFPLENBQUMseUJBQUQsQ0FBUDs7QUFDQUEsV0FBTyxDQUFDLHNCQUFELENBQVA7O0FBQ0FBLFdBQU8sQ0FBQyx5QkFBRCxDQUFQO0FBRUMsR0FMaUksRUFLaEk7QUFBQywrQkFBMEIsQ0FBM0I7QUFBNkIsNEJBQXVCLENBQXBEO0FBQXNELCtCQUEwQjtBQUFoRixHQUxnSTtBQTF1QjBVLENBQTVjLEVBK3VCd0YsRUEvdUJ4RixFQSt1QjJGLENBQUMsRUFBRCxDQS91QjNGLEU7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBQ2lEOztBQUNqRDtBQUNBLElBQU1rSixZQUFZLEdBQUcsSUFBSUMsd0RBQUosRUFBckIsQyxDQUVBO0FBQ0E7QUFDQTs7QUFDQ0QsWUFBWSxDQUNYRSxjQURELENBQ2lCLENBQUNDLDBJQUFELENBRGpCO0FBR0ExSSxNQUFNLENBQUN1SSxZQUFQLEdBQXNCQSxZQUF0QjtBQUNBdkksTUFBTSxDQUFDMkksR0FBUCxHQUFhRCwwSUFBYixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQGZsb3dcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBWYWx1ZVJlc29sdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVmFsdWVSZXNvbHZlclwiKSk7XG52YXIgSW5saW5lRXZlbnRNYW5hZ2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSW5saW5lRXZlbnRNYW5hZ2VyXCIpKTtcbnJlcXVpcmUoJ2V2ZW50cy1wb2x5ZmlsbCcpO1xudmFyIEV2ZW50TWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoZXJzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzLnNpbmdsZXRvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFdmVudE1hbmFnZXJ9XG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghRXZlbnRNYW5hZ2VyLlNpbmdsZXRvbikge1xuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLlNpbmdsZXRvbiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXZlbnRNYW5hZ2VyLlNpbmdsZXRvbjtcbiAgICB9O1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52YWx1ZVJlc29sdmVyID0gbmV3IFZhbHVlUmVzb2x2ZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgIG5ldyBJbmxpbmVFdmVudE1hbmFnZXJfMS5kZWZhdWx0KHRoaXMpO1xuICAgIH07XG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5kYXRhUmVzb2x2ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiAoX2EgPSBFdmVudE1hbmFnZXIuU2luZ2xldG9uLnZhbHVlUmVzb2x2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kYXRhUmVzb2x2ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldERhdGFSZXNvbHZlciA9IGZ1bmN0aW9uIChyZXNvbHZlciwgcmVzb2x2ZXJJZCkge1xuICAgICAgICByZXR1cm4gVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQuc2V0UmVzb2x2ZXIocmVzb2x2ZXIsIHJlc29sdmVySWQpO1xuICAgIH07XG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS51bnJlc29sdmUgPSBmdW5jdGlvbiAocmVzb2x2ZXJJZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQudW5zZXRSZXNvbHZlcihyZXNvbHZlcklkZW50aXR5KTtcbiAgICB9O1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2V0UmVzb2x2ZXJQcmlvcml0eSA9IGZ1bmN0aW9uIChwcmlvcml0eSkge1xuICAgICAgICByZXR1cm4gVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQuc2V0T3JkZXIocHJpb3JpdHkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJuIGFuIGlkIHRoYXQgY29udGFpbiB0aGUgZWxlbWVudCBhbmQgdGhlIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIuZ2V0U2VsZWN0b3JJZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiID8gc2VsZWN0b3IudHlwZSArICdfX18nICsgc2VsZWN0b3IudmFsdWUgOiBzZWxlY3RvcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgSFRNTEVsZW1lbnQgZnJvbSBzZWxlY3RvcixcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBkb2N1bWVudFtzZWxlY3Rvci50eXBlXShzZWxlY3Rvci52YWx1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB3aWxsIGNsZWFudXAgdGhlIHN1YnNjcmliZXIgYW5kIHN0YXJ0IGxpc3RlbmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50c0luc3RydWN0b3JcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudHNJbnN0cnVjdG9yKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0cnVjdG9ySW5zID0gbmV3IGV2ZW50c0luc3RydWN0b3IoKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgZ2V0U3Vic2NyaWJlcnMgaXMgYSBkZWZpbmVkIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50c0luc3RydWN0b3JJbnMuZ2V0U3Vic2NyaWJlcnMoKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0U3Vic2NyaWJlcnMgaXMgbm90IGRlZmluZWQgb24gJyArIGV2ZW50c0luc3RydWN0b3JJbnMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmliZXJzID0gZXZlbnRzSW5zdHJ1Y3Rvcklucy5nZXRTdWJzY3JpYmVycygpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgcmV0dXJucy5wdXNoKHNlbGYuc2V0TGlzdGVuZXIoc3Vic2NyaWJlciwgZXZlbnRzSW5zdHJ1Y3RvcklucykpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFFdmVudE1hbmFnZXIuZXZlbnRSZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnRzUmVnaXN0ZXJlZEV2ZW50LmZpcmUoeyBkYXRlOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmV2ZW50UmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjdXJyZW50U3Vic2NyaWJlclxuICAgICAqIEBwYXJhbSBldmVudEluc3RydWN0b3JcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldExpc3RlbmVyID0gZnVuY3Rpb24gKGN1cnJlbnRTdWJzY3JpYmVyLCBldmVudEluc3RydWN0b3IpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIHZhciBzZWxlY3RvcklkO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIGlmIHRoZSBzZWxlY3RvciBoYXMgZG9jdW1lbnQgdGhlbiB0aGUgRG9jdW1lbnQgb2JqZWN0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgICAgaWYgKGN1cnJlbnRTdWJzY3JpYmVyLnNlbGVjdG9yID09PSAnZG9jdW1lbnQnIHx8ICFjdXJyZW50U3Vic2NyaWJlci5zZWxlY3Rvcikge1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50O1xuICAgICAgICAgICAgc2VsZWN0b3JJZCA9ICdkb2N1bWVudCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gRXZlbnRNYW5hZ2VyLmdldEVsZW1lbnQoY3VycmVudFN1YnNjcmliZXIuc2VsZWN0b3IpO1xuICAgICAgICAgICAgc2VsZWN0b3JJZCA9IEV2ZW50TWFuYWdlci5nZXRTZWxlY3RvcklkKGN1cnJlbnRTdWJzY3JpYmVyLnNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5zdHJ1Y3Rvck5hbWUgPSBldmVudEluc3RydWN0b3IuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdmFyIHJldHVybnMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW2luc3RydWN0b3JOYW1lXSA9IChfYiA9IHt9LFxuICAgICAgICAgICAgICAgIF9iW3NlbGVjdG9ySWRdID0ge30sXG4gICAgICAgICAgICAgICAgX2IpLFxuICAgICAgICAgICAgX2EpO1xuICAgICAgICBpZiAoIWN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzKSB7XG4gICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVycyA9IGN1cnJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGV2ZW50cykge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKGV2ZW50cyA9PT0gJ3NlbGVjdG9yJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm5zW2luc3RydWN0b3JOYW1lXVtzZWxlY3RvcklkXSA9IChfYSA9IHt9LCBfYVtldmVudHNdID0gW10sIF9hKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVycy5oYXNPd25Qcm9wZXJ0eShldmVudHMpKSB7XG4gICAgICAgICAgICAgICAgLy8gc3BsaXR0aW5nIGlmIHRoZSBrZXkgaXMgc3RyaW5nLCB0aGlzIGFsbG93IGV2ZW50IGxpa2UgJ2NsaWNrIHRvdWNoJ1xuICAgICAgICAgICAgICAgIHZhciBldmVudHNBcnJheSA9IGV2ZW50cy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIC8vIGFkZGluZyBhYmlsaXR5IHRvIGNhbGwgdGhpcy5zY29wZSBpbnNpZGUgdGhlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5zY29wZSA9IGV2ZW50SW5zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZXJJZF8xO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5oYXNPd25Qcm9wZXJ0eSgncmVzb2x2ZXJJZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZXJJZF8xID0gY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5yZXNvbHZlcklkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9ySWQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVySWRfMSA9IGV2ZW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10ucmVzb2x2ZXJJZCA9IGV2ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZXJJZF8xID0gVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQuZ2V0UmVzb2x2ZXJJZChzZWxlY3RvcklkLCBldmVudHMsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10ucmVzb2x2ZXJJZCA9IGV2ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBldmVudE9wdGlvbnMgPSBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoY3VycmVudEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5jb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsQmFja05hbWUgPSBpbnN0cnVjdG9yTmFtZSArICdfJyArIHNlbGVjdG9ySWQgKyAnXycgKyBldmVudHNBcnJheVtjdXJyZW50RXZlbnRdICsgRXZlbnRNYW5hZ2VyLmNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLmhhc093blByb3BlcnR5KCdjYWxsQmFjaycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dbY2FsbEJhY2tOYW1lXSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLmNhbGxCYWNrLmNhbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZTogZXZlbnRJbnN0cnVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUmVzb2x2ZXI6IHNlbGYuZGF0YVJlc29sdmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlcklkOiByZXNvbHZlcklkXzFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5zdWJzY3JpYmVySWQgPSBjYWxsQmFja05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzQXJyYXlbY3VycmVudEV2ZW50XSwgd2luZG93W2NhbGxCYWNrTmFtZV0sIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5lZCB2YWx1ZSB3aWxsIGNvbnRhaW4gaW5mb3JtYXRpb24gdGhhdCBjYW4gYmUgcmVmZXJyZWQgdG8gd2hlbiB1bnN1YnNjcmliZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuc1tpbnN0cnVjdG9yTmFtZV1bc2VsZWN0b3JJZF1bZXZlbnRzXS5wdXNoKGNhbGxCYWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W2NhbGxCYWNrTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2tOYW1lOiBjYWxsQmFja05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50c0FycmF5W2N1cnJlbnRFdmVudF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBldmVudE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10uc3Vic2NyaWJlcklkID0gY2FsbEJhY2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5oYXNPd25Qcm9wZXJ0eSgnY2FsbEJhY2tPbmVzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVzQ2FsbEJhY2tOYW1lXzEgPSBjYWxsQmFja05hbWUgKyAnb25lcyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dbb25lc0NhbGxCYWNrTmFtZV8xXSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC50eXBlLCB3aW5kb3dbb25lc0NhbGxCYWNrTmFtZV8xXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJzY3JpYmVyLnN1YnNjcmliZXJzW2V2ZW50c10uY2FsbEJhY2tPbmVzLmNhbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZTogZXZlbnRJbnN0cnVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUmVzb2x2ZXI6IHNlbGYuZGF0YVJlc29sdmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlcklkOiByZXNvbHZlcklkXzFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzQXJyYXlbY3VycmVudEV2ZW50XSwgd2luZG93W29uZXNDYWxsQmFja05hbWVfMV0sIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5lZCB2YWx1ZSB3aWxsIGNvbnRhaW4gaW5mb3JtYXRpb24gdGhhdCBjYW4gYmUgcmVmZXJyZWQgdG8gd2hlbiB1bnN1YnNjcmliZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuc1tpbnN0cnVjdG9yTmFtZV1bc2VsZWN0b3JJZF1bZXZlbnRzXS5wdXNoKGNhbGxCYWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W29uZXNDYWxsQmFja05hbWVfMV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2tOYW1lOiBvbmVzQ2FsbEJhY2tOYW1lXzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50c0FycmF5W2N1cnJlbnRFdmVudF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBldmVudE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS5vbmVzU3Vic2NyaWJlcklkID0gb25lc0NhbGxCYWNrTmFtZV8xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLmhhc093blByb3BlcnR5KCdyZXNvbHZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVyc1tldmVudHNdLnJlc29sdmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnNjcmliZXIuc3Vic2NyaWJlcnNbZXZlbnRzXS51bnJlc29sdmVySWQgPSB0aGlzXzEuc2V0RGF0YVJlc29sdmVyKHJlc29sdmVyLCByZXNvbHZlcklkXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjdXJyZW50RXZlbnQgaW4gZXZlbnRzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgX2xvb3BfMihjdXJyZW50RXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIGV2ZW50cyBpbiBjdXJyZW50U3Vic2NyaWJlci5zdWJzY3JpYmVycykge1xuICAgICAgICAgICAgX2xvb3BfMShldmVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdW5zdWJzY3JpYmFibGVcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHVuc3Vic2NyaWJhYmxlKSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgdW5zdWJzY3JpYmFibGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzdWNjZXNzID0gRXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHVuc3Vic2NyaWJhYmxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzZWxmXzEgPSB0aGlzO1xuICAgICAgICAgICAgZm9yICh2YXIgdW5zdWIgaW4gdW5zdWJzY3JpYmFibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodW5zdWJzY3JpYmFibGUuaGFzT3duUHJvcGVydHkodW5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGVsZW0gaW4gdW5zdWJzY3JpYmFibGVbdW5zdWJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuc3Vic2NyaWJhYmxlW3Vuc3ViXS5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGV2ZW50XzEgaW4gdW5zdWJzY3JpYmFibGVbdW5zdWJdW2VsZW1dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5zdWJzY3JpYmFibGVbdW5zdWJdW2VsZW1dLmhhc093blByb3BlcnR5KGV2ZW50XzEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnN1YnNjcmliYWJsZVt1bnN1Yl1bZWxlbV1bZXZlbnRfMV0uZm9yRWFjaChmdW5jdGlvbiAodW5zdWJzY3JpYmFibGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih1bnN1YnNjcmliYWJsZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHVuc3Vic2NyaWJhYmxlSWRcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAodW5zdWJzY3JpYmFibGVJZCkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBpZiAoRXZlbnRNYW5hZ2VyLnVuc3Vic2NyaWJlTGlzdFt1bnN1YnNjcmliYWJsZUlkXSkge1xuICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3RbdW5zdWJzY3JpYmFibGVJZF0uZWxlbWVudDtcbiAgICAgICAgICAgIHZhciBldmVudF8yID0gRXZlbnRNYW5hZ2VyLnVuc3Vic2NyaWJlTGlzdFt1bnN1YnNjcmliYWJsZUlkXS5ldmVudDtcbiAgICAgICAgICAgIHZhciBjYWxsQmFja05hbWUgPSBFdmVudE1hbmFnZXIudW5zdWJzY3JpYmVMaXN0W3Vuc3Vic2NyaWJhYmxlSWRdLmNhbGxCYWNrTmFtZTtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gRXZlbnRNYW5hZ2VyLnVuc3Vic2NyaWJlTGlzdFt1bnN1YnNjcmliYWJsZUlkXS5vcHRpb25zO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRfMiwgd2luZG93W2NhbGxCYWNrTmFtZV0sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBzdWJzY3JpYmUgdG8gYW4gYXJyYXkgb2YgZXZlbnRJbnN0cnVjdG9yc1xuICAgICAqIEBwYXJhbSBzdWJzY3JpYmVyc1xuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2V0U3Vic2NyaWJlcnMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEluc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHNlbGYuc3Vic2NyaWJlKGV2ZW50SW5zdHJ1Y3Rvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIUV2ZW50TWFuYWdlci5ldmVudFJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5ldmVudHNSZWdpc3RlcmVkRXZlbnQuZmlyZSh7IGRhdGU6IG5ldyBEYXRlKCkgfSk7XG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnRSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRPYmplY3RcbiAgICAgKi9cbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgdmFyIGV2ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50T2JqZWN0Lm5hbWUsIHsgZGV0YWlsOiBldmVudE9iamVjdC5kZXRhaWwsIGNhbmNlbGFibGU6IHRydWUgfSk7XG4gICAgICAgIChldmVudE9iamVjdC5lbGVtZW50ID8gZXZlbnRPYmplY3QuZWxlbWVudCA6IGRvY3VtZW50KS5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgdGhpcy5wdWJsaXNoZXJzW2V2ZW50T2JqZWN0Lm5hbWVdID0geyBkZXRhaWw6IGV2ZW50T2JqZWN0LmRldGFpbCB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIGRldGFpbFxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGRldGFpbCkge1xuICAgICAgICB0aGlzLnB1Ymxpc2goe1xuICAgICAgICAgICAgbmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBob2xkIGV2ZW50cyB3aXRoIHRoZWlyIGZ1bmN0aW9uIG5hbWUgYW5kIG9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byB1bnN1YnNjcmliZSBmcm9tIGEgcGFydGljdWxhciBldmVudFxuICAgICAqL1xuICAgIEV2ZW50TWFuYWdlci51bnN1YnNjcmliZUxpc3QgPSB7fTtcbiAgICBFdmVudE1hbmFnZXIuY291bnRlciA9IDA7XG4gICAgRXZlbnRNYW5hZ2VyLmV2ZW50UmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgRXZlbnRNYW5hZ2VyLmV2ZW50c1JlZ2lzdGVyZWRFdmVudCA9IHtcbiAgICAgICAgbmFtZTogJ2V2ZW50c1JlZ2lzdGVyZWQnLFxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEV2ZW50ID0gRXZlbnRNYW5hZ2VyLmV2ZW50c1JlZ2lzdGVyZWRFdmVudDtcbiAgICAgICAgICAgIHZhciBldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuZmlyZShjdXJyZW50RXZlbnQubmFtZSwgZGV0YWlsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50TWFuYWdlcjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudE1hbmFnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudE1hbmFnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXZlbnRNYW5hZ2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRNYW5hZ2VyXCIpKTtcbnZhciBWYWx1ZVJlc29sdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVmFsdWVSZXNvbHZlclwiKSk7XG52YXIgSW5saW5lRXZlbnRNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TWFuYWdlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIElubGluZUV2ZW50TWFuYWdlcihldmVudE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBldmVudE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc2V0U3RyaW5nU3Vic2NyaWJlcigpO1xuICAgICAgICB0aGlzLnNldFN0cmluZ1N1YnNjcmliZU9uZXMoKTtcbiAgICAgICAgdGhpcy5zZXRTdHJpbmdFdmVudFZhbHVlUmVzb2x2ZXIoKTtcbiAgICAgICAgdGhpcy5zZXRTdHJpbmdVbnN1YnNjcmliZXIoKTtcbiAgICAgICAgdGhpcy5zZXRTdHJpbmdVbnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogYWxsb3dzIGEgc3RyaW5nIHRvIGhhdmUgYSBzdWJzY3JpYmVyIHByb3RvdHlwZVxuICAgICAqICgnc2VsZWN0b3InKS5zdWJzY3JpYmUoZnVuY3Rpb24oKXt9KVxuICAgICAqL1xuICAgIElubGluZUV2ZW50TWFuYWdlci5wcm90b3R5cGUuc2V0U3RyaW5nU3Vic2NyaWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBAdHlwZXNjcmlwdCAtaW5nb3JlXG4gICAgICAgIFN0cmluZy5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50T3JDYWxsQmFjaywgY2FsbEJhY2tPclJlc29sdmVyLCByZXNvbHZlck9yT3B0aW9uLCBldmVudE9wdGlvbnNPck9uZXMsIG9uZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmhhbmRsZUlubGluZVN1YnNjcmliZXIodGhpcywgZXZlbnRPckNhbGxCYWNrLCBjYWxsQmFja09yUmVzb2x2ZXIsIHJlc29sdmVyT3JPcHRpb24sIGV2ZW50T3B0aW9uc09yT25lcywgb25lcyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBhbGxvd3MgYSBzdHJpbmcgdG8gaGF2ZSBhIHN1YnNjcmliZXIgcHJvdG90eXBlXG4gICAgICogKCdzZWxlY3RvcicpLnN1YnNjcmliZShmdW5jdGlvbigpe30pXG4gICAgICovXG4gICAgSW5saW5lRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdHJpbmdFdmVudFZhbHVlUmVzb2x2ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS52YWx1ZVJlc29sdmVyID0gZnVuY3Rpb24gKHJlc29sdmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5oYW5kbGVJbmxpbmVTdWJzY3JpYmVyLmNhbGwodGhpcywgcmVzb2x2ZXIpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgSW5saW5lRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5oYW5kbGVJbmxpbmVTdWJzY3JpYmVyID0gZnVuY3Rpb24gKHNlbGVjdG9yT3JFdmVudCwgZXZlbnRPckNhbGxCYWNrLCBjYWxsQmFja09yUmVzb2x2ZXIsIHJlc29sdmVyT3JPcHRpb24sIGV2ZW50T3B0aW9uc09yT25lcywgb25lcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzZWxlY3RvcjtcbiAgICAgICAgdmFyIGV2ZW50TmFtZTtcbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIHZhciBjYWxsQmFjaztcbiAgICAgICAgdmFyIHJlc29sdmVyO1xuICAgICAgICB2YXIgb3B0aW9ucztcbiAgICAgICAgdmFyIG9ubHlPbmVzID0gZmFsc2U7XG4gICAgICAgIHZhciByZXNvbHZlcklzU2V0ID0gZmFsc2U7XG4gICAgICAgIHZhciBjYWxsQmFja0lzU2V0ID0gZmFsc2U7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGFyZ3NfMSA9IGFyZ3M7IF9pIDwgYXJnc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGFyZyA9IGFyZ3NfMVtfaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgJiYgYXJnID09PSBhcmdzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3JPckV2ZW50O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnID09PSBhcmdzWzFdICYmIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgJiYgYXJnLm5hbWUgPT09ICdyZXNvbHZlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgVmFsdWVSZXNvbHZlcl8xLmRlZmF1bHQuc2V0UmVzb2x2ZXIoYXJnLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJ2RvY3VtZW50JztcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50O1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBzZWxlY3Rvck9yRXZlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmcubmFtZSA9PT0gJycgfHwgYXJnLm5hbWUgIT09ICdyZXNvbHZlcicgfHwgcmVzb2x2ZXJJc1NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2sgPSBhcmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsQmFja0lzU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmcubmFtZSA9PT0gJ3Jlc29sdmVyJyB8fCBjYWxsQmFja0lzU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlciA9IGFyZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVySXNTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhcmcgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBvbmx5T25lcyA9IGFyZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBhcmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxlY3RvcklkID0gRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdC5nZXRTZWxlY3RvcklkKHtcbiAgICAgICAgICAgIHR5cGU6IHNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50TmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNhbGxCYWNrTmFtZTtcbiAgICAgICAgdmFyIHJlc29sdmVySWQgPSBWYWx1ZVJlc29sdmVyXzEuZGVmYXVsdC5nZXRSZXNvbHZlcklkKHNlbGVjdG9yLCBldmVudE5hbWUpO1xuICAgICAgICBpZiAoY2FsbEJhY2tJc1NldCkge1xuICAgICAgICAgICAgY2FsbEJhY2tOYW1lID0gJ2lubGluZV8nICsgc2VsZWN0b3JJZDtcbiAgICAgICAgICAgIHdpbmRvd1tjYWxsQmFja05hbWVdID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmIChvbmx5T25lcykge1xuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC50eXBlLCB3aW5kb3dbY2FsbEJhY2tOYW1lXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjYWxsQmFjay5jYWxsKHsgZGF0YVJlc29sdmVyOiBzZWxmLmV2ZW50TWFuYWdlci5kYXRhUmVzb2x2ZXIsIHJlc29sdmVySWQ6IHJlc29sdmVySWQgfSwgZXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd2luZG93W2NhbGxCYWNrTmFtZV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdC51bnN1YnNjcmliZUxpc3RbY2FsbEJhY2tOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBjYWxsQmFja05hbWU6IGNhbGxCYWNrTmFtZSxcbiAgICAgICAgICAgICAgICBldmVudDogZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc29sdmVySXNTZXQpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHNlbGVjdG9ySWQgPSB0aGlzLmV2ZW50TWFuYWdlci52YWx1ZVJlc29sdmVyLnNldFJlc29sdmVyKHJlc29sdmVyLCByZXNvbHZlcklkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbEJhY2tOYW1lIHx8IHNlbGVjdG9ySWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBhbGxvd3MgYSBzdHJpbmcgdG8gaGF2ZSBhIHN1YnNjcmliZXIgcHJvdG90eXBlXG4gICAgICogKCdzZWxlY3RvcicpLnN1YnNjcmliZShmdW5jdGlvbigpe30pXG4gICAgICovXG4gICAgSW5saW5lRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5zZXRTdHJpbmdVbnN1YnNjcmliZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyXzEuZGVmYXVsdCgpO1xuICAgICAgICBTdHJpbmcucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50TWFuYWdlci51bnN1YnNjcmliZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGFsbG93cyBhIHN0cmluZyB0byBoYXZlIGEgc3Vic2NyaWJlciBwcm90b3R5cGVcbiAgICAgKiAoJ3NlbGVjdG9yJykuc3Vic2NyaWJlKGZ1bmN0aW9uKCl7fSlcbiAgICAgKi9cbiAgICBJbmxpbmVFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldFN0cmluZ1VucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgIFN0cmluZy5wcm90b3R5cGUudW5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50TWFuYWdlci51bnJlc29sdmUodGhpcyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBJbmxpbmVFdmVudE1hbmFnZXIucHJvdG90eXBlLnNldFN0cmluZ1N1YnNjcmliZU9uZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5zdWJzY3JpYmVPbmVzID0gZnVuY3Rpb24gKGV2ZW50T3JDYWxsQmFjaywgY2FsbEJhY2tPclJlc29sdmVyLCByZXNvbHZlck9yT3B0aW9uLCBldmVudE9wdGlvbnNPck9uZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmhhbmRsZUlubGluZVN1YnNjcmliZXIuY2FsbCh0aGlzLCBldmVudE9yQ2FsbEJhY2ssIGNhbGxCYWNrT3JSZXNvbHZlciwgcmVzb2x2ZXJPck9wdGlvbiwgZXZlbnRPcHRpb25zT3JPbmVzLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBJbmxpbmVFdmVudE1hbmFnZXI7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gSW5saW5lRXZlbnRNYW5hZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5saW5lRXZlbnRNYW5hZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVmFsdWVSZXNvbHZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWYWx1ZVJlc29sdmVyKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiByZXR1cm4gYW4gdW5pcXVlIHJlc29sdmVyXG4gICAgICogQHBhcmFtIHNlbGVjdG9ySWRcbiAgICAgKiBAcGFyYW0gZXZlbnRzXG4gICAgICovXG4gICAgVmFsdWVSZXNvbHZlci5nZXRSZXNvbHZlcklkID0gZnVuY3Rpb24gKHNlbGVjdG9ySWQsIGV2ZW50cywgaW5jcmVtZW50KSB7XG4gICAgICAgIGlmIChpbmNyZW1lbnQgPT09IHZvaWQgMCkgeyBpbmNyZW1lbnQgPSB0cnVlOyB9XG4gICAgICAgIHZhciBhZGRpdGlvbiA9IFwiXCI7XG4gICAgICAgIGlmIChpbmNyZW1lbnQpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uID0gVmFsdWVSZXNvbHZlci5jb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9ySWQgKyAnXycgKyBldmVudHMgKyBhZGRpdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc29sdmVyXG4gICAgICogQHBhcmFtIHJlc29sdmVySWRcbiAgICAgKi9cbiAgICBWYWx1ZVJlc29sdmVyLnNldFJlc29sdmVyID0gZnVuY3Rpb24gKHJlc29sdmVyLCByZXNvbHZlcklkKSB7XG4gICAgICAgIGlmICghVmFsdWVSZXNvbHZlci5yZXNvbHZlcnMuaGFzT3duUHJvcGVydHkocmVzb2x2ZXJJZCkpIHtcbiAgICAgICAgICAgIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3Jlc29sdmVySWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKHJlc29sdmVyLm9yZGVyIHx8IHRoaXMub3JkZXIgPj0gMCkge1xuICAgICAgICAgICAgLy8gb3JkZXIgaXMgZGVmaW5lZCBpbiB0aGUgcmVzb2x2ZXJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVyZXNvbHZlclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm9yZGVyID49IDAgPyB0aGlzLm9yZGVyIDogcmVzb2x2ZXIub3JkZXI7XG4gICAgICAgICAgICBWYWx1ZVJlc29sdmVyLm9yZGVyID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlc29sdmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXNvbHZlci5jYWxsQmFjayA9IHJlc29sdmVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgVmFsdWVSZXNvbHZlci5jb3VudGVyKys7XG4gICAgICAgIHZhciByZXNvbHZlcklkZW50aXR5ID0gcmVzb2x2ZXJJZCArICctXy0nICsgVmFsdWVSZXNvbHZlci5jb3VudGVyO1xuICAgICAgICByZXNvbHZlci5pZCA9IFZhbHVlUmVzb2x2ZXIuY291bnRlcjtcbiAgICAgICAgaWYgKCFWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tyZXNvbHZlcklkXVtpbmRleF0pIHtcbiAgICAgICAgICAgIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3Jlc29sdmVySWRdW2luZGV4XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW3Jlc29sdmVySWRdW2luZGV4XS5wdXNoKHJlc29sdmVyKTtcbiAgICAgICAgLy8gbm93IHdlIHNvcnQgdGhlIHJlc29sdmVyIHRoYXQgcHJpb3JpdHkgaXMgY29uc2lkZXJlZFxuICAgICAgICB2YXIgb3JkZXJlZCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tyZXNvbHZlcklkXSkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgb3JkZXJlZFtrZXldID0gVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbcmVzb2x2ZXJJZF1ba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlYXNzaWduaW5nIHNvcnRlZCB2YWx1ZXNcbiAgICAgICAgVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbcmVzb2x2ZXJJZF0gPSBvcmRlcmVkO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZXJJZGVudGl0eTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc29sdmVySWRlbnRpdHlcbiAgICAgKi9cbiAgICBWYWx1ZVJlc29sdmVyLnVuc2V0UmVzb2x2ZXIgPSBmdW5jdGlvbiAocmVzb2x2ZXJJZGVudGl0eSkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB2YXIgaWRlbnRpZmllciA9IHJlc29sdmVySWRlbnRpdHkuc3BsaXQoJy1fLScpO1xuICAgICAgICBpZiAoVmFsdWVSZXNvbHZlci5yZXNvbHZlcnMuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllclswXSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJlc29sdmVyS2V5IGluIFZhbHVlUmVzb2x2ZXIucmVzb2x2ZXJzW2lkZW50aWZpZXJbMF1dKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlc29sdmVyRnVuY3Rpb24gaW4gVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbaWRlbnRpZmllclswXV1bcmVzb2x2ZXJLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tpZGVudGlmaWVyWzBdXVtyZXNvbHZlcktleV1bcmVzb2x2ZXJGdW5jdGlvbl0uaWQgPT09IHBhcnNlSW50KGlkZW50aWZpZXJbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1tpZGVudGlmaWVyWzBdXVtyZXNvbHZlcktleV0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybiB2YWx1ZSB0aGF0IGlzIHNldCBpbiB0aGVcbiAgICAgKiBAcGFyYW0gcmV0dXJuc1xuICAgICAqL1xuICAgIFZhbHVlUmVzb2x2ZXIucHJvdG90eXBlLmRhdGFSZXNvbHZlciA9IGZ1bmN0aW9uIChyZXR1cm5zKSB7XG4gICAgICAgIHZhciBwYXJhbXNBcnJheSA9IFtdO1xuICAgICAgICBwYXJhbXNBcnJheS5wdXNoKHJldHVybnMpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgZm9yICh2YXIgb3JkZXIgaW4gVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbdGhpcy5yZXNvbHZlcklkXSkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoVmFsdWVSZXNvbHZlci5yZXNvbHZlcnNbdGhpcy5yZXNvbHZlcklkXS5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgcmVzb2x2ZXIgZnVuY3Rpb24gd2lsbCBoYXZlIGFsbCByZXR1cm5lZCB2YWx1ZSBvZiBhbGwgcmVzb2x2ZXJzIHRoYXQgaGFzIGxlc3MgcHJpb3JpdHlcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBWYWx1ZVJlc29sdmVyLnJlc29sdmVyc1t0aGlzLnJlc29sdmVySWRdW29yZGVyXS5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvbHZlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2FsbEJhY2snIGluIHJlc29sdmVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnMgPSByZXNvbHZlckZ1bmN0aW9uLmNhbGxCYWNrKHJldHVybnMsIHBhcmFtc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJhbXNBcnJheS5wdXNoKHJldHVybnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdXNlZCB0byBzZXQgdGhlIG9yZGVyIG9mIHRoZSBuZXh0IHJlc29sdmVyXG4gICAgICogQHBhcmFtIG9yZGVyXG4gICAgICovXG4gICAgVmFsdWVSZXNvbHZlci5zZXRPcmRlciA9IGZ1bmN0aW9uIChvcmRlcikge1xuICAgICAgICBWYWx1ZVJlc29sdmVyLm9yZGVyID0gb3JkZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBob2xkIGFsbCByZXNvbHZlciBmdW5jdGlvbnMgb24gcHJvcGVyIG9yZGVyXG4gICAgICovXG4gICAgVmFsdWVSZXNvbHZlci5yZXNvbHZlcnMgPSB7fTtcbiAgICBWYWx1ZVJlc29sdmVyLm9yZGVyID0gLTE7XG4gICAgVmFsdWVSZXNvbHZlci5jb3VudGVyID0gLTE7XG4gICAgcmV0dXJuIFZhbHVlUmVzb2x2ZXI7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gVmFsdWVSZXNvbHZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZhbHVlUmVzb2x2ZXIuanMubWFwIiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgaWYodHlwZW9mIEV2ZW50VGFyZ2V0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LkV2ZW50VGFyZ2V0ID0gTm9kZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGxpc3RlbmVyIGludGVyY2VwdG9yXHJcbiAgICovXHJcblxyXG4gIHZhciBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IgPSB7XHJcbiAgICBpbnRlcmNlcHRvcnM6IFtdIC8vIHsgdGFyZ2V0OiBFdmVudFRhcmdldCwgaW50ZXJjZXB0b3JzOiBbeyBhZGQ6IEZ1bmN0aW9uLCByZW1vdmU6IEZ1bmN0aW9uIH0sIC4uLl0gfVxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIGV4aXN0cyBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBsaXN0ZW5lciBmcm9tIGEgdGFyZ2V0IGFuZCB0aGUgbm9ybWFsaXplZCBhcmd1bWVudHNcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICogQHBhcmFtIG5vcm1hbGl6ZWRBcmd1bWVudHNcclxuICAgKiBAcmV0dXJuIHsqfVxyXG4gICAqL1xyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5nZXRSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCwgbm9ybWFsaXplZEFyZ3VtZW50cykge1xyXG4gICAgdmFyIGtleSA9IG5vcm1hbGl6ZWRBcmd1bWVudHMudHlwZSArICctJyArIChub3JtYWxpemVkQXJndW1lbnRzLm9wdGlvbnMuY2FwdHVyZSA/ICcxJyA6ICcwJyk7XHJcbiAgICBpZihcclxuICAgICAgKHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzICE9PSB2b2lkIDApICYmXHJcbiAgICAgICh0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldICE9PSB2b2lkIDApXHJcbiAgICApIHtcclxuICAgICAgdmFyIG1hcCA9IHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzW2tleV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZihtYXBbaV0ubGlzdGVuZXIgPT09IG5vcm1hbGl6ZWRBcmd1bWVudHMubGlzdGVuZXIpIHtcclxuICAgICAgICAgIHJldHVybiBtYXBbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlcnMgYSBsaXN0ZW5lciBvbiBhIHRhcmdldCB3aXRoIHNvbWUgb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKiBAcGFyYW0gbm9ybWFsaXplZEFyZ3VtZW50c1xyXG4gICAqL1xyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5yZWdpc3RlckV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQsIG5vcm1hbGl6ZWRBcmd1bWVudHMpIHtcclxuICAgIHZhciBrZXkgPSBub3JtYWxpemVkQXJndW1lbnRzLnR5cGUgKyAnLScgKyAobm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLmNhcHR1cmUgPyAnMScgOiAnMCcpO1xyXG5cclxuICAgIGlmKHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzID09PSB2b2lkIDApIHtcclxuICAgICAgdGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldID09PSB2b2lkIDApIHtcclxuICAgICAgdGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnNba2V5XSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzW2tleV0ucHVzaChub3JtYWxpemVkQXJndW1lbnRzKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVbnJlZ2lzdGVycyBhIGxpc3RlbmVyIG9uIGEgdGFyZ2V0IHdpdGggc29tZSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwYXJhbSBub3JtYWxpemVkQXJndW1lbnRzXHJcbiAgICovXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLnVucmVnaXN0ZXJFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odGFyZ2V0LCBub3JtYWxpemVkQXJndW1lbnRzKSB7XHJcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplZEFyZ3VtZW50cy50eXBlICsgJy0nICsgKG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5jYXB0dXJlID8gJzEnIDogJzAnKTtcclxuICAgIGlmKFxyXG4gICAgICAodGFyZ2V0Ll9fZXZlbnRMaXN0ZW5lcnMgIT09ICB2b2lkIDApICYmXHJcbiAgICAgICh0YXJnZXQuX19ldmVudExpc3RlbmVyc1trZXldICE9PSB2b2lkIDApXHJcbiAgICApIHtcclxuICAgICAgdmFyIG1hcCA9IHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzW2tleV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZihtYXBbaV0ubGlzdGVuZXIgPT09IG5vcm1hbGl6ZWRBcmd1bWVudHMubGlzdGVuZXIpIHtcclxuICAgICAgICAgIG1hcC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihtYXAubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZGVsZXRlIHRhcmdldC5fX2V2ZW50TGlzdGVuZXJzW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5ub3JtYWxpemVMaXN0ZW5lckNhbGxiYWNrID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcclxuICAgIGlmKCh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHx8IChsaXN0ZW5lciA9PT0gbnVsbCkgfHwgKGxpc3RlbmVyID09PSB2b2lkIDApKSB7XHJcbiAgICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICAgIH0gZWxzZSBpZigodHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JykgJiYgKHR5cGVvZiBsaXN0ZW5lci5oYW5kbGVFdmVudCA9PT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZUV2ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdG8gc3VwcG9ydCBTeW1ib2xcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgbGlzdGVuZXIoZXZlbnQpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5ub3JtYWxpemVMaXN0ZW5lck9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICBzd2l0Y2godHlwZW9mIG9wdGlvbnMpIHtcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgb3B0aW9ucyA9IHsgY2FwdHVyZTogb3B0aW9ucyB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxyXG4gICAgICAgIG9wdGlvbnMgPSB7IGNhcHR1cmU6IGZhbHNlIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSB7IGNhcHR1cmU6IGZhbHNlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgb3B0aW9ucyB0eXBlIGZvciBhZGRFdmVudExpc3RlbmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucy5vbmNlICAgICAgPSBCb29sZWFuKG9wdGlvbnMub25jZSk7XHJcbiAgICBvcHRpb25zLnBhc3NpdmUgICA9IEJvb2xlYW4ob3B0aW9ucy5wYXNzaXZlKTtcclxuICAgIG9wdGlvbnMuY2FwdHVyZSAgID0gQm9vbGVhbihvcHRpb25zLmNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5ub3JtYWxpemVMaXN0ZW5lckFyZ3VtZW50cyA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICBsaXN0ZW5lcjogdGhpcy5ub3JtYWxpemVMaXN0ZW5lckNhbGxiYWNrKGxpc3RlbmVyKSxcclxuICAgICAgb3B0aW9uczogdGhpcy5ub3JtYWxpemVMaXN0ZW5lck9wdGlvbnMob3B0aW9ucylcclxuICAgIH07XHJcbiAgfTtcclxuXHJcblxyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaW50ZXJjZXB0ID0gZnVuY3Rpb24odGFyZ2V0LCBpbnRlcmNlcHRvcnMpIHtcclxuICAgIC8vIGdldCBhbiBpbnRlcmNlcHRvciB3aXRoIHRoaXMgdGFyZ2V0IG9yIG51bGxcclxuICAgIHZhciBpbnRlcmNlcHRvciA9IG51bGw7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmKHRoaXMuaW50ZXJjZXB0b3JzW2ldLnRhcmdldCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgaW50ZXJjZXB0b3IgPSB0aGlzLmludGVyY2VwdG9yc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIG5vIGludGVyY2VwdG9yIGFscmVhZHkgc2V0XHJcbiAgICBpZiAoaW50ZXJjZXB0b3IgPT09IG51bGwpIHtcclxuICAgICAgaW50ZXJjZXB0b3IgPSB7IHRhcmdldDogdGFyZ2V0LCBpbnRlcmNlcHRvcnM6IFtpbnRlcmNlcHRvcnNdIH07XHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0b3JzLnB1c2goaW50ZXJjZXB0b3IpO1xyXG5cclxuICAgICAgdGhpcy5pbnRlcmNlcHRBZGRFdmVudExpc3RlbmVyKHRhcmdldCwgaW50ZXJjZXB0b3IpO1xyXG4gICAgICB0aGlzLmludGVyY2VwdFJlbW92ZUV2ZW50TGlzdGVuZXIodGFyZ2V0LCBpbnRlcmNlcHRvcik7XHJcbiAgICB9IGVsc2UgeyAvLyBpZiBhbiBpbnRlcmNlcHRvciBhbHJlYWR5IHNldCwgc2ltcGx5IGFkZCBpbnRlcmNlcHRvcnMgdG8gdGhlIGxpc3RcclxuICAgICAgaW50ZXJjZXB0b3IuaW50ZXJjZXB0b3JzLnB1c2goaW50ZXJjZXB0b3JzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2YXIgcmVsZWFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xyXG4gICAgLy8gICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xyXG4gICAgLy8gfTtcclxuICAgIC8vIHRoaXMuaW50ZXJjZXB0b3JzLnB1c2gocmVsZWFzZSk7XHJcbiAgICAvLyByZXR1cm4gcmVsZWFzZTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaW50ZXJjZXB0QWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCwgaW50ZXJjZXB0b3IpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XHJcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xyXG4gICAgICB2YXIgbm9ybWFsaXplZEFyZ3VtZW50cyA9IF90aGlzLm5vcm1hbGl6ZUxpc3RlbmVyQXJndW1lbnRzKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgICAgdmFyIHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyID0gX3RoaXMuZ2V0UmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIodGhpcywgbm9ybWFsaXplZEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICBpZiAoIXJlZ2lzdGVyZWRFdmVudExpc3RlbmVyKSB7XHJcblxyXG4gICAgICAgIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZCA9IHtcclxuICAgICAgICAgIHR5cGU6IG5vcm1hbGl6ZWRBcmd1bWVudHMudHlwZSxcclxuICAgICAgICAgIGxpc3RlbmVyOiBub3JtYWxpemVkQXJndW1lbnRzLmxpc3RlbmVyLFxyXG4gICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBjYXB0dXJlOiBub3JtYWxpemVkQXJndW1lbnRzLm9wdGlvbnMuY2FwdHVyZSxcclxuICAgICAgICAgICAgb25jZTogbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLm9uY2UsXHJcbiAgICAgICAgICAgIHBhc3NpdmU6IG5vcm1hbGl6ZWRBcmd1bWVudHMub3B0aW9ucy5wYXNzaXZlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcmNlcHRvci5pbnRlcmNlcHRvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBpbnRlcmNlcHRvcnMgPSBpbnRlcmNlcHRvci5pbnRlcmNlcHRvcnNbaV07XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9ycy5hZGQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3JzLmFkZChub3JtYWxpemVkQXJndW1lbnRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdub3JtYWxpemVkQXJndW1lbnRzJywgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkKTtcclxuXHJcbiAgICAgICAgX3RoaXMucmVnaXN0ZXJFdmVudExpc3RlbmVyKHRoaXMsIG5vcm1hbGl6ZWRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyLmNhbGwoXHJcbiAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkLnR5cGUsXHJcbiAgICAgICAgICBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQubGlzdGVuZXIsXHJcbiAgICAgICAgICBub3JtYWxpemVkQXJndW1lbnRzLnBvbHlmaWxsZWQub3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuaW50ZXJjZXB0UmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCwgaW50ZXJjZXB0b3IpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xyXG4gICAgICB2YXIgbm9ybWFsaXplZEFyZ3VtZW50cyA9IF90aGlzLm5vcm1hbGl6ZUxpc3RlbmVyQXJndW1lbnRzKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgICAgdmFyIHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyID0gX3RoaXMuZ2V0UmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIodGhpcywgbm9ybWFsaXplZEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICBpZiAocmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICBfdGhpcy51bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcih0aGlzLCBub3JtYWxpemVkQXJndW1lbnRzKTtcclxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyLmNhbGwoXHJcbiAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgcmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIucG9seWZpbGxlZC50eXBlLFxyXG4gICAgICAgICAgcmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXIucG9seWZpbGxlZC5saXN0ZW5lcixcclxuICAgICAgICAgIHJlZ2lzdGVyZWRFdmVudExpc3RlbmVyLnBvbHlmaWxsZWQub3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pbnRlcmNlcHRBbGwgPSBmdW5jdGlvbihpbnRlcmNlcHRvcnMpIHtcclxuICAgIHRoaXMuaW50ZXJjZXB0KEV2ZW50VGFyZ2V0LCBpbnRlcmNlcHRvcnMpO1xyXG4gICAgaWYoISh3aW5kb3cgaW5zdGFuY2VvZiBFdmVudFRhcmdldCkpIHtcclxuICAgICAgdGhpcy5pbnRlcmNlcHQoV2luZG93LCBpbnRlcmNlcHRvcnMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5yZWxlYXNlQWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwLCBsID0gdGhpcy5pbnRlcmNlcHRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0b3JzKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAvLyB0aHJvdyBlcnJvcjtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBFdmVudExpc3RlbmVySW50ZXJjZXB0b3I7XHJcbn0pKCk7XHJcblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yKSB7XHJcbiAgLyoqXHJcbiAgICogRXZlbnQgbGlzdGVuZXIgdHlwZSBzdXBwb3J0XHJcbiAgICovXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pc1N1cHBvcnRlZE9uRXZlbnQgPSBmdW5jdGlvbih0YXJnZXQsIHR5cGUpIHtcclxuICAgIHJldHVybiAoKCdvbicgKyB0eXBlKSBpbiB0YXJnZXQpO1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pc1N1cHBvcnRlZFRyYW5zaXRpb25FdmVudCA9IGZ1bmN0aW9uKHRhcmdldCwgdHlwZSkge1xyXG4gICAgcmV0dXJuIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pc1N1cHBvcnRlZE9uRXZlbnQodGFyZ2V0LCB0eXBlKSB8fCAoKCdzdHlsZScgaW4gdGFyZ2V0KSAmJiAodGFyZ2V0LnN0eWxlWyd0cmFuc2l0aW9uJ10gIT09IHZvaWQgMCkpO1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5pc1N1cHBvcnRlZEZ1bGxTY3JlZW5FdmVudCA9IGZ1bmN0aW9uKHRhcmdldCwgdHlwZSkge1xyXG4gICAgaWYoRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmlzU3VwcG9ydGVkT25FdmVudCh0YXJnZXQsIHR5cGUpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYoL15tcy8udGVzdCh0eXBlLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgcmV0dXJuICdtc1JlcXVlc3RGdWxsc2NyZWVuJyBpbiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICB9IGVsc2UgaWYoL15tb3ovLnRlc3QodHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gJ21velJlcXVlc3RGdWxsc2NyZWVuJyBpbiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICB9IGVsc2UgaWYoL153ZWJraXQvLnRlc3QodHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJyBpbiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBFdmVudExpc3RlbmVySW50ZXJjZXB0b3IuZ2VuZXJhdGVFdmVudFR5cGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuZXZlbnRUeXBlcyA9IHt9OyAvLyBtYXAgb2YgdHlwZXMgdGhhdCByZXNvbHZlZCB0byBzb21ldGhpbmcgZWxzZVxyXG4gICAgdGhpcy52ZW5kb3JQcmVmaXhlcyA9IFsnJywgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbyddO1xyXG5cclxuXHJcbiAgICB0aGlzLmV2ZW50VHlwZXNbJ3doZWVsJ10gPSBbJ3doZWVsJywgJ21vdXNld2hlZWwnLCAnRE9NTW91c2VTY3JvbGwnXS5tYXAoZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpc1N1cHBvcnRlZDogX3RoaXMuaXNTdXBwb3J0ZWRPbkV2ZW50IH0gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ldmVudFR5cGVzWydmdWxsc2NyZWVuY2hhbmdlJ10gPSBbJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAnbW96ZnVsbHNjcmVlbmNoYW5nZScsICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgJ01TRnVsbHNjcmVlbkNoYW5nZScsICdtc2Z1bGxzY3JlZW5jaGFuZ2UnXS5tYXAoZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpc1N1cHBvcnRlZDogX3RoaXMuaXNTdXBwb3J0ZWRGdWxsU2NyZWVuRXZlbnQgfSA7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmV2ZW50VHlwZXNbJ2Z1bGxzY3JlZW5lcnJvciddID0gWydmdWxsc2NyZWVuZXJyb3InLCAnbW96ZnVsbHNjcmVlbmVycm9yJywgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcicsICdNU0Z1bGxzY3JlZW5FcnJvcicsICdtc2Z1bGxzY3JlZW5lcnJvciddLm1hcChmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIGlzU3VwcG9ydGVkOiBfdGhpcy5pc1N1cHBvcnRlZEZ1bGxTY3JlZW5FdmVudCB9IDtcclxuICAgIH0pO1xyXG5cclxuICAgIFtcclxuICAgICAgJ3BvaW50ZXJsb2NrY2hhbmdlJywgJ3BvaW50ZXJsb2NrZXJyb3InLFxyXG4gICAgICAnYW5pbWF0aW9uc3RhcnQnLCAnYW5pbWF0aW9uaXRlcmF0aW9uJywgJ2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICdwb2ludGVyY2FuY2VsJywgJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJob3ZlcicsICdwb2ludGVybW92ZScsICdwb2ludGVyb3V0JywgJ3BvaW50ZXJvdmVyJywgJ3BvaW50ZXJ1cCdcclxuICAgIF0uZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgIF90aGlzLmV2ZW50VHlwZXNbdHlwZV0gPSBfdGhpcy52ZW5kb3JQcmVmaXhlc1xyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocHJlZml4KSB7XHJcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiAocHJlZml4ICsgdHlwZSksIGlzU3VwcG9ydGVkOiBfdGhpcy5pc1N1cHBvcnRlZE9uRXZlbnQgfSA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbJ3RyYW5zaXRpb25zdGFydCcsICd0cmFuc2l0aW9ucnVuJywgJ3RyYW5zaXRpb25lbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgX3RoaXMuZXZlbnRUeXBlc1t0eXBlXSA9IF90aGlzLnZlbmRvclByZWZpeGVzXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbihwcmVmaXgpIHtcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6IChwcmVmaXggKyB0eXBlKSwgaXNTdXBwb3J0ZWQ6IF90aGlzLmlzU3VwcG9ydGVkVHJhbnNpdGlvbkV2ZW50IH0gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmdldFN1cHBvcnRlZEV2ZW50VHlwZSA9IGZ1bmN0aW9uKHRhcmdldCwgdHlwZSkge1xyXG4gICAgdmFyIHR5cGVzID0gdGhpcy5ldmVudFR5cGVzW3R5cGVdO1xyXG4gICAgaWYodHlwZXMgPT09IHZvaWQgMCkge1xyXG4gICAgICByZXR1cm4gdHlwZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfdHlwZTtcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgX3R5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgICBpZihfdHlwZS5pc1N1cHBvcnRlZCh0YXJnZXQsIF90eXBlLnR5cGUpKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlIDogJyArIGV2ZW50VHlwZXNQb2x5ZmlsbGVyW2ldLnR5cGUpO1xyXG4gICAgICAgICAgcmV0dXJuIF90eXBlLnR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGlzLmVycm9yKG5ldyBFcnJvcignRXZlbnQgbGlzdGVuZXIgdHlwZSAnICsgU3RyaW5nKHR5cGUpICsgJyBvbiAnICsgU3RyaW5nKHRhcmdldCkgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgY3VycmVudCBlbnZpcm9ubWVudCcpKTtcclxuICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5wb2x5ZmlsbExpc3RlbmVyRXZlbnRUeXBlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZUV2ZW50VHlwZXMoKTtcclxuXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuaW50ZXJjZXB0QWxsKHtcclxuICAgICAgYWRkOiBmdW5jdGlvbihub3JtYWxpemVkQXJndW1lbnRzKSB7XHJcbiAgICAgICAgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkLnR5cGUgPSBfdGhpcy5nZXRTdXBwb3J0ZWRFdmVudFR5cGUodGhpcywgbm9ybWFsaXplZEFyZ3VtZW50cy5wb2x5ZmlsbGVkLnR5cGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLnBvbHlmaWxsTGlzdGVuZXJFdmVudFR5cGVzKCk7XHJcblxyXG59KShyZXF1aXJlKCcuL0V2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5qcycpKTtcbn0se1wiLi9FdmVudExpc3RlbmVySW50ZXJjZXB0b3IuanNcIjoxfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yKSB7XHJcbiAgLyoqXHJcbiAgICogRXZlbnQgbGlzdGVuZXIgb3B0aW9ucyBzdXBwb3J0XHJcbiAgICovXHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5kZXRlY3RTdXBwb3J0ZWRPcHRpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuc3VwcG9ydGVkT3B0aW9ucyA9IHtcclxuICAgICAgb25jZTogZmFsc2UsXHJcbiAgICAgIHBhc3NpdmU6IGZhbHNlLFxyXG4gICAgICBjYXB0dXJlOiBmYWxzZSxcclxuXHJcbiAgICAgIGFsbDogZmFsc2UsXHJcbiAgICAgIHNvbWU6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKS5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgZnVuY3Rpb24oKSB7fSwge1xyXG4gICAgICBnZXQgb25jZSgpIHtcclxuICAgICAgICBfdGhpcy5zdXBwb3J0ZWRPcHRpb25zLm9uY2UgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0IHBhc3NpdmUoKSB7XHJcbiAgICAgICAgX3RoaXMuc3VwcG9ydGVkT3B0aW9ucy5wYXNzaXZlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldCBjYXB0dXJlKCkge1xyXG4gICAgICAgIF90aGlzLnN1cHBvcnRlZE9wdGlvbnMuY2FwdHVyZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB1c2VmdWwgc2hvcnRjdXRzIHRvIGRldGVjdCBpZiBvcHRpb25zIGFyZSBhbGwvc29tZSBzdXBwb3J0ZWRcclxuICAgIHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5hbGwgID0gdGhpcy5zdXBwb3J0ZWRPcHRpb25zLm9uY2UgJiYgdGhpcy5zdXBwb3J0ZWRPcHRpb25zLnBhc3NpdmUgJiYgdGhpcy5zdXBwb3J0ZWRPcHRpb25zLmNhcHR1cmU7XHJcbiAgICB0aGlzLnN1cHBvcnRlZE9wdGlvbnMuc29tZSA9IHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5vbmNlIHx8IHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5wYXNzaXZlIHx8IHRoaXMuc3VwcG9ydGVkT3B0aW9ucy5jYXB0dXJlO1xyXG4gIH07XHJcblxyXG4gIEV2ZW50TGlzdGVuZXJJbnRlcmNlcHRvci5wb2x5ZmlsbExpc3RlbmVyT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5kZXRlY3RTdXBwb3J0ZWRPcHRpb25zKCk7XHJcbiAgICBpZiAoIXRoaXMuc3VwcG9ydGVkT3B0aW9ucy5hbGwpIHtcclxuICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgIHRoaXMuaW50ZXJjZXB0QWxsKHtcclxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKG5vcm1hbGl6ZWRBcmd1bWVudHMpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbnRlcmNlcHRlZCcsIG5vcm1hbGl6ZWRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgICAgIHZhciBvbmNlID0gbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLm9uY2UgJiYgIV90aGlzLnN1cHBvcnRlZE9wdGlvbnMub25jZTtcclxuICAgICAgICAgIHZhciBwYXNzaXZlID0gbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLnBhc3NpdmUgJiYgIV90aGlzLnN1cHBvcnRlZE9wdGlvbnMucGFzc2l2ZTtcclxuXHJcbiAgICAgICAgICBpZiAob25jZSB8fCBwYXNzaXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC5saXN0ZW5lcjtcclxuXHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC5saXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgaWYob25jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG5vcm1hbGl6ZWRBcmd1bWVudHMudHlwZSwgbm9ybWFsaXplZEFyZ3VtZW50cy5saXN0ZW5lciwgbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmKHBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHByZXZlbnREZWZhdWx0IGluc2lkZSBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIGludm9jYXRpb24uJyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICghX3RoaXMuc3VwcG9ydGVkT3B0aW9ucy5zb21lKSB7XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRBcmd1bWVudHMucG9seWZpbGxlZC5vcHRpb25zID0gbm9ybWFsaXplZEFyZ3VtZW50cy5vcHRpb25zLmNhcHR1cmU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLnBvbHlmaWxsTGlzdGVuZXJPcHRpb25zKCk7XHJcblxyXG5cclxuICAvLyB2YXIgb25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgLy8gfTtcclxuXHJcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uY2xpY2ssIGZhbHNlKTtcclxuICAvLyBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljaywgeyBvbmNlOiB0cnVlIH0pO1xyXG4gIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbmNsaWNrLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uY2xpY2ssIGZhbHNlKTtcclxuICAvLyBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljaywgZmFsc2UpO1xyXG5cclxufSkocmVxdWlyZSgnLi9FdmVudExpc3RlbmVySW50ZXJjZXB0b3IuanMnKSk7XG59LHtcIi4vRXZlbnRMaXN0ZW5lckludGVyY2VwdG9yLmpzXCI6MX1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIEFwcGx5VGhpc1Byb3RvdHlwZShldmVudCwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSAmJiAodGFyZ2V0ICE9PSBudWxsKSkge1xyXG4gICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcclxuICAgICAgdmFyIHByb3BlcnR5O1xyXG5cclxuICAgICAgZm9yIChwcm9wZXJ0eSBpbiBwcm90bykge1xyXG4gICAgICAgIGlmICghKHByb3BlcnR5IGluIGV2ZW50KSkge1xyXG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAocHJvcGVydHkgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCEocHJvcGVydHkgaW4gZXZlbnQpKSB7XHJcbiAgICAgICAgICBldmVudFtwcm9wZXJ0eV0gPSB0YXJnZXRbcHJvcGVydHldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXG59LHt9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbihBcHBseVRoaXNQcm90b3R5cGUpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBDdXN0b21FdmVudFxyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdldmVudCcsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdmFyIEN1c3RvbUV2ZW50T3JpZ2luYWwgPSB3aW5kb3cuQ3VzdG9tRXZlbnQgfHwgd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBwYXJhbXMpIHtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFxyXG4gICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICAocGFyYW1zLmJ1YmJsZXMgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5idWJibGVzLFxyXG4gICAgICAgIChwYXJhbXMuY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmNhbmNlbGFibGUsXHJcbiAgICAgICAgKHBhcmFtcy5kZXRhaWwgPT09IHZvaWQgMCkgPyB7fSA6IHBhcmFtcy5kZXRhaWxcclxuICAgICAgKTtcclxuICAgICAgQXBwbHlUaGlzUHJvdG90eXBlKGV2ZW50LCB0aGlzKTtcclxuICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfTtcclxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IEN1c3RvbUV2ZW50T3JpZ2luYWwucHJvdG90eXBlO1xyXG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbiAgfVxyXG59KShyZXF1aXJlKCcuL0FwcGx5VGhpc1Byb3RvdHlwZS5qcycpKTtcbn0se1wiLi9BcHBseVRoaXNQcm90b3R5cGUuanNcIjo0fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLy8g4pyTLCDinJdcclxuXHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgRXZlbnRcclxuICAgKi9cclxuICB0cnkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IHdpbmRvdy5FdmVudCgnZXZlbnQnLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgdmFyIEV2ZW50T3JpZ2luYWwgPSB3aW5kb3cuRXZlbnQ7XHJcbiAgICB2YXIgRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIHBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XHJcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG4gICAgICBldmVudC5pbml0RXZlbnQoXHJcbiAgICAgICAgZXZlbnROYW1lLFxyXG4gICAgICAgIChwYXJhbXMuYnViYmxlcyA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmJ1YmJsZXMsXHJcbiAgICAgICAgKHBhcmFtcy5jYW5jZWxhYmxlID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY2FuY2VsYWJsZSxcclxuICAgICAgICAocGFyYW1zLmRldGFpbCA9PT0gdm9pZCAwKSA/IHt9IDogcGFyYW1zLmRldGFpbFxyXG4gICAgICApO1xyXG4gICAgICBBcHBseVRoaXNQcm90b3R5cGUoZXZlbnQsIHRoaXMpO1xyXG4gICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9O1xyXG4gICAgRXZlbnQucHJvdG90eXBlID0gRXZlbnRPcmlnaW5hbC5wcm90b3R5cGU7XHJcbiAgICB3aW5kb3cuRXZlbnQgPSBFdmVudDtcclxuICB9XHJcbn0pKHJlcXVpcmUoJy4vQXBwbHlUaGlzUHJvdG90eXBlLmpzJykpO1xufSx7XCIuL0FwcGx5VGhpc1Byb3RvdHlwZS5qc1wiOjR9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbihBcHBseVRoaXNQcm90b3R5cGUpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBGb2N1c0V2ZW50IDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZvY3VzRXZlbnQvRm9jdXNFdmVudFxyXG4gICAqICAtIHJlbGF0ZWRUYXJnZXQg4pyTXHJcbiAgICovXHJcbiAgdHJ5IHtcclxuICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuRm9jdXNFdmVudCgnZXZlbnQnLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHZhciBGb2N1c0V2ZW50T3JpZ2luYWwgPSB3aW5kb3cuRm9jdXNFdmVudCB8fCB3aW5kb3cuRXZlbnQ7XHJcbiAgICB2YXIgRm9jdXNFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgcGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0ZvY3VzRXZlbnQnKTtcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvZmY5NzU5NTQodj12cy44NSkuYXNweFxyXG4gICAgICBldmVudC5pbml0Rm9jdXNFdmVudChcclxuICAgICAgICBldmVudE5hbWUsXHJcbiAgICAgICAgKHBhcmFtcy5idWJibGVzID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYnViYmxlcyxcclxuICAgICAgICAocGFyYW1zLmNhbmNlbGFibGUgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jYW5jZWxhYmxlLFxyXG4gICAgICAgIChwYXJhbXMudmlldyA9PT0gdm9pZCAwKSA/IHdpbmRvdyA6IHBhcmFtcy52aWV3LFxyXG4gICAgICAgIChwYXJhbXMuZGV0YWlsID09PSB2b2lkIDApID8ge30gOiBwYXJhbXMuZGV0YWlsLFxyXG4gICAgICAgIChwYXJhbXMucmVsYXRlZFRhcmdldCA9PT0gdm9pZCAwKSA/IG51bGwgOiBwYXJhbXMucmVsYXRlZFRhcmdldFxyXG4gICAgICApO1xyXG5cclxuICAgICAgQXBwbHlUaGlzUHJvdG90eXBlKGV2ZW50LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudDtcclxuICAgIH07XHJcbiAgICBGb2N1c0V2ZW50LnByb3RvdHlwZSA9IEZvY3VzRXZlbnRPcmlnaW5hbC5wcm90b3R5cGU7XHJcbiAgICB3aW5kb3cuRm9jdXNFdmVudCA9IEZvY3VzRXZlbnQ7XHJcbiAgfVxyXG59KShyZXF1aXJlKCcuL0FwcGx5VGhpc1Byb3RvdHlwZS5qcycpKTtcbn0se1wiLi9BcHBseVRoaXNQcm90b3R5cGUuanNcIjo0fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgS2V5Ym9hcmRFdmVudCA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L0tleWJvYXJkRXZlbnRcclxuICAgKiAgLSBrZXkg4pyTXHJcbiAgICogIC0gY2hhciDinJNcclxuICAgKiAgLSBjb2RlIOKck1xyXG4gICAqICAtIGxvY2F0aW9uIOKck1xyXG4gICAqICAtIGN0cmxLZXkg4pyTXHJcbiAgICogIC0gc2hpZnRLZXkg4pyTXHJcbiAgICogIC0gYWx0S2V5IOKck1xyXG4gICAqICAtIG1ldGFLZXkg4pyTXHJcbiAgICogIC0gcmVwZWF0IOKck1xyXG4gICAqICAtIGlzQ29tcG9zaW5nIOKcl1xyXG4gICAqICAtIGNoYXJDb2RlIOKck1xyXG4gICAqICAtIGtleUNvZGUg4pyTXHJcbiAgICogIC0gd2hpY2gg4pyTXHJcbiAgICovXHJcbiAgdHJ5IHtcclxuICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuS2V5Ym9hcmRFdmVudCgnZXZlbnQnLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHZhciBLZXlib2FyZEV2ZW50T3JpZ2luYWwgPSB3aW5kb3cuS2V5Ym9hcmRFdmVudCB8fCB3aW5kb3cuRXZlbnQ7XHJcbiAgICB2YXIgS2V5Ym9hcmRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgcGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0tleWJvYXJkRXZlbnQnKTtcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvZmY5NzUyOTcodj12cy44NSkuYXNweFxyXG4gICAgICBldmVudC5pbml0S2V5Ym9hcmRFdmVudChcclxuICAgICAgICBldmVudE5hbWUsXHJcbiAgICAgICAgKHBhcmFtcy5idWJibGVzID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYnViYmxlcyxcclxuICAgICAgICAocGFyYW1zLmNhbmNlbGFibGUgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jYW5jZWxhYmxlLFxyXG4gICAgICAgIChwYXJhbXMudmlldyA9PT0gdm9pZCAwKSA/IHdpbmRvdyA6IHBhcmFtcy52aWV3LFxyXG4gICAgICAgIChwYXJhbXMua2V5ID09PSB2b2lkIDApID8gJycgOiBwYXJhbXMua2V5LFxyXG4gICAgICAgIChwYXJhbXMubG9jYXRpb24gPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmxvY2F0aW9uLFxyXG4gICAgICAgICgocGFyYW1zLmN0cmxLZXkgPT09IHRydWUpID8gJ0NvbnRyb2wgJyA6ICcnKSArXHJcbiAgICAgICAgKChwYXJhbXMuYWx0S2V5ID09PSB0cnVlKSA/ICdBbHQgJyA6ICcnKSArXHJcbiAgICAgICAgKChwYXJhbXMuc2hpZnRLZXkgPT09IHRydWUpID8gJ1NoaWZ0ICcgOiAnJykgK1xyXG4gICAgICAgICgocGFyYW1zLm1ldGFLZXkgPT09IHRydWUpID8gJ01ldGEgJyA6ICcnKSxcclxuICAgICAgICAocGFyYW1zLnJlcGVhdCA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLnJlcGVhdCxcclxuICAgICAgICAocGFyYW1zLmxvY2FsZSA9PT0gdm9pZCAwKSA/IG5hdmlnYXRvci5sYW5ndWFnZSA6IHBhcmFtcy5sb2NhbGVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGV2ZW50LmtleUNvZGUgICA9IChwYXJhbXMua2V5Q29kZSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMua2V5Q29kZTtcclxuICAgICAgZXZlbnQuY29kZSAgICAgID0gKHBhcmFtcy5jb2RlID09PSB2b2lkIDApID8gJycgOiBwYXJhbXMuY29kZTtcclxuICAgICAgZXZlbnQuY2hhckNvZGUgID0gKHBhcmFtcy5jaGFyQ29kZSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuY2hhckNvZGU7XHJcbiAgICAgIGV2ZW50LmNoYXIgICAgICA9IChwYXJhbXMuY2hhckNvZGUgPT09IHZvaWQgMCkgPyAnJyA6IHBhcmFtcy5jaGFyQ29kZTtcclxuICAgICAgZXZlbnQud2hpY2ggICAgID0gKHBhcmFtcy53aGljaCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMud2hpY2g7XHJcblxyXG4gICAgICBBcHBseVRoaXNQcm90b3R5cGUoZXZlbnQsIHRoaXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfTtcclxuICAgIEtleWJvYXJkRXZlbnQucHJvdG90eXBlID0gS2V5Ym9hcmRFdmVudE9yaWdpbmFsLnByb3RvdHlwZTtcclxuICAgIHdpbmRvdy5LZXlib2FyZEV2ZW50ID0gS2V5Ym9hcmRFdmVudDtcclxuICB9XHJcblxyXG59KShyZXF1aXJlKCcuL0FwcGx5VGhpc1Byb3RvdHlwZS5qcycpKTtcbn0se1wiLi9BcHBseVRoaXNQcm90b3R5cGUuanNcIjo0fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oQXBwbHlUaGlzUHJvdG90eXBlKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgTW91c2VFdmVudCA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L01vdXNlRXZlbnRcclxuICAgKiAgLSBzY3JlZW5YIOKck1xyXG4gICAqICAtIHNjcmVlblkg4pyTXHJcbiAgICogIC0gY2xpZW50WCDinJNcclxuICAgKiAgLSBjbGllbnRZIOKck1xyXG4gICAqICAtIGN0cmxLZXkg4pyTXHJcbiAgICogIC0gc2hpZnRLZXkg4pyTXHJcbiAgICogIC0gYWx0S2V5IOKck1xyXG4gICAqICAtIG1ldGFLZXkg4pyTXHJcbiAgICogIC0gYnV0dG9uIOKck1xyXG4gICAqICAtIGJ1dHRvbnMg4pyTXHJcbiAgICogIC0gcmVnaW9uIOKck1xyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgd2luZG93Lk1vdXNlRXZlbnQoJ2V2ZW50JywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB2YXIgTW91c2VFdmVudE9yaWdpbmFsID0gd2luZG93Lk1vdXNlRXZlbnQgfHwgd2luZG93LkV2ZW50O1xyXG4gICAgdmFyIE1vdXNlRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIHBhcmFtcykge1xyXG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XHJcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2ZmOTc1MjkyKHY9dnMuODUpLmFzcHhcclxuICAgICAgZXZlbnQuaW5pdE1vdXNlRXZlbnQoXHJcbiAgICAgICAgZXZlbnROYW1lLFxyXG4gICAgICAgIChwYXJhbXMuYnViYmxlcyA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmJ1YmJsZXMsXHJcbiAgICAgICAgKHBhcmFtcy5jYW5jZWxhYmxlID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuY2FuY2VsYWJsZSxcclxuICAgICAgICAocGFyYW1zLnZpZXcgPT09IHZvaWQgMCkgPyB3aW5kb3cgOiBwYXJhbXMudmlldyxcclxuICAgICAgICAocGFyYW1zLmRldGFpbCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuZGV0YWlsLFxyXG4gICAgICAgIChwYXJhbXMuc2NyZWVuWCA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuc2NyZWVuWCxcclxuICAgICAgICAocGFyYW1zLnNjcmVlblkgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnNjcmVlblksXHJcbiAgICAgICAgKHBhcmFtcy5jbGllbnRYID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5jbGllbnRYLFxyXG4gICAgICAgIChwYXJhbXMuY2xpZW50WSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuY2xpZW50WSxcclxuICAgICAgICAocGFyYW1zLmN0cmxLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jdHJsS2V5LFxyXG4gICAgICAgIChwYXJhbXMuYWx0S2V5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYWx0S2V5LFxyXG4gICAgICAgIChwYXJhbXMuc2hpZnRLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5zaGlmdEtleSxcclxuICAgICAgICAocGFyYW1zLm1ldGFLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5tZXRhS2V5LFxyXG4gICAgICAgIChwYXJhbXMuYnV0dG9uID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5idXR0b24sXHJcbiAgICAgICAgKHBhcmFtcy5yZWxhdGVkVGFyZ2V0ID09PSB2b2lkIDApID8gbnVsbCA6IHBhcmFtcy5yZWxhdGVkVGFyZ2V0XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBldmVudC5idXR0b25zID0gKHBhcmFtcy5idXR0b25zID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5idXR0b25zO1xyXG4gICAgICBldmVudC5yZWdpb24gID0gKHBhcmFtcy5yZWdpb24gPT09IHZvaWQgMCkgPyBudWxsIDogcGFyYW1zLnJlZ2lvbjtcclxuXHJcbiAgICAgIEFwcGx5VGhpc1Byb3RvdHlwZShldmVudCwgdGhpcyk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9O1xyXG4gICAgTW91c2VFdmVudC5wcm90b3R5cGUgPSBNb3VzZUV2ZW50T3JpZ2luYWwucHJvdG90eXBlO1xyXG4gICAgd2luZG93Lk1vdXNlRXZlbnQgPSBNb3VzZUV2ZW50O1xyXG4gIH1cclxufSkocmVxdWlyZSgnLi9BcHBseVRoaXNQcm90b3R5cGUuanMnKSk7XG59LHtcIi4vQXBwbHlUaGlzUHJvdG90eXBlLmpzXCI6NH1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbihBcHBseVRoaXNQcm90b3R5cGUpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBQb2ludGVyRXZlbnRcclxuICAgKiAgLSBwb2ludGVySWQg4pyTXHJcbiAgICogIC0gd2lkdGgg4pyTXHJcbiAgICogIC0gaGVpZ2h0IOKck1xyXG4gICAqICAtIHByZXNzdXJlIOKck1xyXG4gICAqICAtIHRhbmdlbnRpYWxQcmVzc3VyZSDinJNcclxuICAgKiAgLSB0aWx0WCDinJNcclxuICAgKiAgLSB0aWx0WSDinJNcclxuICAgKiAgLSB0d2lzdCDinJNcclxuICAgKiAgLSBwb2ludGVyVHlwZSDinJNcclxuICAgKiAgLSBpc1ByaW1hcnkg4pyTXHJcbiAgICovXHJcbiAgdHJ5IHtcclxuICAgIHZhciBldmVudCA9IG5ldyB3aW5kb3cuUG9pbnRlckV2ZW50KCdldmVudCcsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdmFyIFBvaW50ZXJFdmVudE9yaWdpbmFsID0gd2luZG93LlBvaW50ZXJFdmVudCB8fCB3aW5kb3cuRXZlbnQ7XHJcbiAgICB2YXIgUG9pbnRlckV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBwYXJhbXMpIHtcclxuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnUG9pbnRlckV2ZW50Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2pqMTkyMDM5KHY9dnMuODUpLmFzcHhcclxuICAgICAgZXZlbnQuaW5pdFBvaW50ZXJFdmVudChcclxuICAgICAgICBldmVudE5hbWUsXHJcbiAgICAgICAgKHBhcmFtcy5idWJibGVzID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuYnViYmxlcyxcclxuICAgICAgICAocGFyYW1zLmNhbmNlbGFibGUgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5jYW5jZWxhYmxlLFxyXG4gICAgICAgIChwYXJhbXMudmlldyA9PT0gdm9pZCAwKSA/IHdpbmRvdyA6IHBhcmFtcy52aWV3LFxyXG4gICAgICAgIChwYXJhbXMuZGV0YWlsID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5kZXRhaWwsXHJcbiAgICAgICAgKHBhcmFtcy5zY3JlZW5YID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5zY3JlZW5YLFxyXG4gICAgICAgIChwYXJhbXMuc2NyZWVuWSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMuc2NyZWVuWSxcclxuICAgICAgICAocGFyYW1zLmNsaWVudFggPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmNsaWVudFgsXHJcbiAgICAgICAgKHBhcmFtcy5jbGllbnRZID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5jbGllbnRZLFxyXG4gICAgICAgIChwYXJhbXMuY3RybEtleSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLmN0cmxLZXksXHJcbiAgICAgICAgKHBhcmFtcy5hbHRLZXkgPT09IHZvaWQgMCkgPyBmYWxzZSA6IHBhcmFtcy5hbHRLZXksXHJcbiAgICAgICAgKHBhcmFtcy5zaGlmdEtleSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLnNoaWZ0S2V5LFxyXG4gICAgICAgIChwYXJhbXMubWV0YUtleSA9PT0gdm9pZCAwKSA/IGZhbHNlIDogcGFyYW1zLm1ldGFLZXksXHJcbiAgICAgICAgKHBhcmFtcy5idXR0b24gPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmJ1dHRvbixcclxuICAgICAgICAocGFyYW1zLnJlbGF0ZWRUYXJnZXQgPT09IHZvaWQgMCkgPyBudWxsIDogcGFyYW1zLnJlbGF0ZWRUYXJnZXQsXHJcblxyXG4gICAgICAgIChwYXJhbXMub2Zmc2V0WCAgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLm9mZnNldFgsXHJcbiAgICAgICAgKHBhcmFtcy5vZmZzZXRZICA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMub2Zmc2V0WSxcclxuICAgICAgICAocGFyYW1zLndpZHRoID09PSB2b2lkIDApID8gMSA6IHBhcmFtcy53aWR0aCxcclxuICAgICAgICAocGFyYW1zLmhlaWdodCA9PT0gdm9pZCAwKSA/IDEgOiBwYXJhbXMuaGVpZ2h0LFxyXG4gICAgICAgIChwYXJhbXMucHJlc3N1cmUgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnByZXNzdXJlLFxyXG4gICAgICAgIChwYXJhbXMudHdpc3QgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnR3aXN0LFxyXG4gICAgICAgIChwYXJhbXMudGlsdFggPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnRpbHRYLFxyXG4gICAgICAgIChwYXJhbXMudGlsdFkgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLnRpbHRZLFxyXG4gICAgICAgIChwYXJhbXMucG9pbnRlcklkID09PSB2b2lkIDApID8gMCA6IHBhcmFtcy5wb2ludGVySWQsXHJcbiAgICAgICAgKHBhcmFtcy5wb2ludGVyVHlwZSA9PT0gdm9pZCAwKSA/ICcnIDogcGFyYW1zLnBvaW50ZXJUeXBlLFxyXG4gICAgICAgIChwYXJhbXMuaHdUaW1lc3RhbXAgPT09IHZvaWQgMCkgPyAwIDogcGFyYW1zLmh3VGltZXN0YW1wLFxyXG4gICAgICAgIChwYXJhbXMuaXNQcmltYXJ5ID09PSB2b2lkIDApID8gZmFsc2UgOiBwYXJhbXMuaXNQcmltYXJ5XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBldmVudC50YW5nZW50aWFsUHJlc3N1cmUgPSAocGFyYW1zLnRhbmdlbnRpYWxQcmVzc3VyZSA9PT0gdm9pZCAwKSA/IDAgOiBwYXJhbXMudGFuZ2VudGlhbFByZXNzdXJlO1xyXG5cclxuICAgICAgQXBwbHlUaGlzUHJvdG90eXBlKGV2ZW50LCB0aGlzKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudDtcclxuICAgIH07XHJcblxyXG4gICAgUG9pbnRlckV2ZW50LnByb3RvdHlwZSA9IFBvaW50ZXJFdmVudE9yaWdpbmFsLnByb3RvdHlwZTtcclxuXHJcbiAgICB2YXIgcm90YXRpb25EZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihQb2ludGVyRXZlbnQucHJvdG90eXBlLCAncm90YXRpb24nKTtcclxuICAgIGlmIChyb3RhdGlvbkRlc2NyaXB0b3IpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBvaW50ZXJFdmVudC5wcm90b3R5cGUsICd0d2lzdCcsIHJvdGF0aW9uRGVzY3JpcHRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LlBvaW50ZXJFdmVudCA9IFBvaW50ZXJFdmVudDtcclxuICB9XHJcbn0pKHJlcXVpcmUoJy4vQXBwbHlUaGlzUHJvdG90eXBlLmpzJykpO1xufSx7XCIuL0FwcGx5VGhpc1Byb3RvdHlwZS5qc1wiOjR9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuL0V2ZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vQ3VzdG9tRXZlbnQuanMnKTtcclxucmVxdWlyZSgnLi9Nb3VzZUV2ZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vS2V5Ym9hcmRFdmVudC5qcycpO1xyXG5yZXF1aXJlKCcuL0ZvY3VzRXZlbnQuanMnKTtcclxucmVxdWlyZSgnLi9Qb2ludGVyRXZlbnQuanMnKTtcbn0se1wiLi9DdXN0b21FdmVudC5qc1wiOjUsXCIuL0V2ZW50LmpzXCI6NixcIi4vRm9jdXNFdmVudC5qc1wiOjcsXCIuL0tleWJvYXJkRXZlbnQuanNcIjo4LFwiLi9Nb3VzZUV2ZW50LmpzXCI6OSxcIi4vUG9pbnRlckV2ZW50LmpzXCI6MTB9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuL2NvbnN0cnVjdG9ycy9pbmRleC5qcycpO1xyXG5yZXF1aXJlKCcuL0xpc3RlbmVyT3B0aW9ucy5qcycpO1xyXG5yZXF1aXJlKCcuL0xpc3RlbmVyRXZlbnRUeXBlcy5qcycpO1xyXG5cbn0se1wiLi9MaXN0ZW5lckV2ZW50VHlwZXMuanNcIjoyLFwiLi9MaXN0ZW5lck9wdGlvbnMuanNcIjozLFwiLi9jb25zdHJ1Y3RvcnMvaW5kZXguanNcIjoxMX1dfSx7fSxbMTJdKTtcbiIsImltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSBcIi4uL2xpYi9FdmVudE1hbmFnZXJcIjtcbmltcG9ydCBWYWx1ZVJlc29sdmVyIGZyb20gXCIuLi9saWIvVmFsdWVSZXNvbHZlclwiIC8vIGNoYW5nZSB0aGUgZGlyZWN0b3J5V2hlcmVcbmltcG9ydCBGb28gZnJvbSBcIi4vLi4vbGliL0Zvby9Gb29cIjtcbmNvbnN0IGV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuLy8gKCdib2R5Jykuc3Vic2NyaWJlKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbi8vIFx0Y29uc29sZS5sb2coJ2ludGVyc3RpbmcnLCBldmVudCk7XG4vLyBcdGNvbnNvbGUubG9nKHRoaXMuZGF0YVJlc29sdmVyLmNhbGwodGhpcyw1KSl9KVxuXHRldmVudE1hbmFnZXJcblx0LnNldFN1YnNjcmliZXJzKCBbRm9vXSApXG5cdFxuXHR3aW5kb3cuZXZlbnRNYW5hZ2VyID0gZXZlbnRNYW5hZ2VyXG5cdHdpbmRvdy5mb28gPSBGb29cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=