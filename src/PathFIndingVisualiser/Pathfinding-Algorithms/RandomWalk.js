export default function RandomWalk(grid, startNode, finishNode) {
  const start = grid[startNode.row][startNode.col];
  const end = grid[finishNode.row][finishNode.col];
  let nodesVisitedInOrder = [];
  let closestNode = start;
  let maxNodes = grid.length * grid[0].length;
  let maxNodesVisitedTracker = 0;
  let loopTracker = 0;

  while (true) {
    closestNode.isVisited = true;
    nodesVisitedInOrder.push(closestNode);

    if (
      closestNode.pos.row === end.pos.row &&
      closestNode.pos.col === end.pos.col
    ) {
      let path = nodesVisitedInOrder.map((item) => item.pos);
      return { path, nodesVisitedInOrder: path };
    }

    let randomNeighbour = getRandomNeighbour(closestNode, grid, end);
    let nodesVisited = numNodesVisited(grid);

    if (nodesVisited === maxNodes - 2) {
      let path = nodesVisitedInOrder.map((item) => item.pos);
      return { path, nodesVisitedInOrder: path };
    }
    if (nodesVisited > maxNodesVisitedTracker) {
      maxNodesVisitedTracker = nodesVisited;
      loopTracker = 0;
    } else if ((nodesVisited = maxNodesVisitedTracker)) {
      loopTracker += 1;
      if (loopTracker > 1000) {
        let path = nodesVisitedInOrder.map((item) => item.pos);
        return { path, nodesVisitedInOrder: path };
      }
    }

    randomNeighbour.previousNode = closestNode;
    closestNode = randomNeighbour;
  }
}

function getRandomNeighbour(node, grid, finishNode) {
  let neighbours = [];
  let { row, col } = node.pos;

  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);

  let neighboursFilteredStartAndWall = neighbours.filter(
    (neighbour) => !neighbour.isStart && !neighbour.isWall
  );
  let neighboursFilteredVisited = neighboursFilteredStartAndWall.filter(
    (neighbour) => !neighbour.isVisited
  );

  if (neighboursFilteredVisited.length > 0) {
    return neighboursFilteredVisited[
      Math.floor(Math.random() * neighboursFilteredVisited.length)
    ];
  }

  return neighboursFilteredStartAndWall[
    Math.floor(Math.random() * neighboursFilteredStartAndWall.length)
  ];
}

function numNodesVisited(grid) {
  let count = 0;

  for (let row of grid) {
    for (let node of row) {
      if (node.isVisited || node.isWall) count += 1;
    }
  }

  return count;
}
