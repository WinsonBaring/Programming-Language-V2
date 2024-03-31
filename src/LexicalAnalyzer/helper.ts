export function isBoolean(index: number, text: string): [boolean, number, string] {
    let currentIndex: number = 0;
    let bool: string = '';
    // Guard against starting in "
    if (text[index] !== `"`) return [false, 0, ''];

    // Check if it starts with "TRUE" or "FALSE"
    bool = (text[index + 1] === 'T') ? 'TRUE' : 'FALSE';

    // For checking FALSE or TRUE
    while (index < text.length && currentIndex < bool.length) {
        if (text[index+1] !== bool[currentIndex]) {
            // throw new Error("Invalid Token: ")
            return [false, 0, ''];
        }
        index++;
        currentIndex++;
    }

    // Guard against not ending in `"`
    if (text[index+1] !== `"`) return [false, 0, ''];

    // + 2 because of `""` during Guarding
    return [true, currentIndex+2, bool];
}
export function isComment(index:number, text:string):[boolean, number ]{
    let currentIndex = 0;

    if(text[index] !== `#` ) return [false,0]
    let reverseIndex = 0;

    // make the whole line comment
    while(text[index] !== `\n`){
        currentIndex++;
        index++;
    }
    return [true, currentIndex]
}
export function isChar(index: number, text: string): [boolean, number] {
    if (text[index] !== "'") return [false, 0];  // Check if it starts with a single quote
    index++;
    let currentIndex: number = 0;

    console.log(`this is it:`+text[index])
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


export function isDisplay(index:number, text:string):[boolean,number]{
    let display:string = `DISPLAY:`;
    let currentIndex:number = 0;

    if(text[index] !== `D` ) return [false,0]

    while(index < text.length && currentIndex < display.length){
        if(display[currentIndex] !== text[index]) return [false,0]
        index++;
        currentIndex++;
    }
    return [true, currentIndex]
}
export function isEnd(index:number, text:string):[boolean,number]{
    let end:string = `END`;
    let currentIndex:number = 0;

    // if first index not E return
    if(text[index] !== `E`) return [false,0]

    while(index < text.length && currentIndex < end.length){
        if(end[currentIndex] !== text[index]) return [false,0]
        index++;
        currentIndex++;
    }
    return [true, currentIndex]
}
export function isBool(index: number, text:string):[boolean,number] {
    var currentIndex: number = 0;
    var beginCode: string = `BOOL`;

    // for checking BEGIN
    while (index < text.length && currentIndex < beginCode.length) {
        // console.log(`index`, beginCode[currentIndex],`, currentIndex`,text[index])
        if (text[index] !== beginCode[currentIndex]) {
            return[false,0]
        }
        index++;
        currentIndex++;
    }
    return [true,currentIndex];
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
    var currentIndex: number = 0;
    var beginCode: string = `BEGIN`;
    while (index < text.length && currentIndex < beginCode.length) {
        // console.log(`index`, beginCode[currentIndex],`, currentIndex`,text[index])
        if (text[index] !== beginCode[currentIndex]) {
            return [false,0]
        }
        index++;
        currentIndex++;
    }
    return [true,currentIndex];
}
export function isCode(index: number, text: string):[boolean, number] {
    var currentIndex: number = 0;
    var code: string = `CODE`;
    while (index < text.length && currentIndex < code.length) {
        if (text[index] !== code[currentIndex]) {
            return [false,0]
        }
        index++;
        currentIndex++;
    }
    return [true,currentIndex];
}

export function isDelimiter(char: string): boolean {
    return char === ' ' || char === '=' || char === `\n`;
}
export function isNumberAddedIndex(currentIndex: number, input: string): [number, number] {
    let indexCounter: number = 0;
    let numberHolder: number[] = [];

    // while consecutive numbers
    while (currentIndex < input.length && /^\d+$/.test(input[currentIndex])) {
        console.log("this is the current index: " + currentIndex)
        numberHolder.push(parseInt(input[currentIndex]));
        indexCounter++;
        currentIndex++;
    }

    // Convert the array into a single number
    let numberValue: number = parseInt(numberHolder.join(''));
    return [indexCounter, numberValue];
}   
export function isNumber(input:string): boolean {
    // return true if number
    return /^\d+$/.test(input) ? true: false;
}
export function isArithmeticOperator(input: string): boolean {
    return input === '+' || input === '-' || input === '*' || input === '%';
}
export function isLogicationOperator(input:string):boolean{
    return input === `AND` || input === `OR` || input === `NOT`;
}
export function isUnaryOperator(input:string):boolean{
    return input === `+` || input === `-` ;
}