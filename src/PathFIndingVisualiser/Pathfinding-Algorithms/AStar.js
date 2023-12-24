export default function AStar(grid, startNode, finishNode) {
  let unvisitedNodes = []; // Open list.
  let nodesVisitedInOrder = []; // Closed list.
  const start = grid[startNode.row][startNode.col];
  const end = grid[finishNode.row][finishNode.col];
  start.distance = 0;
  unvisitedNodes.push(start);

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);

    let closestNode = unvisitedNodes.shift();
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

    let neighbours = getNeighbours(closestNode, grid);
    for (let neighbour of neighbours) {
      let distance = closestNode.distance + (neighbour.isWeighted ? 15 : 1); // in other words: distance(next, neighbour)

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
}

function getNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node.pos;

  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  if (row !== 0) neighbours.push(grid[row - 1][col]);

  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (
      node.pos.row === neighbour.pos.row &&
      node.pos.col === neighbour.pos.col
    )
      return false;
  }

  return true;
}

function manhattenDistance(node, end) {
  let x = Math.abs(node.pos.row - end.pos.row);
  let y = Math.abs(node.pos.col - end.pos.col);
  return x + y;
}

export function getOptPathNodes_AStar(end) {
  let nodesInShortestPathOrder = [];
  let currentNode = end;
  nodesInShortestPathOrder.push(end);
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder.map((item) => item.pos);
}
