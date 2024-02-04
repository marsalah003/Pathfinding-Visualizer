"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grid = void 0;
const GRID_ROW_LENGTH = 23;
const GRID_COL_LENGTH = 66;
const grid = [];
exports.grid = grid;
for (let row = 0; row < GRID_ROW_LENGTH; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COL_LENGTH; col++) {
        currentRow.push({
            pos: { col, row },
            isWall: false,
            isStart: false,
            isEnd: false,
            isAnimate: false,
            isOnPath: false,
            isWeighted: false,
            cost: 0,
            isWallPreviously: false,
            isBomb: false,
            isVisitedPreviously: false,
            isAnimateSecondPath: false,
            isHeadOfPath: false,
            isCurrentNode: false,
            isVisited: false,
            previousNode: null,
            isInstantPath: false,
            isYellowPath: false,
            isWeightedPreviously: false,
            isAnimateInstantly: false,
            isAnimateSecondPathInstantly: false,
            distance: Infinity,
            totalDistance: Infinity,
        });
    }
    grid.push(currentRow);
}
// Start and destination placed
grid[11][20].isStart = true;
grid[11][45].isEnd = true;
