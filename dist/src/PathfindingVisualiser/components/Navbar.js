"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/no-unescaped-entities */
const react_1 = __importDefault(require("react"));
const Container_1 = __importDefault(require("react-bootstrap/Container"));
const Nav_1 = __importDefault(require("react-bootstrap/Nav"));
const Navbar_1 = __importDefault(require("react-bootstrap/Navbar"));
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const Dropdown_1 = __importDefault(require("react-bootstrap/Dropdown"));
const Badge_1 = __importDefault(require("react-bootstrap/Badge"));
require("./NavBar.css");
const react_bootstrap_1 = require("react-bootstrap");
const Spinner_1 = __importDefault(require("react-bootstrap/Spinner"));
const SLOW_ANIMATION_SPEED = 40;
const AVERAGE_ANIMATION_SPEED = 15;
const FAST_ANIMATION_SPEED = 8;
const NavBar = ({ state, changeHandler, resetBoard, clearObstacles, clearPath, removeBomb, addBomb, showTutorial, }) => (react_1.default.createElement(Navbar_1.default, { expand: "lg", className: "bg-body-tertiary navbar", bg: "dark", "data-bs-theme": "dark" },
    react_1.default.createElement(Container_1.default, { fluid: true },
        react_1.default.createElement(Navbar_1.default.Brand, { href: "#" }, "Pathfinding Visualiser"),
        react_1.default.createElement(Navbar_1.default.Collapse, { id: "basic-navbar-nav" },
            react_1.default.createElement(Nav_1.default, { className: "me-auto" },
                react_1.default.createElement(react_bootstrap_1.ButtonGroup, { className: "button" },
                    react_1.default.createElement(Dropdown_1.default, { variant: "secondary", as: react_bootstrap_1.ButtonGroup, onSelect: (_event, eventKey) => !state.isAnimationInProgress &&
                            changeHandler((prev) => (Object.assign(Object.assign({}, prev), { algoPicked: 
                                // @ts-expect-error fix later
                                eventKey.target.name ||
                                    // @ts-expect-error fix later
                                    eventKey.target.parentElement.name }))) },
                        react_1.default.createElement(Dropdown_1.default.Toggle, { id: "dropdown-button-dark-example1", variant: "secondary", size: "sm", disabled: state.isAnimationInProgress }, "Algorithms"),
                        react_1.default.createElement(Dropdown_1.default.Menu, null,
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-1", as: "button", name: "Breadth-First Search" }, "Breadth-First Search"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-2", as: "button", name: "Depth-First Search" }, "Depth-First Search"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-3", as: "button", name: "Dijkstra's algorithm" },
                                "Dijkstra's algorithm",
                                " ",
                                react_1.default.createElement(Badge_1.default, { pill: true, bg: "secondary" }, "Weighted")),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4", as: "button", name: "A*" },
                                "A*",
                                " ",
                                react_1.default.createElement(Badge_1.default, { pill: true, bg: "secondary" }, "Weighted")),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4", as: "button", name: "Bidirectional Greedy Search" }, "Bidirectional Greedy Search"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4", as: "button", name: "Greedy Best First Search" },
                                "Greedy Best First Search",
                                " "),
                            react_1.default.createElement(Dropdown_1.default.Divider, null),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4", as: "button", name: "Random Walk" }, "Random Walk"))),
                    react_1.default.createElement(Dropdown_1.default, { variant: "secondary", as: react_bootstrap_1.ButtonGroup, onSelect: (_event, eventKey) => !state.isAnimationInProgress &&
                            changeHandler((prev) => (Object.assign(Object.assign({}, prev), { 
                                //@ts-expect-error fix later
                                mazePicked: eventKey.target.textContent }))) },
                        react_1.default.createElement(Dropdown_1.default.Toggle, { id: "dropdown-button-dark-example1", size: "sm", disabled: state.isAnimationInProgress, variant: "secondary" }, "Mazes"),
                        react_1.default.createElement(Dropdown_1.default.Menu, { draggable: false },
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-1" }, "Recursive Division"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-2" }, "Horizontal"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-3" }, "Vertical"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4" }, "Random Maze"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4" }, "Random Weight Maze"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-4" }, "Weight Recursive Division")))),
                react_1.default.createElement(Button_1.default, { className: "button", size: "sm", variant: state.algoPicked === "" && state.mazePicked === ""
                        ? "danger"
                        : state.isAnimationInProgress
                            ? "warning"
                            : "success", onClick: () => state.algoPicked &&
                        changeHandler((prev) => (Object.assign(Object.assign({}, prev), { isVisualiseAttempted: true }))) },
                    " ",
                    state.mazePicked && state.isAnimationInProgress
                        ? `Generating Maze...`
                        : state.algoPicked && state.isAnimationInProgress
                            ? `Visualising ${state.algoPicked}...`
                            : state.algoPicked
                                ? `Visualise ${state.algoPicked}`
                                : `Pick an Algorithm!`,
                    react_1.default.createElement(Spinner_1.default, { as: "span", 
                        //@ts-expect-error ts type seems to be out of wack
                        animation: state.isAnimationInProgress ? "border" : "false", size: "sm", role: "status", "aria-hidden": "true", className: "spinner" })),
                " ",
                react_1.default.createElement(Button_1.default, { variant: "secondary", size: "sm", disabled: state.isAnimationInProgress, className: "button", onClick: () => {
                        console.log(state.bombPicked);
                        state.bombPicked ? removeBomb() : addBomb();
                    } },
                    " ",
                    state.bombPicked ? "Remove" : "Add",
                    " Target",
                    " "),
                react_1.default.createElement(react_bootstrap_1.ButtonGroup, { className: "button" },
                    react_1.default.createElement(Dropdown_1.default, { as: react_bootstrap_1.ButtonGroup, variant: "secondary" },
                        react_1.default.createElement(Dropdown_1.default.Toggle, { id: "dropdown-button-dark-example1", variant: "secondary", size: "sm", disabled: state.isAnimationInProgress }, "Clean Up"),
                        react_1.default.createElement(Dropdown_1.default.Menu, null,
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-1", className: " ", onClick: () => resetBoard() }, "Reset Board"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-2", className: "", onClick: () => clearObstacles() }, "Clear Obstacles"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-3", className: "", onClick: () => clearPath() }, "Clear Path"))),
                    react_1.default.createElement(Dropdown_1.default, { as: react_bootstrap_1.ButtonGroup, variant: "secondary", autoClose: "outside" },
                        react_1.default.createElement(Dropdown_1.default.Toggle, { id: "dropdown-button-dark-example1", variant: "secondary", size: "sm", disabled: state.isAnimationInProgress }, "Speed"),
                        react_1.default.createElement(Dropdown_1.default.Menu, null,
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-1", onClick: () => changeHandler((prev) => (Object.assign(Object.assign({}, prev), { speed: SLOW_ANIMATION_SPEED }))), active: state.speed === SLOW_ANIMATION_SPEED }, "Slow"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-2", onClick: () => changeHandler((prev) => (Object.assign(Object.assign({}, prev), { speed: AVERAGE_ANIMATION_SPEED }))), active: state.speed === AVERAGE_ANIMATION_SPEED }, "Average"),
                            react_1.default.createElement(Dropdown_1.default.Item, { href: "#/action-3", onClick: () => changeHandler((prev) => (Object.assign(Object.assign({}, prev), { speed: FAST_ANIMATION_SPEED }))), active: state.speed === FAST_ANIMATION_SPEED }, "Fast")))),
                react_1.default.createElement(Button_1.default, { variant: "primary", onClick: showTutorial, className: "button", size: "sm", disabled: state.isAnimationInProgress },
                    " ",
                    "Tutorial"))))));
exports.default = NavBar;
