import { puzzleInputToNumberArray } from "./common";

/**
 * How many measurements are larger than the previous measurement?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD1P1(puzzleText: string): string {
    const puzzleArray = puzzleInputToNumberArray(puzzleText);
    let numberOfIncreases = 0;
    for (let i = 1; i < puzzleArray.length; i++) {
        if (puzzleArray[i] > puzzleArray[i-1]) numberOfIncreases++;
    }
    return String(numberOfIncreases);
}

/**
 * Count the number of times the sum of measurements in this sliding three-measurement window increases from the previous sum.
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD1P2(puzzleText: string): string {
    const puzzleArray = puzzleInputToNumberArray(puzzleText);
    let numberOfIncreases = 0;
    // TODO: think about more elegant implementation of the "sliding window" check
    for (let i = 3; i < puzzleArray.length; i++) {
        if ((puzzleArray[i-2] + puzzleArray[i-1] + puzzleArray[i]) > ((puzzleArray[i-3] + puzzleArray[i-2] + puzzleArray[i-1]))) numberOfIncreases++;
    }
    return String(numberOfIncreases);
}
