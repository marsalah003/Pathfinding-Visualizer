export default function Dijkstra(grid, startNode, finishNode) {
  const nodesVisitedInOrder = [];
  grid[startNode.row][startNode.col].distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
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
    nodesVisitedInOrder,
  };
}
function getAllNodes(grid) {
  let nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes = nodes.concat(node);
    }
  }
  return nodes;
}
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (node.distance + (neighbor.isWeighted ? 15 : 1) < neighbor.distance) {
      neighbor.distance = node.distance + (neighbor.isWeighted ? 15 : 1);
      neighbor.previousNode = node;
    }
  }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node.pos;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
}
export function getNodesInShortestPathOrder(finishNode, startNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (
    currentNode.pos.row !== startNode.pos.row ||
    currentNode.pos.col !== startNode.pos.col
  ) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
    if (currentNode === null) return nodesInShortestPathOrder;
  }
  return nodesInShortestPathOrder.map((item) => item.pos);
}
