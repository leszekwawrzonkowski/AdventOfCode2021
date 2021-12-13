import { puzzleInputToStringArray } from "./common";
// Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
export function solveD5P1(puzzleText) {
    return solve(puzzleText, false);
}
// Consider horizontal, vertical and diagonal lines. At how many points do at least two lines overlap?
export function solveD5P2(puzzleText) {
    return solve(puzzleText, true);
}
function solve(puzzleText, diagonalLines) {
    var _a;
    const puzzleArray = puzzleInputToStringArray(puzzleText);
    const ventPointsMap = new Map();
    for (let puzzle of puzzleArray) {
        let ventPointsCoordinates = puzzle.trim().split(" -> ");
        let pointOneCoordinates = ventPointsCoordinates[0].split(",");
        let pointTwoCoordinates = ventPointsCoordinates[1].split(",");
        let x1 = Number(pointOneCoordinates[0]);
        let y1 = Number(pointOneCoordinates[1]);
        let x2 = Number(pointTwoCoordinates[0]);
        let y2 = Number(pointTwoCoordinates[1]);
        let ventPointsLine = generateLineOfVentPoints(x1, y1, x2, y2, diagonalLines);
        for (let ventPoint of ventPointsLine) {
            if (ventPointsMap.has(ventPoint.id))
                (_a = ventPointsMap.get(ventPoint.id)) === null || _a === void 0 ? void 0 : _a.addVent();
            else
                ventPointsMap.set(ventPoint.id, ventPoint);
        }
    }
    let sumProperVentPoints = 0;
    for (let ventPoint of ventPointsMap.values()) {
        if (ventPoint.ventCount > 1)
            sumProperVentPoints++;
    }
    return String(sumProperVentPoints);
}
function generateLineOfVentPoints(x1, y1, x2, y2, diagonalLines) {
    let ventPoints = new Array();
    if (x1 === x2) {
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++)
            ventPoints.push(new VentPoint(x1, i));
    }
    else if (y1 === y2) {
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++)
            ventPoints.push(new VentPoint(i, y1));
    }
    else if (diagonalLines && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const len = Math.abs(x1 - x2);
        const minX = Math.min(x1, x2);
        if ((x1 < x2 && y1 < y2) || (x2 < x1 && y2 < y1)) {
            const minY = Math.min(y1, y2);
            for (let i = 0; i <= len; i++)
                ventPoints.push(new VentPoint(minX + i, minY + i));
        }
        else {
            const maxY = Math.max(y1, y2);
            for (let i = 0; i <= len; i++)
                ventPoints.push(new VentPoint(minX + i, maxY - i));
        }
    }
    return ventPoints;
}
class VentPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `${this.x}-${this.y}`;
        this.ventCount = 1;
    }
    addVent() {
        this.ventCount++;
    }
}
