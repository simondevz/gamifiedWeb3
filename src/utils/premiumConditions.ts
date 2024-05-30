export const isTripleWord = (rowIndex: number, colIndex: number) => {
  const co_ordinates = [
    [1, 1],
    [1, 8],
    [1, 15],
    [8, 1],
    [8, 15],
    [15, 1],
    [15, 8],
    [15, 15],
  ];
  for (let index = 0; index < co_ordinates.length; index++) {
    if (
      co_ordinates[index][0] === rowIndex &&
      co_ordinates[index][1] === colIndex
    )
      return true;
  }

  return false;
};

function isDoubleWord(rowIndex: number, colIndex: number) {
  const co_ordinates = [
    [2, 2],
    [2, 14],
    [3, 3],
    [3, 13],
    [4, 4],
    [4, 12],
    [5, 5],
    [5, 11],
    [8, 8],
    [11, 5],
    [11, 11],
    [12, 4],
    [12, 12],
    [13, 3],
    [13, 13],
    [14, 2],
    [14, 14],
  ];
  for (let index = 0; index < co_ordinates.length; index++) {
    if (
      co_ordinates[index][0] === rowIndex &&
      co_ordinates[index][1] === colIndex
    )
      return true;
  }

  return false;
}

function isTripleLetter(rowIndex: number, colIndex: number) {
  const co_ordinates = [
    [2, 6],
    [2, 10],
    [6, 2],
    [6, 6],
    [6, 10],
    [6, 14],
    [10, 2],
    [10, 6],
    [10, 10],
    [10, 14],
    [14, 6],
    [14, 10],
  ];
  for (let index = 0; index < co_ordinates.length; index++) {
    if (
      co_ordinates[index][0] === rowIndex &&
      co_ordinates[index][1] === colIndex
    )
      return true;
  }

  return false;
}

function isDoubleLetter(rowIndex: number, colIndex: number) {
  const co_ordinates = [
    [1, 4],
    [1, 12],
    [3, 7],
    [3, 9],
    [4, 1],
    [4, 8],
    [4, 15],
    [7, 3],
    [7, 7],
    [7, 9],
    [7, 13],
    [8, 4],
    [8, 12],
    [9, 3],
    [9, 7],
    [9, 9],
    [9, 13],
    [12, 1],
    [12, 8],
    [12, 15],
    [13, 7],
    [13, 9],
    [15, 4],
    [15, 12],
  ];
  for (let index = 0; index < co_ordinates.length; index++) {
    if (
      co_ordinates[index][0] === rowIndex &&
      co_ordinates[index][1] === colIndex
    )
      return true;
  }

  return false;
}

export const isStar = (rowIndex: number, colIndex: number) => {
  const co_ordinate = [7, 7];
  if (rowIndex === co_ordinate[0] && colIndex === co_ordinate[1]) return true;
  return false;
};

export const getPremium = (rowIndex: number, colIndex: number) => {
  if (isTripleWord(rowIndex, colIndex)) return "TW";
  if (isDoubleWord(rowIndex, colIndex)) return "DW";
  if (isTripleLetter(rowIndex, colIndex)) return "TL";
  if (isDoubleLetter(rowIndex, colIndex)) return "DL";
  return undefined;
};
