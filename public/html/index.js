/*
 * Copyright 2021 Marek Kobida
 */
import Lexer from '../pathToRegExp/Lexer.js';
import Parser from '../pathToRegExp/Parser.js';
import pathToRegExp from '../pathToRegExp/index.js';
function $(elementId) {
    return document.getElementById(elementId);
}
function _1() {
    try {
        var path = $('path').value;
        var url = $('url').value;
        var pattern = pathToRegExp(path);
        var _2 = new Lexer().test(path);
        var _3 = new Parser().test(_2);
        $('_1').value = JSON.stringify(_2, null, 2);
        $('_2').value = JSON.stringify(_3, null, 2);
        $('parameters').value = JSON.stringify(pattern.exec(url), null, 2);
        $('pattern').value = pattern.toString();
    }
    catch (error) {
        $('_1').value = error;
        $('_2').value = error;
        $('parameters').value = error;
        $('pattern').value = error;
    }
}
var elements = [$('path'), $('url')];
elements.forEach(function (element) { return element.addEventListener('keyup', _1); });
_1();
