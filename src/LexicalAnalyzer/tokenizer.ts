    import { Token, TokenType } from "../tokens.js";
    import { isBeginCode,isCode, isBool,isArithmeticOperator,isBoolean, isDelimiter, isINT, isNumber, isNumberAddedIndex, isLogicationOperator, isUnaryOperator, isIF, isComment, isDisplay } from "./helper.js";

    export class Tokenizer {
        token:Token [] = [];
        // token: { tokenType:string,value:string}[] = [];
        input: string ='';

        currentIndex: number = 1;
        previousIndex: number = 0;


        inputLength: number = 0;
        constructor() {
        }
        addToken(tokenType:TokenType,currentToken: string): void {
            this.token.push(new Token( tokenType ,currentToken) );
        }
        tokenize(input: string){
            this.input = input;
            this.inputLength = input.length;
            while(this.currentIndex < this.inputLength) {
                // console.log(this.currentIndex)
                var currentToken = this.input.substring(this.previousIndex,this.currentIndex)
                // console.log(`this:`,currentToken,`:this`)
                // console.log(":"+currentToken+":")
                if(currentToken === ` `){
                console.log("space")
                    this.previousIndex++;
                    this.currentIndex++;
                    continue;
                }
                else if(currentToken === ''){
                console.log("whitespace")
                // console.log("whitespace:"+this.input[this.currentIndex],`, current Token:`, currentToken)
                    this.currentIndex++;
                    continue;
                }
                else if(currentToken === `\n`){
                    console.log("linebreak")
                    this.addToken(TokenType.LINEBREAK,currentToken)
                    this.previousIndex++;
                    continue;
                }
                else if(currentToken === `,`){
                    console.log("comma")
                    this.addToken(TokenType.COMMA,",")
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(currentToken === `(`){
                    this.addToken(TokenType.PAREN_OPEN,currentToken)
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                
                else if(currentToken === `)`){
                    this.addToken(TokenType.PAREN_CLOSE,currentToken)
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isLogicationOperator(currentToken)){
                    this.addToken(TokenType.LOGICAL_OPERATOR,currentToken)
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isArithmeticOperator(currentToken)){
                    this.addToken(TokenType.ARITHMETICOPERATOR,currentToken)
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isUnaryOperator(currentToken)){
                    this.addToken(TokenType.UNARY_OPERATOR,currentToken)
                    this.previousIndex = this.currentIndex;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isBeginCode(this.previousIndex,this.input)[0] ){
                    console.log("begin")
                    this.addToken(TokenType.BEGIN,"BEGIN")
                    this.previousIndex += isBeginCode(this.previousIndex,this.input)[1] 
                    this.currentIndex = this.previousIndex
                    continue;
                }
                else if(isCode(this.previousIndex,this.input)[0] ){
                    console.log("code")
                    this.addToken(TokenType.CODE,"CODE")
                    this.previousIndex += isCode(this.previousIndex,this.input)[1] 
                    this.currentIndex = this.previousIndex
                    continue;

                }
                else if(isBool(this.previousIndex,this.input)[0]){
                    this.addToken(TokenType.DATA_TYPE,"BOOL")
                    this.previousIndex += isBool(this.previousIndex,this.input)[1];
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if( isINT(this.input.substring(this.previousIndex,this.previousIndex+3))){
                console.log("integer")
                    this.addToken(TokenType.DATA_TYPE,this.input.substring(this.previousIndex,this.previousIndex+3));
                    this.previousIndex += 3;
                    this.currentIndex = this.previousIndex;
                    continue;
                }
                else if(isNumber(currentToken)){
                    console.log("int")
                    let fetchNumber =isNumberAddedIndex(this.previousIndex,this.input)
                    this.previousIndex = this.previousIndex+fetchNumber[0]
                    this.currentIndex = this.previousIndex+1;
                    this.addToken(TokenType.INT,fetchNumber[1].toString());
                    continue;
                }
                else if(isComment(this.previousIndex,this.input)[0]){
                    let fetchComment =isComment(this.previousIndex,this.input)
                    const currentComment = this.input.substring(this.previousIndex, this.previousIndex+fetchComment[1]);
                    this.addToken(TokenType.COMMENT,currentComment);
                    this.previousIndex += fetchComment[1];
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isDisplay(this.previousIndex,this.input)[0]){
                    let fetchDisplay = isDisplay(this.previousIndex,this.input)
                    const currentDisplay = this.input.substring(this.previousIndex, this.previousIndex+fetchDisplay[1]);
                    this.addToken(TokenType.DISPLAY,currentDisplay)
                    this.previousIndex += fetchDisplay[1];
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(isBoolean(this.previousIndex,this.input)[0]){
                    console.log("boolean")
                    let booltype = isBoolean(this.previousIndex,this.input);
                    this.addToken(TokenType.BOOL,booltype[2]);
                    this.previousIndex += booltype[1];
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }
                else if(currentToken === `=`){
                    console.log("assignment")
                    this.addToken(TokenType.ASSIGNMENT,currentToken);
                    this.previousIndex += 1;
                    this.currentIndex = this.previousIndex+1;
                    continue;
                }else {
                    // Find the end of the current identifier
                    while (this.currentIndex < this.inputLength && !isDelimiter(this.input[this.currentIndex])&& this.input[this.currentIndex]!==`,`) {
                        this.currentIndex++;
                    }
                    console.log("identifier")

                    // Extract the identifier
                    const currentVariable = this.input.substring(this.previousIndex, this.currentIndex);
                    this.addToken(TokenType.VARIABLE, currentVariable);
                    this.previousIndex = this.currentIndex;
                    continue;
                }
                
                console.log("added index - not identified - value:"+currentToken+":++")
                this.currentIndex+=1;

            }
            return this.token
        }

    }