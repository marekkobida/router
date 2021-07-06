/*
 * Copyright 2021 Marek Kobida
 */

class Lexer {
  PARAMETER_NAME_PATTERN = /^[0-9A-Z_]+$/i;
  /** Current Index */
  i = 0;
  tokens: Lexer.Token[] = [];

  messages = {
    CHARACTER_NOT_ALLOWED: (character: string, i: number) => `The "${character}" is not allowed at ${i}.`,
    PARAMETER_NAME_NOT_VALID: (i: number) => `The parameter name is not valid at ${i}.`,
    PATTERN_NOT_VALID: (i: number) => `The pattern is not valid at ${i}.`,
  };

  addToken = (type: Lexer.Token['type'], index: number, atIndex: string) => this.tokens.push({ atIndex, index, type });

  test(input: string): Lexer.Token[] {
    while (this.i < input.length) {
      const currentCharacter = input[this.i];

      if (currentCharacter === '(') {
        let j = this.i + 1;
        let parenthesisCount = 1;
        let pattern = '';

        if (input[j] === '?') throw new TypeError(this.messages.CHARACTER_NOT_ALLOWED('?', j));

        while (j < input.length) {
          if (input[j] === '(') {
            parenthesisCount++;

            if (input[j + 1] !== '?') throw new TypeError(this.messages.CHARACTER_NOT_ALLOWED(input[j + 1], j + 1));
          }

          if (input[j] === ')') {
            parenthesisCount--;

            if (parenthesisCount === 0) {
              j++;
              break;
            }
          }

          if (input[j] === '\\') {
            pattern += input[j++] + input[j++];
            continue;
          }

          pattern += input[j++];
        }

        if (parenthesisCount) throw new TypeError(this.messages.PATTERN_NOT_VALID(this.i));

        if (!pattern) throw new TypeError(this.messages.PATTERN_NOT_VALID(this.i));

        this.addToken('PATTERN', this.i, pattern);

        this.i = j;
        continue;
      }

      if (currentCharacter === ':') {
        let j = this.i + 1;
        let parameterName = '';

        while (j < input.length) {
          if (this.PARAMETER_NAME_PATTERN.test(input[j])) {
            parameterName += input[j++];
            continue;
          }
          break;
        }

        if (!parameterName) throw new TypeError(this.messages.PARAMETER_NAME_NOT_VALID(this.i));

        this.addToken('PARAMETER_NAME', this.i, parameterName);

        this.i = j;
        continue;
      }

      if (currentCharacter === '?') {
        this.addToken('MODIFIER', this.i, input[this.i++]);
        continue;
      }

      if (currentCharacter === '\\') {
        this.addToken('ESCAPED_CHARACTER', this.i++, input[this.i++]);
        continue;
      }

      this.addToken('CHARACTER', this.i, input[this.i++]);
    }

    this.addToken('END', this.i, '');

    return this.tokens;
  }
}

namespace Lexer {
  export interface Token {
    atIndex: string;
    index: number;
    type: 'CHARACTER' | 'END' | 'ESCAPED_CHARACTER' | 'MODIFIER' | 'PARAMETER_NAME' | 'PATTERN';
  }
}

export default Lexer;
