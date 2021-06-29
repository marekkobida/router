/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer.js';

class Parser {
  #currentIndex = 0;

  #j = 0;

  #tokens: (Parser.Token | string)[] = [];

  test(tokens: Lexer.Token[]): (Parser.Token | string)[] {
    const test = (type: Lexer.Token['type']): string | undefined => {
      if (this.#currentIndex < tokens.length && tokens[this.#currentIndex].type === type)
        return tokens[this.#currentIndex++].atIndex;
    };

    while (this.#currentIndex < tokens.length) {
      const character = test('CHARACTER');
      const parameterName = test('PARAMETER_NAME');
      const pattern = test('PATTERN');

      if (parameterName || pattern) {
        this.#tokens.push({
          modifier: test('MODIFIER') || '',
          parameterName: parameterName || this.#j++,
          pattern: pattern || '[^#/?]+',
          prefix: character || '',
        });
        continue;
      }

      const $ = character || test('ESCAPED_CHARACTER');

      if ($) {
        this.#tokens.push($);
        continue;
      }

      const endToken = test('END');

      if (typeof endToken === 'undefined') {
        const { index, type } = tokens[this.#currentIndex];

        throw new TypeError(`Unexpected type "${type}" at ${index}.`);
      }
    }

    return this.#tokens;
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
