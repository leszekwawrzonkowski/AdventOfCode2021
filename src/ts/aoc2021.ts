/// <reference path="day1.ts" />
/// <reference path="day2.ts" />
/// <reference path="day3.ts" />

type PuzzleNumber = "D1P1" | "D1P2" | "D2P1" | "D2P2" | "D3P1" | "D3P2";
function solvePuzzle(puzzleText: string, puzzleNumber: PuzzleNumber): string {
    switch (puzzleNumber) {
        case "D1P1":
            return AoC2021.solveD1P1(puzzleText);
        case "D1P2":
            return AoC2021.solveD1P2(puzzleText);
        case "D2P1":
            return AoC2021.solveD2P1(puzzleText);
        case "D2P2":
            return AoC2021.solveD2P2(puzzleText);
        case "D3P1":
            return AoC2021.solveD3P1(puzzleText);
        case "D3P2":
            return AoC2021.solveD3P2(puzzleText);
    }

    return "not yet solved !!!";
}