import test from 'ava';
import { solveD2P1, solveD2P2 } from "./day2";

const testPuzzleText = 
    "forward 5\n" +
    "down 5\n" +
    "forward 8\n" +
    "up 3\n" +
    "down 8\n" +
    "forward 2\n";

test('D1P1', t => {
    t.is(solveD2P1(testPuzzleText), "150");
});

test('D1P2', t => {
    t.is(solveD2P2(testPuzzleText), "900");
});
