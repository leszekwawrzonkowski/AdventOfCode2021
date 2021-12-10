/// <reference path="common.ts" />
namespace AoC2021 {
    // Calculate the horizontal position and depth you would have after following the planned course. 
    // What do you get if you multiply your final horizontal position by your final depth?
    export function solveD2P1(puzzleText: string): string {
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

    // Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course.
    // What do you get if you multiply your final horizontal position by your final depth?
    export function solveD2P2(puzzleText: string): string {
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