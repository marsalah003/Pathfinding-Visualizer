import "./Info.css";
import React from "react";
interface props {
  algorithmType: string;
  scannedNodes: number;
  pathLength: number;
}
const Info = ({ algorithmType, scannedNodes, pathLength }: props) => (
  <div className="info">
    <span>
      {" "}
      <b>Algorithm of choice:</b> {algorithmType || "???"}
      {", "}
      <b>Scanned Nodes:</b> {scannedNodes || "???"}
      {", "}
      <b>Shortest Path Length: </b> {pathLength || "???"}
    </span>
  </div>
);

export default Info;
