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
INT x, y, z=5
CHAR a_1='n'
BOOL t="TRUE"
x=y=4
a_1='c'
# this is a comment
DISPLAY: x & t & z & $ & a_1 & [#] & “last”
END CODE

`;
var interpreter = new Interpreter(text);
console.log(interpreter.tokenize());
