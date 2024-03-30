export function isBool(text: string) {
    var currentIndex: number = 0;
    var bool: string = `BOOL`;
    while (currentIndex < text.length && currentIndex < bool.length) {
        if (text[currentIndex] !== bool[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === bool.length; // Ensure all characters in 'bool' were checked
}

export function isINT(text: string) {
    var currentIndex: number = 0;
    var INT: string = `INT`;
    while (currentIndex < text.length && currentIndex < INT.length) {
        if (text[currentIndex] !== INT[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === INT.length; // Ensure all characters in 'bool' were checked
}
export function isIF(text: string) {
    var currentIndex: number = 0;
    var IF: string = `IF`;
    while (currentIndex < text.length && currentIndex < IF.length) {
        if (text[currentIndex] !== IF[currentIndex]) {
            return false;
        }
        currentIndex++;
    }
    return currentIndex === IF.length; // Ensure all characters in 'bool' were checked
}

export function isBeginCode(index: number, text: string):[boolean, number] {
    var indexCounter: number = 0;
    var currentIndex: number = 0;
    var beginCode: string = `BEGIN`;
    var code: string = `CODE`;

    // for checking BEGIN
    while (index < text.length && currentIndex < beginCode.length) {
        // console.log(`index`, beginCode[currentIndex],`, currentIndex`,text[index])
        if (text[index] !== beginCode[currentIndex]) {
            throw new Error("Program Should start with BEGIN");
        }
        index++;
        indexCounter++;
        currentIndex++;
    }
    currentIndex = 0;

    // for checking all white spaces and line breaks
    while (index < text.length) {
        if (text[index] === ` ` || text[index] === `\n` || text[index] === `\r\n`) {
            index++;
            indexCounter++;
        } else {
            break;
        }
    }

    // for checking CODE
    currentIndex = 0;
    while (index < text.length && currentIndex < code.length) {
        if (text[index] !== code[currentIndex]) {
            throw new Error("the word: CODE after begin is missing");
        }
        index++;
        indexCounter++;
        currentIndex++;
    }
    return [true,indexCounter];
}

export function isDelimiter(char: string): boolean {
    return char === ' ' || char === '=' || char === `\n`;
}
export function isNumber(currentIndex: number, input: string): [boolean, number] {
    var currentCounter: number = 0;
    //Checker for non-numeric characters
    if(/^\d+$/.test(input[currentIndex]) ) return [false,0]

    while (/^\d+$/.test(input[currentIndex]) && currentCounter < input.length) {
        currentCounter++;
        currentIndex++; // Update the currentIndex to avoid infinite loop
    }
    return [true, currentCounter];
}