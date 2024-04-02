import { Token, TokenType } from "../tokens.js";
import {
  isBeginCode,
  isCode,
  isBool,
  isArithmeticOperator,
  isBoolean,
  isDelimiter,
  isINT,
  isNumber,
  isNumberAddedIndex,
  isLogicationOperator,
  isUnaryOperator,
  isIF,
  isComment,
  isDisplay,
  isEnd,
  isChar,
} from "./helper.js";

export class Tokenizer {
  token: Token[] = [];
  input: string = "";
  currentIndex: number = 0;
  previousIndex: number = 0;
  inputLength: number = 0;

  constructor() {}

  addToken(tokenType: TokenType, currentToken: string): void {
    this.token.push(new Token(tokenType, currentToken));
  }

  tokenize(input: string) {
    this.input = input;
    this.inputLength = input.length;
    while (this.currentIndex < this.inputLength) {
      var currentToken = this.input.substring(
        this.previousIndex,
        this.currentIndex
      );

      console.log("Current Token:", currentToken);
      console.log("Current Index:", this.currentIndex);
      console.log("Previous Index:", this.previousIndex);
      if (currentToken === " ") {
        this.previousIndex++;
        this.currentIndex++;
        continue;
      } else if (currentToken === "") {
        this.currentIndex++;
        continue;
      } else if (currentToken === "\n") {
        //this.addToken(TokenType.LINEBREAK, currentToken);
        this.previousIndex++;
        this.currentIndex++;
        continue;
      } else if (currentToken === ",") {
        this.addToken(TokenType.COMMA, ",");
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "[") {
        this.addToken(TokenType.BRACKET_OPEN, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "]") {
        this.addToken(TokenType.BRACKET_CLOSE, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "(") {
        this.addToken(TokenType.PAREN_OPEN, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === ")") {
        this.addToken(TokenType.PAREN_CLOSE, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isLogicationOperator(currentToken)) {
        this.addToken(TokenType.LOGICAL_OPERATOR, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isArithmeticOperator(currentToken)) {
        this.addToken(TokenType.ARITHMETICOPERATOR, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isUnaryOperator(currentToken)) {
        this.addToken(TokenType.UNARY_OPERATOR, currentToken);
        this.previousIndex = this.currentIndex;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isBeginCode(this.previousIndex, this.input)[0]) {
        var fetchBegin = isBeginCode(this.previousIndex, this.input);
        this.addToken(
          TokenType.BEGIN,
          this.input.substring(
            this.previousIndex,
            this.previousIndex + fetchBegin[1]
          )
        );
        this.previousIndex += fetchBegin[1];
        this.currentIndex = this.previousIndex;
        continue;
      } else if (isCode(this.previousIndex, this.input)[0]) {
        var fetchCode = isCode(this.previousIndex, this.input);
        this.addToken(
          TokenType.CODE,
          this.input.substring(
            this.previousIndex,
            this.previousIndex + fetchCode[1]
          )
        );
        this.previousIndex += fetchCode[1];
        this.currentIndex = this.previousIndex;
        continue;
      } else if (isEnd(this.previousIndex, this.input)[0]) {
        this.addToken(TokenType.END, "END");
        this.previousIndex += isEnd(this.previousIndex, this.input)[1];
        this.currentIndex = this.previousIndex;
        continue;
      } else if (isBool(this.previousIndex, this.input)[0]) {
        this.addToken(TokenType.DATA_TYPE, "BOOL");
        this.previousIndex += isBool(this.previousIndex, this.input)[1];
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (
        isINT(this.input.substring(this.previousIndex, this.previousIndex + 3))
      ) {
        this.addToken(
          TokenType.DATA_TYPE,
          this.input.substring(this.previousIndex, this.previousIndex + 3)
        );
        this.previousIndex += 3;
        this.currentIndex = this.previousIndex;
        continue;
      } else if (isNumber(currentToken)) {
        let fetchNumber = isNumberAddedIndex(this.previousIndex, this.input);
        this.previousIndex = this.previousIndex + fetchNumber[0];
        this.currentIndex = this.previousIndex + 1;
        this.addToken(TokenType.INT, fetchNumber[1].toString());
        continue;
      } else if (isComment(this.previousIndex, this.input)[0]) {
        let fetchComment = isComment(this.previousIndex, this.input);
        const currentComment = this.input.substring(
          this.previousIndex,
          this.previousIndex + fetchComment[1]
        );
        this.addToken(TokenType.COMMENT, currentComment);
        this.previousIndex += fetchComment[1];
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isDisplay(this.previousIndex, this.input)[0]) {
        let fetchDisplay = isDisplay(this.previousIndex, this.input);
        const currentDisplay = this.input.substring(
          this.previousIndex,
          this.previousIndex + fetchDisplay[1]
        );
        this.addToken(TokenType.DISPLAY, currentDisplay);
        this.previousIndex += fetchDisplay[1];
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "$") {
        this.addToken(TokenType.RETURN_CARRIAGE, currentToken);
        this.previousIndex += 1;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "&") {
        this.addToken(TokenType.CONCATANATOR, currentToken);
        this.previousIndex += 1;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (isBoolean(this.previousIndex, this.input)[0]) {
        let booltype = isBoolean(this.previousIndex, this.input);
        this.addToken(TokenType.BOOL, booltype[2]);
        this.previousIndex += booltype[1];
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else if (currentToken === "=") {
        this.addToken(TokenType.ASSIGNMENT, currentToken);
        this.previousIndex += 1;
        this.currentIndex = this.previousIndex + 1;
        continue;
      } else {
        // Find the end of the current identifier
        while (
          this.currentIndex < this.inputLength &&
          !isDelimiter(this.input[this.currentIndex]) &&
          this.input[this.currentIndex] !== ","
        ) {
          this.currentIndex++;
        }

        // Extract the identifier
        const currentVariable = this.input.substring(
          this.previousIndex,
          this.currentIndex
        );
        this.addToken(TokenType.VARIABLE, currentVariable);
        this.previousIndex = this.currentIndex;
        continue;
      }

      this.currentIndex += 1;
    }

    return this.token;
  }
}
