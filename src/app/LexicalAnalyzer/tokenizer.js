import { isBeginCode, isBool, isDelimiter, isINT, isNumber } from "./helper.js";
export class Tokenizer {
    token = [];
    input = '';
    currentIndex = 1;
    previousIndex = 0;
    inputLength = 0;
    constructor() {
    }
    addToken(tokenType, currentToken) {
        this.token.push({ tokenType: tokenType, value: currentToken });
    }
    tokenize(input) {
        this.input = input;
        this.inputLength = input.length;
        while (this.currentIndex < this.inputLength) {
            // console.log(this.currentIndex)
            var currentToken = this.input.substring(this.previousIndex, this.currentIndex);
            // console.log(`this:`,currentToken,`:this`)
            // console.log(":"+currentToken+":")
            if (currentToken === ` `) {
                console.log("blank");
                this.previousIndex++;
                this.currentIndex++;
                continue;
            }
            else if (currentToken === '') {
                console.log("whitespace:" + this.input[this.currentIndex], `, current Token:`, currentToken);
                this.currentIndex++;
                continue;
            }
            else if (currentToken === `\n`) {
                console.log("linebreak");
                this.addToken("LINEBREAK", currentToken);
                this.previousIndex++;
                continue;
            }
            else if (currentToken === `B`) {
                console.log("B winson");
                // BEING
                if (isBeginCode(this.previousIndex, this.input)[0]) {
                    this.addToken("BEGIN CODE", "BEGIN");
                    this.previousIndex += isBeginCode(this.previousIndex, this.input)[1];
                    this.currentIndex = this.previousIndex;
                }
                if (isBool(this.input)) {
                }
            }
            else if (isINT(this.input.substring(this.previousIndex, this.previousIndex + 3))) {
                console.log("integer");
                this.addToken("INT", this.input.substring(this.previousIndex, this.previousIndex + 3));
                this.previousIndex += 3;
                this.currentIndex = this.previousIndex;
                continue;
            }
            else if (isNumber(this.previousIndex, this.input)[0]) {
                this.previousIndex = isNumber(this.previousIndex, this.input)[1];
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else if (currentToken === `=`) {
                console.log("assignment");
                this.addToken("AssignmentOperator", currentToken);
                this.previousIndex += 1;
                this.currentIndex = this.previousIndex + 1;
                continue;
            }
            else {
                // Find the end of the current identifier
                while (this.currentIndex < this.inputLength && !isDelimiter(this.input[this.currentIndex])) {
                    this.currentIndex++;
                }
                // Extract the identifier
                const currentIdentifier = this.input.substring(this.previousIndex, this.currentIndex);
                this.addToken("IDENTIFIER", currentIdentifier);
                this.previousIndex = this.currentIndex;
            }
            this.currentIndex += 1;
        }
        return this.token;
    }
}
