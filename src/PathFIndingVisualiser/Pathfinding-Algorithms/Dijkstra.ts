import { gridI, nodeI, posI } from "../grid";
import { sortNodesByDistance, getAllNodes } from "./utils";

const Dijkstra = (grid: gridI, startNode: posI, finishNode: posI) => {
  const nodesVisitedInOrder = [];
  grid[startNode.row][startNode.col].distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift() as nodeI;
    // if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity)
      return {
        path: [],
        nodesVisitedInOrder: nodesVisitedInOrder.map((item) => item.pos),
      };
    closestNode.isVisited = true;
    nodesVisitedInOrder.push(closestNode);
    const { row, col } = closestNode.pos;

    if (row === finishNode.row && col === finishNode.col) {
      return {
        path: getNodesInShortestPathOrder(
          grid[finishNode.row][finishNode.col],
          grid[startNode.row][startNode.col]
        ),
        nodesVisitedInOrder: nodesVisitedInOrder.map((item) => item.pos),
      };
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }

  return {
    path: getNodesInShortestPathOrder(
      grid[finishNode.row][finishNode.col],
      grid[startNode.row][startNode.col]
    ),
    nodesVisitedInOrder: nodesVisitedInOrder.map((item) => item.pos),
  };
};

const updateUnvisitedNeighbors = (node: nodeI, grid: gridI) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (node.distance + (neighbor.isWeighted ? 15 : 1) < neighbor.distance) {
      neighbor.distance = node.distance + (neighbor.isWeighted ? 15 : 1);
      neighbor.previousNode = node;
    }
  }
};
const getUnvisitedNeighbors = (node: nodeI, grid: gridI) => {
  const neighbors = [];
  const { col, row } = node.pos;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};
const getNodesInShortestPathOrder = (finishNode: nodeI, startNode: nodeI) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (
    currentNode.pos.row !== startNode.pos.row ||
    currentNode.pos.col !== startNode.pos.col
  ) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode as nodeI;
    if (currentNode === null)
      return nodesInShortestPathOrder.map((item) => item.pos);
  }
  nodesInShortestPathOrder.unshift(startNode);
  const ret = nodesInShortestPathOrder.map((item) => item.pos);
  return ret;
};

export default Dijkstra;
