import _ from "lodash";
import {
  BoardType,
  MainAxisType,
  SquarePointsType,
  TilePlayedType,
  TileType,
} from "../types/scrabble/types";

export const findClosestObject = (
  array: SquarePointsType[],
  target: SquarePointsType
): SquarePointsType => {
  if (array.length === 0) {
    throw new Error("Array cannot be empty.");
  }

  let closestObject: SquarePointsType | undefined;
  let smallestDistance = Infinity;

  array.forEach((object) => {
    const dx = object.x - target.x;
    const dy = object.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestObject = object;
    }
  });

  if (closestObject === undefined) {
    throw new Error("No object found.");
  }

  return closestObject;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Recursively checks if the first tile has a tile before it. Returns when it does not
export function checkTileBefore(
  current: TilePlayedType,
  mainAxis: MainAxisType, // Not necesarily the main axis but the one that will be constant during the search
  board: BoardType
) {
  const mainAxisCopy = mainAxis === "vertical" ? "row" : "col";
  const otherAxis = mainAxis === "horizontal" ? "row" : "col";

  const col =
    mainAxisCopy === "col"
      ? Number(current[mainAxisCopy])
      : Number(current[otherAxis]) - 1;
  const row =
    otherAxis === "row"
      ? Number(current[otherAxis]) - 1
      : Number(current[mainAxisCopy]);
  if (row === -1) return current;

  const possibleNext = board[col][row];
  console.log(possibleNext);

  if (isNumeric(possibleNext.tile))
    return checkTileBefore(
      {
        tile: possibleNext.tile!,
        row,
        col,
      },
      mainAxis,
      board
    );
  return current;
}

// Recursively checks if the last tile has a tile after it. Returns when it does not
export function checkTileAfter(
  current: TilePlayedType,
  mainAxis: MainAxisType, // Not necesarily the main axis but the one that will be constant during the search
  board: BoardType
) {
  const mainAxisCopy = mainAxis === "vertical" ? "row" : "col";
  const otherAxis = mainAxis === "horizontal" ? "row" : "col";

  const col =
    mainAxisCopy === "col"
      ? Number(current[mainAxisCopy])
      : Number(current[otherAxis]) + 1;
  const row =
    otherAxis === "row"
      ? Number(current[otherAxis]) + 1
      : Number(current[mainAxisCopy]);
  if (row === 15) return current;

  const possibleNext = board[col][row];
  if (isNumeric(possibleNext.tile))
    return checkTileAfter(
      {
        tile: possibleNext.tile!,
        row,
        col,
      },
      mainAxis,
      board
    );
  return current;
}

// Checks along the other axis (i.e non-main) for the leters of the word
export function formWord(
  firstTile: TilePlayedType,
  lastTile: TilePlayedType,
  board: BoardType,
  tiles: TileType[]
) {
  const changeingAxis =
    Number(firstTile.col) === Number(lastTile.col) ? "row" : "col";
  const constAxis =
    Number(firstTile.col) === Number(lastTile.col) ? "col" : "row";

  const wordlength =
    Number(lastTile[changeingAxis]) - Number(firstTile[changeingAxis]) + 1;

  let letters: string[] = [];
  let values: number[] = [];
  let toMultiplyBy3 = 0;
  let toMultiplyBy2 = 0;
  console.log("word lenght ==>>", wordlength);

  for (let index = 0; index < wordlength; index++) {
    const col =
      constAxis === "col"
        ? Number(firstTile[constAxis])
        : Number(firstTile[changeingAxis]) + index;
    const row =
      changeingAxis === "row"
        ? Number(firstTile[changeingAxis]) + index
        : Number(firstTile[constAxis]);
    let multipler = 1;

    if (isNumeric(board[col][row]?.tile)) {
      letters = [...letters, tiles[board[col][row]?.tile as number].letter];
      console.log(letters);

      if (board[col][row].premium === "DL") multipler = 2;
      if (board[col][row].premium === "DW") toMultiplyBy2++;
      if (board[col][row].premium === "TL") multipler = 3;
      if (board[col][row].premium === "TW") toMultiplyBy3++;
      values = [
        ...values,
        tiles[board[col][row]?.tile as number].value * multipler,
      ];
    }
  }

  if (wordlength > letters.length) throw new Error("Gap in word");
  const word = _.join(letters, "");
  let wordValue = 0;
  for (let index = 0; index < values.length; index++) {
    wordValue += values[index];
  }
  if (toMultiplyBy3) wordValue = wordValue * toMultiplyBy3 * 3;
  if (toMultiplyBy2) wordValue = wordValue * toMultiplyBy2 * 2;
  return { [word]: wordValue };
}

export const formatAddress = (address: `0x${string}`) => {
  return _.truncate(address, { length: 9 }) + address.slice(-4);
};
