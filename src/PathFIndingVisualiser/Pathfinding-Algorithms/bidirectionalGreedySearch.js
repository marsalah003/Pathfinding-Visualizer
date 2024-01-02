// Courtesy of rohithaug, Github name: rohithaug
export default function bidirectionalGreedySearch(grid, start, end) {
  let unvisitedNodesStart = [];
  let visitedNodesInOrderStart = [];
  let unvisitedNodesFinish = [];
  let visitedNodesInOrderFinish = [];
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
    let closestNodeStart = unvisitedNodesStart.shift();
    let closestNodeFinish = unvisitedNodesFinish.shift();

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
    for (let neighbour of neighbours) {
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
      let distance = closestNodeStart.distance + 1;
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
    for (let neighbour of neighbours) {
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
      let distance = closestNodeFinish.distance + 1;
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
}

function isNeighbour(closestNodeStart, closestNodeFinish) {
  let rowStart = closestNodeStart.pos.row;
  let colStart = closestNodeStart.pos.col;
  let rowFinish = closestNodeFinish.pos.row;
  let colFinish = closestNodeFinish.pos.col;
  if (rowFinish === rowStart - 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart + 1) return true;
  if (rowFinish === rowStart + 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart - 1) return true;
  return false;
}

function getNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node.pos;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
}

function manhattenDistance(nodeA, nodeB) {
  let x = Math.abs(nodeA.pos.row - nodeB.pos.row);
  let y = Math.abs(nodeA.pos.col - nodeB.pos.col);
  return x + y;
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (
      node.pos.row === neighbour.pos.row &&
      node.pos.col === neighbour.pos.col
    ) {
      return false;
    }
  }
  return true;
}

export function getNodesInShortestPathOrderBidirectionalGreedySearch(
  nodeA,
  nodeB
) {
  let nodesInShortestPathOrder = [];
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
}
const getReturn = (visitedNodesInOrderStart, visitedNodesInOrderFinish) => {
  let minArrayLength = Math.min(
    visitedNodesInOrderStart.length,
    visitedNodesInOrderFinish.length
  );
  let result = visitedNodesInOrderStart
    .slice(0, minArrayLength)
    .flatMap((element, index) => [element, visitedNodesInOrderFinish[index]])
    .concat(
      ...visitedNodesInOrderStart.slice(minArrayLength),
      ...visitedNodesInOrderFinish.slice(minArrayLength)
    );
  return result.map((item) => item.pos);
};
