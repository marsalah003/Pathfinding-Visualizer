"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("./PathfindingVisualiser.css");
const react_1 = __importStar(require("react"));
const Node_1 = __importDefault(require("./components/Node"));
const utils_1 = require("./utils");
const MAZE_ANIMATION_SPEED = 10;
const PathfindingVisualiser = ({ state, changeHandler, getNodeWithProperty, }) => {
    const [pathFinder, setPathFinder] = (0, react_1.useState)({
        mousePressedOn: "",
        buttonClicked: "",
        isMousePressed: false,
    });
    const animateInstantly = (nodes, property, newGrid) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            newGrid = newGrid.map((items) => items.map((item) => {
                const { row, col } = item.pos;
                if (row === node.row &&
                    col === node.col &&
                    property === "isInstantPath")
                    return Object.assign(Object.assign({}, item), { [property]: true, isHeadOfPath: false, isAnimate: false, isAnimateInstantly: false });
                else if (row === node.row &&
                    col === node.col &&
                    (property === "isAnimateInstantly" ||
                        property === "isAnimateSecondPathInstantly")) {
                    return Object.assign(Object.assign({}, item), { [property]: true, isCurrentNode: false, isOnPath: false, isInstantPath: false });
                }
                else {
                    return item;
                }
            }));
        }
        return newGrid;
    };
    const animate = (nodes, property, delay) => {
        const promises = [];
        for (let i = 0; i < nodes.length; i++) {
            promises.push(new Promise((resolve) => {
                setTimeout(() => {
                    const node = nodes[i];
                    changeHandler((prev) => {
                        const newArray = [];
                        for (let i = 0; i < prev.grid.length; i++) {
                            newArray[i] = prev.grid[i].slice();
                        }
                        const ret = Object.assign(Object.assign({}, prev), { grid: newArray.map((items) => items.map((item) => {
                                const { row, col } = item.pos;
                                return row === node.row && col === node.col
                                    ? property === "isOnPath"
                                        ? Object.assign(Object.assign({}, item), { [property]: true, isHeadOfPath: true }) : property === "isAnimate" ||
                                        property === "isAnimateSecondPath"
                                        ? Object.assign(Object.assign({}, item), { [property]: true, isCurrentNode: true }) : Object.assign(Object.assign({}, item), { [property]: true })
                                    : Object.assign(Object.assign({}, item), { isHeadOfPath: false, isCurrentNode: false });
                            })) });
                        resolve("Success!");
                        return ret;
                    });
                }, delay * i);
            }));
        }
        return Promise.all(promises);
    };
    const onMouseDown = (event, pos) => {
        if (state.isAnimationFinished || !state.isAnimationInProgress) {
            const property = event.button === 0 ? "left" : "right";
            const endPos = getNodeWithProperty("isEnd").pos;
            const startPos = getNodeWithProperty("isStart").pos;
            let bombPos;
            if (getNodeWithProperty("isBomb"))
                bombPos = getNodeWithProperty("isBomb").pos;
            setPathFinder((prev) => (Object.assign(Object.assign({}, prev), { isMousePressed: true, buttonClicked: property, mousePressedOn: pos.col === startPos.col && pos.row === startPos.row
                    ? "start"
                    : pos.col === endPos.col && pos.row === endPos.row
                        ? "end"
                        : bombPos && pos.col === bombPos.col && pos.row === bombPos.row
                            ? "bomb"
                            : "" })));
        }
    };
    const onMouseEnter = (pos, grid) => {
        if (state.isAnimationFinished || !state.isAnimationInProgress) {
            if (pathFinder.buttonClicked === "")
                return;
            const squareProperty = pathFinder.buttonClicked === "left" ? "isWall" : "isWeighted";
            let bombPos;
            if (getNodeWithProperty("isBomb"))
                bombPos = getNodeWithProperty("isBomb").pos;
            const endPos = getNodeWithProperty("isEnd").pos;
            const startPos = getNodeWithProperty("isStart").pos;
            if ((pos.row === startPos.row && pos.col === startPos.col) ||
                (pos.row === endPos.row && pos.col === endPos.col) ||
                (bombPos && pos.row === bombPos.row && pos.col === bombPos.col)
            // grid[pos.row][pos.col].isWeighted
            )
                return;
            if (state.isAnimationFinished &&
                (pathFinder.mousePressedOn === "start" ||
                    pathFinder.mousePressedOn === "end" ||
                    pathFinder.mousePressedOn === "bomb")) {
                let gridCopy = grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { distance: Infinity, isVisited: false, previousNode: null, isOnPath: false, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false, isAnimateInstantly: false, isHeadOfPath: false }))));
                gridCopy[pos.row][pos.col].isWall = false;
                const startNodePos = pathFinder.mousePressedOn === "start"
                    ? gridCopy[pos.row][pos.col].pos
                    : gridCopy[startPos.row][startPos.col].pos;
                const endNodePos = pathFinder.mousePressedOn === "end"
                    ? gridCopy[pos.row][pos.col].pos
                    : gridCopy[endPos.row][endPos.col].pos;
                if (bombPos)
                    bombPos =
                        pathFinder.mousePressedOn === "bomb"
                            ? gridCopy[pos.row][pos.col].pos
                            : gridCopy[bombPos.row][bombPos.col].pos;
                let newGrid = [];
                for (let i = 0; i < state.grid.length; i++) {
                    newGrid[i] = state.grid[i].slice();
                }
                newGrid = newGrid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isAnimate: false, isOnPath: false, isInstantPath: false, isAnimateInstantly: false, isVisited: false, previousNode: null, totalDistance: Infinity, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false }))));
                const pathFindingAlgo = (0, utils_1.getPathFindingAlgo)(state.algoPicked);
                let toBomb, toEnd, pathToBomb, pathToEnd, nodesVisitedToBomb, nodesVisitedToEnd, nodesVisitedInOrder, path;
                if (getNodeWithProperty("isBomb")) {
                    //@ts-expect-error fix later
                    const bombNodePos = gridCopy[bombPos.row][bombPos.col].pos;
                    switch (pathFinder.mousePressedOn) {
                        case "start":
                            toBomb = pathFindingAlgo(gridCopy, gridCopy[pos.row][pos.col].pos, bombNodePos);
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
                            pathToBomb = toBomb.path;
                            toEnd = pathFindingAlgo(gridCopy, bombNodePos, endNodePos);
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
                            pathToEnd = toEnd.path;
                            break;
                        case "end":
                            toBomb = pathFindingAlgo(gridCopy, startNodePos, bombNodePos);
                            nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
                            pathToBomb = toBomb.path;
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            toEnd = pathFindingAlgo(gridCopy, bombNodePos, gridCopy[pos.row][pos.col].pos);
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
                            pathToEnd = toEnd.path;
                            break;
                        case "bomb":
                            toBomb = pathFindingAlgo(gridCopy, startNodePos, gridCopy[pos.row][pos.col].pos);
                            nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
                            pathToBomb = toBomb.path;
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            toEnd = pathFindingAlgo(gridCopy, bombNodePos, endNodePos);
                            gridCopy = (0, utils_1.clearPath)(gridCopy);
                            nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
                            pathToEnd = toEnd.path;
                            // newGrid = animateInstantly;
                            break;
                        default:
                            break;
                    }
                    newGrid = animateInstantly(nodesVisitedToEnd, "isAnimateSecondPathInstantly", newGrid);
                    newGrid = animateInstantly(nodesVisitedToBomb, "isAnimateInstantly", newGrid);
                    newGrid = animateInstantly(pathToBomb, "isInstantPath", newGrid);
                    newGrid = animateInstantly(pathToEnd, "isInstantPath", newGrid);
                    const scannedNodes = nodesVisitedToBomb.length + nodesVisitedToEnd.length;
                    const pathLength = pathToBomb.length + pathToEnd.length;
                    changeHandler((prev) => (Object.assign(Object.assign({}, prev), { grid: newGrid, scannedNodes,
                        pathLength })));
                }
                else {
                    const ret = pathFindingAlgo(gridCopy, pathFinder.mousePressedOn === "start"
                        ? gridCopy[pos.row][pos.col].pos
                        : startNodePos, pathFinder.mousePressedOn === "start"
                        ? endNodePos
                        : gridCopy[pos.row][pos.col].pos);
                    path = ret.path;
                    nodesVisitedInOrder = ret.nodesVisitedInOrder;
                    newGrid = animateInstantly(nodesVisitedInOrder, "isAnimateInstantly", newGrid);
                    newGrid = animateInstantly(path, "isInstantPath", newGrid);
                    console.log(path);
                    changeHandler((prev) => (Object.assign(Object.assign({}, prev), { grid: newGrid, pathLength: path.length, scannedNodes: nodesVisitedInOrder.length })));
                }
            }
            pathFinder.mousePressedOn === ""
                ? changeSquare(squareProperty, pos)
                : changeHandler((prev) => {
                    const newArray = [];
                    for (let i = 0; i < prev.grid.length; i++) {
                        newArray[i] = prev.grid[i].slice();
                    }
                    return Object.assign(Object.assign({}, prev), { grid: newArray.map((items) => items.map((item) => {
                            const { row, col } = item.pos;
                            const putWall = (item.isWallPreviously &&
                                (pathFinder.mousePressedOn === "start"
                                    ? !item.isEnd && !item.isBomb
                                    : pathFinder.mousePressedOn === "end"
                                        ? !item.isStart && !item.isBomb
                                        : !item.isStart && !item.isEnd)) ||
                                item.isWall;
                            return row === pos.row && col === pos.col
                                ? Object.assign(Object.assign({}, item), { isEnd: pathFinder.mousePressedOn === "end", isStart: pathFinder.mousePressedOn === "start", isBomb: pathFinder.mousePressedOn === "bomb", [squareProperty]: false, isWallPreviously: item.isWall, isWeightedPreviously: item.isWeighted, isWeighted: false, isWall: false }) : Object.assign(Object.assign({}, item), { isEnd: pathFinder.mousePressedOn === "end"
                                    ? false
                                    : item.isEnd, isStart: pathFinder.mousePressedOn === "start"
                                    ? false
                                    : item.isStart, isBomb: pathFinder.mousePressedOn === "bomb"
                                    ? false
                                    : item.isBomb, isWall: putWall, isWallPreviously: !item.isBomb && !item.isStart && !item.isEnd
                                    ? false
                                    : item.isWall, isWeighted: item.isWeightedPreviously
                                    ? true
                                    : item.isWeighted });
                        })) });
                });
        }
    };
    const changeSquare = (property, pos) => {
        changeHandler((prev) => {
            const newArray = [];
            for (let i = 0; i < prev.grid.length; i++) {
                newArray[i] = prev.grid[i].slice();
            }
            const newGrid = newArray.map((items) => items.map((item) => {
                const { row, col } = item.pos;
                return row === pos.row && col === pos.col
                    ? Object.assign(Object.assign({}, item), { [property]: !item[property] }) : item;
            }));
            return Object.assign(Object.assign({}, prev), { grid: newGrid });
        });
    };
    const onClick = (event, pos) => {
        if (state.isAnimationFinished || !state.isAnimationInProgress) {
            const property = event.button === 0 ? "isWall" : "isWeighted";
            const endPos = getNodeWithProperty("isEnd").pos;
            const startPos = getNodeWithProperty("isStart").pos;
            let bombPos;
            if (getNodeWithProperty("isBomb"))
                bombPos = getNodeWithProperty("isBomb").pos;
            if ((pos.col === endPos.col && pos.row === endPos.row) ||
                (pos.col === startPos.col && pos.row === startPos.row) ||
                (bombPos && pos.col === bombPos.col && pos.row === bombPos.row)) {
                return;
            }
            changeHandler((prev) => {
                const newArray = [];
                for (let i = 0; i < prev.grid.length; i++) {
                    newArray[i] = prev.grid[i].slice();
                }
                return Object.assign(Object.assign({}, prev), { grid: newArray.map((items) => items.map((item) => {
                        const { row, col } = item.pos;
                        return row === pos.row && col === pos.col
                            ? Object.assign(Object.assign({}, item), { [property]: !item[property], isWallPreviously: false }) : item;
                    })) });
            });
        }
    };
    const onMouseUp = () => setPathFinder((prev) => (Object.assign(Object.assign({}, prev), { buttonClicked: "", mousePressedOn: "", isMousePressed: false })));
    const handleBombButton = () => {
        changeHandler((prev) => {
            const newArray = [];
            for (let i = 0; i < prev.grid.length; i++) {
                newArray[i] = prev.grid[i].slice();
            }
            return Object.assign(Object.assign({}, prev), { grid: newArray.map((items) => items.map((item) => {
                    const { row, col } = item.pos;
                    return row === 11 && col === 26
                        ? Object.assign(Object.assign({}, item), { isBomb: !item.isBomb, isWall: false }) : item;
                })) });
        });
    };
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (state.bombPicked && getNodeWithProperty("isBomb") == null) {
                handleBombButton();
            }
            if (((state.isAnimationFinished || !state.isAnimationInProgress) &&
                state.isVisualiseAttempted &&
                state.algoPicked) ||
                state.mazePicked) {
                const newGrid = state.mazePicked === ""
                    ? (0, utils_1.clearPathAndVisitedSquares)(state.grid)
                    : (0, utils_1.clearEverything)(state.grid);
                changeHandler((prev) => (Object.assign(Object.assign({}, prev), { grid: newGrid })));
                if (state.mazePicked) {
                    changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isAnimationFinished: false, isAnimationInProgress: true })));
                    const mazeAlgo = (0, utils_1.getMazeAlgo)(state.mazePicked);
                    const bomb = getNodeWithProperty("isBomb");
                    const maze = mazeAlgo(state.grid, getNodeWithProperty("isStart").pos, getNodeWithProperty("isEnd").pos, bomb && bomb.pos);
                    const obstacle = state.mazePicked === "Random Weight Maze" ||
                        state.mazePicked === "Weight Recursive Division"
                        ? "isWeighted"
                        : "isWall";
                    animate(maze, obstacle, MAZE_ANIMATION_SPEED).then(() => changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isAnimationInProgress: false, mazePicked: "" }))));
                }
                else {
                    changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isAnimationInProgress: true, isAnimationFinished: false, scannedNodes: 0, pathLength: 0 })));
                    const stateAlgo = (0, utils_1.getPathFindingAlgo)(state.algoPicked);
                    const newGrid = state.grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isVisited: false, distance: Infinity, totalDistance: Infinity, previousNode: null }))));
                    if (state.bombPicked) {
                        const toBomb = stateAlgo(newGrid, getNodeWithProperty("isStart").pos, getNodeWithProperty("isBomb").pos);
                        const pathToBomb = toBomb.path;
                        const nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
                        const toEnd = stateAlgo(newGrid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isVisited: false, distance: Infinity, totalDistance: Infinity, previousNode: null })))), getNodeWithProperty("isBomb").pos, getNodeWithProperty("isEnd").pos);
                        const pathToEnd = toEnd.path;
                        const nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
                        yield animate(nodesVisitedToBomb, "isAnimate", state.speed);
                        yield animate(nodesVisitedToEnd, "isAnimateSecondPath", state.speed);
                        yield animate(pathToBomb, "isOnPath", state.speed * 2);
                        yield animate(pathToEnd, "isOnPath", state.speed * 2);
                        changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isAnimationInProgress: false, isAnimationFinished: true, isVisualiseAttempted: false, scannedNodes: nodesVisitedToBomb.length + nodesVisitedToEnd.length, pathLength: pathToBomb.length + pathToEnd.length })));
                    }
                    else {
                        const { path, nodesVisitedInOrder } = stateAlgo(state.grid, getNodeWithProperty("isStart").pos, getNodeWithProperty("isEnd").pos);
                        yield animate(nodesVisitedInOrder, "isAnimate", state.speed);
                        yield animate(path, "isOnPath", state.speed * 2);
                        changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isAnimationInProgress: false, isAnimationFinished: true, isVisualiseAttempted: false, scannedNodes: nodesVisitedInOrder.length, pathLength: path.length })));
                    }
                }
            }
        }))();
    }, [
        state.algoPicked,
        state.mazePicked,
        state.isVisualiseAttempted,
        state.bombPicked,
    ]);
    const grid = state.grid.map((row, rowId) => (react_1.default.createElement("div", { key: rowId }, row.map((node, nodeId) => (react_1.default.createElement(Node_1.default, { isVisitedPreviously: node.isVisitedPreviously, key: nodeId, isAnimateSecondPath: node.isAnimateSecondPath, isBomb: node.isBomb, pos: node.pos, isWall: node.isWall, isStart: node.isStart, isWeighted: node.isWeighted, isEnd: node.isEnd, isVisited: node.isVisited, isAnimate: node.isAnimate, isOnPath: node.isOnPath, onClick: onClick, onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, onMouseUp: onMouseUp, grid: state.grid, isCurrentNode: node.isCurrentNode, isHeadOfPath: node.isHeadOfPath, isInstantPath: node.isInstantPath, isYellowPath: node.isYellowPath, isAnimateInstantly: node.isAnimateInstantly, isAnimateSecondPathInstantly: node.isAnimateSecondPathInstantly }))))));
    return react_1.default.createElement("div", { className: "grid" },
        " ",
        grid);
};
exports.default = PathfindingVisualiser;
