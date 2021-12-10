namespace AoC2021 {
    export function puzzleInputToStringArray(puzzleInput: string): string[] {
        return puzzleInput.trim().split(/\r?\n/);
    }
    
    export function puzzleInputToNumberArray(puzzleInput: string): number[] {
        return puzzleInputToStringArray(puzzleInput).map(Number);
    }
    
    /*
    export enum PuzzleOutputArrayType {
        String,
        Number,
    }
    export function puzzleInputToArray(puzzleInput:string, puzzleOutputArrayType: PuzzleOutputArrayType): string[] | number[] {
        let puzzleElements = puzzleInput.trim().split(/\r?\n/);
        if (puzzleOutputArrayType === PuzzleOutputArrayType.String) {
            return puzzleElements.map(Number);
        }
        puzzleElements;
    }
    */
}