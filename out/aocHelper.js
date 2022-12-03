"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInput = exports.inputReader = void 0;
const fs_1 = require("fs");
const inputReader = (path) => {
    try {
        const data = (0, fs_1.readFileSync)(path, "utf8");
        return data;
    }
    catch (err) {
        console.error(err);
    }
    return '';
};
exports.inputReader = inputReader;
const parseInput = (input) => {
    const lines = input.split('\n');
    const [head] = lines;
    if (head.includes(',')) {
        return lines.map(line => line.split(','));
    }
    if (head.includes(' ')) {
        return lines.map(line => line.split(' '));
    }
    return lines;
};
exports.parseInput = parseInput;
