import { gridI, nodeI, posI } from "../grid";
import {
  manhattenDistance,
  neighbourNotInUnvisitedNodes,
  getNeighbours,
} from "./utils";
// Courtesy of rohithaug, Github name: rohithaug

const greedyBFS = (grid: gridI, startNode: posI, finishNode: posI) => {
  const start = grid[startNode.row][startNode.col];
  const end = grid[finishNode.row][finishNode.col];
  const unvisitedNodes: nodeI[] = []; //open list
  const visitedNodesInOrder: nodeI[] = []; //closed list
  start.distance = 0;
  unvisitedNodes.push(start);
  
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNode = unvisitedNodes.shift() as nodeI;
    if (
      closestNode.pos.row === end.pos.row &&
      closestNode.pos.col === end.pos.col
    )
      return {
        path: getNodesInShortestPathOrderGreedyBFS(end),
        nodesVisitedInOrder: visitedNodesInOrder.map((item) => item.pos),
      };

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    const neighbours = getNeighbours(closestNode, grid);
    for (const neighbour of neighbours) {
      const distance = closestNode.distance + 1;
      //f(n) = h(n)
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, end);
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, end);
        neighbour.previousNode = closestNode;
      }
    }
  }
  return {
    path: [],
    nodesVisitedInOrder: visitedNodesInOrder.map((item) => item.pos),
  };
};

const getNodesInShortestPathOrderGreedyBFS = (finishNode: nodeI) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode as nodeI;
  }
  return nodesInShortestPathOrder.map((item) => item.pos);
}
export default greedyBFS;
