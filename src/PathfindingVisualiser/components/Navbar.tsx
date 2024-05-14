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
              Algorithms{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cpu"
                viewBox="0 0 16 16"
              >
                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
              </svg>
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
              Mazes{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-signpost-2"
                viewBox="0 0 16 16"
              >
                <path d="M7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586a1 1 0 0 0-2 0M13.5 3l.75 1-.75 1H2V3zm.5 5v2H2.5l-.75-1 .75-1z" />
              </svg>
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
          {state.mazePicked && state.isAnimationInProgress ? (
            `Generating Maze...`
          ) : state.algoPicked && state.isAnimationInProgress ? (
            <>
              Visualising <b>{state.algoPicked}</b>...
            </>
          ) : state.algoPicked ? (
            <>
              Visualise <b>{state.algoPicked}</b>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bullseye"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </Button>
        <ButtonGroup className="button">
          <Dropdown as={ButtonGroup} variant="secondary">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              size="sm"
              disabled={state.isAnimationInProgress}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eraser-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-speedometer"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                <path
                  fill-rule="evenodd"
                  d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
                />
              </svg>
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
          Tutorial &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-book"
            viewBox="0 0 16 16"
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>
        </Button>
      </Nav>
    </Container>
  </Navbar>
);
export default NavBar;
