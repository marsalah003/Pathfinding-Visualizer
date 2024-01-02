import "./Key.css";
export default function Key() {
  return (
    <div className="key">
      <div className="key-value">
        <img
          src={require("./icons/arrow-right.png")}
          alt="start-square"
          className="node-img"
        />
        <span> Source</span>
      </div>
      <div className="key-value">
        <img
          src={require("./icons/end.png")}
          alt="start-square"
          className="node-img"
        />
        <span> Destination</span>
      </div>
      <div className="key-value">
        <img
          src={require("./images/wall-square.png")}
          alt="start-square"
          className="node-img"
        />
        <span> Wall</span>
      </div>
      <div className="key-value">
        <img
          src={require("./icons/weight-icon.jpg")}
          alt="start-square"
          className="node-img"
        />
        <span> Weight</span>
      </div>
      <div className="key-value">
        <img
          src={require("./images/blue-visited-node.png")}
          alt="start-square"
          className="node-img visited-node"
        />
        <img
          src={require("./images/purple-visited-node.png")}
          alt="start-square"
          className="node-img visited-node"
        />
        <span> Visited square</span>
      </div>
      <div className="key-value">
        <img
          src={require("./images/yellow-node.png")}
          alt="start-square"
          className="node-img"
        />

        <span> Shortest Path Square</span>
      </div>
    </div>
  );
}
