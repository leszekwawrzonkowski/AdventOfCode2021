"use strict";
var AoC2021;
(function (AoC2021) {
    function puzzleInputToStringArray(puzzleInput) {
        return puzzleInput.trim().split(/\r?\n/);
    }
    AoC2021.puzzleInputToStringArray = puzzleInputToStringArray;
    function puzzleInputToNumberArray(puzzleInput) {
        return puzzleInputToStringArray(puzzleInput).map(Number);
    }
    AoC2021.puzzleInputToNumberArray = puzzleInputToNumberArray;
    /*
    export enum PuzzleOutputArrayType {
        String,
        Number,
    }
    export function puzzleInputToArray(puzzleInput:string, puzzleOutputArrayType: PuzzleOutputArrayType): string[] | number[] {
        let puzzleElements = puzzleInput.trim().split(/\r?\n/);
        if (puzzleOutputArrayType === PuzzleOutputArrayType.String) {
            return puzzleElements.map(Number);
        }
        puzzleElements;
    }
    */
})(AoC2021 || (AoC2021 = {}));
/// <reference path="common.ts" />
var AoC2021;
(function (AoC2021) {
    // How many measurements are larger than the previous measurement?
    function solveD1P1(puzzleText) {
        let puzzleArray = AoC2021.puzzleInputToNumberArray(puzzleText);
        let numberOfIncreases = 0;
        for (let i = 1; i < puzzleArray.length; i++) {
            if (puzzleArray[i] > puzzleArray[i - 1])
                numberOfIncreases++;
        }
        return String(numberOfIncreases);
    }
    AoC2021.solveD1P1 = solveD1P1;
    // Count the number of times the sum of measurements in this sliding three-measurement window increases from the previous sum
    function solveD1P2(puzzleText) {
        let puzzleArray = AoC2021.puzzleInputToNumberArray(puzzleText);
        let numberOfIncreases = 0;
        // TODO: think about more elegant implementation of the "sliding window" check
        for (let i = 3; i < puzzleArray.length; i++) {
            if ((puzzleArray[i - 2] + puzzleArray[i - 1] + puzzleArray[i]) > ((puzzleArray[i - 3] + puzzleArray[i - 2] + puzzleArray[i - 1])))
                numberOfIncreases++;
        }
        return String(numberOfIncreases);
    }
    AoC2021.solveD1P2 = solveD1P2;
})(AoC2021 || (AoC2021 = {}));
/// <reference path="common.ts" />
var AoC2021;
(function (AoC2021) {
    // Calculate the horizontal position and depth you would have after following the planned course. 
    // What do you get if you multiply your final horizontal position by your final depth?
    function solveD2P1(puzzleText) {
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
        let puzzleArray = AoC2021.puzzleInputToStringArray(puzzleText);
        let submarinePosition = new SubmarinePosition();
        puzzleArray.forEach(puzzle => {
            submarinePosition.changePosition(puzzle);
        });
        return String(submarinePosition.depth * submarinePosition.horizontal);
    }
    AoC2021.solveD2P1 = solveD2P1;
    // Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course.
    // What do you get if you multiply your final horizontal position by your final depth?
    function solveD2P2(puzzleText) {
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
        let puzzleArray = AoC2021.puzzleInputToStringArray(puzzleText);
        let submarinePosition = new SubmarinePosition();
        puzzleArray.forEach(puzzle => {
            submarinePosition.changePosition(puzzle);
        });
        return String(submarinePosition.depth * submarinePosition.horizontal);
    }
    AoC2021.solveD2P2 = solveD2P2;
})(AoC2021 || (AoC2021 = {}));
/// <reference path="common.ts" />
var AoC2021;
(function (AoC2021) {
    // Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together.
    function solveD3P1(puzzleText) {
        let puzzleArray = AoC2021.puzzleInputToStringArray(puzzleText);
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
    AoC2021.solveD3P1 = solveD3P1;
    // Verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.
    function solveD3P2(puzzleText) {
        let BitCriteria;
        (function (BitCriteria) {
            BitCriteria[BitCriteria["Oxygen"] = 0] = "Oxygen";
            BitCriteria[BitCriteria["Co2"] = 1] = "Co2";
        })(BitCriteria || (BitCriteria = {}));
        function discardArrayElemets(initArray, bitNo, criteria) {
            let wantedValue;
            let onesCounter = 0;
            let zerosCounter = 0;
            initArray.forEach(puzzle => {
                let bitNums = Array.from(puzzle);
                if (bitNums[bitNo] === "1")
                    onesCounter++;
                else
                    zerosCounter++;
            });
            if (criteria === BitCriteria.Oxygen) {
                wantedValue = "1";
                if (zerosCounter > onesCounter)
                    wantedValue = "0";
            }
            else if (criteria === BitCriteria.Co2) {
                wantedValue = "0";
                if (zerosCounter > onesCounter)
                    wantedValue = "1";
            }
            let finalArray = new Array();
            initArray.forEach(puzzle => {
                let bitNums = Array.from(puzzle);
                if (bitNums[bitNo] === wantedValue)
                    finalArray.push(puzzle);
            });
            return finalArray;
        }
        let puzzleArray = AoC2021.puzzleInputToStringArray(puzzleText);
        let bitIterator = 0;
        let inputArray = puzzleArray;
        while (inputArray.length > 1) {
            inputArray = discardArrayElemets(inputArray, bitIterator, BitCriteria.Oxygen);
            bitIterator++;
        }
        let oxygenGeneratorRating = inputArray[0];
        bitIterator = 0;
        inputArray = puzzleArray;
        while (inputArray.length > 1) {
            inputArray = discardArrayElemets(inputArray, bitIterator, BitCriteria.Co2);
            bitIterator++;
        }
        let co2ScrubberRating = inputArray[0];
        return String(parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2));
    }
    AoC2021.solveD3P2 = solveD3P2;
})(AoC2021 || (AoC2021 = {}));
/// <reference path="day1.ts" />
/// <reference path="day2.ts" />
/// <reference path="day3.ts" />
function solvePuzzle(puzzleText, puzzleNumber) {
    switch (puzzleNumber) {
        case "D1P1":
            return AoC2021.solveD1P1(puzzleText);
        case "D1P2":
            return AoC2021.solveD1P2(puzzleText);
        case "D2P1":
            return AoC2021.solveD2P1(puzzleText);
        case "D2P2":
            return AoC2021.solveD2P2(puzzleText);
        case "D3P1":
            return AoC2021.solveD3P1(puzzleText);
        case "D3P2":
            return AoC2021.solveD3P2(puzzleText);
    }
    return "not yet solved !!!";
}
