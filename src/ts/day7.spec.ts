import test from 'ava';
import { solveD7P1, solveD7P2 } from "./day7";

const testPuzzleText = "16,1,2,0,4,2,7,1,2,14\n";

test('D7P1', t => {
    t.is(solveD7P1(testPuzzleText), "37");
});

test('D7P2', t => {
    t.is(solveD7P2(testPuzzleText), "168");
});