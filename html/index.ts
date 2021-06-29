/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from '../urlToRegExp/Lexer.js';
import Parser from '../urlToRegExp/Parser.js';
import urlToRegExp from '../urlToRegExp/index.js';

const lexer = new Lexer();
const parser = new Parser();

function $(elementId: string) {
  return document.getElementById(elementId) as HTMLTextAreaElement;
}

let pattern: RegExp;

function _1() {
  try {
    const v = $('_1').value;

    pattern = urlToRegExp(v);

    const l = lexer.test(v);
    const p = parser.test(l);

    $('_2').value = pattern.toString();
    $('_3').value = JSON.stringify(l, null, 2);
    $('_4').value = JSON.stringify(p, null, 2);
  } catch (error) {
    $('_2').value = '';
    $('_3').value = '';
    $('_4').value = error.toString();
  }
}

function _2() {
  try {
    $('_6').value = JSON.stringify(pattern.exec($('_5').value), null, 2);
  } catch (error) {
    $('_6').value = error.toString();
  }
}

[$('_1'), $('_5')].forEach(_ =>
  _?.addEventListener('keyup', () => {
    _1();
    _2();
  })
);

_1();
_2();
