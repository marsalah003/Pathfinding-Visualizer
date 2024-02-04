"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.range = exports.generateOddRandomNumber = void 0;
const range = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(i);
    }
    return result;
};
exports.range = range;
const generateOddRandomNumber = (array) => {
    const max = array.length - 1;
    let randomNum = Math.floor(Math.random() * (max / 2)) +
        Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 === 0) {
        if (randomNum === max)
            randomNum -= 1;
        else
            randomNum += 1;
    }
    return array[randomNum];
};
exports.generateOddRandomNumber = generateOddRandomNumber;
const generateRandomNumber = (max) => {
    let randomNum = Math.floor(Math.random() * (max / 2)) +
        Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 !== 0) {
        if (randomNum === max)
            randomNum -= 1;
        else
            randomNum += 1;
    }
    return randomNum;
};
exports.generateRandomNumber = generateRandomNumber;
