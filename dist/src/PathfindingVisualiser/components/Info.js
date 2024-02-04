"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Info.css");
const react_1 = __importDefault(require("react"));
const Info = ({ algorithmType, scannedNodes, pathLength }) => (react_1.default.createElement("div", { className: "info" },
    react_1.default.createElement("span", null,
        " ",
        react_1.default.createElement("b", null, "Algorithm of choice:"),
        " ",
        algorithmType || "???",
        ", ",
        react_1.default.createElement("b", null, "Scanned Nodes:"),
        " ",
        scannedNodes || "???",
        ", ",
        react_1.default.createElement("b", null, "Shortest Path Length: "),
        " ",
        pathLength || "???")));
exports.default = Info;
