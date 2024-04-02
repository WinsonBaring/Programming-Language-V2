import { Token, TokenType } from "../tokens.js";
import { Tokenizer } from "./tokenizer.js";

class ASTNode {
  constructor(
    public type: string,
    public value?: any,
    public children: ASTNode[] = []
  ) {}
}

export class Parser {
  tokens: Token[];
  currentTokenIndex: number;
  codeCount: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
    this.codeCount = 0;
  }

  parse(): ASTNode {
    return this.expression();
  }

  private expression(): ASTNode {
    let node = this.term();

    while (
      this.currentToken().tokenType === TokenType.ADDITION ||
      this.currentToken().tokenType === TokenType.SUBTRACTION
    ) {
      const token = this.consumeToken();
      const operator = token.value;
      const right = this.term();
      node = new ASTNode("BinaryOperation", operator, [node, right]);
    }

    return node;
  }

  private term(): ASTNode {
    let node = this.factor();

    while (
      this.currentToken().tokenType === TokenType.MULTIPLICATION ||
      this.currentToken().tokenType === TokenType.DIVISION
    ) {
      const token = this.consumeToken();
      const operator = token.value;
      const right = this.factor();
      node = new ASTNode("BinaryOperation", operator, [node, right]);
    }

    return node;
  }

  private factor(): ASTNode {
    const token = this.consumeToken();
    console.log("Processing token:", token);

    // Check if the token is a CODE token
    if (token.tokenType === TokenType.CODE) {
      console.info("Code counter", this.codeCount);
      return this.parseCodeBlock(token.value, this.codeCount);
    }

    switch (token.tokenType) {
      case TokenType.BEGIN:
        return this.parseBeginBlock();
      case TokenType.INT:
      case TokenType.FLOAT:
        return new ASTNode("Number", token.value);
      case TokenType.CHAR:
        return new ASTNode("Character", token.value);
      case TokenType.BOOL: {
        const result = this.parseVariableDeclaration();
        return result !== null
          ? new ASTNode("Boolean", token.value)
          : new ASTNode("Unknown");
      }
      case TokenType.DISPLAY:
        return new ASTNode("Display", token.value);
      case TokenType.COMMENT:
        return new ASTNode("Comment", token.value);
      case TokenType.LINEBREAK:
        return new ASTNode("Linebreak", token.value);
      case TokenType.ASSIGNMENT:
        return new ASTNode("Assignment", token.value);
      case TokenType.DATA_TYPE: {
        const result = this.parseVariableDeclaration();
        return result !== null
          ? new ASTNode("DataType", token.value)
          : new ASTNode("Unknown");
      }
      case TokenType.VARIABLE:
        return new ASTNode("Variable", token.value);
      case TokenType.VALUE:
        return new ASTNode("Value", token.value);
      case TokenType.ARITHMETICOPERATOR:
        return new ASTNode("ArithmeticOperator", token.value);
      case TokenType.LOGICAL_OPERATOR:
        return new ASTNode("LogicalOperator", token.value);
      case TokenType.UNARY_OPERATOR:
        return new ASTNode("UnaryOperator", token.value);
      case TokenType.IF:
        return new ASTNode("IfStatement", token.value);
      case TokenType.ELSE:
        return new ASTNode("ElseStatement", token.value);
      case TokenType.WHILE:
        return new ASTNode("WhileLoop", token.value);
      case TokenType.SCAN:
        return new ASTNode("Scan", token.value);
      case TokenType.BRACKET_OPEN:
        return new ASTNode("BracketOpen", token.value);
      case TokenType.BRACKET_CLOSE:
        return new ASTNode("BracketClose", token.value);
      case TokenType.PAREN_OPEN:
        return new ASTNode("ParenOpen", token.value);
      case TokenType.PAREN_CLOSE:
        return new ASTNode("ParenClose", token.value);
      case TokenType.MULTIPLICATION:
        return new ASTNode("Multiplication", token.value);
      case TokenType.DIVISION:
        return new ASTNode("Division", token.value);
      case TokenType.MODULO:
        return new ASTNode("Modulo", token.value);
      case TokenType.ADDITION:
        return new ASTNode("Addition", token.value);
      case TokenType.SUBTRACTION:
        return new ASTNode("Subtraction", token.value);
      case TokenType.GREATER_THAN:
        return new ASTNode("GreaterThan", token.value);
      case TokenType.LESSER_THAN:
        return new ASTNode("LesserThan", token.value);
      case TokenType.GREATER_THAN_OR_EQUAL_TO:
        return new ASTNode("GreaterThanOrEqualTo", token.value);
      case TokenType.LESSER_THAN_OR_EQUAL_TO:
        return new ASTNode("LesserThanOrEqualTo", token.value);
      case TokenType.EQUAL:
        return new ASTNode("Equal", token.value);
      case TokenType.NOT_EQUAL:
        return new ASTNode("NotEqual", token.value);
      case TokenType.AND:
        return new ASTNode("And", token.value);
      case TokenType.OR:
        return new ASTNode("Or", token.value);
      case TokenType.NOT:
        return new ASTNode("Not", token.value);
      case TokenType.POSITIVE:
        return new ASTNode("Positive", token.value);
      case TokenType.NEGATIVE:
        return new ASTNode("Negative", token.value);
      case TokenType.CONCATANATOR:
        return new ASTNode("Concatanator", token.value);
      case TokenType.RETURN_CARRIAGE:
        return new ASTNode("ReturnCarriage", token.value);
      case TokenType.EOF:
        return new ASTNode("EOF", token.value);
      default:
        console.error("Unexpected token:", token);
        throw new Error(`Unexpected token: ${token.value}`);
    }
  }

  private parseBeginBlock(): ASTNode {
    const beginNode = new ASTNode("BeginBlock");
    // Parse the statements inside the BEGIN block until an END token is encountered
    while (this.currentToken().tokenType !== TokenType.END) {
      const statement = this.expression(); // For simplicity, assume expression can be any statement
      beginNode.children.push(statement);
    }
    // Consume the END token
    this.consume(TokenType.END, "Expected END token to close BEGIN block");
    return beginNode;
  }

  private parseCodeBlock(code: string, codeCount: number): ASTNode {
    console.log("Code count inside parsecodeblock", codeCount);
    const statements: ASTNode[] = [];
    const tokenizer = new Tokenizer(); // Assuming you have a Tokenizer class
    const tokens = tokenizer.tokenize(code);

    let currentIndex = 0;

    // Skip tokens until BEGIN is encountered
    while (
      currentIndex < tokens.length &&
      tokens[currentIndex].tokenType !== TokenType.BEGIN
    ) {
      currentIndex++;
    }

    // Move past BEGIN token
    currentIndex++;

    // Parse each statement within the code block until END is encountered
    while (
      currentIndex < tokens.length &&
      tokens[currentIndex].tokenType !== TokenType.END
    ) {
      const { statement, endIndex } = this.parseNextStatement(
        tokens,
        currentIndex
      );
      statements.push(statement);
      currentIndex = endIndex; // Move currentIndex to the end of the parsed statement
    }

    // Increment codeCount and move past END token
    codeCount++;
    currentIndex++;

    return new ASTNode("CodeBlock", null, statements);
  }

  private parseVariableDeclaration(): ASTNode {
    const dataTypeToken = this.consumeToken(); // Consume the data type token

    // Initialize an array to store variable declarations
    const variableDeclarations: ASTNode[] = [];

    // Parse the first variable declaration
    variableDeclarations.push(
      this.parseSingleVariableDeclaration(dataTypeToken)
    );

    // Parse any subsequent variable declarations
    while (this.peekNextToken().tokenType === TokenType.COMMA) {
      this.consumeToken(); // Consume the comma token
      variableDeclarations.push(
        this.parseSingleVariableDeclaration(dataTypeToken)
      );
    }

    // Return a single ASTNode containing all variable declarations
    return new ASTNode("VariableDeclarations", null, variableDeclarations);
}

