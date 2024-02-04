/* eslint-disable react/no-unescaped-entities */
import "./App.css";
import PathfindingVisualiser from "./PathfindingVisualiser/PathfindingVisualiser";
import { grid } from "./PathfindingVisualiser/grid";
import Navbar from "./PathfindingVisualiser/components/Navbar";
import React, { useState } from "react";
import Key from "./PathfindingVisualiser/components/Key";
import Info from "./PathfindingVisualiser/components/Info";
import Tutorial from "./PathfindingVisualiser/components/Tutorial";
import type { gridI, nodeI } from "./PathfindingVisualiser/grid";
interface stateI {
  isAnimationInProgress: boolean;
  algoPicked: string;
  mazePicked: string;
  bombPicked: boolean;
  isAnimationFinished: boolean;
  isVisualiseAttempted: boolean;
  scannedNodes: number;
  pathLength: number;
  grid: gridI;
  speed: number;
}

const START_DEFAULT_ROW_POSITION = 11;
const START_DEFAULT_COL_POSITION = 20;

const END_DEFAULT_ROW_POSITION = 11;
const END_DEFAULT_COL_POSITION = 30;

const App = () => {
  const [state, setState] = useState<stateI>({
    isAnimationInProgress: false,
    algoPicked: "",
    mazePicked: "",
    bombPicked: false,
    isAnimationFinished: false,
    isVisualiseAttempted: false,
    scannedNodes: 0,
    pathLength: 0,
    grid,
    speed: 15,
  });
  const [modalState, setModalState] = useState<string>("close");

  const getNodeWithProperty = (property: string) => {
    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid[i].length; j++) {
        if (state.grid[i][j][property as keyof nodeI]) {
          return state.grid[i][j];
        }
      }
    }
    return null;
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
    console.log("hhhhh");
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
  const showTutorial = () => setModalState("modal-one");
  return (
    <>
      <Navbar
        showTutorial={showTutorial}
        changeHandler={setState}
        state={state}
        resetBoard={resetBoard}
        clearObstacles={clearObstacles}
        clearPath={clearPath}
        removeBomb={removeBomb}
        addBomb={addBomb}
      />
      <Key />
      <PathfindingVisualiser
        state={state}
        changeHandler={setState}
        getNodeWithProperty={getNodeWithProperty}
      />
      <Info
        algorithmType={state.algoPicked}
        scannedNodes={state.scannedNodes}
        pathLength={state.pathLength}
      />

      <Tutorial modalState={modalState} setModalState={setModalState} />
    </>
  );
};
export type { stateI };
export default App;
