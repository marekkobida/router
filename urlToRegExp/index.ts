/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';
import Parser from './Parser.js';

function urlToRegExp(url: string): RegExp {
  const lexer = new Lexer();
  const parser = new Parser();

  const tokens = parser.test(lexer.test(url));

  let $ = '';

  $ += '^';

  for (const token of tokens) {
    if (typeof token === 'string') {
      $ += token;
    } else {
      if (token.pattern) {
        if (token.prefix) {
          $ += `(?:${token.prefix}(${token.pattern}))${token.modifier}`;
        } else {
          $ += `(${token.pattern})${token.modifier}`;
        }
      } else {
        $ += `(?:${token.prefix})${token.modifier}`;
      }
    }
  }

  $ += '$';

  return new RegExp($);
}

export default urlToRegExp;
