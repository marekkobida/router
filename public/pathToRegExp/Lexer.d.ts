declare class Lexer {
    PARAMETER_NAME_PATTERN: RegExp;
    /** Current Index */
    i: number;
    tokens: Lexer.Token[];
    addToken: (type: Lexer.Token['type'], index: number, atIndex: string) => Lexer.Token[];
    test(input: string): Lexer.Token[];
}
declare namespace Lexer {
    interface Token {
        atIndex: string;
        index: number;
        type: 'CHARACTER' | 'END' | 'ESCAPED_CHARACTER' | 'MODIFIER' | 'PARAMETER_NAME' | 'PATTERN';
    }
}
export default Lexer;
