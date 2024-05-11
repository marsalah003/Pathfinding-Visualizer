import React from "react";
import "./Node.css";
import weightIcon from "./icons/weight-icon.jpg"
import target from "./icons/target.png"
import star from "./icons/star.png"
import end from "./icons/end.png"
import arrowRight from "./icons/arrow-right.png"
import { posI, gridI } from "../grid";
interface propsI {
  pos: posI;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  isOnPath: boolean;
  isAnimate: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>, pos: posI) => void;
  onMouseDown: (event: React.MouseEvent<HTMLElement>, pos: posI) => void;
  onMouseEnter: (pos: posI, grid: gridI) => void;
  onMouseUp: () => void;
  grid: gridI;
  isCurrentNode: boolean;
  isWeighted: boolean;
  isBomb: boolean;
  isVisitedPreviously: boolean;
  isAnimateSecondPath: boolean;
  isHeadOfPath: boolean;
  isInstantPath: boolean;
  isYellowPath: boolean;
  isAnimateInstantly: boolean;
  isAnimateSecondPathInstantly: boolean;
}
const Node = ({
  pos,
  isStart,
  isEnd,
  isWall,
  isOnPath,
  isAnimate,
  onClick,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  grid,
  isCurrentNode,
  isWeighted,
  isBomb,
  isVisitedPreviously,
  isAnimateSecondPath,
  isHeadOfPath,
  isInstantPath,
  isYellowPath,
  isAnimateInstantly,
  isAnimateSecondPathInstantly,
}: propsI) => {
  const styles = {
    backgroundColor: isWall
      ? "#008b8b"
      : isAnimate
      ? "yellow"
      : isOnPath
      ? "blue"
      : isVisitedPreviously
      ? "rgba(178, 67, 255, 0.75)"
      : isAnimateSecondPath
      ? "rgba(178, 67, 255, 0.75)"
      : isCurrentNode
      ? "yellow"
      : isInstantPath
      ? "yellow"
      : isYellowPath
      ? "yellow"
      : isAnimateSecondPathInstantly
      ? "rgba(178, 67, 255, 0.75)"
      : isAnimateInstantly
      ? "rgba(0, 190, 218, 0.75)"
      : "white",
  };

  return (
    <div
      className={
        "node" +
        (isWall ? " wall" : "") +
        (isAnimate ? " visited" : "") +
        (isOnPath ? " onPath" : "") +
        (isWeighted ? " weighted" : "") +
        (isBomb ? " bomb" : "") +
        (isStart ? " start" : "") +
        (isEnd ? " end" : "") +
        (isVisitedPreviously ? " previouslyVisited" : "") +
        (isAnimateSecondPath ? " animateSecondPath" : "") +
        (isCurrentNode ? " currentNode" : "") +
        (isAnimateSecondPathInstantly ? " animateSecondPathInstantly" : "") +
        (isInstantPath ? " instantPath" : "")
      }
      onContextMenu={(event) => {
        event.preventDefault();
        onClick(event, pos);
      }}
      id={`node-${pos.col}-${pos.row}`}
      style={styles}
      onClick={(event) => onClick(event, pos)}
      onMouseDown={(event) => onMouseDown(event, pos)}
      onMouseEnter={() => onMouseEnter(pos, grid)}
      onMouseUp={() => onMouseUp()}
    >
      {" "}
      {isWeighted && (
        <img
          className="weight"
          alt="weight square"
          src={(weightIcon)}
        />
      )}
      {isBomb && (
        <img
          className="bomb"
          alt="target square"
          src={(target)}
        />
      )}
      {isHeadOfPath && (
        <img
          className="head"
          alt="head of path"
          src={(star)}
        />
      )}
      {isEnd && <img alt="end" src={(end)} />}
      {isStart && <img alt="start" src={(arrowRight)} />}
    </div>
  );
};

export default Node;
