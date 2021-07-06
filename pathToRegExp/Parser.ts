/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';

class Parser {
  /** Current Index */
  i = 0;
  j = 0;
  tokens: (Parser.Token | string)[] = [];

  test(tokens: Lexer.Token[]): (Parser.Token | string)[] {
    const test = (type: Lexer.Token['type']): string | undefined => {
      if (type === tokens[this.i].type) return tokens[this.i++].atIndex;
    };

    while (this.i < tokens.length) {
      const character = test('CHARACTER');
      const parameterName = test('PARAMETER_NAME');
      const pattern = test('PATTERN');

      if (parameterName || pattern) {
        this.tokens.push({
          modifier: test('MODIFIER') || '',
          parameterName: parameterName || this.j++,
          pattern: pattern || '[^#/?]+',
          prefix: character || '',
        });
        continue;
      }

      const $ = character || test('ESCAPED_CHARACTER');

      if ($) {
        this.tokens.push($);
        continue;
      }

      const end = test('END');

      if (end === undefined) throw new TypeError(`${tokens[this.i].type} at ${this.i}`);
    }

    return this.tokens;
  }
}

namespace Parser {
  export interface Token {
    modifier: string;
    parameterName: number | string;
    pattern: string;
    prefix: string;
  }
}

export default Parser;
