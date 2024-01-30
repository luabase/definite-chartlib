import { stateAbbreviations } from "../constants";

export function findStateAndNumberIndices(dataArray) {
  let stateIndex = -1;
  let numberIndex = -1;

  // Assuming each element in dataArray is an array
  if (dataArray.length > 0 && Array.isArray(dataArray[0])) {
    for (let i = 0; i < dataArray[0].length; i++) {
      if (isState(dataArray[0][i])) {
        stateIndex = i;
      } else if (isNumber(dataArray[0][i])) {
        numberIndex = i;
      }

      if (stateIndex !== -1 && numberIndex !== -1) {
        break;
      }
    }
  }

  return { stateIndex, numberIndex };
}

// Check if the value is a state name or abbreviation
function isState(value) {
  return (
    value in stateAbbreviations ||
    Object.values(stateAbbreviations).includes(value)
  );
}

// Check if the value is a number
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function findMinMax(datasetsSource) {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  datasetsSource.forEach((sourceItem) => {
    const numberValue = sourceItem[1];
    if (numberValue < min) min = numberValue;
    if (numberValue > max) max = numberValue;
  });

  return { min, max };
}
