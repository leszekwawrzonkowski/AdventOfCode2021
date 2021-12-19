import { puzzleInputToStringArray } from "./common";

/**
 * Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together.
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD3P1(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const onesCounters: number[] = Array<number>(puzzleArray[0].length).fill(0);
    const zerosCounters: number[] = Array<number>(puzzleArray[0].length).fill(0);
    for (let puzzle of puzzleArray) {
        let bitNums = Array.from(puzzle);
        for (let i = 0; i < bitNums.length; i++) {
            if(bitNums[i] === "1") onesCounters[i]++;
            else zerosCounters[i]++;
        }
    }
    let gammaRate = "";
    let epsilonRate = "";
    for (let i = 0; i < onesCounters.length; i++) {
        if(onesCounters[i] > zerosCounters[i]) {
            gammaRate += "1";
            epsilonRate += "0";
        }
        else {
            gammaRate += "0";
            epsilonRate += "1";
        }
    }
    return String(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
}

/**
 * Verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD3P2(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    let bitIterator = 0;
    let inputArray = puzzleArray;
    while(inputArray.length > 1) {
        inputArray = discardArrayElemets(inputArray, bitIterator, BitCriteria.Oxygen);
        bitIterator++;
    }
    let oxygenGeneratorRating = inputArray[0];
    bitIterator = 0;
    inputArray = puzzleArray;
    while(inputArray.length > 1) {
        inputArray = discardArrayElemets(inputArray, bitIterator, BitCriteria.Co2);
        bitIterator++;
    }
    let co2ScrubberRating = inputArray[0];
    
    return String(parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2));
}

enum BitCriteria {
    Oxygen,
    Co2
}

/**
 * It eliminates entries from the given array taking into account bit position and bit criteria.
 * 
 * @param initArray An array which elements will be eliminated
 * @param bitNo A bit number
 * @param criteria A bit criteria
 * @returns The array after elements elimination
 */
function discardArrayElemets(initArray: string[], bitNo: number, criteria: BitCriteria): string[] {
    let wantedValue: "0" | "1" = "0";
    let onesCounter = 0;
    let zerosCounter = 0;
    for (let puzzle of initArray) {
        let bitNums = Array.from(puzzle);
        if(bitNums[bitNo] === "1") onesCounter++;
        else zerosCounter++;
    }
    if (criteria === BitCriteria.Oxygen) {
        wantedValue = "1";
        if (zerosCounter > onesCounter) wantedValue = "0";
    }
    else if (criteria === BitCriteria.Co2) {
        wantedValue = "0";
        if (zerosCounter > onesCounter) wantedValue = "1";
    }
    let finalArray: string[] = new Array();
    for (let puzzle of initArray) {
        let bitNums = Array.from(puzzle);
        if(bitNums[bitNo] === wantedValue) finalArray.push(puzzle);
    }
    return finalArray;
}
