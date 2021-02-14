"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _path, _routes;
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegExp_1 = __importDefault(require("./pathToRegExp"));
class Route {
    constructor(path) {
        _path.set(this, void 0);
        _routes.set(this, []);
        __classPrivateFieldSet(this, _path, pathToRegExp_1.default(path));
    }
    delete(_1) {
        __classPrivateFieldGet(this, _routes).push(['DELETE', _1]);
        return this;
    }
    get(_1) {
        __classPrivateFieldGet(this, _routes).push(['GET', _1]);
        return this;
    }
    patch(_1) {
        __classPrivateFieldGet(this, _routes).push(['PATCH', _1]);
        return this;
    }
    post(_1) {
        __classPrivateFieldGet(this, _routes).push(['POST', _1]);
        return this;
    }
    put(_1) {
        __classPrivateFieldGet(this, _routes).push(['PUT', _1]);
        return this;
    }
    async test(context, method, url) {
        if (typeof url === 'string') {
            url = new URL(url, 'file://');
        }
        for (const route of __classPrivateFieldGet(this, _routes)) {
            if (route[0] === method && __classPrivateFieldGet(this, _path).test(url.pathname)) {
                const parameters = url.pathname.match(__classPrivateFieldGet(this, _path))?.groups || {};
                await route[1](parameters, ...context);
                return true;
            }
        }
        return false;
    }
}
_path = new WeakMap(), _routes = new WeakMap();
exports.default = Route;
