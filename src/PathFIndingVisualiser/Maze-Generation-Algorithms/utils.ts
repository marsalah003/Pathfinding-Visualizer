const range = (len: number) => {
  const result = [];

  for (let i = 0; i < len; i++) {
    result.push(i);
  }

  return result;
};
const generateOddRandomNumber = (array: number[]) => {
  const max = array.length - 1;

  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));

  if (randomNum % 2 === 0) {
    if (randomNum === max) randomNum -= 1;
    else randomNum += 1;
  }

  return array[randomNum];
};
const generateRandomNumber = (max: number) => {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));

  if (randomNum % 2 !== 0) {
    if (randomNum === max) randomNum -= 1;
    else randomNum += 1;
  }

  return randomNum;
};
export { generateOddRandomNumber, range, generateRandomNumber };
