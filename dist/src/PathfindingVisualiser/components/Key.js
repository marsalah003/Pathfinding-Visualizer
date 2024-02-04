"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Key.css");
const react_1 = __importDefault(require("react"));
const Key = () => (react_1.default.createElement("div", { className: "key" },
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./icons/arrow-right.png"), alt: "start-square", className: "node-img" }),
        react_1.default.createElement("span", null, " Source")),
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./icons/end.png"), alt: "start-square", className: "node-img" }),
        react_1.default.createElement("span", null, " Destination")),
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./images/wall-square.png"), alt: "start-square", className: "node-img" }),
        react_1.default.createElement("span", null, " Wall")),
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./icons/weight-icon.jpg"), alt: "start-square", className: "node-img" }),
        react_1.default.createElement("span", null, " Weight")),
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./images/blue-visited-node.png"), alt: "start-square", className: "node-img visited-node" }),
        react_1.default.createElement("img", { src: require("./images/purple-visited-node.png"), alt: "start-square", className: "node-img visited-node" }),
        react_1.default.createElement("span", null, " Visited square")),
    react_1.default.createElement("div", { className: "key-value" },
        react_1.default.createElement("img", { src: require("./images/yellow-node.png"), alt: "start-square", className: "node-img" }),
        react_1.default.createElement("span", null, " Shortest Path Square"))));
exports.default = Key;
