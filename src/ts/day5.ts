import { puzzleInputToStringArray } from "./common";

/**
 * Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD5P1(puzzleText: string): string {
    return solve(puzzleText, false);
}

/**
 * Consider horizontal, vertical and diagonal lines. At how many points do at least two lines overlap?
 * 
 * @param puzzleText A puzzle text
 * @returns The solution
 */
export function solveD5P2(puzzleText: string): string {
    return solve(puzzleText, true);
}

/**
 * It solves a puzzle for both parts. Diagonal lines are taking into account optionally.
 * @param puzzleText A puzzle text
 * @param diagonalLines Take into account diagonal lines
 * @returns The solution
 */
function solve(puzzleText: string, diagonalLines: boolean): string {
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const ventPointsMap = new Map<string,VentPoint>();

    for (let puzzle of puzzleArray) {
        let ventPointsCoordinates = puzzle.trim().split(" -> ");
        let pointOneCoordinates = ventPointsCoordinates[0].split(",");
        let pointTwoCoordinates = ventPointsCoordinates[1].split(",");
        let x1: number = Number(pointOneCoordinates[0]);
        let y1: number = Number(pointOneCoordinates[1]);
        let x2: number = Number(pointTwoCoordinates[0]);
        let y2: number = Number(pointTwoCoordinates[1]);

        let ventPointsLine: VentPoint[] = generateLineOfVentPoints(x1, y1, x2, y2, diagonalLines);
        for (let ventPoint of ventPointsLine) {
            if (ventPointsMap.has(ventPoint.id)) ventPointsMap.get(ventPoint.id)?.addVent();
            else ventPointsMap.set(ventPoint.id, ventPoint);
        }
    }

    let sumProperVentPoints = 0;
    for (let ventPoint of ventPointsMap.values()) {
        if (ventPoint.ventCount > 1) sumProperVentPoints++;
    }

    return String(sumProperVentPoints);
}

/**
 * It generates a set of points for given two end points.
 * It works for horizontal, vertical and diagonal lines. For others it returns the empty set.
 * 
 * @param x1 A x coordinate of the first end point
 * @param y1 A y coordinate of the first end point
 * @param x2 A x coordinate of the second end point
 * @param y2 A y coordinate of the second end point
 * @param diagonalLines Take into account diagonal lines
 * @returns The set of points
 */
function generateLineOfVentPoints(x1: number, y1: number, x2: number, y2: number, diagonalLines: boolean): VentPoint[] {
    let ventPoints = new Array<VentPoint>();
    if (x1 === x2) {
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) ventPoints.push(new VentPoint(x1, i));
    }
    else if (y1 === y2) {
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) ventPoints.push(new VentPoint(i, y1));
    }
    else if (diagonalLines && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const len = Math.abs(x1 - x2);
        const minX = Math.min(x1, x2);
        if ((x1 < x2 && y1 < y2) || (x2 < x1 && y2 < y1)) {
            const minY = Math.min(y1, y2);
            for (let i = 0; i <= len; i++) ventPoints.push(new VentPoint(minX + i, minY + i));
        }
        else {
            const maxY = Math.max(y1,y2);
            for (let i = 0; i <= len; i++) ventPoints.push(new VentPoint(minX + i, maxY - i));
        }
    }

    return ventPoints;
}

/**
 * It represents a vent point.
 */
class VentPoint {
    x: number;
    y: number;
    id: string;
    ventCount: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = `${this.x}-${this.y}`;
        this.ventCount = 1
    }

    addVent() {
        this.ventCount++;
    }
}
