import "bootstrap/dist/css/bootstrap.css";
import "./PathfindingVisualiser.css";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
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

const MAZE_ANIMATION_SPEED = 3;

const PathfindingVisualiser = ({
  state,
  changeHandler,
  getNodeWithProperty,
}: propsI) => {
  // @ts-expect-error fix later
  const { handleBar } = useContext(UserContext);

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
    nodes.forEach((n, i) =>
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
      )
    );

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
    if (!(state.isAnimationFinished || !state.isAnimationInProgress)) return;
    if (!pathFinder.buttonClicked) return;
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
    )
      return;

    if (
      state.isAnimationFinished &&
      ["start", "end", "bomb"].includes(pathFinder.mousePressedOn)
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
          isWall:
            item.isWallPreviously &&
            !(item.pos.row === pos.row && item.pos.col === pos.col)
              ? true
              : item.isWall,
          isWeighted:
            item.isWeightedPreviously &&
            !(item.pos.row === pos.row && item.pos.col === pos.col)
              ? true
              : item.isWall,
        }))
      );
      gridCopy[pos.row][pos.col].isWall = false;

      const [startNodePos, endNodePos] = ["start", "end"].map((v) => {
        // get position of start or end or bomb
        const nodePos = eval(`${v}Pos`);
        return (
          pathFinder.mousePressedOn === v
            ? gridCopy[pos.row][pos.col]
            : gridCopy[nodePos.row][nodePos.col]
        ).pos;
      });

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

        // fix repetition of code :(
        toBomb = pathFindingAlgo(gridCopy, startNodePos, bombNodePos);
        gridCopy = clearPath(gridCopy);
        nodesVisitedToBomb = toBomb.nodesVisitedInOrder;
        pathToBomb = toBomb.path;

        toEnd = pathFindingAlgo(gridCopy, bombNodePos, endNodePos);
        gridCopy = clearPath(gridCopy);
        nodesVisitedToEnd = toEnd.nodesVisitedInOrder;
        pathToEnd = toEnd.path;

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

        newGrid = animateInstantly(
          [...pathToBomb, ...pathToEnd],
          "isInstantPath",
          newGrid
        );

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
        const ret = pathFindingAlgo(gridCopy, startNodePos, endNodePos);
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
    if (!pathFinder.mousePressedOn) {
      return changeSquare(squareProperty, pos);
    }
    changeHandler((prev) => {
      return {
        ...prev,
        grid: prev.grid.map((items) =>
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
                    pathFinder.mousePressedOn === "end" ? false : item.isEnd,
                  isStart:
                    pathFinder.mousePressedOn === "start"
                      ? false
                      : item.isStart,
                  isBomb:
                    pathFinder.mousePressedOn === "bomb" ? false : item.isBomb,
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
  };
  const changeSquare = (property: string, pos: posI) =>
    changeHandler(({ grid, ...rest }) => ({
      ...rest,
      grid: grid.map((items) =>
        items.map((item) => {
          const { row, col } = item.pos;
          return row === pos.row && col === pos.col
            ? { ...item, [property]: !item[property as keyof nodeI] }
            : item;
        })
      ),
    }));

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
            if (pathToBomb.length !== 0)
              await animate(
                nodesVisitedToEnd,
                "isAnimateSecondPath",
                state.speed
              );

            if (pathToBomb.length === 0)
              handleBar("No Path to Target Found", "warning");
            else if (pathToEnd.length === 0)
              handleBar("No Path to Destination Found", "warning");

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
            // tried to get the time to compute value for algo, however its always either 0 or 1 miliseconds
            // so I'm not sure what I'm wrong or if the algo is just very fast for a grid of this size

            const { path, nodesVisitedInOrder } = stateAlgo(
              state.grid,
              (getNodeWithProperty("isStart") as nodeI).pos,
              (getNodeWithProperty("isEnd") as nodeI).pos
            );

            await animate(nodesVisitedInOrder, "isAnimate", state.speed);
            if (path.length === 0) handleBar("No Path Found", "warning");
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
          {...{
            onClick,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            key: nodeId,
            grid: state.grid,
            ...node,
          }}
        ></Node>
      ))}
    </div>
  ));
  return <div className="grid"> {grid}</div>;
};
export default PathfindingVisualiser;