private parseSingleVariableDeclaration(dataTypeToken: Token): ASTNode {
    // Check if the next token is a variable name
    const nextToken = this.peekNextToken();
    if (nextToken.tokenType === TokenType.VARIABLE) {
      const variableNameToken = this.consumeToken(); // Consume the variable name token
      const variableName = variableNameToken.value;

      // Check if there is initialization
      const assignmentToken = this.peekNextToken();
      if (assignmentToken.tokenType === TokenType.ASSIGNMENT) {
        // Consume the assignment token
        this.consumeToken();

        // Parse the initialization expression
        const initExpression = this.expression();

        return new ASTNode("VariableDeclaration", {
          dataType: dataTypeToken.value,
          name: variableName,
          initialization: initExpression,
        });
      }

      // Return the variable declaration without initialization
      return new ASTNode("VariableDeclaration", {
        dataType: dataTypeToken.value,
        name: variableName,
      });
    } else {
      // If the next token is not a variable name, throw an error
      throw new Error(`Unexpected token: ${nextToken.value}`);
    }
}





  private peekNextToken(): Token {
    return this.tokens[this.currentTokenIndex + 1];
  }

  private parseNextStatement(
    tokens: Token[],
    currentIndex: number
  ): { statement: ASTNode; endIndex: number } {
    // Create a parser instance for parsing individual statements
    const statementParser = new Parser(tokens);
    statementParser.currentTokenIndex = currentIndex;

    // Parse the next statement
    const statement = statementParser.expression();

    // Update currentIndex to the currentTokenIndex after parsing
    currentIndex = statementParser.currentTokenIndex;

    // Return the parsed statement along with the index of the next token
    return {
      statement: statement,
      endIndex: currentIndex, // Update endIndex to currentIndex
    };
  }

  private currentToken(): Token {
    return this.tokens[this.currentTokenIndex];
  }

  private consumeToken(): Token {
    const token = this.currentToken();
    this.currentTokenIndex++;
    return token;
  }

  private consume(tokenType: TokenType, errorMessage: string): void {
    const token = this.consumeToken();
    if (token.tokenType !== tokenType) {
      throw new Error(`${errorMessage}. Got: ${token.tokenType}`);
    }
  }
}
