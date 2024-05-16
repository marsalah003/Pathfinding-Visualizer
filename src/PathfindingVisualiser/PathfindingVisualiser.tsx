import "bootstrap/dist/css/bootstrap.css";
import "./PathfindingVisualiser.css";
import React, { useEffect, useState } from "react";
import Node from "./components/Node";
import {
  clearEverything,
  clearPath,
  clearPathAndVisitedSquares,
  getMazeAlgo,
  getPathFindingAlgo,
} from "./utils";

//types
import type { stateI } from "../App";
import type { gridI, nodeI, posI } from "./grid";
interface propsI {
  state: stateI;
  changeHandler: React.Dispatch<React.SetStateAction<stateI>>;
  getNodeWithProperty: (property: string) => nodeI | null;
}

const MAZE_ANIMATION_SPEED = 10;

const PathfindingVisualiser = ({
  state,
  changeHandler,
  getNodeWithProperty,
}: propsI) => {
  const [pathFinder, setPathFinder] = useState({
    mousePressedOn: "",
    buttonClicked: "",
    isMousePressed: false,
  });

  const animateInstantly = (
    nodes: posI[],
    property: string,
    newGrid: gridI
  ) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      newGrid = newGrid.map((items) =>
        items.map((item) => {
          const { row, col } = item.pos;

          if (
            row === node.row &&
            col === node.col &&
            property === "isInstantPath"
          )
            return {
              ...item,
              [property]: true,
              isHeadOfPath: false,
              isAnimate: false,
              isAnimateInstantly: false,
            };
          else if (
            row === node.row &&
            col === node.col &&
            (property === "isAnimateInstantly" ||
              property === "isAnimateSecondPathInstantly")
          ) {
            return {
              ...item,
              [property]: true,
              isCurrentNode: false,
              isOnPath: false,
              isInstantPath: false,
            };
          } else {
            return item;
          }
        })
      );
    }
    return newGrid;
  };

  const animate = (nodes: posI[], property: string, delay: number) => {
    const promises: any[] = [];
    nodes.forEach((n, i) => {
      promises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            changeHandler((prev) => {
              const ret = {
                ...prev,
                grid: prev.grid.map((items) =>
                  items.map((item) => {
                    const { row, col } = item.pos;
                    return row === n.row && col === n.col
                      ? property === "isOnPath"
                        ? { ...item, [property]: true, isHeadOfPath: true }
                        : property === "isAnimate" ||
                          property === "isAnimateSecondPath"
                        ? { ...item, [property]: true, isCurrentNode: true }
                        : { ...item, [property]: true }
                      : { ...item, isHeadOfPath: false, isCurrentNode: false };
                  })
                ),
              };

              resolve("Success!");
              return ret;
            });
          }, delay * i);
        })
      );
    });

    return Promise.all(promises);
  };

  const onMouseDown = (event: React.MouseEvent<HTMLElement>, pos: posI) => {
    if (state.isAnimationFinished || !state.isAnimationInProgress) {
      const property = event.button === 0 ? "left" : "right";
      const endPos = (getNodeWithProperty("isEnd") as nodeI).pos;
      const startPos = (getNodeWithProperty("isStart") as nodeI).pos;
      let bombPos: posI;
      if (getNodeWithProperty("isBomb"))
        bombPos = (getNodeWithProperty("isBomb") as nodeI).pos;

      setPathFinder((prev) => ({
        ...prev,
        isMousePressed: true,
        buttonClicked: property,
        mousePressedOn:
          pos.col === startPos.col && pos.row === startPos.row
            ? "start"
            : pos.col === endPos.col && pos.row === endPos.row
            ? "end"
            : bombPos && pos.col === bombPos.col && pos.row === bombPos.row
            ? "bomb"
            : "",
      }));
    }
  };

  const onMouseEnter = (pos: posI, grid: gridI) => {
    if (state.isAnimationFinished || !state.isAnimationInProgress) {
      if (pathFinder.buttonClicked === "") return;
      const squareProperty =
        pathFinder.buttonClicked === "left" ? "isWall" : "isWeighted";

      let bombPos;
      if (getNodeWithProperty("isBomb"))
        bombPos = (getNodeWithProperty("isBomb") as nodeI).pos;

      const endPos = (getNodeWithProperty("isEnd") as nodeI).pos;
      const startPos = (getNodeWithProperty("isStart") as nodeI).pos;

      if (
        (pos.row === startPos.row && pos.col === startPos.col) ||
        (pos.row === endPos.row && pos.col === endPos.col) ||
        (bombPos && pos.row === bombPos.row && pos.col === bombPos.col)
        // grid[pos.row][pos.col].isWeighted
      )
        return;

      if (
        state.isAnimationFinished &&
        (pathFinder.mousePressedOn === "start" ||
          pathFinder.mousePressedOn === "end" ||
          pathFinder.mousePressedOn === "bomb")
      ) {
        let gridCopy = grid.map((items) =>
          items.map((item) => ({
            ...item,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            isOnPath: false,
            isAnimateSecondPath: false,
            isAnimateSecondPathInstantly: false,
            isAnimateInstantly: false,
            isHeadOfPath: false,
          }))
        );
        gridCopy[pos.row][pos.col].isWall = false;

        const startNodePos =
          pathFinder.mousePressedOn === "start"
            ? gridCopy[pos.row][pos.col].pos
            : gridCopy[startPos.row][startPos.col].pos;
        const endNodePos =
          pathFinder.mousePressedOn === "end"
            ? gridCopy[pos.row][pos.col].pos
            : gridCopy[endPos.row][endPos.col].pos;
        if (bombPos)
          bombPos =
            pathFinder.mousePressedOn === "bomb"
              ? gridCopy[pos.row][pos.col].pos
              : gridCopy[bombPos.row][bombPos.col].pos;

        let newGrid: gridI = [];
        for (let i = 0; i < state.grid.length; i++) {
          newGrid[i] = state.grid[i].slice();
        }

        newGrid = newGrid.map((items) =>
          items.map((item) => ({
            ...item,
            isAnimate: false,
            isOnPath: false,
            isInstantPath: false,
            isAnimateInstantly: false,
            isVisited: false,
            previousNode: null,
            totalDistance: Infinity,
            isAnimateSecondPath: false,
            isAnimateSecondPathInstantly: false,
          }))
        );
        const pathFindingAlgo = getPathFindingAlgo(state.algoPicked);
        let toBomb,
          toEnd,
          pathToBomb!: posI[],
          pathToEnd!: posI[],
          nodesVisitedToBomb!: posI[],
          nodesVisitedToEnd!: posI[],
          nodesVisitedInOrder!: posI[],
          path!: posI[];
        if (getNodeWithProperty("isBomb")) {
          //@ts-expect-error fix later
          const bombNodePos = gridCopy[bombPos.row][bombPos.col].pos;
          switch (pathFinder.mousePressedOn) {
            case "start":
              toBomb = pathFindingAlgo(
                gridCopy,
                gridCopy[pos.row][pos.col].pos,
                bombNodePos
              );
              gridCopy = clearPath(gridCopy);
              nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
              pathToBomb = toBomb.path;

              toEnd = pathFindingAlgo(gridCopy, bombNodePos, endNodePos);
              gridCopy = clearPath(gridCopy);
              nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
              pathToEnd = toEnd.path;
              break;
            case "end":
              toBomb = pathFindingAlgo(gridCopy, startNodePos, bombNodePos);
              nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
              pathToBomb = toBomb.path;

              gridCopy = clearPath(gridCopy);

              toEnd = pathFindingAlgo(
                gridCopy,
                bombNodePos,
                gridCopy[pos.row][pos.col].pos
              );
              gridCopy = clearPath(gridCopy);
              nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
              pathToEnd = toEnd.path;
              break;
            case "bomb":
              toBomb = pathFindingAlgo(
                gridCopy,
                startNodePos,
                gridCopy[pos.row][pos.col].pos
              );
              nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
              pathToBomb = toBomb.path;

              gridCopy = clearPath(gridCopy);

              toEnd = pathFindingAlgo(gridCopy, bombNodePos, endNodePos);
              gridCopy = clearPath(gridCopy);
              nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
              pathToEnd = toEnd.path;

              // newGrid = animateInstantly;
              break;
            default:
              break;
          }
          newGrid = animateInstantly(
            nodesVisitedToEnd as posI[],
            "isAnimateSecondPathInstantly",
            newGrid
          );
          newGrid = animateInstantly(
            nodesVisitedToBomb as posI[],
            "isAnimateInstantly",
            newGrid
          );
          newGrid = animateInstantly(pathToBomb, "isInstantPath", newGrid);
          newGrid = animateInstantly(pathToEnd, "isInstantPath", newGrid);
          const scannedNodes =
            nodesVisitedToBomb.length + nodesVisitedToEnd.length;
          const pathLength = pathToBomb.length + pathToEnd.length;
          changeHandler((prev) => ({
            ...prev,
            grid: newGrid,
            scannedNodes,
            pathLength,
          }));
        } else {
          const ret = pathFindingAlgo(
            gridCopy,
            pathFinder.mousePressedOn === "start"
              ? gridCopy[pos.row][pos.col].pos
              : startNodePos,
            pathFinder.mousePressedOn === "start"
              ? endNodePos
              : gridCopy[pos.row][pos.col].pos
          );
          path = ret.path;
          nodesVisitedInOrder = ret.nodesVisitedInOrder;

          newGrid = animateInstantly(
            nodesVisitedInOrder,
            "isAnimateInstantly",
            newGrid
          );
          newGrid = animateInstantly(path, "isInstantPath", newGrid);
          changeHandler((prev) => ({
            ...prev,
            grid: newGrid,
            pathLength: path.length,
            scannedNodes: nodesVisitedInOrder.length,
          }));
        }
      }
      pathFinder.mousePressedOn === ""
        ? changeSquare(squareProperty, pos)
        : changeHandler((prev) => {
            const newArray = [];
            for (let i = 0; i < prev.grid.length; i++) {
              newArray[i] = prev.grid[i].slice();
            }
            return {
              ...prev,
              grid: newArray.map((items) =>
                items.map((item) => {
                  const { row, col } = item.pos;
                  const putWall =
                    (item.isWallPreviously &&
                      (pathFinder.mousePressedOn === "start"
                        ? !item.isEnd && !item.isBomb
                        : pathFinder.mousePressedOn === "end"
                        ? !item.isStart && !item.isBomb
                        : !item.isStart && !item.isEnd)) ||
                    item.isWall;
                  return row === pos.row && col === pos.col
                    ? {
                        ...item,
                        isEnd: pathFinder.mousePressedOn === "end",
                        isStart: pathFinder.mousePressedOn === "start",
                        isBomb: pathFinder.mousePressedOn === "bomb",
                        [squareProperty]: false,
                        isWallPreviously: item.isWall,
                        isWeightedPreviously: item.isWeighted,
                        isWeighted: false,
                        isWall: false,
                      }
                    : {
                        ...item,
                        isEnd:
                          pathFinder.mousePressedOn === "end"
                            ? false
                            : item.isEnd,
                        isStart:
                          pathFinder.mousePressedOn === "start"
                            ? false
                            : item.isStart,
                        isBomb:
                          pathFinder.mousePressedOn === "bomb"
                            ? false
                            : item.isBomb,
                        isWall: putWall,
                        isWallPreviously:
                          !item.isBomb && !item.isStart && !item.isEnd
                            ? false
                            : item.isWall,

                        isWeighted: item.isWeightedPreviously
                          ? true
                          : item.isWeighted,
                      };
                })
              ),
            };
          });
    }
  };
  const changeSquare = (property: string, pos: posI) => {
    changeHandler((prev) => {
      const newArray = [];
      for (let i = 0; i < prev.grid.length; i++) {
        newArray[i] = prev.grid[i].slice();
      }
      const newGrid = newArray.map((items) =>
        items.map((item) => {
          const { row, col } = item.pos;
          return row === pos.row && col === pos.col
            ? { ...item, [property]: !item[property as keyof nodeI] }
            : item;
        })
      );
      return {
        ...prev,
        grid: newGrid,
      };
    });
  };

  const onClick = (event: React.MouseEvent<HTMLElement>, pos: posI) => {
    if (state.isAnimationFinished || !state.isAnimationInProgress) {
      const property = event.button === 0 ? "isWall" : "isWeighted";
      const endPos = (getNodeWithProperty("isEnd") as nodeI).pos;
      const startPos = (getNodeWithProperty("isStart") as nodeI).pos;
      let bombPos;
      if (getNodeWithProperty("isBomb"))
        bombPos = (getNodeWithProperty("isBomb") as nodeI).pos;
      if (
        (pos.col === endPos.col && pos.row === endPos.row) ||
        (pos.col === startPos.col && pos.row === startPos.row) ||
        (bombPos && pos.col === bombPos.col && pos.row === bombPos.row)
      ) {
        return;
      }
      changeHandler((prev) => {
        const newArray = [];
        for (let i = 0; i < prev.grid.length; i++) {
          newArray[i] = prev.grid[i].slice();
        }

        return {
          ...prev,
          grid: newArray.map((items) =>
            items.map((item) => {
              const { row, col } = item.pos;
              return row === pos.row && col === pos.col
                ? {
                    ...item,
                    [property]: !item[property],
                    isWallPreviously: false,
                  }
                : item;
            })
          ),
        };
      });
    }
  };
  const onMouseUp = () =>
    setPathFinder((prev) => ({
      ...prev,
      buttonClicked: "",
      mousePressedOn: "",
      isMousePressed: false,
    }));
  const handleBombButton = () => {
    changeHandler((prev) => {
      const newArray = [];
      for (let i = 0; i < prev.grid.length; i++) {
        newArray[i] = prev.grid[i].slice();
      }

      return {
        ...prev,
        grid: newArray.map((items) =>
          items.map((item) => {
            const { row, col } = item.pos;

            return row === 11 && col === 26
              ? { ...item, isBomb: !item.isBomb, isWall: false }
              : item;
          })
        ),
      };
    });
  };

  useEffect(() => {
    (async () => {
      if (state.bombPicked && getNodeWithProperty("isBomb") == null) {
        handleBombButton();
      }

      if (
        ((state.isAnimationFinished || !state.isAnimationInProgress) &&
          state.isVisualiseAttempted &&
          state.algoPicked) ||
        state.mazePicked
      ) {
        const newGrid =
          state.mazePicked === ""
            ? clearPathAndVisitedSquares(state.grid)
            : clearEverything(state.grid);
        changeHandler((prev) => ({ ...prev, grid: newGrid }));
        if (state.mazePicked) {
          changeHandler((prev) => ({
            ...prev,
            isAnimationFinished: false,
            isAnimationInProgress: true,
          }));
          const mazeAlgo = getMazeAlgo(state.mazePicked);
          const bomb = getNodeWithProperty("isBomb");
          const maze = mazeAlgo(
            state.grid,
            (getNodeWithProperty("isStart") as nodeI).pos,
            (getNodeWithProperty("isEnd") as nodeI).pos,
            bomb && bomb.pos
          );
          const obstacle =
            state.mazePicked === "Random Weight Maze" ||
            state.mazePicked === "Weight Recursive Division"
              ? "isWeighted"
              : "isWall";
          await animate(maze, obstacle, MAZE_ANIMATION_SPEED);
          changeHandler((prev) => ({
            ...prev,
            isAnimationInProgress: false,
            mazePicked: "",
          }));
        } else {
          changeHandler((prev) => ({
            ...prev,
            isAnimationInProgress: true,
            isAnimationFinished: false,
            scannedNodes: 0,
            pathLength: 0,
          }));
          const stateAlgo = getPathFindingAlgo(state.algoPicked);
          const newGrid = state.grid.map((items) =>
            items.map((item) => ({
              ...item,
              isVisited: false,
              distance: Infinity,
              totalDistance: Infinity,
              previousNode: null,
            }))
          );
          if (state.bombPicked) {
            const toBomb = stateAlgo(
              newGrid,
              (getNodeWithProperty("isStart") as nodeI).pos,
              (getNodeWithProperty("isBomb") as nodeI).pos
            );
            const pathToBomb = toBomb.path;
            const nodesVisitedToBomb = toBomb.nodesVisitedInOrder;

            const toEnd = stateAlgo(
              newGrid.map((items) =>
                items.map((item) => ({
                  ...item,
                  isVisited: false,
                  distance: Infinity,
                  totalDistance: Infinity,
                  previousNode: null,
                }))
              ),
              (getNodeWithProperty("isBomb") as nodeI).pos,
              (getNodeWithProperty("isEnd") as nodeI).pos
            );
            const pathToEnd = toEnd.path;
            const nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
            await animate(nodesVisitedToBomb, "isAnimate", state.speed);
            await animate(
              nodesVisitedToEnd,
              "isAnimateSecondPath",
              state.speed
            );
            await animate(pathToBomb, "isOnPath", state.speed * 2);
            await animate(pathToEnd, "isOnPath", state.speed * 2);
            changeHandler((prev) => ({
              ...prev,
              isAnimationInProgress: false,
              isAnimationFinished: true,
              isVisualiseAttempted: false,
              scannedNodes:
                nodesVisitedToBomb.length + nodesVisitedToEnd.length,
              pathLength: pathToBomb.length + pathToEnd.length,
            }));
          } else {
            const { path, nodesVisitedInOrder } = stateAlgo(
              state.grid,
              (getNodeWithProperty("isStart") as nodeI).pos,
              (getNodeWithProperty("isEnd") as nodeI).pos
            );

            await animate(nodesVisitedInOrder, "isAnimate", state.speed);
            await animate(path, "isOnPath", state.speed * 2);
            changeHandler((prev) => ({
              ...prev,
              isAnimationInProgress: false,
              isAnimationFinished: true,
              isVisualiseAttempted: false,
              scannedNodes: nodesVisitedInOrder.length,
              pathLength: path.length,
            }));
          }
        }
      }
    })();
  }, [
    state.algoPicked,
    state.mazePicked,
    state.isVisualiseAttempted,
    state.bombPicked,
  ]);

  const grid = state.grid.map((row, rowId) => (
    <div key={rowId} className="grid-row">
      {row.map((node, nodeId) => (
        <Node
          isVisitedPreviously={node.isVisitedPreviously}
          key={nodeId}
          isAnimateSecondPath={node.isAnimateSecondPath}
          isBomb={node.isBomb}
          pos={node.pos}
          isWall={node.isWall}
          isStart={node.isStart}
          isWeighted={node.isWeighted}
          isEnd={node.isEnd}
          isVisited={node.isVisited}
          isAnimate={node.isAnimate}
          isOnPath={node.isOnPath}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
          grid={state.grid}
          isCurrentNode={node.isCurrentNode}
          isHeadOfPath={node.isHeadOfPath}
          isInstantPath={node.isInstantPath}
          isYellowPath={node.isYellowPath}
          isAnimateInstantly={node.isAnimateInstantly}
          isAnimateSecondPathInstantly={node.isAnimateSecondPathInstantly}
        ></Node>
      ))}
    </div>
  ));
  return <div className="grid"> {grid}</div>;
};
export default PathfindingVisualiser;
