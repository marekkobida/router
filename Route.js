/*
 * Copyright 2021 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./pathToRegExp"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pathToRegExp_1 = __importDefault(require("./pathToRegExp"));
    class Route {
        constructor(path) {
            this.routes = [];
            this.path = pathToRegExp_1.default(path);
        }
        addRoute(method, _1) {
            this.routes.push([method, _1]);
            return this;
        }
        delete(_1) {
            this.addRoute('DELETE', _1);
            return this;
        }
        get(_1) {
            this.addRoute('GET', _1);
            return this;
        }
        patch(_1) {
            this.addRoute('PATCH', _1);
            return this;
        }
        post(_1) {
            this.addRoute('POST', _1);
            return this;
        }
        put(_1) {
            this.addRoute('PUT', _1);
            return this;
        }
        async test(context, method, url) {
            if (typeof url === 'string') {
                url = new URL(url, 'file://');
            }
            for (const [_1, _2] of this.routes) {
                if (_1 === method && this.path.test(url.pathname)) {
                    const parameters = url.pathname.match(this.path)?.groups || {};
                    await _2(parameters, ...context);
                    return true;
                }
            }
            return false;
        }
    }
    exports.default = Route;
});
