import { puzzleInputToStringArray } from "./common";
// Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together.
export function solveD3P1(puzzleText) {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const onesCounters = Array(puzzleArray[0].length).fill(0);
    const zerosCounters = Array(puzzleArray[0].length).fill(0);
    for (let puzzle of puzzleArray) {
        let bitNums = Array.from(puzzle);
        for (let i = 0; i < bitNums.length; i++) {
            if (bitNums[i] === "1")
                onesCounters[i]++;
            else
                zerosCounters[i]++;
        }
    }
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
// Verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.
export function solveD3P2(puzzleText) {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
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
var BitCriteria;
(function (BitCriteria) {
    BitCriteria[BitCriteria["Oxygen"] = 0] = "Oxygen";
    BitCriteria[BitCriteria["Co2"] = 1] = "Co2";
})(BitCriteria || (BitCriteria = {}));
function discardArrayElemets(initArray, bitNo, criteria) {
    let wantedValue = "0";
    let onesCounter = 0;
    let zerosCounter = 0;
    for (let puzzle of initArray) {
        let bitNums = Array.from(puzzle);
        if (bitNums[bitNo] === "1")
            onesCounter++;
        else
            zerosCounter++;
    }
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
    for (let puzzle of initArray) {
        let bitNums = Array.from(puzzle);
        if (bitNums[bitNo] === wantedValue)
            finalArray.push(puzzle);
    }
    return finalArray;
}
