/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';
import Parser from './Parser.js';

function urlToRegExp(path: string): RegExp {
  const lexer = new Lexer();

  const _1 = lexer.test(path);

  const parser = new Parser();

  const _2 = parser.test(_1);

  let $ = '';

  $ += '^';

  for (const token of _2) {
    if (typeof token === 'string') {
      $ += token;
    } else {
      if (token.pattern) {
        if (token.prefix) {
          if (token.modifier === '+' || token.modifier === '*') {
            const mod = token.modifier === '*' ? '?' : '';
            $ += `(?:${token.prefix}((?:${token.pattern})(?:${token.prefix}(?:${token.pattern}))*))${mod}`;
          } else {
            $ += `(?:${token.prefix}(${token.pattern}))${token.modifier}`;
          }
        } else {
          $ += `(${token.pattern})${token.modifier}`;
        }
      } else {
        $ += `(?:${token.prefix})${token.modifier}`;
      }
    }
  }

  $ += '$';

  const _3 = new RegExp($);

  _3.lexer = _1;
  _3.parser = _2;

  return _3;
}

export default urlToRegExp;
