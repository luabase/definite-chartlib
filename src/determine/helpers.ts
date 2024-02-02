import { stateAbbreviations } from "../constants";

export function findNumberIndex(dataArray) {
  let numberIndex = -1;

  // Assuming each element in dataArray is an array
  if (dataArray.length > 0 && Array.isArray(dataArray[0])) {
    for (let i = 0; i < dataArray[0].length; i++) {
      if (isNumber(dataArray[0][i])) {
        numberIndex = i;
      }

      if (numberIndex !== -1) {
        break;
      }
    }
  }

  return { numberIndex };
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

export function findCountryOrStateIndices(arr) {
  let stateIndex = -1,
    countryIndex = -1;
  arr.forEach((str, index) => {
    if (str.toLowerCase().includes("state") && stateIndex === -1) {
      stateIndex = index;
    }
    if (str.toLowerCase().includes("countr") && countryIndex === -1) {
      countryIndex = index;
    }
  });
  return { stateIndex, countryIndex };
}
