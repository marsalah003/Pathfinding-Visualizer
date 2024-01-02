import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState, useRef } from "react";
import "./PathFindingVisualiser.css";
import Node from "./components/Node.js";

import DepthFirstSearch from "./Pathfinding-Algorithms/DepthFirstSearch.js";
import BreadthFirstSearch from "./Pathfinding-Algorithms/BreadthFirstSearch.js";
import Dijkstra from "./Pathfinding-Algorithms/Dijkstra.js";
import Randomn from "./Maze-Generation-Algorithms/RandomnMaze.js";
import RecursiveDivisionMaze from "./Maze-Generation-Algorithms/RecursiveDivisionMaze.js";
import AStar from "./Pathfinding-Algorithms/AStar.js";
import RandomWalk from "./Pathfinding-Algorithms/RandomWalk.js";
import RecursiveHorizontal from "./Maze-Generation-Algorithms/RecursiveHorizontal.js";
import RecursiveVertical from "./Maze-Generation-Algorithms/RecursiveVertical.js";
import bidirectionalGreedySearch from "./Pathfinding-Algorithms/bidirectionalGreedySearch.js";
import greedyBFS from "./Pathfinding-Algorithms/greedyBestFirstSearch.js";
const MAZE_ANIMATION_SPEED = 10;
export default function PathFindingVisualiser({
  state,
  changeHandler,
  getNodeWithProperty,
}) {
  const [pathFinder, setPathFinder] = useState({
    mousePressedOn: "",
    buttonClicked: "",
    isMousePressed: false,
  });
  const gridRef = useRef(null);
  const clearEverything = (grid) => {
    return grid.map((items) =>
      items.map((item) => ({
        ...item,
        isOnPath: false,
        isInstantPath: false,
        isAnimate: false,
        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,
        isWall: false,
        isWeighted: false,
        isWallPreviously: false,

        previousNode: null,
        isAnimateSecondPath: false,

        isAnimateInstantly: false,

        isHeadOfPath: false,
      }))
    );
  };

  const clearPath = (grid) => {
    return grid.map((items) =>
      items.map((item) => ({
        ...item,
        isOnPath: false,
        isAnimateSecondPath: false,
        isAnimateSecondPathInstantly: false,
        isAnimateInstantly: false,
        isInstantPath: false,
        isAnimate: false,
        isHeadOfPath: false,

        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,

        isWallPreviously: false,

        previousNode: null,
      }))
    );
  };
  const clearPathAndVisitedSquares = (grid) => {
    return grid.map((items) =>
      items.map((item) => ({
        ...item,
        isOnPath: false,
        isAnimate: false,
        isInstantPath: false,
        isAnimateInstantly: false,
        isAnimateSecondPath: false,
        isAnimateSecondPathInstantly: false,
      }))
    );
  };

  const animateInstantly = (nodes, property, newGrid) => {
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

  const animate = (nodes, property, delay) => {
    const promises = [];
    for (let i = 0; i < nodes.length; i++) {
      promises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            const node = nodes[i];
            changeHandler((prev) => {
              const newArray = [];
              for (var i = 0; i < prev.grid.length; i++) {
                newArray[i] = prev.grid[i].slice();
              }
              const ret = {
                ...prev,
                grid: newArray.map((items) =>
                  items.map((item) => {
                    const { row, col } = item.pos;
                    return row === node.row && col === node.col
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

  const onMouseEnter = (pos, grid) => {
    if (state.isAnimationFinished || !state.isAnimationInProgress) {
      if (pathFinder.buttonClicked === "") return;
      const squareProperty =
        pathFinder.buttonClicked === "left" ? "isWall" : "isWeighted";

      let bombPos;
      if (getNodeWithProperty("isBomb"))
        bombPos = getNodeWithProperty("isBomb").pos;

      const endPos = getNodeWithProperty("isEnd").pos;
      const startPos = getNodeWithProperty("isStart").pos;

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

        let newGrid = [];
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
          pathToBomb,
          pathToEnd,
          nodesVisitedToBomb,
          nodesVisitedToEnd,
          nodesVisitedInOrder,
          path;
        if (getNodeWithProperty("isBomb")) {
          let bombNodePos = gridCopy[bombPos.row][bombPos.col].pos;
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
            nodesVisitedToEnd,
            "isAnimateSecondPathInstantly",
            newGrid
          );
          newGrid = animateInstantly(
            nodesVisitedToBomb,
            "isAnimateInstantly",
            newGrid
          );
          newGrid = animateInstantly(pathToBomb, "isInstantPath", newGrid);
          newGrid = animateInstantly(pathToEnd, "isInstantPath", newGrid);
          let scannedNodes =
            nodesVisitedToBomb.length + nodesVisitedToEnd.length;
          let pathLength = pathToBomb.length + pathToEnd.length;
          changeHandler((prev) => ({
            ...prev,
            grid: newGrid,
            scannedNodes,
            pathLength,
          }));
        } else {
          let ret = pathFindingAlgo(
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
          console.log(path);
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
            for (var i = 0; i < prev.grid.length; i++) {
              newArray[i] = prev.grid[i].slice();
            }
            return {
              ...prev,
              grid: newArray.map((items) =>
                items.map((item) => {
                  const { row, col } = item.pos;
                  let putWall =
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
  const changeSquare = (property, pos) => {
    changeHandler((prev) => {
      const newArray = [];
      for (var i = 0; i < prev.grid.length; i++) {
        newArray[i] = prev.grid[i].slice();
      }
      const newGrid = newArray.map((items) =>
        items.map((item) => {
          const { row, col } = item.pos;
          return row === pos.row && col === pos.col
            ? { ...item, [property]: !item[property] }
            : item;
        })
      );
      return {
        ...prev,
        grid: newGrid,
      };
    });
  };

  const onClick = (event, pos, grid) => {
    if (state.isAnimationFinished || !state.isAnimationInProgress) {
      const property = event.button === 0 ? "isWall" : "isWeighted";
      const endPos = getNodeWithProperty("isEnd").pos;
      const startPos = getNodeWithProperty("isStart").pos;
      let bombPos;
      if (getNodeWithProperty("isBomb"))
        bombPos = getNodeWithProperty("isBomb").pos;
      if (
        (pos.col === endPos.col && pos.row === endPos.row) ||
        (pos.col === startPos.col && pos.row === startPos.row) ||
        (bombPos && pos.col === bombPos.col && pos.row === bombPos.row)
      ) {
        return;
      }
      changeHandler((prev) => {
        const newArray = [];
        for (var i = 0; i < prev.grid.length; i++) {
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
  const onMouseUp = (pos) =>
    setPathFinder((prev) => ({
      ...prev,
      buttonClicked: "",
      mousePressedOn: "",
      isMousePressed: false,
    }));
  const handleBombButton = () => {
    changeHandler((prev) => {
      const newArray = [];
      for (var i = 0; i < prev.grid.length; i++) {
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

  const getPathFindingAlgo = (algoPicked) => {
    switch (algoPicked) {
      case "Breadth-First Search":
        return BreadthFirstSearch;
      case "Depth-First Search":
        return DepthFirstSearch;
      case "A*":
        return AStar;
      case "Dijkstra's algorithm":
        return Dijkstra;
      case "Random Walk":
        return RandomWalk;
      case "Bidirectional Greedy Search":
        return bidirectionalGreedySearch;
      case "Greedy Best First Search":
        return greedyBFS;
      default:
        break;
    }
  };
  const getMazeAlgo = (mazePicked) => {
    switch (mazePicked) {
      case "Recursive Division":
      case "Weight Recursive Division":
        return RecursiveDivisionMaze;

      case "Horizontal":
        return RecursiveHorizontal;
      case "Vertical":
        return RecursiveVertical;
      case "Random Maze":
      case "Random Weight Maze":
        return Randomn;

      default:
        break;
    }
  };

  useEffect(() => {
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
        let maze = mazeAlgo(
          state.grid,
          getNodeWithProperty("isStart").pos,
          getNodeWithProperty("isEnd").pos,
          getNodeWithProperty("isBomb") && getNodeWithProperty("isBomb").pos
        );
        let obstacle =
          state.mazePicked === "Random Weight Maze" ||
          state.mazePicked === "Weight Recursive Division"
            ? "isWeighted"
            : "isWall";
        animate(maze, obstacle, MAZE_ANIMATION_SPEED).then(() =>
          changeHandler((prev) => ({
            ...prev,
            isAnimationInProgress: false,
            mazePicked: "",
          }))
        );
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
            getNodeWithProperty("isStart").pos,
            getNodeWithProperty("isBomb").pos
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
            getNodeWithProperty("isBomb").pos,
            getNodeWithProperty("isEnd").pos
          );
          const pathToEnd = toEnd.path;
          const nodesVisitedToEnd = toEnd.nodesVisitedInOrder;

          animate(nodesVisitedToBomb, "isAnimate", state.speed)
            .then(() =>
              animate(nodesVisitedToEnd, "isAnimateSecondPath", state.speed)
            )
            .then(() => animate(pathToBomb, "isOnPath", state.speed * 2))
            .then(() => animate(pathToEnd, "isOnPath", state.speed * 2))

            .then(() => {
              changeHandler((prev) => ({
                ...prev,
                isAnimationInProgress: false,
                isAnimationFinished: true,
                isVisualiseAttempted: false,
                scannedNodes:
                  nodesVisitedToBomb.length + nodesVisitedToEnd.length,
                pathLength: pathToBomb.length + pathToEnd.length,
              }));
            });
        } else {
          const { path, nodesVisitedInOrder } = stateAlgo(
            state.grid,
            getNodeWithProperty("isStart").pos,
            getNodeWithProperty("isEnd").pos
          );
          animate(nodesVisitedInOrder, "isAnimate", state.speed).then(() => {
            animate(path, "isOnPath", state.speed * 2).then(() => {
              changeHandler((prev) => ({
                ...prev,
                isAnimationInProgress: false,
                isAnimationFinished: true,
                isVisualiseAttempted: false,
                scannedNodes: nodesVisitedInOrder.length,
                pathLength: path.length,
              }));
            });
          });
        }
      }
    }
  }, [
    state.algoPicked,
    state.mazePicked,
    state.isVisualiseAttempted,
    state.bombPicked,
  ]);

  const grid = state.grid.map((row, rowId) => (
    <div key={rowId}>
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
          distance={node.distance}
          isInstantPath={node.isInstantPath}
          isAnimationFinished={state.isAnimationFinished}
          isYellowPath={node.isYellowPath}
          totalDistance={node.totalDistance}
          isWeightedPreviously={node.isWeightedPreviously}
          isAnimateInstantly={node.isAnimateInstantly}
          isAnimateSecondPathInstantly={node.isAnimateSecondPathInstantly}
        ></Node>
      ))}
    </div>
  ));
  return (
    <div ref={gridRef} className="grid">
      {" "}
      {grid}
    </div>
  );
}
