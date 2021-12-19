import { puzzleInputToStringArray } from "./common";
/**
 * To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?
 *
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD4P1(puzzleText) {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const numbersOrder = puzzleArray[0].split(",");
    const boards = initBoards(puzzleArray);
    for (let num of numbersOrder) {
        let boardNumber = Number(num);
        for (let board of boards) {
            board.markNumber(boardNumber);
            if (board.wins())
                return String(board.calculateScore(boardNumber));
        }
    }
    return "no bingo found :(";
}
/**
 * On the other hand, it might be wise to try a different strategy: let the giant squid win. Figure out which board will win last.
 *
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD4P2(puzzleText) {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const numbersOrder = puzzleArray[0].split(",");
    const boards = initBoards(puzzleArray);
    const boardsMarks = new Array(boards.length).fill(false);
    for (let num of numbersOrder) {
        let boardNumber = Number(num);
        for (let i = 0; i < boards.length; i++) {
            boards[i].markNumber(boardNumber);
            if (boards[i].wins())
                boardsMarks[i] = true;
            let allBoardsWins = true;
            for (let mark of boardsMarks) {
                if (mark === false) {
                    allBoardsWins = false;
                    break;
                }
            }
            if (allBoardsWins)
                return String(boards[i].calculateScore(boardNumber));
        }
    }
    return "no all boards bingo found :(";
}
/**
 * It initialize a set bingo boards based on puzzle input.
 *
 * @param puzzleArray A puzzle input
 * @returns The set of bingo boards.
 */
function initBoards(puzzleArray) {
    const boards = new Array();
    let boardNumbersArray = new Array();
    for (let i = 2; i < puzzleArray.length; i++) {
        if (puzzleArray[i].length > 0) {
            boardNumbersArray.push(puzzleArray[i]);
        }
        else {
            boards.push(new BingoBoard(boardNumbersArray));
            boardNumbersArray = new Array();
        }
    }
    boards.push(new BingoBoard(boardNumbersArray));
    return boards;
}
/**
 * It represents a single bingo board. It can mark a given number, check wining and calculate the score.
 */
class BingoBoard {
    constructor(boardNumbersArray) {
        this.size = 5;
        this.numbers = new Array(this.size);
        this.marks = new Array(this.size);
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i] = new Array(this.size);
            this.marks[i] = new Array(this.size);
        }
        for (let i = 0; i < this.numbers.length; i++) {
            let boardNumbersRow = boardNumbersArray[i].trim().split(/\s+/);
            for (let j = 0; j < this.numbers.length; j++) {
                this.numbers[i][j] = Number(boardNumbersRow[j]);
                this.marks[i][j] = false;
            }
        }
    }
    /**
     * It marks given number on the board.
     *
     * @param boardNumber A number to mark.
     */
    markNumber(boardNumber) {
        for (let i = 0; i < this.numbers.length; i++) {
            for (let j = 0; j < this.numbers.length; j++) {
                if (this.numbers[i][j] === boardNumber)
                    this.marks[i][j] = true;
            }
        }
    }
    /**
     * Checks is it wins.
     */
    wins() {
        let result = false;
        for (let i = 0; i < this.numbers.length; i++) {
            let rowResult = true;
            let colResult = true;
            for (let j = 0; j < this.numbers.length; j++) {
                if (this.marks[i][j] === false)
                    rowResult = false;
                if (this.marks[j][i] === false)
                    colResult = false;
            }
            if (rowResult === true || colResult === true) {
                result = true;
                break;
            }
        }
        return result;
    }
    /**
     * It calculates the score of this board based on the part two puzzle rules.
     * @param boardNumber The last number which were marked
     * @returns The score
     */
    calculateScore(boardNumber) {
        let boardSum = 0;
        for (let i = 0; i < this.numbers.length; i++) {
            for (let j = 0; j < this.numbers.length; j++) {
                if (this.marks[i][j] === false)
                    boardSum += this.numbers[i][j];
            }
        }
        return boardSum * boardNumber;
    }
}
