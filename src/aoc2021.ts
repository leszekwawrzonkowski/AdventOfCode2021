type PuzzleNumber = "D1P1" | "D1P2" | "D2P1" | "D2P2";

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
        case "D2P1":
            // Calculate the horizontal position and depth you would have after following the planned course. 
            // What do you get if you multiply your final horizontal position by your final depth?
            {
                class SubmarinePosition {
                    horizontal: number;
                    depth: number;

                    constructor() {
                        this.horizontal = 0;
                        this.depth = 0;
                    }

                    changePosition(commandAndUnit: string) {
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
                        horizontal: number;
                        depth: number;
                        aim: number;
    
                        constructor() {
                            this.horizontal = 0;
                            this.depth = 0;
                            this.aim = 0;
                        }
    
                        changePosition(commandAndUnit: string) {
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