/*
 * Copyright 2021 Marek Kobida
 */
var Parser = /** @class */ (function () {
    function Parser() {
        /** Current Index */
        this.i = 0;
        this.j = 0;
        this.tokens = [];
    }
    Parser.prototype.test = function (tokens) {
        var _this = this;
        var test = function (type) {
            if (_this.i < tokens.length && tokens[_this.i].type === type)
                return tokens[_this.i++].atIndex;
        };
        while (this.i < tokens.length) {
            var character = test('CHARACTER');
            var parameterName = test('PARAMETER_NAME');
            var pattern = test('PATTERN');
            if (parameterName || pattern) {
                this.tokens.push({
                    modifier: test('MODIFIER') || '',
                    parameterName: parameterName || this.j++,
                    pattern: pattern || '[^#/?]+',
                    prefix: character || ''
                });
                continue;
            }
            var $ = character || test('ESCAPED_CHARACTER');
            if ($) {
                this.tokens.push($);
                continue;
            }
            test('END');
        }
        return this.tokens;
    };
    return Parser;
}());
export default Parser;
