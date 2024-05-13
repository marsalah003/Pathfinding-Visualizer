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

const SLOW_ANIMATION_SPEED = 40;
const AVERAGE_ANIMATION_SPEED = 15;
const FAST_ANIMATION_SPEED = 8;
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
const NavBar = ({
  state,
  changeHandler,
  resetBoard,
  clearObstacles,
  clearPath,
  removeBomb,
  addBomb,
  showTutorial,
}: propsI) => (
  <Navbar className="bg-body-tertiary navbar" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#" onClick={() => window.location.reload()}>
        Pathfinding Visualiser
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
              Algorithms
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="button" name="Breadth-First Search">
                Breadth-First Search
              </Dropdown.Item>
              <Dropdown.Item as="button" name="Depth-First Search">
                Depth-First Search
              </Dropdown.Item>
              <Dropdown.Item as="button" name="Dijkstra's algorithm">
                Dijkstra's algorithm{" "}
                <Badge pill bg="secondary">
                  Weighted
                </Badge>
              </Dropdown.Item>
              <Dropdown.Item as="button" name="A*">
                A*{" "}
                <Badge pill bg="secondary">
                  Weighted
                </Badge>
              </Dropdown.Item>
              <Dropdown.Item as="button" name="Bidirectional Greedy Search">
                Bidirectional Greedy Search
              </Dropdown.Item>
              <Dropdown.Item as="button" name="Greedy Best First Search">
                Greedy Best First Search{" "}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" name="Random Walk">
                Random Walk
              </Dropdown.Item>
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
              Mazes
            </Dropdown.Toggle>

            <Dropdown.Menu draggable={false}>
              <Dropdown.Item>Recursive Division</Dropdown.Item>
              <Dropdown.Item>Horizontal</Dropdown.Item>
              <Dropdown.Item>Vertical</Dropdown.Item>
              <Dropdown.Item>Random Maze</Dropdown.Item>
              <Dropdown.Item>Random Weight Maze</Dropdown.Item>
              <Dropdown.Item>Weight Recursive Division</Dropdown.Item>
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
          {state.mazePicked && state.isAnimationInProgress
            ? `Generating Maze...`
            : state.algoPicked && state.isAnimationInProgress
            ? `Visualising ${state.algoPicked}...`
            : state.algoPicked
            ? `Visualise ${state.algoPicked}`
            : `Pick an Algorithm!`}
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
          {state.bombPicked ? "Remove" : "Add"} Target{" "}
        </Button>
        <ButtonGroup className="button">
          <Dropdown as={ButtonGroup} variant="secondary">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              size="sm"
              disabled={state.isAnimationInProgress}
            >
              Clean Up
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className=" " onClick={() => resetBoard()}>
                Reset Board
              </Dropdown.Item>
              <Dropdown.Item className="" onClick={() => clearObstacles()}>
                Clear Obstacles
              </Dropdown.Item>
              <Dropdown.Item className="" onClick={() => clearPath()}>
                Clear Path
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup} variant="secondary" autoClose="outside">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              size="sm"
              disabled={state.isAnimationInProgress}
            >
              Speed
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  changeHandler((prev) => ({
                    ...prev,
                    speed: SLOW_ANIMATION_SPEED,
                  }))
                }
                active={state.speed === SLOW_ANIMATION_SPEED}
              >
                Slow
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  changeHandler((prev) => ({
                    ...prev,
                    speed: AVERAGE_ANIMATION_SPEED,
                  }))
                }
                active={state.speed === AVERAGE_ANIMATION_SPEED}
              >
                Average
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  changeHandler((prev) => ({
                    ...prev,
                    speed: FAST_ANIMATION_SPEED,
                  }))
                }
                active={state.speed === FAST_ANIMATION_SPEED}
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
          disabled={state.isAnimationInProgress}
        >
          {" "}
          Tutorial
        </Button>
      </Nav>
    </Container>
  </Navbar>
);
export default NavBar;
