function solvePuzzle(puzzleText, puzzleNumber) {
    switch (puzzleNumber) {
        case "D1P1":
            // How many measurements are larger than the previous measurement?
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
            // Count the number of times the sum of measurements in this sliding three-measurement window increases from the previous sum
            {
                var puzzleArray = puzzleInputToNumberArray(puzzleText);
                var numberOfIncreases = 0;
                // TODO: think about more elegant implementation of the "sliding window" check
                for (var i = 3; i < puzzleArray.length; i++) {
                    if ((puzzleArray[i - 2] + puzzleArray[i - 1] + puzzleArray[i]) > ((puzzleArray[i - 3] + puzzleArray[i - 2] + puzzleArray[i - 1])))
                        numberOfIncreases++;
                }
                return String(numberOfIncreases);
            }
        case "D2P1":
            // Calculate the horizontal position and depth you would have after following the planned course. 
            // What do you get if you multiply your final horizontal position by your final depth?
            {
                var SubmarinePosition = /** @class */ (function () {
                    function SubmarinePosition() {
                        this.horizontal = 0;
                        this.depth = 0;
                    }
                    SubmarinePosition.prototype.changePosition = function (commandAndUnit) {
                        var commandAndUnitElements = commandAndUnit.split(" ");
                        var command = commandAndUnitElements[0];
                        var unit = Number(commandAndUnitElements[1]);
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
                    };
                    return SubmarinePosition;
                }());
                var puzzleArray = puzzleInputToStringArray(puzzleText);
                var submarinePosition_1 = new SubmarinePosition();
                puzzleArray.forEach(function (puzzle) {
                    submarinePosition_1.changePosition(puzzle);
                });
                return String(submarinePosition_1.depth * submarinePosition_1.horizontal);
            }
        case "D2P2":
            // Calculate the horizontal position and depth you would have after following the planned course. 
            // What do you get if you multiply your final horizontal position by your final depth?
            {
                var SubmarinePosition = /** @class */ (function () {
                    function SubmarinePosition() {
                        this.horizontal = 0;
                        this.depth = 0;
                        this.aim = 0;
                    }
                    SubmarinePosition.prototype.changePosition = function (commandAndUnit) {
                        var commandAndUnitElements = commandAndUnit.split(" ");
                        var command = commandAndUnitElements[0];
                        var unit = Number(commandAndUnitElements[1]);
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
                    };
                    return SubmarinePosition;
                }());
                var puzzleArray = puzzleInputToStringArray(puzzleText);
                var submarinePosition_2 = new SubmarinePosition();
                puzzleArray.forEach(function (puzzle) {
                    submarinePosition_2.changePosition(puzzle);
                });
                return String(submarinePosition_2.depth * submarinePosition_2.horizontal);
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
