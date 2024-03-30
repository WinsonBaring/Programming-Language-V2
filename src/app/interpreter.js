import { Tokenizer } from "./LexicalAnalyzer/tokenizer.js";
export class Interpreter {
    input = '';
    lexer = new Tokenizer();
    tokens = [];
    constructor(input) {
        this.input = input;
    }
    tokenize() {
        this.tokens = this.lexer.tokenize(this.input);
        return this.tokens;
    }
    interpret() {
    }
}
var text = `
BEGIN CODE
INT x=5
`;
var interpreter = new Interpreter(text);
console.log(interpreter.tokenize());
