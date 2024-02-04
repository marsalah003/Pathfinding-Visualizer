import { gridI, posI } from "../grid";
import { range } from "./utils";
let walls: [number, number][];

const RecursiveVertical = (
  grid: gridI,
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  const vertical = range(grid[0].length);
  const horizontal = range(grid.length);

  walls = [];
  getVerticalWalls(vertical, horizontal, src, dest, bombNode);

  return walls.map((item) => ({ row: item[0], col: item[1] }));
};

const getVerticalWalls = (
  vertical: number[],
  horizontal: number[],
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  if (vertical.length < 2) return;

  const choice = Math.floor(Math.random() * 2);

  for (const num of vertical) {
    if (choice === 0 && num % 2 !== 0)
      addWall(num, horizontal, src, dest, bombNode);

    if (choice === 1 && num % 2 === 0)
      addWall(num, horizontal, src, dest, bombNode);
  }
};

const addWall = (
  num: number,
  horizontal: number[],
  src: posI,
  dest: posI,
  bombNode: posI | null
) => {
  let isStartFinish = false;
  const tempWalls: [number, number][] = [];

  for (const temp of horizontal) {
    if (
      (temp === src.row && num === src.col) ||
      (temp === dest.row && num === dest.col) ||
      (bombNode && temp === bombNode.row && num === bombNode.col)
    ) {
      isStartFinish = true;
      continue;
    }

    tempWalls.push([temp, num]);
  }

  if (!isStartFinish)
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);

  for (const wall of tempWalls) {
    walls.push(wall);
  }
};
export default RecursiveVertical;
