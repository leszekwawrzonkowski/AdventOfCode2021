// Determine the horizontal position that the crabs can align to using the least fuel possible.
// How much fuel must they spend to align to that position?
export function solveD7P1(puzzleText) {
    // calculate median is the good way to find the best position 
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
    // console.log("bestPosition:"+bestPosition);
    let movesSum = 0;
    for (let position of crabsPositionsSorted) {
        movesSum += Math.abs(position - bestPosition);
    }
    return String(movesSum);
}
