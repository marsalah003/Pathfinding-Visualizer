export default function greedyBFS(grid, startNode, finishNode) {
  const start = grid[startNode.row][startNode.col];
  const end = grid[finishNode.row][finishNode.col];
  let unvisitedNodes = []; //open list
  let visitedNodesInOrder = []; //closed list
  start.distance = 0;
  unvisitedNodes.push(start);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    let closestNode = unvisitedNodes.shift();
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

    let neighbours = getNeighbours(closestNode, grid);
    for (let neighbour of neighbours) {
      let distance = closestNode.distance + (neighbour.isWeighted ? 15 : 1);
      //f(n) = h(n)
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, end) + distance;
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattenDistance(neighbour, end) + distance;
        neighbour.previousNode = closestNode;
      }
    }
  }
  return {
    path: getNodesInShortestPathOrderGreedyBFS(end),
    visitedNodesInOrder: visitedNodesInOrder.map((item) => item.pos),
  };
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

function manhattenDistance(node, finishNode) {
  let x = Math.abs(node.pos.row - finishNode.pos.row);
  let y = Math.abs(node.pos.col - finishNode.pos.col);
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

function getNodesInShortestPathOrderGreedyBFS(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder.map((item) => item.pos);
}
