/*
 * Copyright 2021 Marek Kobida
 */
import Lexer from '../pathToRegExp/Lexer.js';
import Parser from '../pathToRegExp/Parser.js';
import pathToRegExp from '../pathToRegExp/index.js';
function $(elementId) {
    return document.getElementById(elementId);
}
let pattern;
function _1() {
    try {
        const _3 = $('path').value;
        pattern = pathToRegExp(_3);
        const _4 = new Lexer().test(_3);
        const _5 = new Parser().test(_4);
        $('_1').value = pattern.toString();
        $('_2').value = JSON.stringify(_4, null, 2);
        $('_3').value = JSON.stringify(_5, null, 2);
    }
    catch (error) {
        $('_1').value = '';
        $('_2').value = '';
        $('_3').value = error.toString();
    }
}
function _2() {
    try {
        $('_4').value = JSON.stringify(pattern.exec($('url').value), null, 2);
    }
    catch (error) {
        $('_4').value = error.toString();
    }
}
[$('path'), $('url')].forEach(_ => _?.addEventListener('keyup', () => {
    _1();
    _2();
}));
_1();
_2();
