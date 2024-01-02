export default function BreadthFirstSearch(grid, src, dest) {
  const visitedGrid = grid.map((items) =>
    items.map((item) => ({ row: -1, col: -1 }))
  );
  let nodesVisitedInOrder = [];
  visitedGrid[src.row][src.col] = { row: src.row, col: src.col };
  let path = [];
  if (BFSPathCheck(grid, src, dest, visitedGrid, nodesVisitedInOrder)) {
    let v = dest;
    while (v.col !== src.col || v.row !== src.row) {
      path.unshift(v);

      v = visitedGrid[v.row][v.col];
    }
    path.unshift(src);
  }

  return { path, nodesVisitedInOrder };
}
const BFSPathCheck = (grid, src, dest, visitedGrid, nodesVisitedInOrder) => {
  let found = false;
  const queue = [];
  queue.push(src);
  nodesVisitedInOrder.push(src);
  while (!found || queue.length !== 0) {
    if (queue.length === 0) return false;

    let v = queue.shift();

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

      for (let neighbour of neighbours) {
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
