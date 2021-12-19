import { puzzleInputToStringArray } from "./common";

// ### segments names ###
//  aaaa
// b    c
// b    c
//  dddd
// e    f
// e    f
//  gggg

// ### number of segments ###
// 0 has 6 segments (a,b,c,e,f,g)
// 1 has 2 segments (c,f) - unique
// 2 has 5 segments (a,c,d,e,g)
// 3 has 5 segments (a,c,d,f,g)
// 4 has 4 segments (b,c,d,f) - unique
// 5 has 5 segments (a,b,d,f,g)
// 6 has 6 segments (a,b,d,e,f,g)
// 7 has 3 segments (a,c,f) - unique
// 8 has 7 segments (a,b,c,d,e,f,g) - unique
// 9 has 6 segments (a,b,c,d,f,g)

/**
 * In the output values, how many times do digits 1, 4, 7, or 8 appear?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD8P1(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    let uniqueNumberOfSegmentsDigitsCounter = 0;
    for (let puzzle of puzzleArray) {
        const puzzleElements = puzzle.trim().split(" ");
        for (let i = 11; i < puzzleElements.length; i++) {
            const elLen = puzzleElements[i].length;
            // 1 has 2 segments, 4 has 4 segments, 7 has 3 segments, 8 has 7 segments
            if (elLen === 2 || elLen === 4 || elLen === 3 || elLen === 7) uniqueNumberOfSegmentsDigitsCounter++;
        }
    }
    return String(uniqueNumberOfSegmentsDigitsCounter);
}

/**
 * For each entry, determine all of the wire/segment connections and decode the four-digit output values.
 * What do you get if you add up all of the output values?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD8P2(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    let outputSum = 0;
    for (let puzzle of puzzleArray) {
        const digitDisplay = prepareDisplayBasedOnDigits(puzzle);
        outputSum += getOutputValue(puzzle, digitDisplay);
    }
    return String(outputSum);
}

/**
 * It deduces display based on given digits set.
 * Each digit as set of segments.
 * 
 * @param puzzle A line of puzzle - set of digits from the task
 * @returns The deduced display ready to use
 */
function prepareDisplayBasedOnDigits(puzzle: string): DigitDisplay {
    let puzzleElements = puzzle.trim().split(" ");
    // remove '|'
    puzzleElements.splice(10,1);

    const digitDisplay = new DigitDisplay();
    for (let digit of puzzleElements) {
        digitDisplay.matchDigitToSegments(digit);
        if (digitDisplay.isReady()) break;
    }
    // final cleanning
    if (!digitDisplay.isReady()) digitDisplay.cleanDuplicates();

    if (!digitDisplay.isReady()) {
        console.log(puzzleElements);
        console.log("DISPLAY IS NOT READY !!!");
        digitDisplay.log();
    }

    return digitDisplay;
}

/**
 * It calculates the output value based on ready display and set of digits.
 * Each digit as set of segments.
 * 
 * @param puzzle A line of puzzle - set of digits from the task
 * @param digitDisplay A deduced display ready to use
 * @returns The output value needed in the part two task
 */
function getOutputValue(puzzle: string, digitDisplay: DigitDisplay): number {
    let puzzleElements = puzzle.trim().split(" ");
    let outputValue = "";
    for (let i = 11; i < puzzleElements.length; i++) {
        outputValue += digitDisplay.decodeDigit(puzzleElements[i]);
    }
    return Number(outputValue);
}

/**
 * It represents the seven-segment digit display.
 * New display is not ready. It has to bo "learned" by matching a set of digits.
 */
class DigitDisplay {
    private size = 7;
    // segments indexes: 0 is a, 1 is b, 2 is c, 3 is d, 4 is e, 5 is f, 6 is g
    segments: string[][];

