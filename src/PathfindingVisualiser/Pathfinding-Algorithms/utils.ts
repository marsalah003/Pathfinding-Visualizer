import { gridI, nodeI } from "../grid";

const manhattenDistance = (node: nodeI, end: nodeI) => {
  const x = Math.abs(node.pos.row - end.pos.row);
  const y = Math.abs(node.pos.col - end.pos.col);
  return x + y;
};
const isNeighbour = (closestNodeStart: nodeI, closestNodeFinish: nodeI) => {
  const rowStart = closestNodeStart.pos.row;
  const colStart = closestNodeStart.pos.col;
  const rowFinish = closestNodeFinish.pos.row;
  const colFinish = closestNodeFinish.pos.col;
  if (rowFinish === rowStart - 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart + 1) return true;
  if (rowFinish === rowStart + 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart - 1) return true;
  return false;
};
const getNeighbours = (node: nodeI, grid: gridI) => {
  const neighbours = [];
  const { row, col } = node.pos;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
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
    ) {
      return false;
    }
  }
  return true;
};
const sortNodesByDistance = (unvisitedNodes: nodeI[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
const getAllNodes = (grid: gridI) => {
  let nodes: nodeI[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes = nodes.concat(node);
    }
  }
  return nodes;
};
export {
  manhattenDistance,
  isNeighbour,
  getNeighbours,
  neighbourNotInUnvisitedNodes,
  sortNodesByDistance,
  getAllNodes,
};
