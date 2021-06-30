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
            if (this.i < tokens.length && tokens[this.i].type === type)
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
            const endToken = test('END');
            if (typeof endToken === 'undefined') {
                const { index, type } = tokens[this.i];
                throw new TypeError(`Unexpected type "${type}" at ${index}.`);
            }
        }
        return this.tokens;
    }
}
export default Parser;