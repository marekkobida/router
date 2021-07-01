/*
 * Copyright 2021 Marek Kobida
 */
import Lexer from '../pathToRegExp/Lexer.js';
import Parser from '../pathToRegExp/Parser.js';
import pathToRegExp from '../pathToRegExp/index.js';
function $(id) {
    return document.getElementById(id);
}
function _1() {
    try {
        var path = $('path').value, _2 = new Lexer().test(path), _3 = new Parser().test(_2), pattern = pathToRegExp(path), url = $('url').value, parameters = pattern.exec(url);
        $('_1').value = JSON.stringify(_2, null, 2);
        $('_2').value = JSON.stringify(_3, null, 2);
        $('parameters').value = JSON.stringify(parameters, null, 2);
        $('pattern').value = pattern.toString();
    }
    catch (error) {
        ['_1', '_2', 'parameters', 'pattern'].forEach(function (id) { return ($(id).value = error); });
    }
}
['path', 'url'].forEach(function (id) { return $(id).addEventListener('keyup', _1); });
_1();
