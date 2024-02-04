"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNodes = exports.sortNodesByDistance = exports.neighbourNotInUnvisitedNodes = exports.getNeighbours = exports.isNeighbour = exports.manhattenDistance = void 0;
const manhattenDistance = (node, end) => {
    const x = Math.abs(node.pos.row - end.pos.row);
    const y = Math.abs(node.pos.col - end.pos.col);
    return x + y;
};
exports.manhattenDistance = manhattenDistance;
const isNeighbour = (closestNodeStart, closestNodeFinish) => {
    const rowStart = closestNodeStart.pos.row;
    const colStart = closestNodeStart.pos.col;
    const rowFinish = closestNodeFinish.pos.row;
    const colFinish = closestNodeFinish.pos.col;
    if (rowFinish === rowStart - 1 && colFinish === colStart)
        return true;
    if (rowFinish === rowStart && colFinish === colStart + 1)
        return true;
    if (rowFinish === rowStart + 1 && colFinish === colStart)
        return true;
    if (rowFinish === rowStart && colFinish === colStart - 1)
        return true;
    return false;
};
exports.isNeighbour = isNeighbour;
const getNeighbours = (node, grid) => {
    const neighbours = [];
    const { row, col } = node.pos;
    if (row !== 0)
        neighbours.push(grid[row - 1][col]);
    if (col !== grid[0].length - 1)
        neighbours.push(grid[row][col + 1]);
    if (row !== grid.length - 1)
        neighbours.push(grid[row + 1][col]);
    if (col !== 0)
        neighbours.push(grid[row][col - 1]);
    return neighbours.filter((neighbour) => !neighbour.isWall && !neighbour.isVisited);
};
exports.getNeighbours = getNeighbours;
const neighbourNotInUnvisitedNodes = (neighbour, unvisitedNodes) => {
    for (const node of unvisitedNodes) {
        if (node.pos.row === neighbour.pos.row &&
            node.pos.col === neighbour.pos.col) {
            return false;
        }
    }
    return true;
};
exports.neighbourNotInUnvisitedNodes = neighbourNotInUnvisitedNodes;
const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
exports.sortNodesByDistance = sortNodesByDistance;
const getAllNodes = (grid) => {
    let nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes = nodes.concat(node);
        }
    }
    return nodes;
};
exports.getAllNodes = getAllNodes;
