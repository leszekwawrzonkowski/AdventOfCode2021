import { solveD1P1, solveD1P2 } from "./day1";
import { solveD2P1, solveD2P2 } from "./day2";
import { solveD3P1, solveD3P2 } from "./day3";
import { solveD4P1, solveD4P2 } from "./day4";
import { solveD5P1, solveD5P2 } from "./day5";
import { solveD6P1, solveD6P2 } from "./day6";
import { solveD7P1, solveD7P2 } from "./day7";
import { solveD8P1, solveD8P2 } from "./day8";

/**
 * It triggers solving logic for each puzzle.
 * 
 * @param puzzleText A puzzle input
 * @param puzzleNumber A puzzle identifier
 * @returns The puzzle solution
 */
function solvePuzzle(puzzleText: string, puzzleNumber: string | null): string {
    switch (puzzleNumber) {
        case "puzzle-D1P1":
            return solveD1P1(puzzleText);
        case "puzzle-D1P2":
            return solveD1P2(puzzleText);
        case "puzzle-D2P1":
            return solveD2P1(puzzleText);
        case "puzzle-D2P2":
            return solveD2P2(puzzleText);
        case "puzzle-D3P1":
            return solveD3P1(puzzleText);
        case "puzzle-D3P2":
            return solveD3P2(puzzleText);
        case "puzzle-D4P1":
            return solveD4P1(puzzleText);
        case "puzzle-D4P2":
            return solveD4P2(puzzleText);
        case "puzzle-D5P1":
            return solveD5P1(puzzleText);
        case "puzzle-D5P2":
            return solveD5P2(puzzleText);
        case "puzzle-D6P1":
            return solveD6P1(puzzleText);
        case "puzzle-D6P2":
            return solveD6P2(puzzleText);
        case "puzzle-D7P1":
            return solveD7P1(puzzleText);
        case "puzzle-D7P2":
            return solveD7P2(puzzleText);
        case "puzzle-D8P1":
            return solveD8P1(puzzleText);
        case "puzzle-D8P2":
            return solveD8P2(puzzleText);
    }

    return "not yet solved !!!";
}

/**
 * It generates a page content to solve puzzles by pressing buttons. It generates buttons for a given days number.
 * 
 * @param dayNumbers A number of days
 */
function addDaysButtonsToTaskLogicDiv(dayNumbers: number) {
    const taskLogicDiv = document.getElementById("task-logic-div");
    for (let dayNumber = 1; dayNumber <= dayNumbers; dayNumber++) {
        const divRow = document.createElement('div');
        divRow.classList.add("row", "py-2");
        for (let partNumber = 1; partNumber < 3; partNumber++) {
            const divPart = document.createElement('div');
            divPart.classList.add("d-grid", "gap-2", "col-6", "mx-auto");
            const button = document.createElement('button');
            button.type = "button"
            button.classList.add("btn", "btn-primary");
            button.id = `puzzle-D${dayNumber}P${partNumber}`;
            button.innerHTML = `Day ${dayNumber} Part ${partNumber}`;
            button.addEventListener('click', function () {
                (<HTMLInputElement>document.getElementById("textarea-task-output")).value = solvePuzzle((<HTMLInputElement>document.getElementById("textarea-task-input")).value, button.getAttribute("id"));
            });
            divPart.appendChild(button);
            divRow.appendChild(divPart);
        }
        taskLogicDiv?.appendChild(divRow);
    }
}

// Let's trigger buttons generation for implemented days
addDaysButtonsToTaskLogicDiv(8);
