"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Node.css");
const Node = ({ pos, isStart, isEnd, isWall, isOnPath, isAnimate, onClick, onMouseDown, onMouseEnter, onMouseUp, grid, isCurrentNode, isWeighted, isBomb, isVisitedPreviously, isAnimateSecondPath, isHeadOfPath, isInstantPath, isYellowPath, isAnimateInstantly, isAnimateSecondPathInstantly, }) => {
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
    return (react_1.default.createElement("div", { className: "node" +
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
            (isInstantPath ? " instantPath" : ""), onContextMenu: (event) => {
            event.preventDefault();
            onClick(event, pos);
        }, id: `node-${pos.col}-${pos.row}`, style: styles, onClick: (event) => onClick(event, pos), onMouseDown: (event) => onMouseDown(event, pos), onMouseEnter: () => onMouseEnter(pos, grid), onMouseUp: () => onMouseUp() },
        " ",
        isWeighted && (react_1.default.createElement("img", { className: "weight", alt: "weight square", src: require("./icons/weight-icon.jpg") })),
        isBomb && (react_1.default.createElement("img", { className: "bomb", alt: "target square", src: require("./icons/target.png") })),
        isHeadOfPath && (react_1.default.createElement("img", { className: "head", alt: "head of path", src: require("./icons/star.png") })),
        isEnd && react_1.default.createElement("img", { alt: "end", src: require("./icons/end.png") }),
        isStart && react_1.default.createElement("img", { alt: "start", src: require("./icons/arrow-right.png") })));
};
exports.default = Node;
