/* eslint-disable react/no-unescaped-entities */
import React from "react";
import pathIcon from "./images/path-icon.png";
import algosGif from "./images/algos.gif";
import wallDemo from "./images/wall-demonstration.gif";
import weightDemo from "./images/weight-demonstration.gif";
import targetButton from "./images/target-button.png";
import draggingNodeDemo from "./images/dragging-node-demonstration.gif";
import navbarDemo from "./images/navbar-demo.gif";

import { Button, Modal } from "react-bootstrap";

interface propsI {
  modalState: number;
  setModalState: (modal: number) => void;
}
const algoDescriptions = [
  {
    name: "Dijkstra's Algorithm",
    des: `the father of pathfinding
            algorithms; guarantees the shortest path`,
    isWeighted: true,
  },
  {
    name: "A* Search",
    des: `arguably the best pathfinding
            algorithm; uses heuristics to guarantee the shortest path much
            faster than Dijkstra's Algorithm`,
    isWeighted: true,
  },
  {
    name: "Greedy Best-first Search",
    des: `a faster, more
          heuristic-heavy version of A*; does not guarantee the shortest path`,
    isWeighted: false,
  },
  {
    name: "Bidirectional Greedy Search",
    des: `Greedy-Search from
            both sides; guarentees the shortest path`,
    isWeighted: false,
  },
  {
    name: "Breath-first Search",
    des: `a great algorithm;
            guarantees the shortest path`,
    isWeighted: false,
  },
  {
    name: "Depth-first Search",
    des: `a very bad algorithm for
            pathfinding; does not guarantee the shortest path`,
    isWeighted: false,
  },
];
const modals = [
  {
    title: "Welcome to Pathfinding Visualiser!",
    body: `A pathfinding algorithm seeks to find the shortest path between two
        points, just like Google Maps or any other mapp app would do.`,
    img: pathIcon,
    alt: "path-icon-gif",
  },
  {
    title: "Pick any algorithm you like",
    body: `You can use the algorithm picker to try different algorithms. Note that
        some algorithms are unweighted, while others are weighted. Unweighted
        algorithms take weight nodes into consideration, whereas weighted ones
        do. When u pick an algorithm, press the green button to visualise it and
        see it come to life!`,
    img: algosGif,
    alt: "algo-gif",
  },
  {
    title: "Meet the algorithms",
    body: (
      <ul>
        {" "}
        {algoDescriptions.map((a) => (
          <li>
            <b> {a.name}</b> {a.isWeighted ? "weighted" : "unweighted"}: {a.des}
          </li>
        ))}
      </ul>
    ),
    img: null,
    alt: null,
  },
  {
    title: "Add Walls",
    body: `Click on the grid to add a wall or click and move the cursor in order to
        place many walls at the same time. Walls are impenetrable, meaning that
        a path cannot cross through them. Click on a wall again in order to
        remove it. You can also generate mazes and patterns from the "Mazes"
        drop-down menu.`,
    img: wallDemo,
    alt: "algo-gif",
  },
  {
    title: "Add Weights",
    body: `Right click on the grid to add a weight or right-click and move the
        cursor in order to place many weights at the same time. Unlike with
        walls, weights arent impassable. They are simply more "costly" to move
        through. In this application, moving through a weight node has a "cost"
        of 15.`,
    img: weightDemo,
    alt: "algo-gif",
  },
  {
    title: "Add Target",
    body: `Add a target in order to skew the algorithm to go through the target`,
    img: targetButton,
    alt: "algo-gif",
  },
  {
    title: "Dragging Nodes",
    body: `Click and drag the start, bomb, and target nodes to move them. Note that
        you can drag nodes even after an algorithm has finished running. This
        will allow you to instantly see different paths.`,
    img: draggingNodeDemo,
    alt: "algo-gif",
  },
  {
    title: "Dragging Nodes",
    body: `Use the navbar buttons to visualize algorithms and to do other stuff!
        You can clear the current path, clear walls and weights, clear the
        entire board, and adjust the visualization speed, all from the navbar.
        If you want to access this tutorial again, click on the "Tutorial"
        button on the right end of the navbar`,
    img: navbarDemo,
    alt: "algo-gif",
  },
];

const Tutorial = ({ modalState, setModalState }: propsI) => (
  <>
    {modals.map(({ title, body, img, alt }, i) => (
      <Modal
        show={modalState === i}
        onHide={() => setModalState(-1)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          {body}{" "}
          {img && (
            <div className={title === "Add Target" ? "button-img" : "tute-img"}>
              <img src={img} alt={alt ? alt : undefined} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger close" onClick={() => setModalState(-1)}>
            Close Tutorial
          </Button>
          {i !== 0 && (
            <Button variant="secondary" onClick={() => setModalState(i - 1)}>
              Previous
            </Button>
          )}
          {i !== modals.length - 1 && (
            <Button variant="primary" onClick={() => setModalState(i + 1)}>
              Next {i + 1}/{modals.length}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    ))}
  </>
);
export default Tutorial;
