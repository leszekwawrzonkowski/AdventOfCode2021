/**
 * Find a way to simulate lanternfish. How many lanternfish would there be after 80 days?
 *
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD6P1(puzzleText) {
    return solve(puzzleText, 80);
}
/**
 * Find a way to simulate lanternfish. How many lanternfish would there be after 256 days?
 *
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD6P2(puzzleText) {
    return solve(puzzleText, 256);
}
/**
 * It solves a puzzle for both parts. Depends of a days number.
 * It counts number of lanternfish for each day and sum it at the end of time period.
 *
 * @param puzzleText A puzzle text
 * @param numberOfDays How many days lanternfish school grows
 * @returns Sum of all lanternfish
 */
function solve(puzzleText, numberOfDays) {
    let daysCounters = new Array(9).fill(0);
    for (let puzzleElement of puzzleText.trim().split(",")) {
        daysCounters[Number(puzzleElement)]++;
    }
    let numberOfDaysLeft = numberOfDays;
    while (numberOfDaysLeft > 0) {
        let newBorns = daysCounters[0];
        for (let i = 1; i < daysCounters.length; i++) {
            if (i === 7) {
                daysCounters[i - 1] = daysCounters[i] + newBorns; // newBorns same as "fresh parents" (original daysCounters[0])
            }
            else
                daysCounters[i - 1] = daysCounters[i];
        }
        daysCounters[daysCounters.length - 1] = newBorns;
        numberOfDaysLeft--;
    }
    return String(daysCounters.reduce((a, b) => a + b, 0)); // sum of all daysCounters elements
}
