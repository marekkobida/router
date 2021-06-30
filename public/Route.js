/*
 * Copyright 2021 Marek Kobida
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var _Route_children, _Route_context, _Route_url, _Route_test;
import pathToRegExp from './pathToRegExp/index.js';
var Route = /** @class */ (function () {
    function Route(url, context) {
        var _this = this;
        if (context === void 0) { context = {}; }
        _Route_children.set(this, []);
        _Route_context.set(this, void 0);
        _Route_url.set(this, void 0);
        _Route_test.set(this, function (afterTest, i, url) {
            var next = function () {
                __classPrivateFieldGet(_this, _Route_test, "f").call(_this, afterTest, i + 1, url);
            };
            if (afterTest[i]) {
                var context = __assign(__assign({}, __classPrivateFieldGet(_this, _Route_context, "f")), { urlParameters: _this.readUrlParameters(url) });
                switch (afterTest[i].length) {
                    case 1:
                        afterTest[i](context, function () { });
                        next();
                        break;
                    case 2:
                        afterTest[i](context, next);
                        break;
                }
            }
            return _this;
        });
        __classPrivateFieldSet(this, _Route_context, context, "f");
        __classPrivateFieldSet(this, _Route_url, [url, pathToRegExp(url)], "f");
    }
    Route.prototype.addChild = function (method) {
        var afterTest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            afterTest[_i - 1] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Route_children, "f").push([method, afterTest.flat(Infinity)]);
        return this;
    };
    Object.defineProperty(Route.prototype, "context", {
        set: function (context) {
            __classPrivateFieldSet(this, _Route_context, context, "f");
        },
        enumerable: false,
        configurable: true
    });
    Route.prototype["delete"] = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['DELETE'], afterTest));
        return this;
    };
    Route.prototype.get = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['GET'], afterTest));
        return this;
    };
    Route.prototype.options = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['OPTIONS'], afterTest));
        return this;
    };
    Route.prototype.patch = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['PATCH'], afterTest));
        return this;
    };
    Route.prototype.post = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['POST'], afterTest));
        return this;
    };
    Route.prototype.put = function () {
        var afterTest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            afterTest[_i] = arguments[_i];
        }
        this.addChild.apply(this, __spreadArray(['PUT'], afterTest));
        return this;
    };
    Route.prototype.readUrlParameters = function (url) {
        var _a = url.match(__classPrivateFieldGet(this, _Route_url, "f")[1]) || [], _1 = _a[0], _2 = _a.slice(1);
        return _2;
    };
    Route.prototype.test = function (method, url) {
        if (__classPrivateFieldGet(this, _Route_url, "f")[1].test(url))
            for (var _i = 0, _a = __classPrivateFieldGet(this, _Route_children, "f"); _i < _a.length; _i++) {
                var child = _a[_i];
                if (child[0] === method)
                    return __classPrivateFieldGet(this, _Route_test, "f").call(this, child[1], 0, url);
            }
    };
    Object.defineProperty(Route.prototype, "url", {
        get: function () {
            return __classPrivateFieldGet(this, _Route_url, "f");
        },
        enumerable: false,
        configurable: true
    });
    return Route;
}());
_Route_children = new WeakMap(), _Route_context = new WeakMap(), _Route_url = new WeakMap(), _Route_test = new WeakMap();
export default Route;
