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
const SLOW_ANIMATION_SPEED = 40;
const AVERAGE_ANIMATION_SPEED = 15;
const FAST_ANIMATION_SPEED = 8;
export default function NavBar({
  state,
  changeHandler,
  resetBoard,
  clearObstacles,
  clearPath,
  removeBomb,
  addBomb,
  showTutorial,
}) {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbar"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="#">Pathfinding Visualiser</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ButtonGroup className="button">
              <Dropdown
                variant="secondary"
                as={ButtonGroup}
                onSelect={(event, eventKey) =>
                  state.isAnimationInProgress
                    ? null
                    : changeHandler((prev) => ({
                        ...prev,
                        algoPicked:
                          eventKey.target.name ||
                          eventKey.target.parentElement.name,
                      }))
                }
              >
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  size="sm"
                  disabled={
                    state.isAnimationInProgress ? "disabled" : undefined
                  }
                >
                  Algorithms
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    as="button"
                    name="Breadth-First Search"
                  >
                    Breadth-First Search
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    as="button"
                    name="Depth-First Search"
                  >
                    Depth-First Search
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    as="button"
                    name="Dijkstra's algorithm"
                  >
                    Dijkstra's algorithm{" "}
                    <Badge pill bg="secondary">
                      Weighted
                    </Badge>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-4" as="button" name="A*">
                    A*{" "}
                    <Badge pill bg="secondary">
                      Weighted
                    </Badge>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-4"
                    as="button"
                    name="Bidirectional Greedy Search"
                  >
                    Bidirectional Greedy Search
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-4"
                    as="button"
                    name="Greedy Best First Search"
                  >
                    Greedy Best First Search{" "}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="#/action-4"
                    as="button"
                    name="Random Walk"
                  >
                    Random Walk
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                variant="secondary"
                as={ButtonGroup}
                onSelect={(event, eventKey) => {
                  return state.isAnimationInProgress
                    ? null
                    : changeHandler((prev) => ({
                        ...prev,
                        mazePicked: eventKey.target.textContent,
                      }));
                }}
              >
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  size="sm"
                  disabled={
                    state.isAnimationInProgress ? "disabled" : undefined
                  }
                  variant="secondary"
                >
                  Mazes
                </Dropdown.Toggle>

                <Dropdown.Menu draggable={false}>
                  <Dropdown.Item href="#/action-1">
                    Recursive Division
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Horizontal</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Vertical</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Random Maze</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">
                    Random Weight Maze
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-4">
                    Weight Recursive Division
                  </Dropdown.Item>
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
                state.algoPicked
                  ? changeHandler((prev) => ({
                      ...prev,
                      isVisualiseAttempted: true,
                    }))
                  : null
              }
            >
              {" "}
              {state.mazePicked && state.isAnimationInProgress
                ? `Generating Maze...`
                : state.algoPicked && state.isAnimationInProgress
                ? `Visualising ${state.algoPicked}...`
                : state.algoPicked
                ? `Visualise ${state.algoPicked}`
                : `Pick an Algorithm!`}
              <Spinner
                as="span"
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
              disabled={state.isAnimationInProgress ? "disabled" : undefined}
              className="button"
              onClick={() => {
                state.bombPicked ? removeBomb() : addBomb();
              }}
            >
              {" "}
              {state.bombPicked ? "Remove" : "Add"} Target{" "}
            </Button>
            <ButtonGroup className="button">
              <Dropdown as={ButtonGroup} variant="secondary">
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  size="sm"
                  disabled={
                    state.isAnimationInProgress ? "disabled" : undefined
                  }
                >
                  Clean Up
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    className=" "
                    onClick={() => resetBoard()}
                  >
                    Reset Board
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className=""
                    onClick={() => clearObstacles()}
                  >
                    Clear Obstacles
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=""
                    onClick={() => clearPath()}
                  >
                    Clear Path
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                as={ButtonGroup}
                variant="secondary"
                autoClose="outside"
              >
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  size="sm"
                  disabled={
                    state.isAnimationInProgress ? "disabled" : undefined
                  }
                >
                  Speed
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() =>
                      changeHandler((prev) => ({
                        ...prev,
                        speed: SLOW_ANIMATION_SPEED,
                      }))
                    }
                    active={
                      state.speed === SLOW_ANIMATION_SPEED
                        ? "active"
                        : undefined
                    }
                  >
                    Slow
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() =>
                      changeHandler((prev) => ({
                        ...prev,
                        speed: AVERAGE_ANIMATION_SPEED,
                      }))
                    }
                    active={
                      state.speed === AVERAGE_ANIMATION_SPEED
                        ? "active"
                        : undefined
                    }
                  >
                    Average
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() =>
                      changeHandler((prev) => ({
                        ...prev,
                        speed: FAST_ANIMATION_SPEED,
                      }))
                    }
                    active={
                      state.speed === FAST_ANIMATION_SPEED
                        ? "active"
                        : undefined
                    }
                  >
                    Fast
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
            <Button
              variant="primary"
              onClick={showTutorial}
              className="button"
              size="sm"
              disabled={state.isAnimationInProgress ? "disabled" : undefined}
            >
              {" "}
              Tutorial
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
