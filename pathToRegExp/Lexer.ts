/*
 * Copyright 2021 Marek Kobida
 */

class Lexer {
  #PARAMETER_NAME_PATTERN = /^[0-9A-Z_]+$/i;

  #currentIndex = 0;

  readonly #input: string;

  #tokens: Lexer.Token[] = [];

  constructor(input: string) {
    this.#input = input;
  }

  #addToken = (type: Lexer.Token['type'], index: number, atIndex: string): Lexer.Token[] =>
    (this.#tokens = [...this.#tokens, { atIndex, index, type }]);

  test(): Lexer.Token[] {
    if (this.#input) {
      while (this.#currentIndex < this.#input.length) {
        const currentCharacter = this.#input[this.#currentIndex];

        if (currentCharacter === '(') {
          let $ = 1; // počet zátvoriek
          let j = this.#currentIndex + 1;
          let pattern = '';

          if (this.#input[j] === '?') throw new TypeError(`The "?" is not allowed at ${j}.`);

          while (j < this.#input.length) {
            if (this.#input[j] === '(') {
              $++;

              if (this.#input[j + 1] !== '?')
                throw new TypeError(`The "${this.#input[j + 1]}" is not allowed at ${j + 1}.`);
            }

            if (this.#input[j] === ')') {
              $--;

              if ($ === 0) {
                j++;
                break;
              }
            }

            if (this.#input[j] === '\\') {
              pattern += this.#input[j++] + this.#input[j++];
              continue;
            }

            pattern += this.#input[j++];
          }

          if ($) throw new TypeError(`The pattern is not valid at ${this.#currentIndex}.`);

          if (!pattern) throw new TypeError(`The pattern is not valid at ${this.#currentIndex}.`);

          this.#addToken('PATTERN', this.#currentIndex, pattern);

          this.#currentIndex = j;
          continue;
        }

        if (currentCharacter === '*' || currentCharacter === '+' || currentCharacter === '?') {
          this.#addToken('MODIFIER', this.#currentIndex, this.#input[this.#currentIndex++]);
          continue;
        }

        if (currentCharacter === ':') {
          let j = this.#currentIndex + 1;
          let parameterName = '';

          while (j < this.#input.length) {
            // nahradiť RegExp
            if (this.#PARAMETER_NAME_PATTERN.test(this.#input[j])) {
              parameterName += this.#input[j++];
              continue;
            }

            break;
          }

          if (!parameterName) throw new TypeError(`The parameter name is not valid at ${this.#currentIndex}.`);

          this.#addToken('PARAMETER_NAME', this.#currentIndex, parameterName);

          this.#currentIndex = j;
          continue;
        }

        if (currentCharacter === '\\') {
          this.#addToken('ESCAPED_CHARACTER', this.#currentIndex++, this.#input[this.#currentIndex++]);
          continue;
        }

        this.#addToken('CHARACTER', this.#currentIndex, this.#input[this.#currentIndex++]);
      }

      this.#addToken('END', this.#currentIndex, '');

      return this.#tokens;
    }

    throw new Error('The input is not valid.');
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
