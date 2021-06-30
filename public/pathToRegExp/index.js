/*
 * Copyright 2021 Marek Kobida
 */
import Lexer from './Lexer.js';
import Parser from './Parser.js';
function pathToRegExp(path) {
    var lexer = new Lexer();
    var parser = new Parser();
    var tokens = parser.test(lexer.test(path));
    var $ = '';
    $ += '^';
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === 'string') {
            $ += token;
        }
        else {
            if (token.prefix) {
                $ += "(?:" + token.prefix + "(" + token.pattern + "))" + token.modifier;
            }
            else {
                $ += "(" + token.pattern + ")" + token.modifier;
            }
        }
    }
    $ += '$';
    return new RegExp($);
}
export default pathToRegExp;
