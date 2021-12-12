import { puzzleInputToStringArray } from "./common";
// Calculate the horizontal position and depth you would have after following the planned course. 
// What do you get if you multiply your final horizontal position by your final depth?
export function solveD2P1(puzzleText) {
    let puzzleArray = puzzleInputToStringArray(puzzleText);
    let submarinePosition = new SubmarinePosition();
    puzzleArray.forEach(puzzleLine => {
        let puzzleLineElements = puzzleLine.split(" ");
        submarinePosition.changePosition(puzzleLineElements[0], Number(puzzleLineElements[1]));
    });
    return String(submarinePosition.depth * submarinePosition.horizontal);
}
// Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course.
// What do you get if you multiply your final horizontal position by your final depth?
export function solveD2P2(puzzleText) {
    let puzzleArray = puzzleInputToStringArray(puzzleText);
    let submarinePosition = new SubmarinePositionExt();
    puzzleArray.forEach(puzzleLine => {
        let puzzleLineElements = puzzleLine.split(" ");
        submarinePosition.changePosition(puzzleLineElements[0], Number(puzzleLineElements[1]));
    });
    return String(submarinePosition.depth * submarinePosition.horizontal);
}
class SubmarinePosition {
    constructor() {
        this.horizontal = 0;
        this.depth = 0;
    }
    changePosition(command, unit) {
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
class SubmarinePositionExt extends SubmarinePosition {
    constructor() {
        super();
        this.aim = 0;
    }
    changePosition(command, unit) {
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
