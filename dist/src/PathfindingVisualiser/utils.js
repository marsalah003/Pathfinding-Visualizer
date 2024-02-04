"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMazeAlgo = exports.getPathFindingAlgo = exports.clearPathAndVisitedSquares = exports.clearPath = exports.clearEverything = void 0;
const Maze_Generation_Algorithms_1 = require("./Maze-Generation-Algorithms");
const Pathfinding_Algorithms_1 = require("./Pathfinding-Algorithms");
const clearEverything = (grid) => {
    return grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isOnPath: false, isInstantPath: false, isAnimate: false, distance: Infinity, totalDistance: Infinity, isVisited: false, isWall: false, isWeighted: false, isWallPreviously: false, previousNode: null, isAnimateSecondPath: false, isAnimateInstantly: false, isHeadOfPath: false }))));
};
exports.clearEverything = clearEverything;
const clearPath = (grid) => {
    return grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isOnPath: false, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false, isAnimateInstantly: false, isInstantPath: false, isAnimate: false, isHeadOfPath: false, distance: Infinity, totalDistance: Infinity, isVisited: false, isWallPreviously: false, previousNode: null }))));
};
exports.clearPath = clearPath;
const clearPathAndVisitedSquares = (grid) => {
    return grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isOnPath: false, isAnimate: false, isInstantPath: false, isAnimateInstantly: false, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false }))));
};
exports.clearPathAndVisitedSquares = clearPathAndVisitedSquares;
const getPathFindingAlgo = (algoPicked) => {
    switch (algoPicked) {
        case "Breadth-First Search":
            return Pathfinding_Algorithms_1.BreadthFirstSearch;
        case "Depth-First Search":
            return Pathfinding_Algorithms_1.DepthFirstSearch;
        case "A*":
            return Pathfinding_Algorithms_1.AStar;
        case "Dijkstra's algorithm":
            return Pathfinding_Algorithms_1.Dijkstra;
        case "Random Walk":
            return Pathfinding_Algorithms_1.RandomWalk;
        case "Bidirectional Greedy Search":
            return Pathfinding_Algorithms_1.bidirectionalGreedySearch;
        case "Greedy Best First Search":
            return Pathfinding_Algorithms_1.greedyBFS;
        default:
            return Pathfinding_Algorithms_1.BreadthFirstSearch;
    }
};
exports.getPathFindingAlgo = getPathFindingAlgo;
const getMazeAlgo = (mazePicked) => {
    switch (mazePicked) {
        case "Recursive Division":
        case "Weight Recursive Division":
            return Maze_Generation_Algorithms_1.RecursiveDivisionMaze;
        case "Horizontal":
            return Maze_Generation_Algorithms_1.RecursiveHorizontal;
        case "Vertical":
            return Maze_Generation_Algorithms_1.RecursiveVertical;
        case "Random Maze":
        case "Random Weight Maze":
            return Maze_Generation_Algorithms_1.RandomMaze;
        default:
            return Maze_Generation_Algorithms_1.RecursiveDivisionMaze;
    }
};
exports.getMazeAlgo = getMazeAlgo;
