/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer';

class Parser {
  #i = 0;

  #j = 0;

  #tokens: (Parser.Token | string)[] = [];

  test(lexerTokens: Lexer.Token[]): (Parser.Token | string)[] {
    const _1 = (type: Lexer.Token['type']): string | undefined => {
      if (this.#i < lexerTokens.length && lexerTokens[this.#i].type === type) return lexerTokens[this.#i++].atIndex;
    };

    const _2 = (type: Lexer.Token['type']): string => {
      const _3 = _1(type);

      if (_3 !== undefined) return _3;

      const { index, type: nextType } = lexerTokens[this.#i];

      throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}`);
    };

    while (this.#i < lexerTokens.length) {
      const character = _1('CHARACTER');
      const parameterName = _1('PARAMETER_NAME');
      const pattern = _1('PATTERN');

      if (parameterName || pattern) {
        this.#tokens.push({
          modifier: _1('MODIFIER') || '',
          parameterName: parameterName || this.#j++,
          pattern: pattern || '[^#/?]+?',
          prefix: character || '',
        });
        continue;
      }

      const _4 = character || _1('ESCAPED_CHARACTER');

      if (_4) {
        this.#tokens.push(_4);
        continue;
      }

      _2('END');
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
