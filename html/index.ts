/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from '../pathToRegExp/Lexer.js';
import Parser from '../pathToRegExp/Parser.js';
import pathToRegExp from '../pathToRegExp/index.js';

function $(elementId: string): HTMLTextAreaElement {
  return document.getElementById(elementId) as HTMLTextAreaElement;
}

let pattern: RegExp;

function _1() {
  try {
    const _4 = $('path').value;

    pattern = pathToRegExp(_4);

    const _5 = new Lexer().test(_4);
    const _6 = new Parser().test(_5);

    $('_1').value = JSON.stringify(_5, null, 2);
    $('_2').value = JSON.stringify(_6, null, 2);
    $('pattern').value = pattern.toString();
  } catch (error) {
    $('_1').value = error.toString();
    $('_2').value = '';
    $('pattern').value = '';
  }
}

function _2() {
  try {
    $('_3').value = JSON.stringify(pattern.exec($('url').value), null, 2);
  } catch (error) {
    $('_3').value = error.toString();
  }
}

function _3() {
  _1();
  _2();
}

[$('path'), $('url')].forEach(_ => _.addEventListener('keyup', _3));

_3();
