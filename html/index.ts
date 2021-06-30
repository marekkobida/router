/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from '../pathToRegExp/Lexer.js';
import Parser from '../pathToRegExp/Parser.js';
import pathToRegExp from '../pathToRegExp/index.js';

function $(id: string): HTMLTextAreaElement {
  return document.getElementById(id) as HTMLTextAreaElement;
}

function _1() {
  try {
    const path = $('path').value,
      _2 = new Lexer().test(path),
      _3 = new Parser().test(_2),
      pattern = pathToRegExp(path),
      url = $('url').value;

    $('_1').value = JSON.stringify(_2, null, 2);
    $('_2').value = JSON.stringify(_3, null, 2);
    $('parameters').value = JSON.stringify(pattern.exec(url), null, 2);
    $('pattern').value = pattern.toString();
  } catch (error) {
    ['_1', '_2', 'parameters', 'pattern'].forEach(id => ($(id).value = error));
  }
}

['path', 'url'].forEach(id => $(id).addEventListener('keyup', _1));

_1();
