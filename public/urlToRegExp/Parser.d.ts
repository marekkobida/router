import Lexer from './Lexer.js';
declare class Parser {
    /**
     * Current Index
     */
    i: number;
    j: number;
    tokens: (Parser.Token | string)[];
    test(tokens: Lexer.Token[]): (Parser.Token | string)[];
}
declare namespace Parser {
    interface Token {
        modifier: string;
        parameterName: number | string;
        pattern: string;
        prefix: string;
    }
}
export default Parser;
