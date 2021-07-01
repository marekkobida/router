/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';
import Parser from './Parser.js';

function pathToRegExp(path: string): RegExp {
  const lexer = new Lexer(),
    parser = new Parser();

  const suffix = '[#/?]?';

  const tokens = parser.test(lexer.test(path));

  let pattern = '';

  pattern += '^';

  for (const token of tokens) {
    if (typeof token === 'string') {
      pattern += token;
    } else {
      if (token.prefix) {
        pattern += `(?:${token.prefix}(${token.pattern}))${token.modifier}`;
      } else {
        pattern += `(${token.pattern})${token.modifier}`;
      }
    }
  }

  pattern += suffix;

  pattern += '$';

  return new RegExp(pattern);
}

export default pathToRegExp;
