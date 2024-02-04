"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RandomWalk = (grid, startNode, finishNode) => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[finishNode.row][finishNode.col];
    const nodesVisitedInOrder = [];
    let closestNode = start;
    const maxNodes = grid.length * grid[0].length;
    let maxNodesVisitedTracker = 0;
    let loopTracker = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        closestNode.isVisited = true;
        nodesVisitedInOrder.push(closestNode);
        if (closestNode.pos.row === end.pos.row &&
            closestNode.pos.col === end.pos.col) {
            const path = nodesVisitedInOrder.map((item) => item.pos);
            return { path, nodesVisitedInOrder: path };
        }
        const randomNeighbour = getRandomNeighbour(closestNode, grid);
        let nodesVisited = numNodesVisited(grid);
        if (nodesVisited === maxNodes - 2) {
            const path = nodesVisitedInOrder.map((item) => item.pos);
            return { path, nodesVisitedInOrder: path };
        }
        if (nodesVisited > maxNodesVisitedTracker) {
            maxNodesVisitedTracker = nodesVisited;
            loopTracker = 0;
        }
        else if ((nodesVisited = maxNodesVisitedTracker)) {
            loopTracker += 1;
            if (loopTracker > 1000) {
                const path = nodesVisitedInOrder.map((item) => item.pos);
                return { path, nodesVisitedInOrder: path };
            }
        }
        randomNeighbour.previousNode = closestNode;
        closestNode = randomNeighbour;
    }
};
const getRandomNeighbour = (node, grid) => {
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
    const neighboursFilteredStartAndWall = neighbours.filter((neighbour) => !neighbour.isStart && !neighbour.isWall);
    const neighboursFilteredVisited = neighboursFilteredStartAndWall.filter((neighbour) => !neighbour.isVisited);
    if (neighboursFilteredVisited.length > 0) {
        return neighboursFilteredVisited[Math.floor(Math.random() * neighboursFilteredVisited.length)];
    }
    return neighboursFilteredStartAndWall[Math.floor(Math.random() * neighboursFilteredStartAndWall.length)];
};
const numNodesVisited = (grid) => {
    let count = 0;
    for (const row of grid) {
        for (const node of row) {
            if (node.isVisited || node.isWall)
                count += 1;
        }
    }
    return count;
};
exports.default = RandomWalk;
