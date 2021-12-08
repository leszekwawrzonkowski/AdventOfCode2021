function solvePuzzle(puzzleText, puzzleNumber) {
    switch (puzzleNumber) {
        case "D1P1":
            {
                var puzzleArray = puzzleInputToNumberArray(puzzleText);
                var numberOfIncreases = 0;
                for (var i = 1; i < puzzleArray.length; i++) {
                    if (puzzleArray[i] > puzzleArray[i - 1])
                        numberOfIncreases++;
                }
                return String(numberOfIncreases);
            }
        case "D1P2":
            {
                var puzzleArray = puzzleInputToNumberArray(puzzleText);
                var numberOfIncreases = 0;
                for (var i = 3; i < puzzleArray.length; i++) {
                    if ((puzzleArray[i - 2] + puzzleArray[i - 1] + puzzleArray[i]) > ((puzzleArray[i - 3] + puzzleArray[i - 2] + puzzleArray[i - 1])))
                        numberOfIncreases++;
                }
                return String(numberOfIncreases);
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
