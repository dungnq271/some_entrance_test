const mostFrequentStringLengths = (arr) => {
  let resultArr = [];

  let stringLengthToCount = {};

  // map length to the number of occurences
  arr.forEach((str) => {
    const length = str.length;
    if (stringLengthToCount[length]) {
      stringLengthToCount[length] += 1;
    } else {
      stringLengthToCount[length] = 1;
    }
  });

  // find the most frequent number of string length
  const lengthCounts = Object.values(stringLengthToCount);
  const maxLengthCount = Math.max(...lengthCounts);

  // find the string length that has the most number of occurences
  const mostFrequentLength = Object.keys(stringLengthToCount)[lengthCounts.indexOf(maxLengthCount)];

  // get all the strings which has this length
  if (mostFrequentLength) resultArr = arr.filter((str) => str.length === +mostFrequentLength);

  return resultArr;
};

export default mostFrequentStringLengths;
