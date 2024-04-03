import { Token, TokenType } from "./tokens.js";
import { Tokenizer } from "./LexicalAnalyzer/tokenizer.js";
import { Parser } from "./LexicalAnalyzer/parser.js";

export class Interpreter {
  input: string;
  lexer: Tokenizer = new Tokenizer();

  constructor(input: string) {
    this.input = input;
  }

  tokenize(): Token[] {
    const tokenObjects = this.lexer.tokenize(this.input);
    // Convert plain objects to Token objects
    const tokens: Token[] = tokenObjects.map(
      (token) => new Token(token.tokenType as TokenType, token.value)
    );
    return tokens;
  }

  interpret(): void {
    const tokens = this.tokenize();
    const parser = new Parser(tokens);

    // Generate AST from tokens
    const ast = parser.parse();

    // Interpret the AST
    this.interpretAST(ast);
  }

  interpretAST(ast: any): void {
    // Implement logic to interpret each type of AST node
    // For example, handle variable declarations, assignments, display statements, etc.
    // For now, just log the AST for demonstration purposes
    console.log(ast);
  }
}

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
