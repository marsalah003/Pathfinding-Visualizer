let walls;

export default function RecursiveHorizontal(
  grid,
  startNode,
  finishNode,
  bombNode
) {
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);

  walls = [];
  getHorizontalWalls(vertical, horizontal, startNode, finishNode, bombNode);

  return walls.map((item) => ({ row: item[0], col: item[1] }));
}

function range(len) {
  let result = [];

  for (let i = 0; i < len; i++) {
    result.push(i);
  }

  return result;
}

function getHorizontalWalls(
  vertical,
  horizontal,
  startNode,
  finishNode,
  bombNode
) {
  if (horizontal.length < 2) return;

  let choice = Math.floor(Math.random() * 2);

  for (let num of horizontal) {
    if (choice === 0 && num % 2 !== 0)
      addWall(num, vertical, startNode, finishNode, bombNode);

    if (choice === 1 && num % 2 === 0)
      addWall(num, vertical, startNode, finishNode, bombNode);
  }
}

function addWall(num, vertical, startNode, finishNode, bombNode) {
  let isStartFinish = false;
  let tempWalls = [];

  for (let temp of vertical) {
    if (
      (num === startNode.row && temp === startNode.col) ||
      (num === finishNode.row && temp === finishNode.col) ||
      (bombNode && num === bombNode.row && temp === bombNode.col)
    ) {
      isStartFinish = true;
      continue;
    }

    tempWalls.push([num, temp]);
  }

  if (!isStartFinish)
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);

  for (let wall of tempWalls) {
    walls.push(wall);
  }
}
