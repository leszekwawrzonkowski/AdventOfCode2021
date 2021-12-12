import { solveD1P1, solveD1P2 } from "./day1";
import { solveD2P1, solveD2P2 } from "./day2";
import { solveD3P1, solveD3P2 } from "./day3";
import { solveD4P1, solveD4P2 } from "./day4";
function solvePuzzle(puzzleText, puzzleNumber) {
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
    }
    return "not yet solved !!!";
}
const buttons = document.getElementsByClassName("aoc-btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        document.getElementById("textarea-task-output").value = solvePuzzle(document.getElementById("textarea-task-input").value, buttons[i].getAttribute("id"));
    });
}
