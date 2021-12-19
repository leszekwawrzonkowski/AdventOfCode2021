/**
 * Determine the horizontal position that the crabs can align to using the least fuel possible.
 * When each change of 1 step in horizontal position of a single crab costs 1 fuel.
 * How much fuel must they spend to align to that position?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD7P1(puzzleText: string): string {
    // calculate the median is the good way to find the best position 
    const crabsPositionsSorted = puzzleText.trim().split(",").map(Number).sort((a, b) => a - b); // sorted elements
    let bestPosition = 0;
    if (crabsPositionsSorted.length % 2 === 0) {
        // its even length
        bestPosition = Math.floor((crabsPositionsSorted[crabsPositionsSorted.length / 2 - 1] + crabsPositionsSorted[crabsPositionsSorted.length / 2]) / 2); 
    }
    else {
        // its odd length
        bestPosition = crabsPositionsSorted[Math.floor(crabsPositionsSorted.length / 2) + 1]; 
    }
    let movesSum = 0;
    for (let position of crabsPositionsSorted) {
        movesSum += Math.abs(position - bestPosition);
    }
    return String(movesSum);
}

/**
 * Determine the horizontal position that the crabs can align to using the least fuel possible.
 * When each change of 1 step in horizontal position costs 1 more unit of fuel than the last
 * How much fuel must they spend to align to that position?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD7P2(puzzleText: string): string {
    // calculate the arithmetic mean is the good start point to find the best position and after that check up and down 
    const crabsPositions = puzzleText.trim().split(",").map(Number);
    let bestPosition = Math.round(crabsPositions.reduce((a, b) => a + b, 0) / crabsPositions.length);
    
    let movesSum = 0;
    for (let position of crabsPositions) {
        let len = Math.abs(position - bestPosition);
        for (let i = 1; i <= len; i++) movesSum += i;
    }
    // then try to go down
    movesSum = tuneMovesSum(crabsPositions, movesSum, bestPosition, -1);

    // then try to go up
    movesSum = tuneMovesSum(crabsPositions, movesSum, bestPosition, 1);
    
    return String(movesSum);
}

/**
 * It checks moves sum, starting from the current best position, and going by given step until it is not smaller.
 * 
 * @param crabsPositions A list of crabs positions 
 * @param movesSum A current moves sum
 * @param bestPosition The current best position
 * @param step A step between the current best position and the new one
 * @returns The new moves sum, smaller or the same
 */
function tuneMovesSum(crabsPositions: number[], movesSum: number, bestPosition: number, step: number): number {
    while (true) {
        let tmpMovesSum = 0;
        for (let position of crabsPositions) {
            let len = Math.abs(position - bestPosition + step);
            for (let i = 1; i <= len; i++) tmpMovesSum += i;
        }
        if (tmpMovesSum < movesSum) {
            movesSum = tmpMovesSum;
            bestPosition += step;
        }
        else break;
    }
    return movesSum;
}