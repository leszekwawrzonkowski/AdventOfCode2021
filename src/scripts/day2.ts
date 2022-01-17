import { puzzleInputToStringArray } from "./common";

/**
 * Calculate the horizontal position and depth you would have after following the planned course.
 * What do you get if you multiply your final horizontal position by your final depth?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD2P1(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const submarinePosition = new SubmarinePosition();
    for (let puzzleLine of puzzleArray) {
        let puzzleLineElements = puzzleLine.split(" ");
        submarinePosition.changePosition(puzzleLineElements[0], Number(puzzleLineElements[1]));
    }
    return String(submarinePosition.depth * submarinePosition.horizontal);
}

/**
 * Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course.
 * What do you get if you multiply your final horizontal position by your final depth?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD2P2(puzzleText: string): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const submarinePosition = new SubmarinePositionExt();
    for (let puzzleLine of puzzleArray) {
        let puzzleLineElements = puzzleLine.split(" ");
        submarinePosition.changePosition(puzzleLineElements[0], Number(puzzleLineElements[1]));
    }
    return String(submarinePosition.depth * submarinePosition.horizontal);
}

/**
 * It represents a submarine position, for part one puzzle, and can change it.
 */
class SubmarinePosition {
    horizontal: number;
    depth: number;

    constructor() {
        this.horizontal = 0;
        this.depth = 0;
    }

    changePosition(command: string, unit: number) {
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

/**
 * It represents a submarine position, for part two puzzle, and can change it.
 */
class SubmarinePositionExt extends SubmarinePosition {
    aim: number;

    constructor() {
        super();
        this.aim = 0;
    }

    changePosition(command: string, unit: number) {
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
