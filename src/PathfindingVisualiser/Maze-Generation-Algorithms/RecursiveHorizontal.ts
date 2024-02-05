import { gridI, posI } from "../grid";
import { range } from "./utils";
let walls: [number, number][];

const RecursiveHorizontal = (
  grid: gridI,
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  const vertical = range(grid[0].length);
  const horizontal = range(grid.length);

  walls = [];
  getHorizontalWalls(vertical, horizontal, src, dest, bombNode);

  return walls.map((item) => ({ row: item[0], col: item[1] }));
};

const getHorizontalWalls = (
  vertical: number[],
  horizontal: number[],
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  if (horizontal.length < 2) return;

  const choice = Math.floor(Math.random() * 2);

  for (const num of horizontal) {
    if (choice === 0 && num % 2 !== 0)
      addWall(num, vertical, src, dest, bombNode);

    if (choice === 1 && num % 2 === 0)
      addWall(num, vertical, src, dest, bombNode);
  }
};

const addWall = (
  num: number,
  vertical: number[],
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  let isStartFinish = false;
  const tempWalls: [number, number][] = [];

  for (const temp of vertical) {
    if (
      (num === src.row && temp === src.col) ||
      (num === dest.row && temp === dest.col) ||
      (bombNode && num === bombNode.row && temp === bombNode.col)
    ) {
      isStartFinish = true;
      continue;
    }

    tempWalls.push([num, temp]);
  }

  if (!isStartFinish)
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);

  for (const wall of tempWalls) {
    walls.push(wall);
  }
};
export default RecursiveHorizontal;
