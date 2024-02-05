import {
  RecursiveDivisionMaze,
  RecursiveHorizontal,
  RecursiveVertical,
  RandomMaze,
} from "./Maze-Generation-Algorithms";
import {
  BreadthFirstSearch,
  DepthFirstSearch,
  AStar,
  Dijkstra,
  RandomWalk,
  bidirectionalGreedySearch,
  greedyBFS,
} from "./Pathfinding-Algorithms";
import type { gridI } from "./grid";

const clearEverything = (grid: gridI) => {
  return grid.map((items) =>
    items.map((item) => ({
      ...item,
      isOnPath: false,
      isInstantPath: false,
      isAnimate: false,
      distance: Infinity,
      totalDistance: Infinity,
      isVisited: false,
      isWall: false,
      isWeighted: false,
      isWallPreviously: false,

      previousNode: null,
      isAnimateSecondPath: false,
      isAnimateSecondPathInstantly: false,

      isAnimateInstantly: false,

      isHeadOfPath: false,
    }))
  );
};
const clearPath = (grid: gridI) => {
  return grid.map((items) =>
    items.map((item) => ({
      ...item,
      isOnPath: false,
      isAnimateSecondPath: false,
      isAnimateSecondPathInstantly: false,
      isAnimateInstantly: false,
      isInstantPath: false,
      isAnimate: false,
      isHeadOfPath: false,

      distance: Infinity,
      totalDistance: Infinity,
      isVisited: false,

      isWallPreviously: false,

      previousNode: null,
    }))
  );
};
const clearPathAndVisitedSquares = (grid: gridI) => {
  return grid.map((items) =>
    items.map((item) => ({
      ...item,
      isOnPath: false,
      isAnimate: false,
      isInstantPath: false,
      isAnimateInstantly: false,
      isAnimateSecondPath: false,
      isAnimateSecondPathInstantly: false,
    }))
  );
};
const getPathFindingAlgo = (algoPicked: string) => {
  switch (algoPicked) {
    case "Breadth-First Search":
      return BreadthFirstSearch;
    case "Depth-First Search":
      return DepthFirstSearch;
    case "A*":
      return AStar;
    case "Dijkstra's algorithm":
      return Dijkstra;
    case "Random Walk":
      return RandomWalk;
    case "Bidirectional Greedy Search":
      return bidirectionalGreedySearch;
    case "Greedy Best First Search":
      return greedyBFS;
    default:
      return BreadthFirstSearch;
  }
};
const getMazeAlgo = (mazePicked: string) => {
  switch (mazePicked) {
    case "Recursive Division":
    case "Weight Recursive Division":
      return RecursiveDivisionMaze;
    case "Horizontal":
      return RecursiveHorizontal;
    case "Vertical":
      return RecursiveVertical;
    case "Random Maze":
    case "Random Weight Maze":
      return RandomMaze;
    default:
      return RecursiveDivisionMaze;
  }
};
export {
  clearEverything,
  clearPath,
  clearPathAndVisitedSquares,
  getPathFindingAlgo,
  getMazeAlgo,
};
