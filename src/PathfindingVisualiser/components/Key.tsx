import "./Key.css";
import arrowRight from "./icons/arrow-right.png"
import end from "./icons/end.png"
import wallSquare from "./images/wall-square.png"
import weightIcon from "./icons/weight-icon.jpg"
import blueVisitedNode from "./images/blue-visited-node.png"
import purpleVisitedNode from "./images/purple-visited-node.png"
import yellowNode from "./images/yellow-node.png"

import React from "react";
const Key = () => (
  <div className="key">
    <div className="key-value">
      <img
        src={arrowRight}
        alt="start-square"
        className="node-img"
      />
      <span> Source</span>
    </div>
    <div className="key-value">
      <img
        src={end}
        alt="start-square"
        className="node-img"
      />
      <span> Destination</span>
    </div>
    <div className="key-value">
      <img
        src={wallSquare}
        alt="start-square"
        className="node-img"
      />
      <span> Wall</span>
    </div>
    <div className="key-value">
      <img
        src={weightIcon}
        alt="start-square"
        className="node-img"
      />
      <span> Weight</span>
    </div>
    <div className="key-value">
      <img
        src={blueVisitedNode}
        alt="start-square"
        className="node-img visited-node"
      />
      <img
        src={purpleVisitedNode}
        alt="start-square"
        className="node-img visited-node"
      />
      <span> Visited square</span>
    </div>
    <div className="key-value">
      <img
        src={yellowNode}
        alt="start-square"
        className="node-img"
      />

      <span> Shortest Path Square</span>
    </div>
  </div>
);

export default Key;
