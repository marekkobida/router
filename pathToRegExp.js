/*
 * Copyright 2021 Marek Kobida
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function pathToRegExp(path) {
        // from "/" to "\/"
        path = path.replace(/\//, '\\/');
        // from "\/:id" to "(?:\/(?<id>[^\/]+))"
        path = path.replace(/\/:([^\/]+)/g, (..._1) => '(?:\\/(?<' + _1[1] + '>[^\\/]+))');
        path = '^' + path + '\\/?' + '$';
        return new RegExp(path);
    }
    exports.default = pathToRegExp;
});
