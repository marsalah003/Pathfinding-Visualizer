"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
let walls;
const RecursiveDivisionMaze = (grid, src, dest, bomb) => {
    const vertical = (0, utils_1.range)(grid[0].length);
    const horizontal = (0, utils_1.range)(grid.length);
    walls = [];
    getRecursiveWalls(vertical, horizontal, grid, src, dest, bomb);
    const ret = walls.map((item) => ({
        row: item[0],
        col: item[1],
    }));
    return ret;
};
const getRecursiveWalls = (vertical, horizontal, grid, src, dest, bomb) => {
    if (vertical.length < 2 || horizontal.length < 2)
        return;
    // NOTE: dir === 0 => Horizontal
    // NOTE: dir === 1 => Vertical
    let dir;
    let num;
    if (vertical.length > horizontal.length) {
        dir = 0;
        num = (0, utils_1.generateOddRandomNumber)(vertical);
    }
    if (vertical.length <= horizontal.length) {
        dir = 1;
        num = (0, utils_1.generateOddRandomNumber)(horizontal);
    }
    if (dir === 0) {
        addWall(dir, num, vertical, horizontal, src, dest, bomb);
        getRecursiveWalls(vertical.slice(0, vertical.indexOf(num)), horizontal, grid, src, dest, bomb);
        getRecursiveWalls(vertical.slice(vertical.indexOf(num) + 1), horizontal, grid, src, dest, bomb);
    }
    else {
        addWall(dir, num, vertical, horizontal, src, dest, bomb);
        getRecursiveWalls(vertical, horizontal.slice(0, horizontal.indexOf(num)), grid, src, dest, bomb);
        getRecursiveWalls(vertical, horizontal.slice(horizontal.indexOf(num) + 1), grid, src, dest, bomb);
    }
};
const addWall = (dir, num, vertical, horizontal, src, dest, bomb) => {
    let isStartFinish = false;
    const tempWalls = [];
    if (dir === 0) {
        if (horizontal.length === 2)
            return;
        for (const temp of horizontal) {
            if ((temp === src.row && num === src.col) ||
                (temp === dest.row && num === dest.col) ||
                (bomb && temp === bomb.row && num === bomb.col)) {
                isStartFinish = true;
                continue;
            }
            tempWalls.push([temp, num]);
        }
    }
    else {
        if (vertical.length === 2)
            return;
        for (const temp of vertical) {
            if ((num === src.row && temp === src.col) ||
                (num === dest.row && temp === dest.col) ||
                (bomb && num === bomb.row && temp === bomb.col)) {
                isStartFinish = true;
                continue;
            }
            tempWalls.push([num, temp]);
        }
    }
    if (!isStartFinish)
        tempWalls.splice((0, utils_1.generateRandomNumber)(tempWalls.length), 1);
    for (const wall of tempWalls) {
        walls.push(wall);
    }
};
exports.default = RecursiveDivisionMaze;
