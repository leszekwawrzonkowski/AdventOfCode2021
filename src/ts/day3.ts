/// <reference path="common.ts" />
namespace AoC2021 {
    // Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together.
    export function solveD3P1(puzzleText: string): string {
        let puzzleArray = puzzleInputToStringArray(puzzleText);
        let onesCounters: number[] = Array<number>(puzzleArray[0].length).fill(0);
        let zerosCounters: number[] = Array<number>(puzzleArray[0].length).fill(0);
        puzzleArray.forEach(puzzle => {
            let bitNums = Array.from(puzzle);
            for (let i = 0; i < bitNums.length; i++) {
                if(bitNums[i] === "1") onesCounters[i]++;
                else zerosCounters[i]++;
            }
        });
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

    // Verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.
    export function solveD3P2(puzzleText: string): string {
        enum BitCriteria {
            Oxygen,
            Co2,
        }

        function discardArrayElemets(initArray: string[], bitNo: number, criteria: BitCriteria): string[] {
            let wantedValue: "0" | "1";
            let onesCounter = 0;
            let zerosCounter = 0;
            initArray.forEach(puzzle => {
                let bitNums = Array.from(puzzle);
                if(bitNums[bitNo] === "1") onesCounter++;
                else zerosCounter++;
            });
            if (criteria === BitCriteria.Oxygen) {
                wantedValue = "1";
                if (zerosCounter > onesCounter) wantedValue = "0";
            }
            else if (criteria === BitCriteria.Co2) {
                wantedValue = "0";
                if (zerosCounter > onesCounter) wantedValue = "1";
            }
            let finalArray: string[] = new Array();
            initArray.forEach(puzzle => {
                let bitNums = Array.from(puzzle);
                if(bitNums[bitNo] === wantedValue) finalArray.push(puzzle);
            });
            return finalArray;
        }

        let puzzleArray = puzzleInputToStringArray(puzzleText);

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
}