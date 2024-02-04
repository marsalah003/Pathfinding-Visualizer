import { gridI, nodeI, posI } from "../grid";
import { manhattenDistance, isNeighbour, getNeighbours } from "./utils";

// Courtesy of rohithaug, Github name: rohithaug
const bidirectionalGreedySearch = (grid: gridI, start: posI, end: posI) => {
  const unvisitedNodesStart: nodeI[] = [];
  const visitedNodesInOrderStart: nodeI[] = [];
  const unvisitedNodesFinish: nodeI[] = [];
  const visitedNodesInOrderFinish: nodeI[] = [];
  const startNode = grid[start.row][start.col];
  const finishNode = grid[end.row][end.col];
  startNode.distance = 0;
  finishNode.distance = 0;
  unvisitedNodesStart.push(startNode);
  unvisitedNodesFinish.push(finishNode);

  while (
    unvisitedNodesStart.length !== 0 &&
    unvisitedNodesFinish.length !== 0
  ) {
    unvisitedNodesStart.sort((a, b) => a.totalDistance - b.totalDistance);
    unvisitedNodesFinish.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNodeStart = unvisitedNodesStart.shift() as nodeI;
    const closestNodeFinish = unvisitedNodesFinish.shift() as nodeI;

    closestNodeStart.isVisited = true;
    closestNodeFinish.isVisited = true;
    visitedNodesInOrderStart.push(closestNodeStart);
    visitedNodesInOrderFinish.push(closestNodeFinish);
    if (isNeighbour(closestNodeStart, closestNodeFinish)) {
      return {
        path: getNodesInShortestPathOrderBidirectionalGreedySearch(
          visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
          visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
        ),
        nodesVisitedInOrder: getReturn(
          visitedNodesInOrderStart,
          visitedNodesInOrderFinish
        ),
      };
    }

    //Start side search
    let neighbours = getNeighbours(closestNodeStart, grid);
    for (const neighbour of neighbours) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
        visitedNodesInOrderStart.push(closestNodeStart);
        visitedNodesInOrderFinish.push(neighbour);
        // making new array so that the values of both are alternating in the new one (so that animation looks like both sides are going at same pace)

        return {
          path: getNodesInShortestPathOrderBidirectionalGreedySearch(
            visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
            visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
          ),
          nodesVisitedInOrder: getReturn(
            visitedNodesInOrderStart,
            visitedNodesInOrderFinish
          ),
        };
      }
      const distance = closestNodeStart.distance + 1;
      //f(n) = h(n)
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
        unvisitedNodesStart.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, finishNode);
        neighbour.previousNode = closestNodeStart;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, finishNode);
        neighbour.previousNode = closestNodeStart;
      }
    }

    //Finish side search
    neighbours = getNeighbours(closestNodeFinish, grid);
    for (const neighbour of neighbours) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
        visitedNodesInOrderStart.push(closestNodeFinish);
        visitedNodesInOrderStart.push(neighbour);
        return {
          path: getNodesInShortestPathOrderBidirectionalGreedySearch(
            visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
            visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
          ),
          nodesVisitedInOrder: getReturn(
            visitedNodesInOrderStart,
            visitedNodesInOrderFinish
          ),
        };
      }
      const distance = closestNodeFinish.distance + 1;
      //f(n) = h(n)
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
        unvisitedNodesFinish.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeFinish;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeFinish;
      }
    }
  }
  return {
    path: getNodesInShortestPathOrderBidirectionalGreedySearch(
      visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
      visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
    ),
    nodesVisitedInOrder: getReturn(
      visitedNodesInOrderStart,
      visitedNodesInOrderFinish
    ),
  };
};

const neighbourNotInUnvisitedNodes = (
  neighbour: nodeI,
  unvisitedNodes: nodeI[]
) => {
  for (const node of unvisitedNodes) {
    if (
      node.pos.row === neighbour.pos.row &&
      node.pos.col === neighbour.pos.col
    ) {
      return false;
    }
  }
  return true;
};

const getNodesInShortestPathOrderBidirectionalGreedySearch = (
  nodeA: nodeI,
  nodeB: nodeI
) => {
  const nodesInShortestPathOrder: nodeI[] = [];
  let currentNode = nodeB;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode as nodeI;
  }
  currentNode = nodeA;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode as nodeI;
  }
  return nodesInShortestPathOrder.map((item) => item.pos);
};
const getReturn = (
  visitedNodesInOrderStart: nodeI[],
  visitedNodesInOrderFinish: nodeI[]
) => {
  const minArrayLength = Math.min(
    visitedNodesInOrderStart.length,
    visitedNodesInOrderFinish.length
  );
  const result = visitedNodesInOrderStart
    .slice(0, minArrayLength)
    .flatMap((element: nodeI, index: number) => [
      element,
      visitedNodesInOrderFinish[index],
    ])
    .concat(
      ...visitedNodesInOrderStart.slice(minArrayLength),
      ...visitedNodesInOrderFinish.slice(minArrayLength)
    );
  return result.map((item: nodeI) => item.pos);
};
export default bidirectionalGreedySearch;
