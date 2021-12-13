// Find a way to simulate lanternfish. How many lanternfish would there be after 80 days?
export function solveD6P1(puzzleText: string): string {
    return solve(puzzleText, 80);
}

// Find a way to simulate lanternfish. How many lanternfish would there be after 256 days?
export function solveD6P2(puzzleText: string): string {
    return solve(puzzleText, 256);
}

function solve(puzzleText: string, numberOfDays: number): string {
    let daysCounters = new Array<number>(9).fill(0);
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
            else daysCounters[i - 1] = daysCounters[i];
        }
        daysCounters[daysCounters.length - 1] = newBorns;
        numberOfDaysLeft--;
    }

    return String(daysCounters.reduce((a, b) => a + b, 0)); // sum of all daysCounters elements
}