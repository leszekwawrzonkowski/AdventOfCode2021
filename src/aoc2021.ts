type PuzzleNumber = "D1P1" | "D1P2" | "D2P2" | "D2P2";

function solvePuzzle(puzzleText: string, puzzleNumber: PuzzleNumber): string {
    switch (puzzleNumber) {
        case "D1P1":
        // How many measurements are larger than the previous measurement?
        {
            let puzzleArray = puzzleInputToNumberArray(puzzleText);
            let numberOfIncreases = 0;
            for (let i = 1; i < puzzleArray.length; i++) {
                if (puzzleArray[i] > puzzleArray[i-1]) numberOfIncreases++;
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
                if ((puzzleArray[i-2] + puzzleArray[i-1] + puzzleArray[i]) > ((puzzleArray[i-3] + puzzleArray[i-2] + puzzleArray[i-1]))) numberOfIncreases++;
            }
            return String(numberOfIncreases);
        }
    }

    return "not yet solved !!!";
}

function puzzleInputToStringArray(puzzleInput: string): string[] {
    return puzzleInput.trim().split(/\r?\n/);
}

function puzzleInputToNumberArray(puzzleInput: string): number[] {
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