import "./App.css";
import "./PathFIndingVisualiser/PathFindingVisualiser";
import PathFindingVisualiser from "./PathFIndingVisualiser/PathFindingVisualiser";
import gridData from "./PathFIndingVisualiser/grid";
import Navbar from "./Navbar";
import React from "react";
const START_DEFAULT_ROW_POSITION = 11;
const START_DEFAULT_COL_POSITION = 20;

const END_DEFAULT_ROW_POSITION = 11;
const END_DEFAULT_COL_POSITION = 30;

export default function App() {
  const [state, setState] = React.useState({
    isAnimationInProgress: false,
    algoPicked: "",
    mazePicked: "",
    bombPicked: false,
    isAnimationFinished: false,
    isVisualiseAttempted: false,

    grid: gridData,
    speed: 15,
  });
  console.log(state.grid);
  const getNodeWithProperty = (property) => {
    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid[i].length; j++) {
        if (state.grid[i][j][property]) {
          return state.grid[i][j];
        }
      }
    }
  };
  const removeBomb = () => {
    setState((prev) => ({
      ...prev,
      bombPicked: false,
      grid: prev.grid.map((items) =>
        items.map((item) => ({ ...item, isBomb: false }))
      ),
    }));
    clearPath();
  };
  const addBomb = () => {
    setState((prev) => ({ ...prev, bombPicked: true }));
    clearPath();
  };

  const clearObstacles = () => {
    setState((prev) => ({
      ...prev,
      grid: prev.grid.map((items) =>
        items.map((item) => ({
          ...item,
          isWall: false,
          isWeighted: false,
          isWallPreviously: false,
        }))
      ),
    }));
  };

  const resetBoard = () => {
    setState((prev) => ({
      ...prev,
      mazePicked: "",
      algoPicked: "",
      isAnimationFinished: false,
      isAnimationInProgress: false,
      grid: prev.grid.map((items) =>
        items.map((item) => {
          const { row, col } = item.pos;
          return {
            ...item,
            isWall: false,
            isWallPreviously: false,
            isStart:
              row === START_DEFAULT_ROW_POSITION &&
              col === START_DEFAULT_COL_POSITION,
            isEnd:
              row === END_DEFAULT_ROW_POSITION &&
              col === END_DEFAULT_COL_POSITION,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            isOnPath: false,
            isAnimateSecondPath: false,
            isAnimateSecondPathInstantly: false,
            isAnimateInstantly: false,
            isWeighted: false,
            isInstantPath: false,
            isAnimate: false,
            isHeadOfPath: false,
          };
        })
      ),
    }));
  };
  const clearPath = () => {
    setState((prev) => ({
      ...prev,
      mazePicked: "",
      isAnimationFinished: false,
      isAnimationInProgress: false,
      grid: prev.grid.map((items) =>
        items.map((item) => ({
          ...item,

          isOnPath: false,
          isAnimateSecondPath: false,
          isAnimateSecondPathInstantly: false,
          isAnimateInstantly: false,

          isInstantPath: false,
          isAnimate: false,
          isHeadOfPath: false,
        }))
      ),
    }));
  };

  return (
    <>
      <Navbar
        changeHandler={setState}
        state={state}
        resetBoard={resetBoard}
        clearObstacles={clearObstacles}
        clearPath={clearPath}
        removeBomb={removeBomb}
        addBomb={addBomb}
      />
      <PathFindingVisualiser
        state={state}
        changeHandler={setState}
        getNodeWithProperty={getNodeWithProperty}
      />
      ;
    </>
  );
}
