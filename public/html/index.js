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
        const path = $('path').value;
        const url = $('url').value;
        const pattern = pathToRegExp(path);
        const _2 = new Lexer().test(path);
        const _3 = new Parser().test(_2);
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
const elements = [$('path'), $('url')];
elements.forEach(element => element.addEventListener('keyup', _1));
_1();
