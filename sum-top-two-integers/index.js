const sumTopTwoIntegers = (arr) => {
  let result;

  // get all the integers from the array
  let intArr = arr.filter((ele) => typeof ele === 'number');

  if (intArr.length < 2) return result;

  // find the largest integer in the array
  const largestInt = Math.max(...intArr);

  // find the next largest integer
  const secondLargestInt = Math.max(...intArr.toSpliced(intArr.indexOf(largestInt), 1));

  return largestInt + secondLargestInt;
};

export default sumTopTwoIntegers;
