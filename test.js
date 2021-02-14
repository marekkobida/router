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
        define(["require", "exports", "./Router"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Router_1 = __importDefault(require("./Router"));
    const router = new Router_1.default();
    router.addRoute('/hello/:name').get(async ({ name }, $) => {
        console.log($, name); // 👋 marekkobida
    });
    router.test(['👋'], 'GET', '/hello/marekkobida');
});
