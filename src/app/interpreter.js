"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const tokens_js_1 = require("./tokens.js");
const tokenizer_js_1 = require("./LexicalAnalyzer/tokenizer.js");
const parser_js_1 = require("./LexicalAnalyzer/parser.js");
class Interpreter {
    input;
    lexer = new tokenizer_js_1.Tokenizer();
    constructor(input) {
        this.input = input;
    }
    tokenize() {
        const tokenObjects = this.lexer.tokenize(this.input);
        // Convert plain objects to Token objects
        const tokens = tokenObjects.map((token) => new tokens_js_1.Token(token.tokenType, token.value));
        return tokens;
    }
    interpret() {
        const tokens = this.tokenize();
        const parser = new parser_js_1.Parser(tokens);
        // Generate AST from tokens
        const ast = parser.parse();
        // Interpret the AST
        this.interpretAST(ast);
    }
    interpretAST(ast) {
        // Implement logic to interpret each type of AST node
        // For example, handle variable declarations, assignments, display statements, etc.
        // For now, just log the AST for demonstration purposes
        console.log(ast);
    }
}
exports.Interpreter = Interpreter;
// Example usage:
const text = `
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
const interpreter = new Interpreter(text);
interpreter.interpret();
