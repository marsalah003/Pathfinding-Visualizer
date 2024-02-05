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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/no-unescaped-entities */
require("./App.css");
const PathfindingVisualiser_1 = __importDefault(require("./PathfindingVisualiser/PathfindingVisualiser"));
const grid_1 = require("./PathfindingVisualiser/grid");
const Navbar_1 = __importDefault(require("./PathfindingVisualiser/components/Navbar"));
const react_1 = __importStar(require("react"));
const Key_1 = __importDefault(require("./PathfindingVisualiser/components/Key"));
const Info_1 = __importDefault(require("./PathfindingVisualiser/components/Info"));
const Tutorial_1 = __importDefault(require("./PathfindingVisualiser/components/Tutorial"));
const START_DEFAULT_ROW_POSITION = 11;
const START_DEFAULT_COL_POSITION = 20;
const END_DEFAULT_ROW_POSITION = 11;
const END_DEFAULT_COL_POSITION = 30;
const App = () => {
    const [state, setState] = (0, react_1.useState)({
        isAnimationInProgress: false,
        algoPicked: "",
        mazePicked: "",
        bombPicked: false,
        isAnimationFinished: false,
        isVisualiseAttempted: false,
        scannedNodes: 0,
        pathLength: 0,
        grid: grid_1.grid,
        speed: 15,
    });
    const [modalState, setModalState] = (0, react_1.useState)("close");
    const getNodeWithProperty = (property) => {
        for (let i = 0; i < state.grid.length; i++) {
            for (let j = 0; j < state.grid[i].length; j++) {
                if (state.grid[i][j][property]) {
                    return state.grid[i][j];
                }
            }
        }
        return null;
    };
    const removeBomb = () => {
        setState((prev) => (Object.assign(Object.assign({}, prev), { bombPicked: false, grid: prev.grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isBomb: false })))) })));
        clearPath();
    };
    const addBomb = () => {
        console.log("hhhhh");
        setState((prev) => (Object.assign(Object.assign({}, prev), { bombPicked: true })));
        clearPath();
    };
    const clearObstacles = () => {
        setState((prev) => (Object.assign(Object.assign({}, prev), { grid: prev.grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isWall: false, isWeighted: false, isWallPreviously: false })))) })));
    };
    const resetBoard = () => {
        setState((prev) => (Object.assign(Object.assign({}, prev), { mazePicked: "", algoPicked: "", isAnimationFinished: false, isAnimationInProgress: false, grid: prev.grid.map((items) => items.map((item) => {
                const { row, col } = item.pos;
                return Object.assign(Object.assign({}, item), { isWall: false, isWallPreviously: false, isStart: row === START_DEFAULT_ROW_POSITION &&
                        col === START_DEFAULT_COL_POSITION, isEnd: row === END_DEFAULT_ROW_POSITION &&
                        col === END_DEFAULT_COL_POSITION, distance: Infinity, isVisited: false, previousNode: null, isOnPath: false, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false, isAnimateInstantly: false, isWeighted: false, isWeightedPreviously: false, isInstantPath: false, isAnimate: false, isHeadOfPath: false });
            })) })));
    };
    const clearPath = () => {
        setState((prev) => (Object.assign(Object.assign({}, prev), { mazePicked: "", isAnimationFinished: false, isAnimationInProgress: false, grid: prev.grid.map((items) => items.map((item) => (Object.assign(Object.assign({}, item), { isOnPath: false, isAnimateSecondPath: false, isAnimateSecondPathInstantly: false, isAnimateInstantly: false, isInstantPath: false, isAnimate: false, isHeadOfPath: false })))) })));
    };
    const showTutorial = () => setModalState("modal-one");
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Navbar_1.default, { showTutorial: showTutorial, changeHandler: setState, state: state, resetBoard: resetBoard, clearObstacles: clearObstacles, clearPath: clearPath, removeBomb: removeBomb, addBomb: addBomb }),
        react_1.default.createElement(Key_1.default, null),
        react_1.default.createElement(PathfindingVisualiser_1.default, { state: state, changeHandler: setState, getNodeWithProperty: getNodeWithProperty }),
        react_1.default.createElement(Info_1.default, { algorithmType: state.algoPicked, scannedNodes: state.scannedNodes, pathLength: state.pathLength }),
        react_1.default.createElement(Tutorial_1.default, { modalState: modalState, setModalState: setModalState })));
};
exports.default = App;
