/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import "./NavBar.css";
import { ButtonGroup } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { stateI } from "../../App";

interface propsI {
  state: stateI;
  changeHandler: React.Dispatch<React.SetStateAction<stateI>>;
  clearObstacles: () => void;
  resetBoard: () => void;
  clearPath: () => void;
  removeBomb: () => void;
  addBomb: () => void;
  showTutorial: () => void;
}
const speedMap = { Slow: 40, Average: 15, Fast: 8 };
const mazes = [
  "Recursive Division",
  "Horizontal",
  "Vertical",
  "Random Maze",
  "Random Weight Maze",
  "Weight Recursive",
];
const algos = [
  "Breadth-First Search",
  "Depth-First Search",
  "Dijkstra's algorithm",
  "A*",
  "Bidirectional Greedy Search",
  "Greedy Best First Search",
  "Random Walk",
];
const NavBar = ({
  state,
  changeHandler,
  resetBoard,
  clearObstacles,
  clearPath,
  removeBomb,
  addBomb,
  showTutorial,
}: propsI) => {
  const cleanMap = {
    "Clear Obstacles": clearObstacles,
    "Clear Path": clearPath,
    "Reset Board": resetBoard,
  };
  return (
    <Navbar className="bg-body-tertiary navbar" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" onClick={() => window.location.reload()}>
          Pathfinding Visualiser
        </Navbar.Brand>
        <Nav className="me-auto">
          <ButtonGroup className="button">
            <Dropdown
              variant="secondary"
              as={ButtonGroup}
              onSelect={(_event, eventKey) =>
                !state.isAnimationInProgress &&
                changeHandler((prev) => ({
                  ...prev,
                  algoPicked:
                    // @ts-expect-error fix later
                    eventKey.target.name ||
                    // @ts-expect-error fix later
                    eventKey.target.parentElement.name,
                }))
              }
            >
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
                size="sm"
                disabled={state.isAnimationInProgress}
              >
                Algorithms <i className="bi bi-cpu" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {algos.map((a) => (
                  <Dropdown.Item as="button" name={a}>
                    {a} &nbsp;
                    {(a === "A*" || a === "Dijkstra's algorithm") && (
                      <Badge pill bg="secondary">
                        Weighted
                      </Badge>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              variant="secondary"
              as={ButtonGroup}
              onSelect={(_event, eventKey) =>
                !state.isAnimationInProgress &&
                changeHandler((prev) => ({
                  ...prev,
                  //@ts-expect-error fix later
                  mazePicked: eventKey.target.textContent,
                }))
              }
            >
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                size="sm"
                disabled={state.isAnimationInProgress}
                variant="secondary"
              >
                Mazes <i className="bi bi-signpost-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu draggable={false}>
                {mazes.map((o) => (
                  <Dropdown.Item>{o}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
          <Button
            className="button"
            size="sm"
            variant={
              state.algoPicked === "" && state.mazePicked === ""
                ? "danger"
                : state.isAnimationInProgress
                ? "warning"
                : "success"
            }
            onClick={() =>
              state.algoPicked &&
              changeHandler((prev) => ({
                ...prev,
                isVisualiseAttempted: true,
              }))
            }
          >
            {" "}
            {state.mazePicked && state.isAnimationInProgress ? (
              `Generating Maze...`
            ) : state.algoPicked && state.isAnimationInProgress ? (
              <>
                Visualising <b>{state.algoPicked}</b>...{" "}
                {/* <i className="bi bi-stop-fill" /> */}
              </>
            ) : state.algoPicked ? (
              <>
                <span>
                  Visualise <b>{state.algoPicked}</b>
                </span>{" "}
                &nbsp;
                <i className="bi bi-play-circle"></i>
              </>
            ) : (
              `Pick an Algorithm!`
            )}
            <Spinner
              as="span"
              //@ts-expect-error ts type seems to be out of wack
              animation={state.isAnimationInProgress ? "border" : "false"}
              size="sm"
              role="status"
              aria-hidden="true"
              className="spinner"
            />
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            disabled={state.isAnimationInProgress}
            className="button"
            onClick={() => {
              state.bombPicked ? removeBomb() : addBomb();
            }}
          >
            {" "}
            {state.bombPicked ? "Remove" : "Add"} Target &nbsp;
            <i className="bi bi-bullseye" />
          </Button>
          <ButtonGroup className="button">
            <Dropdown as={ButtonGroup} variant="secondary">
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
                size="sm"
                disabled={state.isAnimationInProgress}
              >
                <i className="bi bi-eraser-fill" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {["Reset Board", "Clear Obstacles", "Clear Path"].map((o) => (
                  <Dropdown.Item onClick={cleanMap[o as keyof typeof cleanMap]}>
                    {o}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup} variant="secondary" autoClose="outside">
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
                size="sm"
                disabled={state.isAnimationInProgress}
              >
                <i className="bi bi-speedometer" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(speedMap).map((s) => {
                  const speed = speedMap[s as keyof typeof speedMap];
                  return (
                    <Dropdown.Item
                      onClick={() =>
                        changeHandler((prev) => ({
                          ...prev,
                          speed,
                        }))
                      }
                      active={state.speed === speed}
                    >
                      {s}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
          <Button
            variant="primary"
            onClick={showTutorial}
            className="button"
            size="sm"
            disabled={state.isAnimationInProgress}
          >
            {" "}
            Tutorial &nbsp;
            <i className="bi bi-book" />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
