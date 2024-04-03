"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var tokens_js_1 = require("../tokens.js");
var tokenizer_js_1 = require("./tokenizer.js");
var ASTNode = /** @class */ (function () {
    function ASTNode(type, value, children) {
        if (children === void 0) { children = []; }
        this.type = type;
        this.value = value;
        this.children = children;
    }
    return ASTNode;
}());
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = tokens;
        this.currentTokenIndex = 0;
        this.codeCount = 0;
    }
    Parser.prototype.parse = function () {
        return this.expression();
    };
    Parser.prototype.expression = function () {
        var node = this.term();
        while (this.currentToken().tokenType === tokens_js_1.TokenType.ADDITION ||
            this.currentToken().tokenType === tokens_js_1.TokenType.SUBTRACTION) {
            var token = this.consumeToken();
            var operator = token.value;
            var right = this.term();
            node = new ASTNode("BinaryOperation", operator, [node, right]);
        }
        return node;
    };
    Parser.prototype.term = function () {
        var node = this.factor();
        while (this.currentToken().tokenType === tokens_js_1.TokenType.MULTIPLICATION ||
            this.currentToken().tokenType === tokens_js_1.TokenType.DIVISION) {
            var token = this.consumeToken();
            var operator = token.value;
            var right = this.factor();
            node = new ASTNode("BinaryOperation", operator, [node, right]);
        }
        return node;
    };
    Parser.prototype.factor = function () {
        var token = this.consumeToken();
        console.log("Processing token:", token);
        // Check if the token is a CODE token
        if (token.tokenType === tokens_js_1.TokenType.CODE) {
            console.info("Code counter", this.codeCount);
            return this.parseCodeBlock(token.value, this.codeCount);
        }
        switch (token.tokenType) {
            case tokens_js_1.TokenType.BEGIN:
                return this.parseBeginBlock();
            case tokens_js_1.TokenType.INT:
            case tokens_js_1.TokenType.FLOAT:
                return new ASTNode("Number", token.value);
            case tokens_js_1.TokenType.CHAR:
                return new ASTNode("Character", token.value);
            case tokens_js_1.TokenType.BOOL: {
                var result = this.parseVariableDeclaration();
                return result !== null
                    ? new ASTNode("Boolean", token.value)
                    : new ASTNode("Unknown");
            }
            case tokens_js_1.TokenType.DISPLAY:
                return new ASTNode("Display", token.value);
            case tokens_js_1.TokenType.COMMENT:
                return new ASTNode("Comment", token.value);
            case tokens_js_1.TokenType.LINEBREAK:
                return new ASTNode("Linebreak", token.value);
            case tokens_js_1.TokenType.ASSIGNMENT:
                return new ASTNode("Assignment", token.value);
            case tokens_js_1.TokenType.DATA_TYPE: {
                var result = this.parseVariableDeclaration();
                return result !== null
                    ? new ASTNode("DataType", token.value)
                    : new ASTNode("Unknown");
            }
            case tokens_js_1.TokenType.VARIABLE:
                return new ASTNode("Variable", token.value);
            case tokens_js_1.TokenType.VALUE:
                return new ASTNode("Value", token.value);
            case tokens_js_1.TokenType.ARITHMETICOPERATOR:
                return new ASTNode("ArithmeticOperator", token.value);
            case tokens_js_1.TokenType.LOGICAL_OPERATOR:
                return new ASTNode("LogicalOperator", token.value);
            case tokens_js_1.TokenType.UNARY_OPERATOR:
                return new ASTNode("UnaryOperator", token.value);
            case tokens_js_1.TokenType.IF:
                return new ASTNode("IfStatement", token.value);
            case tokens_js_1.TokenType.ELSE:
                return new ASTNode("ElseStatement", token.value);
            case tokens_js_1.TokenType.WHILE:
                return new ASTNode("WhileLoop", token.value);
            case tokens_js_1.TokenType.SCAN:
                return new ASTNode("Scan", token.value);
            case tokens_js_1.TokenType.BRACKET_OPEN:
                return new ASTNode("BracketOpen", token.value);
            case tokens_js_1.TokenType.BRACKET_CLOSE:
                return new ASTNode("BracketClose", token.value);
            case tokens_js_1.TokenType.PAREN_OPEN:
                return new ASTNode("ParenOpen", token.value);
            case tokens_js_1.TokenType.PAREN_CLOSE:
                return new ASTNode("ParenClose", token.value);
            case tokens_js_1.TokenType.MULTIPLICATION:
                return new ASTNode("Multiplication", token.value);
            case tokens_js_1.TokenType.DIVISION:
                return new ASTNode("Division", token.value);
            case tokens_js_1.TokenType.MODULO:
                return new ASTNode("Modulo", token.value);
            case tokens_js_1.TokenType.ADDITION:
                return new ASTNode("Addition", token.value);
            case tokens_js_1.TokenType.SUBTRACTION:
                return new ASTNode("Subtraction", token.value);
            case tokens_js_1.TokenType.GREATER_THAN:
                return new ASTNode("GreaterThan", token.value);
            case tokens_js_1.TokenType.LESSER_THAN:
                return new ASTNode("LesserThan", token.value);
            case tokens_js_1.TokenType.GREATER_THAN_OR_EQUAL_TO:
                return new ASTNode("GreaterThanOrEqualTo", token.value);
            case tokens_js_1.TokenType.LESSER_THAN_OR_EQUAL_TO:
                return new ASTNode("LesserThanOrEqualTo", token.value);
            case tokens_js_1.TokenType.EQUAL:
                return new ASTNode("Equal", token.value);
            case tokens_js_1.TokenType.NOT_EQUAL:
                return new ASTNode("NotEqual", token.value);
            case tokens_js_1.TokenType.AND:
                return new ASTNode("And", token.value);
            case tokens_js_1.TokenType.OR:
                return new ASTNode("Or", token.value);
            case tokens_js_1.TokenType.NOT:
                return new ASTNode("Not", token.value);
            case tokens_js_1.TokenType.POSITIVE:
                return new ASTNode("Positive", token.value);
            case tokens_js_1.TokenType.NEGATIVE:
                return new ASTNode("Negative", token.value);
            case tokens_js_1.TokenType.CONCATANATOR:
                return new ASTNode("Concatanator", token.value);
            case tokens_js_1.TokenType.RETURN_CARRIAGE:
                return new ASTNode("ReturnCarriage", token.value);
            case tokens_js_1.TokenType.EOF:
                return new ASTNode("EOF", token.value);
            default:
                console.error("Unexpected token:", token);
                throw new Error("Unexpected token: ".concat(token.value));
        }
    };
    Parser.prototype.parseBeginBlock = function () {
        var beginNode = new ASTNode("BeginBlock");
        // Parse the statements inside the BEGIN block until an END token is encountered
        while (this.currentToken().tokenType !== tokens_js_1.TokenType.END) {
            var statement = this.expression(); // For simplicity, assume expression can be any statement
            beginNode.children.push(statement);
        }
        // Consume the END token
        this.consume(tokens_js_1.TokenType.END, "Expected END token to close BEGIN block");
        return beginNode;
    };
    Parser.prototype.parseCodeBlock = function (code, codeCount) {
        console.log("Code count inside parsecodeblock", codeCount);
        var statements = [];
        var tokenizer = new tokenizer_js_1.Tokenizer(); // Assuming you have a Tokenizer class
        var tokens = tokenizer.tokenize(code);
        var currentIndex = 0;
        // Skip tokens until BEGIN is encountered
        while (currentIndex < tokens.length &&
            tokens[currentIndex].tokenType !== tokens_js_1.TokenType.BEGIN) {
            currentIndex++;
        }
        // Move past BEGIN token
        currentIndex++;
        // Parse each statement within the code block until END is encountered
        while (currentIndex < tokens.length &&
            tokens[currentIndex].tokenType !== tokens_js_1.TokenType.END) {
            var _a = this.parseNextStatement(tokens, currentIndex), statement = _a.statement, endIndex = _a.endIndex;
            statements.push(statement);
            currentIndex = endIndex; // Move currentIndex to the end of the parsed statement
        }
        // Increment codeCount and move past END token
        codeCount++;
        currentIndex++;
        return new ASTNode("CodeBlock", null, statements);
    };
    Parser.prototype.parseVariableDeclaration = function () {
        var dataTypeToken = this.consumeToken(); // Consume the data type token
        // Initialize an array to store variable declarations
        var variableDeclarations = [];
        // Parse the first variable declaration
        variableDeclarations.push(this.parseSingleVariableDeclaration(dataTypeToken));
        // Parse any subsequent variable declarations separated by commas
        while (this.currentToken().tokenType === tokens_js_1.TokenType.COMMA) {
            this.consumeToken(); // Consume the comma token
            variableDeclarations.push(this.parseSingleVariableDeclaration(dataTypeToken));
        }
        // Return a single ASTNode containing all variable declarations
        return new ASTNode("VariableDeclarations", null, variableDeclarations);
    };
    Parser.prototype.parseSingleVariableDeclaration = function (dataTypeToken) {
        // Check if the next token is a variable name
        var nextToken = this.peekNextToken();
        if (nextToken.tokenType === tokens_js_1.TokenType.VARIABLE) {
            var variableNameToken = this.consumeToken(); // Consume the variable name token
            var variableName = variableNameToken.value;
            // Check if there is initialization
            var assignmentToken = this.peekNextToken();
            if (assignmentToken.tokenType === tokens_js_1.TokenType.ASSIGNMENT) {
                // Consume the assignment token
                this.consumeToken();
                // Parse the initialization expression
                var initExpression = this.expression();
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
        }
        else if (nextToken.tokenType === tokens_js_1.TokenType.COMMA) {
            // Consume the comma token and continue parsing the next variable declaration
            this.consumeToken();
            return this.parseSingleVariableDeclaration(dataTypeToken);
        }
        else {
            // If the next token is not a variable name or comma, throw an error
            throw new Error("Unexpected token: ".concat(nextToken.value));
        }
    };
    Parser.prototype.peekNextToken = function () {
        return this.tokens[this.currentTokenIndex + 1];
    };
    Parser.prototype.parseNextStatement = function (tokens, currentIndex) {
        // Create a parser instance for parsing individual statements
        var statementParser = new Parser(tokens);
        statementParser.currentTokenIndex = currentIndex;
        // Parse the next statement
        var statement = statementParser.expression();
        // Update currentIndex to the currentTokenIndex after parsing
        currentIndex = statementParser.currentTokenIndex;
        // Return the parsed statement along with the index of the next token
        return {
            statement: statement,
            endIndex: currentIndex, // Update endIndex to currentIndex
        };
    };
    Parser.prototype.currentToken = function () {
        return this.tokens[this.currentTokenIndex];
    };
    Parser.prototype.consumeToken = function () {
        var token = this.currentToken();
        this.currentTokenIndex++;
        return token;
    };
    Parser.prototype.consume = function (tokenType, errorMessage) {
        var token = this.consumeToken();
        if (token.tokenType !== tokenType) {
            throw new Error("".concat(errorMessage, ". Got: ").concat(token.tokenType));
        }
    };
    return Parser;
}());
exports.Parser = Parser;
