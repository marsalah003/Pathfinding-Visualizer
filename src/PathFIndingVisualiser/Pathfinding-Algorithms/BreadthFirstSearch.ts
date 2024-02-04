import { gridI, posI } from "../grid";

const BreadthFirstSearch = (grid: gridI, src: posI, dest: posI) => {
  const visitedGrid = grid.map((items) =>
    items.map(() => ({ row: -1, col: -1 }))
  );
  const nodesVisitedInOrder: posI[] = [];
  visitedGrid[src.row][src.col] = { row: src.row, col: src.col };
  const path = [];
  if (BFSPathCheck(grid, src, dest, visitedGrid, nodesVisitedInOrder)) {
    let v = dest;
    while (v.col !== src.col || v.row !== src.row) {
      path.unshift(v);

      v = visitedGrid[v.row][v.col];
    }
    path.unshift(src);
  }

  return { path, nodesVisitedInOrder };
};
const BFSPathCheck = (
  grid: gridI,
  src: posI,
  dest: posI,
  visitedGrid: { row: number; col: number }[][],
  nodesVisitedInOrder: posI[]
) => {
  const found = false;
  const queue = [];
  queue.push(src);
  nodesVisitedInOrder.push(src);
  while (!found || queue.length !== 0) {
    if (queue.length === 0) return false;

    const v = queue.shift() as posI;

    if (v.row === dest.row && v.col === dest.col) {
      return true;
    } else {
      const neighbours = [];
      if (v.col + 1 <= 65 && v.col + 1 >= 0 && !grid[v.row][v.col + 1].isWall) {
        neighbours.push({ row: v.row, col: v.col + 1 });
      }
      if (v.col - 1 <= 65 && v.col - 1 >= 0 && !grid[v.row][v.col - 1].isWall) {
        neighbours.push({ row: v.row, col: v.col - 1 });
      }
      if (v.row - 1 <= 22 && v.row - 1 >= 0 && !grid[v.row - 1][v.col].isWall) {
        neighbours.push({ row: v.row - 1, col: v.col });
      }
      if (v.row + 1 <= 22 && v.row + 1 >= 0 && !grid[v.row + 1][v.col].isWall) {
        neighbours.push({ row: v.row + 1, col: v.col });
      }

      for (const neighbour of neighbours) {
        if (visitedGrid[neighbour.row][neighbour.col].row === -1) {
          visitedGrid[neighbour.row][neighbour.col] = v;
          nodesVisitedInOrder.push(neighbour);
          queue.push(neighbour);
        }
      }
    }
  }
  return found;
};

export default BreadthFirstSearch;
