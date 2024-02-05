import { gridI, nodeI, posI } from "../grid";
import { manhattenDistance } from "./utils";

// Courtesy of rohithaug, Github name: rohithaug

const AStar = (grid: gridI, src: posI, dest: posI) => {
  const unvisitedNodes = []; // Open list.
  const nodesVisitedInOrder = []; // Closed list.
  const start = grid[src.row][src.col];
  const end = grid[dest.row][dest.col];
  start.distance = 0;
  unvisitedNodes.push(start);

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);

    const closestNode = unvisitedNodes.shift() as nodeI;
    if (
      closestNode.pos.row === end.pos.row &&
      closestNode.pos.col === end.pos.col
    ) {
      return {
        path: getOptPathNodes_AStar(end),
        nodesVisitedInOrder: nodesVisitedInOrder.map((item) => item.pos),
      };
    }

    closestNode.isVisited = true;
    nodesVisitedInOrder.push(closestNode);

    const neighbours = getNeighbours(closestNode, grid);
    for (const neighbour of neighbours) {
      const distance = closestNode.distance + (neighbour.isWeighted ? 15 : 1); // in other words: distance(next, neighbour)

      // f(n) = g(n) + h(n).
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = distance + manhattenDistance(neighbour, end);
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = distance + manhattenDistance(neighbour, end);
        neighbour.previousNode = closestNode;
      }
    }
  }
  return {
    path: [],
    nodesVisitedInOrder: nodesVisitedInOrder.map((item) => item.pos),
  };
};

const getNeighbours = (node: nodeI, grid: gridI) => {
  const neighbours = [];
  const { row, col } = node.pos;

  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  if (row !== 0) neighbours.push(grid[row - 1][col]);

  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
};

const neighbourNotInUnvisitedNodes = (
  neighbour: nodeI,
  unvisitedNodes: nodeI[]
) => {
  for (const node of unvisitedNodes) {
    if (
      node.pos.row === neighbour.pos.row &&
      node.pos.col === neighbour.pos.col
    )
      return false;
  }

  return true;
};

const getOptPathNodes_AStar = (end: nodeI) => {
  const nodesInShortestPathOrder = [];
  let currentNode = end;
  nodesInShortestPathOrder.push(end);
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode as nodeI;
  }

  return nodesInShortestPathOrder.map((item) => item.pos);
};

export default AStar;
