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

const START_DEFAULT_ROW_POSITION = 11;
const START_DEFAULT_COL_POSITION = 25;

const END_DEFAULT_ROW_POSITION = 11;
const END_DEFAULT_COL_POSITION = 40;

grid[START_DEFAULT_ROW_POSITION][START_DEFAULT_COL_POSITION].isStart = true;
grid[END_DEFAULT_ROW_POSITION][END_DEFAULT_COL_POSITION].isEnd = true;

export {START_DEFAULT_COL_POSITION, START_DEFAULT_ROW_POSITION, END_DEFAULT_COL_POSITION, END_DEFAULT_ROW_POSITION}
export { grid };
export type { posI, gridI, nodeI };
