"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
const tokens_js_1 = require("../tokens.js");
const helper_js_1 = require("./helper.js");
class Tokenizer {
    token = [];
    input = "";
    currentIndex = 0;
    previousIndex = 0;
    inputLength = 0;
    constructor() { }
    addToken(tokenType, currentToken) {
        this.token.push(new tokens_js_1.Token(tokenType, currentToken));
    }
    tokenize(input) {
        this.input = input;
        this.inputLength = input.length;
        while (this.currentIndex < this.inputLength) {
            var currentToken = this.input.substring(this.previousIndex, this.currentIndex);
            console.log("Current Token:", currentToken);
            console.log("Current Index:", this.currentIndex);
            console.log("Previous Index:", this.previousIndex);
            if (currentToken === " ") {
                this.previousIndex++;
                this.currentIndex++;
                continue;
            }
            else if (currentToken === "") {
                this.currentIndex++;
                continue;
            }
            else if (currentToken === "\n") {
                //this.addToken(TokenType.LINEBREAK, currentToken);
                this.previousIndex++;
                this.currentIndex++;
                continue;
            }
            else if (currentToken === ",") {
                this.addToken(tokens_js_1.TokenType.COMMA, ",");
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "[") {
                this.addToken(tokens_js_1.TokenType.BRACKET_OPEN, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "]") {
                this.addToken(tokens_js_1.TokenType.BRACKET_CLOSE, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "(") {
                this.addToken(tokens_js_1.TokenType.PAREN_OPEN, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === ")") {
                this.addToken(tokens_js_1.TokenType.PAREN_CLOSE, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isLogicationOperator)(currentToken)) {
                this.addToken(tokens_js_1.TokenType.LOGICAL_OPERATOR, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isArithmeticOperator)(currentToken)) {
                this.addToken(tokens_js_1.TokenType.ARITHMETICOPERATOR, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isUnaryOperator)(currentToken)) {
                this.addToken(tokens_js_1.TokenType.UNARY_OPERATOR, currentToken);
                this.previousIndex = this.currentIndex;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isBeginCode)(this.previousIndex, this.input)[0]) {
                var fetchBegin = (0, helper_js_1.isBeginCode)(this.previousIndex, this.input);
                this.addToken(tokens_js_1.TokenType.BEGIN, this.input.substring(this.previousIndex, this.previousIndex + fetchBegin[1]));
                this.previousIndex += fetchBegin[1];
                this.currentIndex = this.previousIndex;
                continue;
            }
            else if ((0, helper_js_1.isCode)(this.previousIndex, this.input)[0]) {
                var fetchCode = (0, helper_js_1.isCode)(this.previousIndex, this.input);
                this.addToken(tokens_js_1.TokenType.CODE, this.input.substring(this.previousIndex, this.previousIndex + fetchCode[1]));
                this.previousIndex += fetchCode[1];
                this.currentIndex = this.previousIndex;
                continue;
            }
            else if ((0, helper_js_1.isEnd)(this.previousIndex, this.input)[0]) {
                this.addToken(tokens_js_1.TokenType.END, "END");
                this.previousIndex += (0, helper_js_1.isEnd)(this.previousIndex, this.input)[1];
                this.currentIndex = this.previousIndex;
                continue;
            }
            else if ((0, helper_js_1.isBool)(this.previousIndex, this.input)[0]) {
                this.addToken(tokens_js_1.TokenType.DATA_TYPE, "BOOL");
                this.previousIndex += (0, helper_js_1.isBool)(this.previousIndex, this.input)[1];
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isINT)(this.input.substring(this.previousIndex, this.previousIndex + 3))) {
                this.addToken(tokens_js_1.TokenType.DATA_TYPE, this.input.substring(this.previousIndex, this.previousIndex + 3));
                this.previousIndex += 3;
                this.currentIndex = this.previousIndex;
                continue;
            }
            else if ((0, helper_js_1.isNumber)(currentToken)) {
                let fetchNumber = (0, helper_js_1.isNumberAddedIndex)(this.previousIndex, this.input);
                this.previousIndex = this.previousIndex + fetchNumber[0];
                this.currentIndex = this.previousIndex + 1;
                this.addToken(tokens_js_1.TokenType.INT, fetchNumber[1].toString());
                continue;
            }
            else if ((0, helper_js_1.isComment)(this.previousIndex, this.input)[0]) {
                let fetchComment = (0, helper_js_1.isComment)(this.previousIndex, this.input);
                const currentComment = this.input.substring(this.previousIndex, this.previousIndex + fetchComment[1]);
                this.addToken(tokens_js_1.TokenType.COMMENT, currentComment);
                this.previousIndex += fetchComment[1];
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isDisplay)(this.previousIndex, this.input)[0]) {
                let fetchDisplay = (0, helper_js_1.isDisplay)(this.previousIndex, this.input);
                const currentDisplay = this.input.substring(this.previousIndex, this.previousIndex + fetchDisplay[1]);
                this.addToken(tokens_js_1.TokenType.DISPLAY, currentDisplay);
                this.previousIndex += fetchDisplay[1];
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "$") {
                this.addToken(tokens_js_1.TokenType.RETURN_CARRIAGE, currentToken);
                this.previousIndex += 1;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "&") {
                this.addToken(tokens_js_1.TokenType.CONCATANATOR, currentToken);
                this.previousIndex += 1;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if ((0, helper_js_1.isBoolean)(this.previousIndex, this.input)[0]) {
                let booltype = (0, helper_js_1.isBoolean)(this.previousIndex, this.input);
                this.addToken(tokens_js_1.TokenType.BOOL, booltype[2]);
                this.previousIndex += booltype[1];
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === "=") {
                this.addToken(tokens_js_1.TokenType.ASSIGNMENT, currentToken);
                this.previousIndex += 1;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else {
                // Find the end of the current identifier
                while (this.currentIndex < this.inputLength &&
                    !(0, helper_js_1.isDelimiter)(this.input[this.currentIndex]) &&
                    this.input[this.currentIndex] !== ",") {
                    this.currentIndex++;
                }
                // Extract the identifier
                const currentVariable = this.input.substring(this.previousIndex, this.currentIndex);
                this.addToken(tokens_js_1.TokenType.VARIABLE, currentVariable);
                this.previousIndex = this.currentIndex;
                continue;
            }
            this.currentIndex += 1;
        }
        return this.token;
    }
}
exports.Tokenizer = Tokenizer;
