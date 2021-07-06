/*
 * Copyright 2021 Marek Kobida
 */
class Parser {
    /** Current Index */
    i = 0;
    j = 0;
    tokens = [];
    test(tokens) {
        const test = (type) => {
            if (type === tokens[this.i].type)
                return tokens[this.i++].atIndex;
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
            if (end === undefined)
                throw new TypeError(`${tokens[this.i].type} at ${this.i}`);
        }
        return this.tokens;
    }
}
export default Parser;
