/*
 * Copyright 2021 Marek Kobida
 */
class Lexer {
    PARAMETER_NAME_PATTERN = /^[0-9A-Z_]+$/i;
    /** Current Index */
    i = 0;
    tokens = [];
    addToken = (type, index, atIndex) => (this.tokens = [...this.tokens, { atIndex, index, type }]);
    test(input) {
        while (this.i < input.length) {
            const currentCharacter = input[this.i];
            if (currentCharacter === '(') {
                let j = this.i + 1;
                let parenthesisCount = 1;
                let pattern = '';
                if (input[j] === '?')
                    throw new TypeError(`The "?" is not allowed at ${j}.`);
                while (j < input.length) {
                    if (input[j] === '(') {
                        parenthesisCount++;
                        if (input[j + 1] !== '?')
                            throw new TypeError(`The "${input[j + 1]}" is not allowed at ${j + 1}.`);
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
                if (parenthesisCount)
                    throw new TypeError(`The pattern is not valid at ${this.i}.`);
                if (!pattern)
                    throw new TypeError(`The pattern is not valid at ${this.i}.`);
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
                if (!parameterName)
                    throw new TypeError(`The parameter name is not valid at ${this.i}.`);
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
export default Lexer;
