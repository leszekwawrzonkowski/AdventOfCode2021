import test from 'ava';
import { solveD1P1, solveD1P2 } from "./day1";

const testPuzzleText = 
    "199\n" +
    "200\n" +
    "208\n" +
    "210\n" +
    "200\n" +
    "207\n" +
    "240\n" +
    "269\n" +
    "260\n" +
    "263\n";

test('D1P1', t => {
    t.is(solveD1P1(testPuzzleText), "7");
});

test('D1P2', t => {
    t.is(solveD1P2(testPuzzleText), "5");
});
