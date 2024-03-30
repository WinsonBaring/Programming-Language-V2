export function isBoolean(index, text) {
    let currentIndex = 0;
    let bool = '';
    // Guard against starting in "
    if (text[index] !== `"`)
        return [false, 0, ''];
    // Check if it starts with "TRUE" or "FALSE"
    bool = (text[index + 1] === 'T') ? 'TRUE' : 'FALSE';
    // For checking FALSE or TRUE
    while (index < text.length && currentIndex < bool.length) {
        if (text[index + 1] !== bool[currentIndex]) {
            // throw new Error("Invalid Token: ")
            return [false, 0, ''];
        }
        index++;
        currentIndex++;
    }
    // Guard against not ending in `"`
    if (text[index + 1] !== `"`)
        return [false, 0, ''];
    // + 2 because of `""` during Guarding
    return [true, currentIndex + 2, bool];
}
export function isComment(index, text) {
    let currentIndex = 0;
    if (text[index] !== `#`)
        return [false, currentIndex];
    while (text[index] !== `\n`) {
        currentIndex++;
        index++;
    }
    return [true, currentIndex];
}
export function isDisplay(index, text) {
    let display = `DISPLAY`;
    let currentIndex = 0;
    while (index < text.length && currentIndex < display.length) {
        if (display[currentIndex] !== text[index])
            return [false, 0];
        index++;
        currentIndex++;
    }
    return [true, currentIndex];
}
export function isBool(index, text) {
    var currentIndex = 0;
    var beginCode = `BOOL`;
    // for checking BEGIN
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
export function isINT(text) {
    var currentIndex = 0;
    var INT = `INT`;
    while (currentIndex < text.length && currentIndex < INT.length) {
        if (text[currentIndex] !== INT[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === INT.length; // Ensure all characters in 'bool' were checked
}
export function isIF(text) {
    var currentIndex = 0;
    var IF = `IF`;
    while (currentIndex < text.length && currentIndex < IF.length) {
        if (text[currentIndex] !== IF[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === IF.length; // Ensure all characters in 'bool' were checked
}
export function isBeginCode(index, text) {
    var currentIndex = 0;
    var beginCode = `BEGIN`;
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
export function isCode(index, text) {
    var currentIndex = 0;
    var code = `CODE`;
    while (index < text.length && currentIndex < code.length) {
        if (text[index] !== code[currentIndex]) {
            return [false, 0];
        }
        index++;
        currentIndex++;
    }
    return [true, currentIndex];
}
export function isDelimiter(char) {
    return char === ' ' || char === '=' || char === `\n`;
}
export function isNumberAddedIndex(currentIndex, input) {
    let indexCounter = 0;
    let numberHolder = [];
    // while consecutive numbers
    while (currentIndex < input.length && /^\d+$/.test(input[currentIndex])) {
        console.log("this is the current index: " + currentIndex);
        numberHolder.push(parseInt(input[currentIndex]));
        indexCounter++;
        currentIndex++;
    }
    // Convert the array into a single number
    let numberValue = parseInt(numberHolder.join(''));
    return [indexCounter, numberValue];
}
export function isNumber(input) {
    // return true if number
    return /^\d+$/.test(input) ? true : false;
}
export function isArithmeticOperator(input) {
    return input === '+' || input === '-' || input === '*' || input === '%';
}
export function isLogicationOperator(input) {
    return input === `AND` || input === `OR` || input === `NOT`;
}
export function isUnaryOperator(input) {
    return input === `+` || input === `-`;
}
