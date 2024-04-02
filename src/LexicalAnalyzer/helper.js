"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnaryOperator = exports.isLogicationOperator = exports.isArithmeticOperator = exports.isNumber = exports.isNumberAddedIndex = exports.isDelimiter = exports.isCode = exports.isBeginCode = exports.isIF = exports.isINT = exports.isBool = exports.isEnd = exports.isDisplay = exports.isChar = exports.isComment = exports.isBoolean = void 0;
function isBoolean(index, text) {
    var currentIndex = 0;
    var bool = "";
    // Guard against starting in "
    if (text[index] !== "\"")
        return [false, 0, ""];
    // Check if it starts with "TRUE" or "FALSE"
    bool = text[index + 1] === "T" ? "TRUE" : "FALSE";
    // For checking FALSE or TRUE
    while (index < text.length && currentIndex < bool.length) {
        if (text[index + 1] !== bool[currentIndex]) {
            // throw new Error("Invalid Token: ")
            return [false, 0, ""];
        }
        index++;
        currentIndex++;
    }
    // Guard against not ending in `"`
    if (text[index + 1] !== "\"")
        return [false, 0, ""];
    // + 2 because of `""` during Guarding
    return [true, currentIndex + 2, bool];
}
exports.isBoolean = isBoolean;
function isComment(index, text) {
    var currentIndex = 0;
    if (text[index] !== "#")
        return [false, 0];
    var reverseIndex = 0;
    // make the whole line comment
    while (text[index] !== "\n") {
        currentIndex++;
        index++;
    }
    return [true, currentIndex];
}
exports.isComment = isComment;
function isChar(index, text) {
    if (text[index] !== "'")
        return [false, 0]; // Check if it starts with a single quote
    index++;
    var currentIndex = 0;
    console.log("this is it:" + text[index]);
    // Skip all characters until the end or a newline is encountered
    while (index < text.length && text[index] !== "'" && text[index] !== "\n") {
        if (text[index] === "\n") {
            return [false, 0];
        }
        if (text[index] === "'" && currentIndex < 2) {
            return [true, currentIndex];
        }
        index++;
        currentIndex++;
    }
    return [false, 0];
}
exports.isChar = isChar;
function isDisplay(index, text) {
    var display = "DISPLAY:";
    var currentIndex = 0;
    if (text[index] !== "D")
        return [false, 0];
    while (index < text.length && currentIndex < display.length) {
        if (display[currentIndex] !== text[index])
            return [false, 0];
        index++;
        currentIndex++;
    }
    return [true, currentIndex];
}
exports.isDisplay = isDisplay;
function isEnd(index, text) {
    var end = "END";
    var currentIndex = 0;
    // if first index not E return
    if (text[index] !== "E")
        return [false, 0];
    while (index < text.length && currentIndex < end.length) {
        if (end[currentIndex] !== text[index])
            return [false, 0];
        index++;
        currentIndex++;
    }
    return [true, currentIndex];
}
exports.isEnd = isEnd;
// export function isBool(index: number, text:string):[boolean,number] {
//     var currentIndex: number = 0;
//     var beginCode: string = `BOOL`;
//     // for checking BEGIN
//     while (index < text.length && currentIndex < beginCode.length) {
//         // console.log(`index`, beginCode[currentIndex],`, currentIndex`,text[index])
//         if (text[index] !== beginCode[currentIndex]) {
//             return[false,0]
//         }
//         index++;
//         currentIndex++;
//     }
//     return [true,currentIndex];
// }
function isBool(index, text) {
    var currentIndex = 0;
    var bool = "";
    if (text[index] !== "\"")
        return [false, 0, ""];
    bool = text[index + 1] === "T" ? "TRUE" : "FALSE";
    while (index < text.length && currentIndex < bool.length) {
        if (text[index + 1] !== bool[currentIndex]) {
            return [false, 0, ""];
        }
        index++;
        currentIndex++;
    }
    if (text[index + 1] !== "\"")
        return [false, 0, ""];
    return [true, currentIndex + 2, bool];
}
exports.isBool = isBool;
function isINT(text) {
    var currentIndex = 0;
    var INT = "INT";
    while (currentIndex < text.length && currentIndex < INT.length) {
        if (text[currentIndex] !== INT[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === INT.length; // Ensure all characters in 'bool' were checked
}
exports.isINT = isINT;
function isIF(text) {
    var currentIndex = 0;
    var IF = "IF";
    while (currentIndex < text.length && currentIndex < IF.length) {
        if (text[currentIndex] !== IF[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === IF.length; // Ensure all characters in 'bool' were checked
}
exports.isIF = isIF;
function isBeginCode(index, text) {
    var currentIndex = 0;
    var beginCode = "BEGIN";
    while (index < text.length && currentIndex < beginCode.length) {
        // console.log(`index`, beginCode[currentIndex],`, currentIndex`,text[index])
        if (text[index] !== beginCode[currentIndex]) {
            return [false, 0];
        }
        index++;
        currentIndex++;
    }
    return [true, currentIndex];
}
exports.isBeginCode = isBeginCode;
function isCode(index, text) {
    var currentIndex = 0;
    var code = "CODE";
    while (index < text.length && currentIndex < code.length) {
        if (text[index] !== code[currentIndex]) {
            return [false, 0];
        }
        index++;
        currentIndex++;
    }
    console.log("Code block detected.");
    return [true, currentIndex];
}
exports.isCode = isCode;
function isDelimiter(char) {
    return char === " " || char === "=" || char === "\n";
}
exports.isDelimiter = isDelimiter;
// export function isNumberAddedIndex(
//   currentIndex: number,
//   input: string
// ): [number, number] {
//   let indexCounter: number = 0;
//   let numberHolder: number[] = [];
//   // while consecutive numbers
//   while (currentIndex < input.length && /^\d+$/.test(input[currentIndex])) {
//     console.log("this is the current index: " + currentIndex);
//     numberHolder.push(parseInt(input[currentIndex]));
//     indexCounter++;
//     currentIndex++;
//   }
//   // Convert the array into a single number
//   let numberValue: number = parseInt(numberHolder.join(""));
//   return [indexCounter, numberValue];
// }
function isNumberAddedIndex(currentIndex, input) {
    var indexCounter = 0;
    var numberHolder = [];
    while (currentIndex < input.length && /^\d$/.test(input[currentIndex])) {
        numberHolder.push(parseInt(input[currentIndex]));
        indexCounter++;
        currentIndex++;
    }
    var numberValue = parseInt(numberHolder.join(''));
    return [indexCounter, numberValue];
}
exports.isNumberAddedIndex = isNumberAddedIndex;
function isNumber(input) {
    // return true if number
    return /^\d+$/.test(input) ? true : false;
}
exports.isNumber = isNumber;
function isArithmeticOperator(input) {
    return input === "+" || input === "-" || input === "*" || input === "%";
}
exports.isArithmeticOperator = isArithmeticOperator;
function isLogicationOperator(input) {
    return input === "AND" || input === "OR" || input === "NOT";
}
exports.isLogicationOperator = isLogicationOperator;
function isUnaryOperator(input) {
    return input === "+" || input === "-";
}
exports.isUnaryOperator = isUnaryOperator;
