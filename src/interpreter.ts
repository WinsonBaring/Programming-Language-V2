import { Tokenizer } from "./LexicalAnalyzer/tokenizer.js"

export class Interpreter{
    input:string =''
    lexer:Tokenizer = new Tokenizer();
    tokens:{ tokenType:string,value: string}[]= [];
    constructor(input:string){
        this.input = input
    }
    tokenize(){
        this.tokens = this.lexer.tokenize(this.input)
        return this.tokens
    }
    interpret(){

    }
}

var text =`
BEGIN CODE
INT x=5
`
var interpreter = new Interpreter(text)
console.log(interpreter.tokenize())
