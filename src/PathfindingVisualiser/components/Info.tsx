import "./Info.css";
import React from "react";
interface props {
  algorithmType: string;
  scannedNodes: number;
  pathLength: number;
}

const Info = ({ algorithmType, scannedNodes, pathLength }: props) => {
  const info = [
    { name: "Algorithm of choice", dep: algorithmType },
    { name: "Scanned Nodes", dep: scannedNodes },
    { name: "Shortest Path Length", dep: pathLength },
    { name: "Time Taken to Compute" },
  ];
  return (
    <div className="info">
      <span>
        {info.map(({ name, dep }, i) => (
          <>
            <b>{name}:</b> {dep || "🤔"}
            {i !== info.length - 1 && ", "}
          </>
        ))}
      </span>
    </div>
  );
};

export default Info;
