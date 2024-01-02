const GRID_ROW_LENGTH = 23;
const GRID_COL_LENGTH = 66;
const grid = [];
for (let row = 0; row < GRID_ROW_LENGTH; row++) {
  const currentRow = [];
  for (let col = 0; col < GRID_COL_LENGTH; col++) {
    currentRow.push({
      pos: { col, row },
      isWall: false,
      isStart: false,
      isEnd: false,
      isAnimate: false,
      isOnPath: false,
      isWeighted: false,
      cost: 0,
      isWallPreviously: false,
      isBomb: false,
      isVisitedPreviously: false,
      isAnimateSecondPath: false,
      isHeadOfPath: false,
      isCurrentNode: false,
      distance: Infinity,
      totalDistance: Infinity,
      isVisited: false,
      previousNode: null,
      isInstantPath: false,
      isYellowPath: false,
      isWeightedPreviously: false,
      isAnimateInstantly: false,
      isAnimateSecondPathInstantly: false,
    });
  }
  grid.push(currentRow);
}
grid[11][30].isStart = true;
grid[11][35].isEnd = true;

export default grid;
