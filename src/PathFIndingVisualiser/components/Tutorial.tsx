/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Modal } from "react-bootstrap";

interface propsI {
  modalState: string;
  setModalState: (modal: string) => void;
}
const Tutorial = ({ modalState, setModalState }: propsI) => (
  <>
    <Modal
      show={modalState === "modal-one"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Pathfinding Visualiser!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        A pathfinding algorithm seeks to find the shortest path between two
        points, just like Google Maps or any other mapp app would do.
        <div className="tute-img">
          <img src={require("./images/path-icon.png")} alt="path-icon-gif" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary">Previous</Button>
        <Button variant="primary" onClick={() => setModalState("modal-two")}>
          Next (1/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-two"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Pick any algorithm you like</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        You can use the algorithm picker to try different algorithms. Note that
        some algorithms are unweighted, while others are weighted. Unweighted
        algorithms take weight nodes into consideration, whereas weighted ones
        do. When u pick an algorithm, press the green button to visualise it and
        see it come to life!
        <div className="tute-img">
          <img src={require("./images/algos.gif")} alt="algo-gif" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary" onClick={() => setModalState("modal-one")}>
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-three")}>
          Next (2/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-three"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Meet the algorithms</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        <ul>
          <li>
            {" "}
            <b>Dijkstra's Algorithm</b> (weighted): the father of pathfinding
            algorithms; guarantees the shortest path
          </li>
          <br></br>
          <li>
            <b>A* Search</b> (weighted): arguably the best pathfinding
            algorithm; uses heuristics to guarantee the shortest path much
            faster than Dijkstra's Algorithm
          </li>
          <br></br>
          <li>
            <b>Greedy Best-first Search</b> (unweighted): a faster, more
            heuristic-heavy version of A*; does not guarantee the shortest path
          </li>
          <br></br>
          <li>
            <b>Bidirectional Greedy Search</b> (unweighted): Greedy-Search from
            both sides; guarentees the shortest path
          </li>
          <br></br>
          <li>
            {" "}
            <b>Breath-first Search</b> (unweighted): a great algorithm;
            guarantees the shortest path
          </li>
          <br></br>
          <li>
            {" "}
            <b>Depth-first Search</b> (unweighted): a very bad algorithm for
            pathfinding; does not guarantee the shortest path
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary" onClick={() => setModalState("modal-two")}>
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-four")}>
          Next (3/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-four"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Walls</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        Click on the grid to add a wall or click and move the cursor in order to
        place many walls at the same time. Walls are impenetrable, meaning that
        a path cannot cross through them. Click on a wall again in order to
        remove it. You can also generate mazes and patterns from the "Mazes"
        drop-down menu.
        <div className="tute-img">
          <img
            src={require("./images/wall-demonstration.gif")}
            alt="algo-gif"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button
          variant="secondary"
          onClick={() => setModalState("modal-three")}
        >
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-five")}>
          Next (4/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-five"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Weights</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        Right click on the grid to add a weight or right-click and move the
        cursor in order to place many weights at the same time. Unlike with
        walls, weights arent impassable. They are simply more "costly" to move
        through. In this application, moving through a weight node has a "cost"
        of 15.
        <div className="tute-img">
          <img
            src={require("./images/weight-demonstration.gif")}
            alt="algo-gif"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary" onClick={() => setModalState("modal-four")}>
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-six")}>
          Next (5/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-six"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Target</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        Right click on the grid to add a wall or right-click and move the cursor
        in order to place many weights at the same time. Unlike with walls,
        weights arent impassable. They are simply more "costly" to move through.
        In this application, moving through a weight node has a "cost" of 15.
        <div className="button-img">
          <img src={require("./images/target-button.png")} alt="algo-gif" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary" onClick={() => setModalState("modal-five")}>
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-seven")}>
          Next (6/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-seven"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Dragging Nodes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        Click and drag the start, bomb, and target nodes to move them. Note that
        you can drag nodes even after an algorithm has finished running. This
        will allow you to instantly see different paths.
        <div className="tute-img">
          <img
            src={require("./images/dragging-node-demonstration.gif")}
            alt="algo-gif"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button variant="secondary" onClick={() => setModalState("modal-six")}>
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("modal-eight")}>
          Next (7/8)
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={modalState === "modal-eight"}
      centered
      onHide={() => setModalState("close")}
      keyboard={false}
      backdrop="static"
      size="lg"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Visualizing and more</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        Use the navbar buttons to visualize algorithms and to do other stuff!
        You can clear the current path, clear walls and weights, clear the
        entire board, and adjust the visualization speed, all from the navbar.
        If you want to access this tutorial again, click on the "Tutorial"
        button on the right end of the navbar
        <div className="navbar-demo">
          <img src={require("./images/navbar-demo.gif")} alt="algo-gif" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger close" onClick={() => setModalState("close")}>
          Close Tutorial
        </Button>
        <Button
          variant="secondary"
          onClick={() => setModalState("modal-seven")}
        >
          Previous
        </Button>
        <Button variant="primary" onClick={() => setModalState("closed")}>
          Finish (8/8)
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
export default Tutorial;
