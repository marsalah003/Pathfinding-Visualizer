interface posI {
  col: number;
  row: number;
}
interface nodeI {
  pos: posI;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isAnimate: boolean;
  isOnPath: boolean;
  isWeighted: boolean;
  cost: number;
  isWallPreviously: boolean;
  isBomb: boolean;
  isVisitedPreviously: boolean;
  isAnimateSecondPath: boolean;
  isHeadOfPath: boolean;
  isCurrentNode: boolean;
  isVisited: boolean;
  previousNode: null | nodeI;
  isInstantPath: boolean;
  isYellowPath: boolean;
  isWeightedPreviously: boolean;
  isAnimateInstantly: boolean;
  isAnimateSecondPathInstantly: boolean;
  distance: number;
  totalDistance: number;
}
type gridI = nodeI[][];

const GRID_ROW_LENGTH = 23;
const GRID_COL_LENGTH = 66;
const grid: gridI = [];
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
      isVisited: false,
      previousNode: null,
      isInstantPath: false,
      isYellowPath: false,
      isWeightedPreviously: false,
      isAnimateInstantly: false,
      isAnimateSecondPathInstantly: false,
      distance: Infinity,
      totalDistance: Infinity,
    });
  }
  grid.push(currentRow);
}
// Start and destination placed
grid[11][20].isStart = true;
grid[11][45].isEnd = true;

export { grid };
export type { posI, gridI, nodeI };
