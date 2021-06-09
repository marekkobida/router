/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';
import Parser from './Parser.js';

function urlToRegExp(path: string): RegExp {
  console.log('path', path);

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

  const lol = new RegExp($);

  Object.assign(RegExp.prototype, {
    lexer: _1,
    parser: _2,
  });

  return new RegExp(lol);
}

globalThis.urlToRegExp = urlToRegExp;

export default urlToRegExp;
