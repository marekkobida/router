"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _routes;
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("./Route"));
class Router {
    constructor() {
        _routes.set(this, []);
    }
    addRoute(path) {
        const route = new Route_1.default(path);
        __classPrivateFieldGet(this, _routes).push(route);
        return route;
    }
    async test(context, method, url) {
        for (const route of __classPrivateFieldGet(this, _routes)) {
            if (await route.test(context, method, url)) {
                return true;
            }
        }
        return false;
    }
}
_routes = new WeakMap();
exports.default = Router;
