/*
 * Copyright 2021 Marek Kobida
 */
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
var _Router_context, _Router_routes;
import Route from './Route.js';
var Router = /** @class */ (function () {
    function Router(context) {
        if (context === void 0) { context = {}; }
        _Router_context.set(this, void 0);
        _Router_routes.set(this, []);
        __classPrivateFieldSet(this, _Router_context, context, "f");
    }
    Router.prototype.addRoute = function (route) {
        if (route instanceof Route) {
            route.context = __classPrivateFieldGet(this, _Router_context, "f");
        }
        if (typeof route === 'string') {
            route = new Route(route, __classPrivateFieldGet(this, _Router_context, "f"));
        }
        __classPrivateFieldGet(this, _Router_routes, "f").push(route);
        return route;
    };
    Object.defineProperty(Router.prototype, "context", {
        set: function (context) {
            __classPrivateFieldSet(this, _Router_context, context, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "routes", {
        get: function () {
            return __classPrivateFieldGet(this, _Router_routes, "f");
        },
        enumerable: false,
        configurable: true
    });
    Router.prototype.test = function (method, url) {
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_routes, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            route.context = __classPrivateFieldGet(this, _Router_context, "f");
            if (route.test(method, url))
                return route;
        }
    };
    return Router;
}());
_Router_context = new WeakMap(), _Router_routes = new WeakMap();
export default Router;
