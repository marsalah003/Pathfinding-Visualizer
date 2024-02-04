"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const app = (0, express_1.default)();
app.use(express_1.default.static((0, path_1.join)(__dirname, "../build")));
app.get("/", (_req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "../build", "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}...`));
