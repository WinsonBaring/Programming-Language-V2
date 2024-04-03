"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
var tokens_js_1 = require("./tokens.js");
var tokenizer_js_1 = require("./LexicalAnalyzer/tokenizer.js");
var parser_js_1 = require("./LexicalAnalyzer/parser.js");
var Interpreter = /** @class */ (function () {
    function Interpreter(input) {
        this.lexer = new tokenizer_js_1.Tokenizer();
        this.input = input;
    }
    Interpreter.prototype.tokenize = function () {
        var tokenObjects = this.lexer.tokenize(this.input);
        // Convert plain objects to Token objects
        var tokens = tokenObjects.map(function (token) { return new tokens_js_1.Token(token.tokenType, token.value); });
        return tokens;
    };
    Interpreter.prototype.interpret = function () {
        var tokens = this.tokenize();
        var parser = new parser_js_1.Parser(tokens);
        // Generate AST from tokens
        var ast = parser.parse();
        // Interpret the AST
        this.interpretAST(ast);
    };
    Interpreter.prototype.interpretAST = function (ast) {
        // Implement logic to interpret each type of AST node
        // For example, handle variable declarations, assignments, display statements, etc.
        // For now, just log the AST for demonstration purposes
        console.log(ast);
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
// Example usage:
// const text = `
// BEGIN CODE
// INT x, y, z=5
// CHAR a_1='n'
// BOOL t="TRUE"
// x=y=4
// a_1='c'
// # this is a comment
// DISPLAY: x & t & z & $ & a_1 & [#] & “last”
// END CODE
// `;
var text = "\nBEGIN\nINT x, y, z=5\nCHAR a_1='n'\nBOOL t=\"TRUE\"\nx=y=4\na_1='c'\n# this is a comment\nDISPLAY: x & t & z & $ & a_1 & [#] & \u201Clast\u201D\nEND\n";
var interpreter = new Interpreter(text);
interpreter.interpret();
