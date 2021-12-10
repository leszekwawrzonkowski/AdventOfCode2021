/// <reference path="day1.ts" />

import test from 'ava';

let testPuzzleText = 
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
    t.is(AoC2021.solveD1P1(testPuzzleText), "7");
});