import test from 'ava';
import { solveD6P1, solveD6P2 } from "./day6";

const testPuzzleText = "3,4,3,1,2\n";

test('D6P1', t => {
    t.is(solveD6P1(testPuzzleText), "5934");
});

test('D6P2', t => {
    t.is(solveD6P2(testPuzzleText), "26984457539");
});
