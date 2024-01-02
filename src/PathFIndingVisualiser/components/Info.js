import "./Info.css";
export default function Info({ algorithmType, scannedNodes, pathLength }) {
  return (
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
}
