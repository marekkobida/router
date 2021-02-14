"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegExp_1 = __importDefault(require("./pathToRegExp"));
class Route {
    constructor(path) {
        this.#routes = [];
        this.#path = pathToRegExp_1.default(path);
    }
    #path;
    #routes;
    delete(_1) {
        this.#routes.push(['DELETE', _1]);
        return this;
    }
    get(_1) {
        this.#routes.push(['GET', _1]);
        return this;
    }
    patch(_1) {
        this.#routes.push(['PATCH', _1]);
        return this;
    }
    post(_1) {
        this.#routes.push(['POST', _1]);
        return this;
    }
    put(_1) {
        this.#routes.push(['PUT', _1]);
        return this;
    }
    async test(context, method, url) {
        if (typeof url === 'string') {
            url = new URL(url, 'file://');
        }
        for (const route of this.#routes) {
            if (route[0] === method && this.#path.test(url.pathname)) {
                const parameters = url.pathname.match(this.#path)?.groups || {};
                await route[1](parameters, ...context);
                return true;
            }
        }
        return false;
    }
}
exports.default = Route;
