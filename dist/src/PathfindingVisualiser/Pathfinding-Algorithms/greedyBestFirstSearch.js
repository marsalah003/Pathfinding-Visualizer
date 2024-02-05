"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// Courtesy of rohithaug, Github name: rohithaug
const greedyBFS = (grid, startNode, finishNode) => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[finishNode.row][finishNode.col];
    const unvisitedNodes = []; //open list
    const visitedNodesInOrder = []; //closed list
    start.distance = 0;
    unvisitedNodes.push(start);
    while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.pos.row === end.pos.row &&
            closestNode.pos.col === end.pos.col)
            return {
                path: getNodesInShortestPathOrderGreedyBFS(end),
                nodesVisitedInOrder: visitedNodesInOrder.map((item) => item.pos),
            };
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        const neighbours = (0, utils_1.getNeighbours)(closestNode, grid);
        for (const neighbour of neighbours) {
            const distance = closestNode.distance + 1;
            //f(n) = h(n)
            if ((0, utils_1.neighbourNotInUnvisitedNodes)(neighbour, unvisitedNodes)) {
                unvisitedNodes.unshift(neighbour);
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, end);
                neighbour.previousNode = closestNode;
            }
            else if (distance < neighbour.distance) {
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, end);
                neighbour.previousNode = closestNode;
            }
        }
    }
    return {
        path: [],
        nodesVisitedInOrder: visitedNodesInOrder.map((item) => item.pos),
    };
};
function getNodesInShortestPathOrderGreedyBFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder.map((item) => item.pos);
}
exports.default = greedyBFS;
