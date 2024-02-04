"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// Courtesy of rohithaug, Github name: rohithaug
const bidirectionalGreedySearch = (grid, start, end) => {
    const unvisitedNodesStart = [];
    const visitedNodesInOrderStart = [];
    const unvisitedNodesFinish = [];
    const visitedNodesInOrderFinish = [];
    const startNode = grid[start.row][start.col];
    const finishNode = grid[end.row][end.col];
    startNode.distance = 0;
    finishNode.distance = 0;
    unvisitedNodesStart.push(startNode);
    unvisitedNodesFinish.push(finishNode);
    while (unvisitedNodesStart.length !== 0 &&
        unvisitedNodesFinish.length !== 0) {
        unvisitedNodesStart.sort((a, b) => a.totalDistance - b.totalDistance);
        unvisitedNodesFinish.sort((a, b) => a.totalDistance - b.totalDistance);
        const closestNodeStart = unvisitedNodesStart.shift();
        const closestNodeFinish = unvisitedNodesFinish.shift();
        closestNodeStart.isVisited = true;
        closestNodeFinish.isVisited = true;
        visitedNodesInOrderStart.push(closestNodeStart);
        visitedNodesInOrderFinish.push(closestNodeFinish);
        if ((0, utils_1.isNeighbour)(closestNodeStart, closestNodeFinish)) {
            return {
                path: getNodesInShortestPathOrderBidirectionalGreedySearch(visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1], visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]),
                nodesVisitedInOrder: getReturn(visitedNodesInOrderStart, visitedNodesInOrderFinish),
            };
        }
        //Start side search
        let neighbours = (0, utils_1.getNeighbours)(closestNodeStart, grid);
        for (const neighbour of neighbours) {
            if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
                visitedNodesInOrderStart.push(closestNodeStart);
                visitedNodesInOrderFinish.push(neighbour);
                // making new array so that the values of both are alternating in the new one (so that animation looks like both sides are going at same pace)
                return {
                    path: getNodesInShortestPathOrderBidirectionalGreedySearch(visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1], visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]),
                    nodesVisitedInOrder: getReturn(visitedNodesInOrderStart, visitedNodesInOrderFinish),
                };
            }
            const distance = closestNodeStart.distance + 1;
            //f(n) = h(n)
            if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
                unvisitedNodesStart.unshift(neighbour);
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, finishNode);
                neighbour.previousNode = closestNodeStart;
            }
            else if (distance < neighbour.distance) {
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, finishNode);
                neighbour.previousNode = closestNodeStart;
            }
        }
        //Finish side search
        neighbours = (0, utils_1.getNeighbours)(closestNodeFinish, grid);
        for (const neighbour of neighbours) {
            if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
                visitedNodesInOrderStart.push(closestNodeFinish);
                visitedNodesInOrderStart.push(neighbour);
                return {
                    path: getNodesInShortestPathOrderBidirectionalGreedySearch(visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1], visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]),
                    nodesVisitedInOrder: getReturn(visitedNodesInOrderStart, visitedNodesInOrderFinish),
                };
            }
            const distance = closestNodeFinish.distance + 1;
            //f(n) = h(n)
            if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
                unvisitedNodesFinish.unshift(neighbour);
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, startNode);
                neighbour.previousNode = closestNodeFinish;
            }
            else if (distance < neighbour.distance) {
                neighbour.distance = distance;
                neighbour.totalDistance = (0, utils_1.manhattenDistance)(neighbour, startNode);
                neighbour.previousNode = closestNodeFinish;
            }
        }
    }
    return {
        path: getNodesInShortestPathOrderBidirectionalGreedySearch(visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1], visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]),
        nodesVisitedInOrder: getReturn(visitedNodesInOrderStart, visitedNodesInOrderFinish),
    };
};
const neighbourNotInUnvisitedNodes = (neighbour, unvisitedNodes) => {
    for (const node of unvisitedNodes) {
        if (node.pos.row === neighbour.pos.row &&
            node.pos.col === neighbour.pos.col) {
            return false;
        }
    }
    return true;
};
const getNodesInShortestPathOrderBidirectionalGreedySearch = (nodeA, nodeB) => {
    const nodesInShortestPathOrder = [];
    let currentNode = nodeB;
    while (currentNode !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.previousNode;
    }
    currentNode = nodeA;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder.map((item) => item.pos);
};
const getReturn = (visitedNodesInOrderStart, visitedNodesInOrderFinish) => {
    const minArrayLength = Math.min(visitedNodesInOrderStart.length, visitedNodesInOrderFinish.length);
    const result = visitedNodesInOrderStart
        .slice(0, minArrayLength)
        .flatMap((element, index) => [
        element,
        visitedNodesInOrderFinish[index],
    ])
        .concat(...visitedNodesInOrderStart.slice(minArrayLength), ...visitedNodesInOrderFinish.slice(minArrayLength));
    return result.map((item) => item.pos);
};
exports.default = bidirectionalGreedySearch;
