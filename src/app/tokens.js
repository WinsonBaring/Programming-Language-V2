export var TokenType;
(function (TokenType) {
    TokenType["BEGIN"] = "BEGIN";
    TokenType["END"] = "END";
    TokenType["CODE"] = "CODE";
    TokenType["INT"] = "INT";
    TokenType["CHAR"] = "CHAR";
    TokenType["BOOL"] = "BOOL";
    TokenType["FLOAT"] = "FLOAT";
    TokenType["DISPLAY"] = "DISPLAY";
    TokenType["COMMENT"] = "COMMENT";
    TokenType["COMMA"] = "COMMA";
    TokenType["LINEBREAK"] = "LINEBREAK";
    TokenType["ASSIGNMENT"] = "ASSIGNMENT";
    TokenType["DATA_TYPE"] = "DATA_TYPE";
    TokenType["VARIABLE"] = "VARIABLE";
    TokenType["VALUE"] = "VALUE";
    TokenType["ARITHMETICOPERATOR"] = "OPERATOR";
    TokenType["LOGICAL_OPERATOR"] = "LOGICAL_OPERATOR";
    TokenType["UNARY_OPERATOR"] = "UNARY_OPERATOR";
    TokenType["IF"] = "IF";
    TokenType["ELSE"] = "ELSE";
    TokenType["WHILE"] = "WHILE";
    TokenType["SCAN"] = "SCAN";
    TokenType["PAREN_OPEN"] = "PAREN_OPEN";
    TokenType["PAREN_CLOSE"] = "PAREN_CLOSE";
    TokenType["MULTIPLICATION"] = "MULTIPLICATION";
    TokenType["DIVISION"] = "DIVISION";
    TokenType["MODULO"] = "MODULO";
    TokenType["ADDITION"] = "ADDITION";
    TokenType["SUBTRACTION"] = "SUBTRACTION";
    TokenType["GREATER_THAN"] = "GREATER_THAN";
    TokenType["LESSER_THAN"] = "LESSER_THAN";
    TokenType["GREATER_THAN_OR_EQUAL_TO"] = "GREATER_THAN_OR_EQUAL_TO";
    TokenType["LESSER_THAN_OR_EQUAL_TO"] = "LESSER_THAN_OR_EQUAL_TO";
    TokenType["EQUAL"] = "EQUAL";
    TokenType["NOT_EQUAL"] = "NOT_EQUAL";
    TokenType["AND"] = "AND";
    TokenType["OR"] = "OR";
    TokenType["NOT"] = "NOT";
    TokenType["POSITIVE"] = "POSITIVE";
    TokenType["NEGATIVE"] = "NEGATIVE";
})(TokenType || (TokenType = {}));
export class Token {
    tokenType;
    value;
    constructor(tokenType, value) {
        this.tokenType = tokenType;
        this.value = value;
    }
}
