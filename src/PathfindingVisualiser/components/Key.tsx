import "./Key.css";
import arrowRight from "./icons/arrow-right.png";
import end from "./icons/end.png";
import wallSquare from "./images/wall-square.png";
import weightIcon from "./icons/weight-icon.jpg";
import blueVisitedNode from "./images/blue-visited-node.png";
import purpleVisitedNode from "./images/purple-visited-node.png";
import yellowNode from "./images/yellow-node.png";

import React from "react";

const key = [
  { img: [arrowRight], name: "source" },
  { img: [end], name: "destination" },
  { img: [wallSquare], name: "wall" },
  { img: [weightIcon], name: "weight" },
  { img: [blueVisitedNode, purpleVisitedNode], name: "visited square" },
  { img: [yellowNode], name: "shortest path square" },
];

const Key = () => (
  <div className="key">
    {key.map(({ name, img }) => (
      <div className="key-value">
        {img.map((i) => (
          <img
            src={i}
            alt={name}
            className={`node-img${
              name === "visited square" ? " visited-node" : ""
            }`}
          />
        ))}
        <span> {name}</span>
      </div>
    ))}
  </div>
);

export default Key;
