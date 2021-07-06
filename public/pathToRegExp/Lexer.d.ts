declare class Lexer {
    PARAMETER_NAME_PATTERN: RegExp;
    /** Current Index */
    i: number;
    tokens: Lexer.Token[];
    addToken: (type: Lexer.Token['type'], index: number, atIndex: string) => number;
    test(input: string): Lexer.Token[];
}
declare namespace Lexer {
    interface Token {
        atIndex: string;
        index: number;
        type: 'CHARACTER' | 'END' | 'ESCAPED_CHARACTER' | 'MODIFIER' | 'PARAMETER_NAME' | 'PATTERN';
    }
    const messages: {
        readonly CHARACTER_NOT_ALLOWED: (character: string, i: number) => string;
        readonly PARAMETER_NAME_NOT_VALID: (i: number) => string;
        readonly PATTERN_NOT_VALID: (i: number) => string;
    };
}
export default Lexer;