    constructor() {
        const initSegVal = "abcdefg";
        this.segments = new Array(this.size);
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i] = initSegVal.split("");
        }
    }

    /**
     * It calculates the value of a given digit. Digit as set of segments.
     * 
     * @param digit A set of segments representing a digit
     * @returns A string representation of given digit
     */
    decodeDigit(digit: string): string {
        if (digit.length === 2) return "1"; // 1 has 2 segments (c,f) - unique
        else if (digit.length === 3) return "7"; // 7 has 3 segments (a,c,f) - unique
        else if (digit.length === 4) return "4"; // 4 has 4 segments (b,c,d,f) - unique
        else if (digit.length === 5) {
            // 2 has 5 segments (a,c,d,e,g)
            // 3 has 5 segments (a,c,d,f,g)
            // 5 has 5 segments (a,b,d,f,g)

            let digitSegmentsSorted = digit.split("").sort();

            // if it is 2
            let segmentsOfTwo = this.getDigitsSegmentsSorted([0, 2, 3, 4, 6]);
            let isTwo = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfTwo[i]) {
                    isTwo = false;
                    break;
                }
            }
            if (isTwo) return "2";

            // if it is 3
            let segmentsOfThree = this.getDigitsSegmentsSorted([0, 2, 3, 5, 6]);
            let isThree = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfThree[i]) {
                    isThree = false;
                    break;
                }
            }
            if (isThree) return "3";

            // if it is 5
            let segmentsOfFive = this.getDigitsSegmentsSorted([0, 1, 3, 5, 6]);
            let isFive = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfFive[i]) {
                    isFive = false;
                    break;
                }
            }
            if (isFive) return "5";

        }
        else if (digit.length === 6) {
            // 0 has 6 segments (a,b,c,e,f,g)
            // 6 has 6 segments (a,b,d,e,f,g)
            // 9 has 6 segments (a,b,c,d,f,g)

            let digitSegmentsSorted = digit.split("").sort();

            // if it is 0
            let segmentsOfZero = this.getDigitsSegmentsSorted([0, 1, 2, 4, 5, 6]);
            let isZero = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfZero[i]) {
                    isZero = false;
                    break;
                }
            }
            if (isZero) return "0";

            // if it is 6
            let segmentsOfSix = this.getDigitsSegmentsSorted([0, 1, 3, 4, 5, 6]);
            let isSix = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfSix[i]) {
                    isSix = false;
                    break;
                }
            }
            if (isSix) return "6";

            // if it is 9
            let segmentsOfNine = this.getDigitsSegmentsSorted([0, 1, 2, 3, 5, 6]);
            let isNine = true;
            for(let i = 0; i < digitSegmentsSorted.length; i++) {
                if (digitSegmentsSorted[i] !== segmentsOfNine[i]) {
                    isNine = false;
                    break;
                }
            }
            if (isNine) return "9";
        }
        else if (digit.length === 7) return "8"; // 8 has 7 segments (a,b,c,d,e,f,g) - unique

        return "";
    }

    /**
     * It returs sorted list od digit segments belongs to given array of segments indexes. 
     * @param segmentsIndexes A array of segments indexes
     * @returns The sorted list od digit segments
     */
    private getDigitsSegmentsSorted(segmentsIndexes: number[]): string[] {
        let segmentsOfDigit = new Array<string>();
        for (let i of segmentsIndexes) {
            segmentsOfDigit.push(this.segments[i][0]);
        }
        return segmentsOfDigit.sort();
    }

    /**
     * It matchs a digit, as set of segments, to the display to "learn" it.
     * 
     * @param digit A digit as set of segments
     */
    matchDigitToSegments(digit: string) {
        //console.log("DigitDisplay.matchDigit:" + digit);
        if (digit.length === 2) {
            // 1 has 2 segments (c,f) - unique
            const digitElements = digit.split("");
            //leave only these digit elements from used segments
            this.segments[2] = this.segments[2].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[5] = this.segments[5].filter(element => digitElements.indexOf(element) !== -1);
            //remove these digit elements from the other segments
            for (let digitElement of digitElements) {
                this.segments[0] = this.segments[0].filter(element => element !== digitElement);
                this.segments[1] = this.segments[1].filter(element => element !== digitElement);
                this.segments[3] = this.segments[3].filter(element => element !== digitElement);
                this.segments[4] = this.segments[4].filter(element => element !== digitElement);
                this.segments[6] = this.segments[6].filter(element => element !== digitElement);
            }
        }
        else if (digit.length === 3) {
            // 7 has 3 segments (a,c,f) - unique
            const digitElements = digit.split("");
            //leave only these digit elements from used segments
            this.segments[0] = this.segments[0].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[2] = this.segments[2].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[5] = this.segments[5].filter(element => digitElements.indexOf(element) !== -1);
            //remove these digit elements from the other segments
            for (let digitElement of digitElements) {
                this.segments[1] = this.segments[1].filter(element => element !== digitElement);
                this.segments[3] = this.segments[3].filter(element => element !== digitElement);
                this.segments[4] = this.segments[4].filter(element => element !== digitElement);
                this.segments[6] = this.segments[6].filter(element => element !== digitElement);
            }
        }
        else if (digit.length === 4) {
            // 4 has 4 segments (b,c,d,f) - unique
            const digitElements = digit.split("");
            //leave only these digit elements from used segments
            this.segments[1] = this.segments[1].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[2] = this.segments[2].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[3] = this.segments[3].filter(element => digitElements.indexOf(element) !== -1);
            this.segments[5] = this.segments[5].filter(element => digitElements.indexOf(element) !== -1);
            //remove these digit elements from the other segments
            for (let digitElement of digitElements) {
                this.segments[0] = this.segments[0].filter(element => element !== digitElement);
                this.segments[4] = this.segments[4].filter(element => element !== digitElement);
                this.segments[6] = this.segments[6].filter(element => element !== digitElement);
            }
        }
        else if (digit.length === 5) {
            // 2 has 5 segments (a,c,d,e,g)
            // 3 has 5 segments (a,c,d,f,g)
            // 5 has 5 segments (a,b,d,f,g)
            // so the common segments for all of them are a,d,g - missing digit segments is not there for sure
            let digitsDic = "abcdefg".split("");
            const digitElements = digit.split("");
            //remove these digit elements
            for (let digitElement of digitElements) {
                digitsDic = digitsDic.filter(element => element !== digitElement);
            }
            if (digitsDic.length === 2) {
                for (let digitElement of digitsDic) {
                    this.segments[0] = this.segments[0].filter(element => element !== digitElement);
                    this.segments[3] = this.segments[3].filter(element => element !== digitElement);
                    this.segments[6] = this.segments[6].filter(element => element !== digitElement);
                }
            }
            else console.log("something went wrong with digitsDic:" + digitsDic + " for digit:" + digit);
        }
        else if (digit.length === 6) {
            // 0 has 6 segments (a,b,c,e,f,g)
            // 6 has 6 segments (a,b,d,e,f,g)
            // 9 has 6 segments (a,b,c,d,f,g)
            // so the common segments for all of them are a,b,f,g - missing digit segment is not there for sure
            let digitsDic = "abcdefg".split("");
            const digitElements = digit.split("");
            //remove these digit elements
            for (let digitElement of digitElements) {
                digitsDic = digitsDic.filter(element => element !== digitElement);
            }
            if (digitsDic.length === 1) {
                this.segments[0] = this.segments[0].filter(element => element !== digitsDic[0]);
                this.segments[1] = this.segments[1].filter(element => element !== digitsDic[0]);
                this.segments[5] = this.segments[5].filter(element => element !== digitsDic[0]);
                this.segments[6] = this.segments[6].filter(element => element !== digitsDic[0]);
            }
            else console.log("something went wrong with digitsDic:" + digitsDic + " for digit:" + digit);
        }
        this.cleanDuplicates();
    }

    /**
     * It cleans segments duplicates from the display to "learn" it.
     */
    cleanDuplicates() {
        while(true) {
            let somethingNewFound = false;
            for (let segment of this.segments) {
                if (segment.length === 1) {
                    for (let i = 0; i < this.segments.length; i++) {
                        if (this.segments[i].length > 1) {
                            this.segments[i] = this.segments[i].filter(element => element !== segment[0]);
                            if (this.segments[i].length == 1) somethingNewFound = true;
                        }
                    }
                }
            }
            if (!somethingNewFound) break;
        }
    }

    /**
     * It checks is display ready.
     */
    isReady(): boolean {
        let isReady = true;
        for (let segment of this.segments) {
            if (segment.length > 1) {
                isReady = false;
                break;
            }
        }
        return isReady;
    }

    /**
     * It logs current display status to the console.
     */
    log() {
        for (let i = 0; i < this.segments.length; i++) {
            console.log("seg " + i + ":" + this.segments[i]);
        }
    }
}