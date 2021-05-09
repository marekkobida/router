/*
 * Copyright 2021 Marek Kobida
 */

class Lexer {
  #PARAMETER_NAME_PATTERN = /^[0-9A-Z_]+$/i;

  #currentIndex = 0;

  #input?: string;

  #tokens: Lexer.Token[] = [];

  // 🟩
  constructor(input?: string) {
    this.#input = input;
  }

  // 🟩
  #addToken = (type: Lexer.Token['type'], index: number, atIndex: string): Lexer.Token[] =>
    (this.#tokens = [...this.#tokens, { atIndex, index, type }]);

  // 🟥
  test(input = this.#input): Lexer.Token[] {
    if (input) {
      while (this.#currentIndex < input.length) {
        const character = input[this.#currentIndex];

        // 🟥
        if (character === '(') {
          let $ = 1; // počet zátvoriek
          let j = this.#currentIndex + 1;
          let pattern = '';

          if (input[j] === '?') throw new TypeError(`The "${input[j]}" is not allowed at ${j}.`);

          while (j < input.length) {
            if (input[j] === '\\') {
              pattern += input[j++] + input[j++];
              continue;
            }

            if (input[j] === ')') {
              $--;

              if ($ === 0) {
                j++;
                break;
              }
            } else if (input[j] === '(') {
              $++;

              if (input[j + 1] !== '?') throw new TypeError(`The "${input[j + 1]}" is not allowed at ${j}.`);
            }

            pattern += input[j++];
          }

          if ($) throw new TypeError(`The pattern is not valid at ${this.#currentIndex}.`);

          if (!pattern) throw new TypeError(`The pattern is not valid at ${this.#currentIndex}.`);

          this.#addToken('PATTERN', this.#currentIndex, pattern);

          this.#currentIndex = j;
          continue;
        }

        // 🟥
        if (character === '*' || character === '+' || character === '?') {
          this.#addToken('MODIFIER', this.#currentIndex, input[this.#currentIndex++]);
          continue;
        }

        // 🟥
        if (character === ':') {
          let j = this.#currentIndex + 1;
          let parameterName = '';

          while (j < input.length) {
            if (this.#PARAMETER_NAME_PATTERN.test(input[j])) {
              parameterName += input[j++];
              continue;
            }

            break;
          }

          if (!parameterName) throw new TypeError(`The parameter name is not valid at ${this.#currentIndex}.`);

          this.#addToken('PARAMETER_NAME', this.#currentIndex, parameterName);

          this.#currentIndex = j;
          continue;
        }

        // 🟩
        if (character === '\\') {
          this.#addToken('ESCAPED_CHARACTER', this.#currentIndex++, input[this.#currentIndex++]);
          continue;
        }

        // 🟩
        this.#addToken('CHARACTER', this.#currentIndex, input[this.#currentIndex++]);
      }

      // 🟩
      this.#addToken('END', this.#currentIndex, '');

      return this.#tokens;
    }

    throw new Error('The input is not valid.');
  }
}

namespace Lexer {
  export interface Token {
    atIndex: string | undefined;
    index: number;
    type: 'CHARACTER' | 'END' | 'ESCAPED_CHARACTER' | 'MODIFIER' | 'PARAMETER_NAME' | 'PATTERN';
  }
}

export default Lexer;
