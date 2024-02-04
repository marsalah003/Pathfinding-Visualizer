import { gridI, posI } from "../grid";
import { generateOddRandomNumber, range, generateRandomNumber } from "./utils";
let walls: [number, number][];
const RecursiveDivisionMaze = (
  grid: gridI,
  src: posI,
  dest: posI,
  bomb: posI | null
) => {
  const vertical = range(grid[0].length);
  const horizontal = range(grid.length);

  walls = [];
  getRecursiveWalls(vertical, horizontal, grid, src, dest, bomb);
  const ret = walls.map((item) => ({
    row: item[0],
    col: item[1],
  }));
  return ret;
};

const getRecursiveWalls = (
  vertical: number[],
  horizontal: number[],
  grid: gridI,
  src: posI,
  dest: posI,
  bomb: posI | null
) => {
  if (vertical.length < 2 || horizontal.length < 2) return;

  // NOTE: dir === 0 => Horizontal
  // NOTE: dir === 1 => Vertical
  let dir;
  let num;

  if (vertical.length > horizontal.length) {
    dir = 0;
    num = generateOddRandomNumber(vertical);
  }

  if (vertical.length <= horizontal.length) {
    dir = 1;
    num = generateOddRandomNumber(horizontal);
  }

  if (dir === 0) {
    addWall(dir, num as number, vertical, horizontal, src, dest, bomb);

    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num as number)),
      horizontal,
      grid,
      src,
      dest,
      bomb
    );

    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num as number) + 1),
      horizontal,
      grid,
      src,
      dest,
      bomb
    );
  } else {
    addWall(dir, num as number, vertical, horizontal, src, dest, bomb);

    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num as number)),
      grid,
      src,
      dest,
      bomb
    );

    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num as number) + 1),
      grid,
      src,
      dest,
      bomb
    );
  }
};

const addWall = (
  dir: number | undefined,
  num: number,
  vertical: number[],
  horizontal: number[],
  src: posI,
  dest: posI,
  bomb: posI | null
) => {
  let isStartFinish = false;
  const tempWalls: [number, number][] = [];

  if (dir === 0) {
    if (horizontal.length === 2) return;

    for (const temp of horizontal) {
      if (
        (temp === src.row && num === src.col) ||
        (temp === dest.row && num === dest.col) ||
        (bomb && temp === bomb.row && num === bomb.col)
      ) {
        isStartFinish = true;
        continue;
      }

      tempWalls.push([temp, num]);
    }
  } else {
    if (vertical.length === 2) return;

    for (const temp of vertical) {
      if (
        (num === src.row && temp === src.col) ||
        (num === dest.row && temp === dest.col) ||
        (bomb && num === bomb.row && temp === bomb.col)
      ) {
        isStartFinish = true;
        continue;
      }

      tempWalls.push([num, temp]);
    }
  }

  if (!isStartFinish)
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);

  for (const wall of tempWalls) {
    walls.push(wall);
  }
};

export default RecursiveDivisionMaze;
