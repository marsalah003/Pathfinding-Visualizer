"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RandomMaze = (grid, src, dest, bomb) => {
    const walls = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if ((row === src.row && col === src.col) ||
                (row === dest.row && col === dest.col) ||
                (bomb && row === bomb.row && col === bomb.col)) {
                continue;
            }
            if (Math.random() < 0.33) {
                walls.push({ row, col });
            }
        }
    }
    walls.sort(() => Math.random() - 0.5);
    return walls;
};
exports.default = RandomMaze;
