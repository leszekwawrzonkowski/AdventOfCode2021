import test from 'ava';
import { solveD3P1, solveD3P2 } from "./day3";

let testPuzzleText = 
    "00100\n" + 
    "11110\n" + 
    "10110\n" + 
    "10111\n" + 
    "10101\n" + 
    "01111\n" + 
    "00111\n" + 
    "11100\n" + 
    "10000\n" + 
    "11001\n" + 
    "00010\n" + 
    "01010\n";

test('D3P1', t => {
    t.is(solveD3P1(testPuzzleText), "198");
});

test('D3P2', t => {
    t.is(solveD3P2(testPuzzleText), "230");
});