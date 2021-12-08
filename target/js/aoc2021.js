"use strict";
function solvePuzzle(puzzleText, puzzleNumber) {
    switch (puzzleNumber) {
        case "D1P1":
            // How many measurements are larger than the previous measurement?
            {
                let puzzleArray = puzzleInputToNumberArray(puzzleText);
                let numberOfIncreases = 0;
                for (let i = 1; i < puzzleArray.length; i++) {
                    if (puzzleArray[i] > puzzleArray[i - 1])
                        numberOfIncreases++;
                }
                return String(numberOfIncreases);
            }
        case "D1P2":
            // Count the number of times the sum of measurements in this sliding three-measurement window increases from the previous sum
            {
                let puzzleArray = puzzleInputToNumberArray(puzzleText);
                let numberOfIncreases = 0;
                // TODO: think about more elegant implementation of the "sliding window" check
                for (let i = 3; i < puzzleArray.length; i++) {
                    if ((puzzleArray[i - 2] + puzzleArray[i - 1] + puzzleArray[i]) > ((puzzleArray[i - 3] + puzzleArray[i - 2] + puzzleArray[i - 1])))
                        numberOfIncreases++;
                }
                return String(numberOfIncreases);
            }
        case "D2P1":
            // Calculate the horizontal position and depth you would have after following the planned course. 
            // What do you get if you multiply your final horizontal position by your final depth?
            {
                class SubmarinePosition {
                    constructor() {
                        this.horizontal = 0;
                        this.depth = 0;
                    }
                    changePosition(commandAndUnit) {
                        let commandAndUnitElements = commandAndUnit.split(" ");
                        const command = commandAndUnitElements[0];
                        let unit = Number(commandAndUnitElements[1]);
                        switch (command) {
                            case "forward":
                                this.horizontal += unit;
                                break;
                            case "down":
                                this.depth += unit;
                                break;
                            case "up":
                                this.depth -= unit;
                                break;
                        }
                    }
                }
                let puzzleArray = puzzleInputToStringArray(puzzleText);
                let submarinePosition = new SubmarinePosition();
                puzzleArray.forEach(puzzle => {
                    submarinePosition.changePosition(puzzle);
                });
                return String(submarinePosition.depth * submarinePosition.horizontal);
            }
        case "D2P2":
            // Calculate the horizontal position and depth you would have after following the planned course. 
            // What do you get if you multiply your final horizontal position by your final depth?
            {
                class SubmarinePosition {
                    constructor() {
                        this.horizontal = 0;
                        this.depth = 0;
                        this.aim = 0;
                    }
                    changePosition(commandAndUnit) {
                        let commandAndUnitElements = commandAndUnit.split(" ");
                        const command = commandAndUnitElements[0];
                        let unit = Number(commandAndUnitElements[1]);
                        switch (command) {
                            case "forward":
                                this.horizontal += unit;
                                this.depth += (this.aim * unit);
                                break;
                            case "down":
                                this.aim += unit;
                                break;
                            case "up":
                                this.aim -= unit;
                                break;
                        }
                    }
                }
                let puzzleArray = puzzleInputToStringArray(puzzleText);
                let submarinePosition = new SubmarinePosition();
                puzzleArray.forEach(puzzle => {
                    submarinePosition.changePosition(puzzle);
                });
                return String(submarinePosition.depth * submarinePosition.horizontal);
            }
        case "D3P1":
            // Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together.
            {
                let puzzleArray = puzzleInputToStringArray(puzzleText);
                let onesCounters = Array(puzzleArray[0].length).fill(0);
                let zerosCounters = Array(puzzleArray[0].length).fill(0);
                puzzleArray.forEach(puzzle => {
                    let bitNums = Array.from(puzzle);
                    for (let i = 0; i < bitNums.length; i++) {
                        if (bitNums[i] === "1")
                            onesCounters[i]++;
                        else
                            zerosCounters[i]++;
                    }
                });
                let gammaRate = "";
                let epsilonRate = "";
                for (let i = 0; i < onesCounters.length; i++) {
                    if (onesCounters[i] > zerosCounters[i]) {
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
    }
    return "not yet solved !!!";
}
function puzzleInputToStringArray(puzzleInput) {
    return puzzleInput.trim().split(/\r?\n/);
}
function puzzleInputToNumberArray(puzzleInput) {
    return puzzleInputToStringArray(puzzleInput).map(Number);
}
/*
enum PuzzleOutputArrayType {
    String,
    Number,
}
function puzzleInputToArray(puzzleInput:string, puzzleOutputArrayType: PuzzleOutputArrayType): string[] | number[] {
    let puzzleElements = puzzleInput.trim().split(/\r?\n/);
    if (puzzleOutputArrayType === PuzzleOutputArrayType.String) {
        return puzzleElements.map(Number);
    }
    puzzleElements;
}
*/ 
