"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DepthFirstSearch = (grid, src, dest) => {
    const visitedGrid = grid.map((items) => items.map(() => ({ row: -1, col: -1 })));
    const nodesVisitedInOrder = [];
    nodesVisitedInOrder.push(src);
    visitedGrid[src.row][src.col] = { row: src.row, col: src.col };
    const path = [];
    if (DFSPathCheck(grid, src, dest, nodesVisitedInOrder, visitedGrid)) {
        let v = dest;
        while (v.col !== src.col || v.row !== src.row) {
            path.unshift(v);
            v = visitedGrid[v.row][v.col];
        }
        path.unshift(src);
    }
    return { path, nodesVisitedInOrder };
};
const DFSPathCheck = (grid, src, dest, nodesVisitedInOrder, visitedGrid) => {
    const neighbours = [];
    if (src.col - 1 <= 65 &&
        src.col - 1 >= 0 &&
        !grid[src.row][src.col - 1].isWall) {
        neighbours.push({ row: src.row, col: src.col - 1 });
    }
    if (src.row - 1 <= 22 &&
        src.row - 1 >= 0 &&
        !grid[src.row - 1][src.col].isWall) {
        neighbours.push({ row: src.row - 1, col: src.col });
    }
    if (src.col + 1 <= 65 &&
        src.col + 1 >= 0 &&
        !grid[src.row][src.col + 1].isWall) {
        neighbours.push({ row: src.row, col: src.col + 1 });
    }
    if (src.row + 1 <= 22 &&
        src.row + 1 >= 0 &&
        !grid[src.row + 1][src.col].isWall) {
        neighbours.push({ row: src.row + 1, col: src.col });
    }
    for (const neighbour of neighbours) {
        if (visitedGrid[neighbour.row][neighbour.col].row === -1) {
            visitedGrid[neighbour.row][neighbour.col] = src;
            nodesVisitedInOrder.push(neighbour);
            if (neighbour.col === dest.col && neighbour.row === dest.row) {
                return true;
            }
            else if (DFSPathCheck(grid, neighbour, dest, nodesVisitedInOrder, visitedGrid)) {
                return true;
            }
        }
    }
    return false;
};
exports.default = DepthFirstSearch;
