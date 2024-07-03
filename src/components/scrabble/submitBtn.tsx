import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseTime,
  markFirstMove,
  updateLoaderText,
  updatePauseTimer,
  updateRackTiles,
  updateRefillRack,
  updateScore,
  updateShowLoader,
  updateTilesPlayed,
} from "../../redux/slice";
import { MainAxisType, TilePlayedType } from "../../types/scrabble/types";
import { delay } from "../../utils/delay";
import {
  checkTileAfter,
  checkTileBefore,
  formWord,
  isNumeric,
} from "../../utils/helpers";
import web3Dictionary from "../utils/web3Dictionary.json";
import axios from "axios";
import Swal from "sweetalert2";

/**
 * @Important_Note_to_self
 * I probably made some mistakes earlier concerning row and col
 * thinking they are interchangeable and hopefully they are but
 * from here on out we follow the following convention
 *
 * first col is the vertical axis and row is the horizontal axis
 * and the second is in the 2d arrays the first index is col and
 * second is row
 */

export default function SubmitButton() {
  const dispatch = useAppDispatch();
  const tilesPlayed = useAppSelector((state) => state.app.tilesPlayed);
  const defaultLoaderText = useAppSelector(
    (state) => state.app.defaultLoaderText
  );

  const tiles = useAppSelector((state) => state.app.tiles);
  const board = useAppSelector((state) => state.app.board);
  const firstMove = useAppSelector((state) => state.app.firstMove);

  const rackTiles = useAppSelector((state) => state.app.rackTiles);
  const dictionaryApi = useAppSelector((state) => state.app.dictionaryApi);

  const findMainAxis = async (): Promise<MainAxisType> => {
    /**
     * Basicaly the main axis is the axis that has all the index the same
     * i.e If all the col values are the same then the main axis is the col
     */

    await delay(250);
    return new Promise((resolve, reject) => {
      // Things are a bit diffrent when only one tile is played
      if (tilesPlayed.length === 1) {
        // find first and last of on both axis
        const firstTileHorizontal = checkTileBefore(
          tilesPlayed[0],
          "horizontal",
          board
        );
        const lastTileHorizontal = checkTileAfter(
          tilesPlayed[0],
          "horizontal",
          board
        );

        if (firstTileHorizontal.tile === lastTileHorizontal.tile) {
          resolve("vertical");
        } else {
          resolve("horizontal");
        }
      }

      // Check if the main axis is row(vertical)
      let mainAxis: MainAxisType | undefined = undefined;
      for (let index = 1; index < tilesPlayed.length; index++) {
        if (mainAxis) break;
        if (
          tilesPlayed.length === 2 &&
          tilesPlayed[index - 1].row === tilesPlayed[index].row
        )
          mainAxis = "vertical";
        if (tilesPlayed[index - 1].row !== tilesPlayed[index].row) break;
        if (index + 1 === tilesPlayed.length) mainAxis = "vertical";
      }

      // Check if the main axis is col(horizontal)
      for (let index = 1; index < tilesPlayed.length; index++) {
        if (mainAxis) break;
        if (
          tilesPlayed.length === 2 &&
          tilesPlayed[index - 1].col === tilesPlayed[index].col
        )
          mainAxis = "vertical";
        if (tilesPlayed[index - 1].col !== tilesPlayed[index].col) break;
        if (index + 1 === tilesPlayed.length) mainAxis = "horizontal";
      }

      if (mainAxis) resolve(mainAxis);
      reject(new Error("Tiles are not in a Straight Line"));
    });
  };

  const sortTiles = async (
    mainAxis: MainAxisType
  ): Promise<TilePlayedType[]> => {
    /**
     * Sorts the array using the axis that is not the main
     * Also checks that the tiles are in a straight line
     */

    await delay(250);
    return new Promise((resolve) => {
      const tilesPlayedCopy = [...tilesPlayed];
      const sortAxis = mainAxis === "horizontal" ? "row" : "col"; // Using row and col so i can index into the object

      let sorted = tilesPlayedCopy.sort((a, b) => {
        const diff = Number(a[sortAxis]) - Number(b[sortAxis]);
        return diff;
      });
      if (tilesPlayedCopy.length === 1) sorted = tilesPlayedCopy;

      // resort to make sure that there is no gap
      resolve(sorted);
    });
  };

  const checkPositioning = async (
    mainAxis: MainAxisType,
    sortedTiles: TilePlayedType[]
  ): Promise<boolean> => {
    /**
     * This function checks that the tiles either
     * start on the star tile(for first moves) or
     * are connected to a tile that was previously
     * on the board
     */

    await delay(250);
    console.log(sortedTiles);

    return new Promise((resolve, reject) => {
      const checkAxis = mainAxis === "horizontal" ? "row" : "col";
      const mainAxisCopy = mainAxis === "vertical" ? "row" : "col";

      // If first move check that a tile is on (7,7)
      if (firstMove) {
        if (isNumeric(board[7][7].tile)) {
          resolve(true);
        } else {
          reject(
            new Error(
              "A tile must be played on the star square during first move"
            )
          );
        }
      }

      // Check the 2 ends of the main axis
      if (Number(sortedTiles[0][checkAxis]) !== 0) {
        if (
          isNumeric(
            board[
              checkAxis === "col"
                ? Number(sortedTiles[0][checkAxis]) - 1
                : Number(sortedTiles[0][mainAxisCopy])
            ][
              checkAxis === "col"
                ? Number(sortedTiles[0][mainAxisCopy])
                : Number(sortedTiles[0][checkAxis]) - 1
            ].tile
          )
        )
          resolve(true);
      }

      if (Number(sortedTiles[sortedTiles.length - 1][checkAxis]) !== 14) {
        if (
          isNumeric(
            board[
              checkAxis === "col"
                ? Number(sortedTiles[sortedTiles.length - 1][checkAxis]) + 1
                : Number(sortedTiles[sortedTiles.length - 1][mainAxisCopy])
            ][
              checkAxis === "col"
                ? Number(sortedTiles[sortedTiles.length - 1][mainAxisCopy])
                : Number(sortedTiles[sortedTiles.length - 1][checkAxis]) + 1
            ].tile
          )
        )
          resolve(true);
      }

      // Check the other axis of each letter
      for (let index = 0; index < sortedTiles.length; index++) {
        if (
          isNumeric(
            board[
              checkAxis === "col"
                ? Number(sortedTiles[index][checkAxis])
                : Number(sortedTiles[index][mainAxisCopy]) - 1
            ][
              checkAxis === "col"
                ? Number(sortedTiles[index][mainAxisCopy]) - 1
                : Number(sortedTiles[index][checkAxis])
            ].tile
          )
        )
          resolve(true);
        if (
          isNumeric(
            board[
              checkAxis === "col"
                ? Number(sortedTiles[index][checkAxis])
                : Number(sortedTiles[index][mainAxisCopy]) + 1
            ][
              checkAxis === "col"
                ? Number(sortedTiles[index][mainAxisCopy]) + 1
                : Number(sortedTiles[index][checkAxis])
            ].tile
          )
        )
          resolve(true);
      }

      // Cases where the new and old words form a cross and the letter joining them is in the middle of the new word the above method will not detect it.
      // But if we find a gap in the sorted array we can assume it is there. We will ofcourse still check the gap later on.
      if (sortTiles.length)
        sortedTiles.sort((a, b) => {
          const sortAxis = a.col === b.col ? "row" : "col";
          const diff = Number(a[sortAxis]) - Number(b[sortAxis]);
          if (Math.abs(diff) > 1) resolve(true);
          return diff;
        });

      reject(
        new Error(
          "At least one tile must be connected to the ones on the board"
        )
      );
    });
  };

  const getMainWord = async (
    mainAxis: MainAxisType,
    sortedTiles: TilePlayedType[]
  ): Promise<Record<string, number>[]> => {
    /**
     * Checks the main axis for the first and last letters.
     * Then adds every letter in between in to a string
     */

    await delay(250);
    return new Promise((resolve) => {
      const firstTile: TilePlayedType = checkTileBefore(
        sortedTiles[0],
        mainAxis,
        board
      );

      const lastTile: TilePlayedType = checkTileAfter(
        sortedTiles[sortedTiles.length - 1],
        mainAxis,
        board
      );

      if (Number(firstTile.tile) === Number(lastTile.tile)) resolve([]);
      const newWord = formWord(firstTile, lastTile, board, tiles);
      resolve([newWord]);
    });
  };

  const getOtherWords = async (
    mainAxis: MainAxisType,
    sortedTiles: TilePlayedType[],
    words: Record<string, number>[]
  ): Promise<Record<string, number>[]> => {
    /**
     * Gets the remaining words formed
     */

    return new Promise((resolve) => {
      for (let index = 0; index < sortedTiles.length; index++) {
        // For each case i want the opposite of the main axiz taken as the main axis
        const antiMainAxis: MainAxisType =
          mainAxis === "horizontal" ? "vertical" : "horizontal";

        const firstTile = checkTileBefore(
          sortedTiles[index],
          antiMainAxis,
          board
        );
        const lastTile = checkTileAfter(
          sortedTiles[index],
          antiMainAxis,
          board
        );

        if (Number(firstTile.tile) === Number(lastTile.tile)) continue;
        const newWord = formWord(firstTile, lastTile, board, tiles);
        words = [...words, newWord];
      }
      resolve(words);
    });
  };

  const filterWeb3Words = async (
    words: Record<string, number>[]
  ): Promise<{
    words: Record<string, number>[];
    web3Words: Record<string, number>[];
  }> => {
    // Checks the web3 dictionary fro web 3 words and removes the words from the words array
    return new Promise((resolve) => {
      const dictionary: Record<string, string> = web3Dictionary;
      const wordsCopy = [...words];
      const web3WordsCopy = _.remove(wordsCopy, (wordObj) => {
        const key: string = Object.keys(wordObj)[0];
        return dictionary?.[key];
      });
      resolve({ words: wordsCopy, web3Words: web3WordsCopy });
    });
  };

  const wordCheck = async (words: Record<string, number>[]) => {
    let revert = "";
    for (let index = 0; index < words.length; index++) {
      const word: string = Object.keys(words[index])[0];
      if (revert)
        return new Promise((_res, rev) =>
          rev(new Error(revert + " is not a valid word"))
        );

      try {
        await axios.get(dictionaryApi + word);
        await delay(500);
      } catch (error) {
        revert = word;
      }
    }

    if (revert) {
      dispatch(decreaseTime(10));
      console.log("dispatched deduce time");
      return new Promise((_res, rev) =>
        rev(new Error(revert + " is not a valid word"))
      );
    }
    return new Promise((resolve) => resolve(true));
  };

  // const revertGamePlay = async () => {
  //   for (let index = 0; index < tilesPlayed.length; index++) {
  //     const row = tilesPlayed[index].row;
  //     const col = tilesPlayed[index].col;

  //     if (isNumeric(row) && isNumeric(col)) {
  //       dispatch(
  //         updateBoard({
  //           ...board[col][row],
  //           tile: undefined,
  //           occupied: false,
  //         })
  //       );
  //     }
  //   }
  //   return new Promise((resolve) => resolve(true));
  // };

  const calculateScore = async (results: {
    words: Record<string, number>[];
    web3Words: Record<string, number>[];
  }): Promise<number> => {
    await delay(500);
    return new Promise((resolve) => {
      let score = 0;
      const web3Multiplier = 2;

      for (let index = 0; index < results.web3Words.length; index++) {
        const value =
          Object.values(results.web3Words[index])[0] * web3Multiplier;
        score += value;
      }

      for (let index = 0; index < results.words.length; index++) {
        const value = Object.values(results.words[index])[0];
        score += value;
      }

      resolve(score);
    });
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(updateShowLoader(true));
    dispatch(updatePauseTimer(true));
    let web3Words: Record<string, number>[] = [];
    let gameScore: number = 0;

    try {
      // Determine the main axis
      dispatch(updateLoaderText("Checking main axis"));
      const mainAxis = await findMainAxis();

      // Sort the tiles played array
      dispatch(updateLoaderText("Sorting tiles"));
      const sortedtiles = await sortTiles(mainAxis);

      // Check that atleast one of the tiles are connected to an old tile or on the star
      dispatch(updateLoaderText("Checking tile positions"));
      await checkPositioning(mainAxis, sortedtiles); // Todo: Needs futher testing

      // Check for the word on the main axis
      dispatch(updateLoaderText("Extracting words formed"));
      let words = await getMainWord(mainAxis, sortedtiles);
      words = await getOtherWords(mainAxis, sortedtiles, words); // Todo: Needs further testing

      // Check for Web3 words and double the score
      dispatch(updateLoaderText("Checking words"));
      const result = await filterWeb3Words(words);
      console.log(result);

      web3Words = result.web3Words;
      await wordCheck(result.words);

      // Update Player score
      dispatch(updateLoaderText("Calculating score"));
      gameScore = await calculateScore(result);
      dispatch(updateScore(gameScore));

      // Update the players rack tiles
      const remainingTiles = rackTiles.map((value) => {
        for (let index = 0; index < sortedtiles.length; index++) {
          if (value === Number(sortedtiles[index].tile)) return undefined;
        }
        return value;
      });
      dispatch(updateRackTiles(remainingTiles));

      // Show notification
      await Swal.fire({
        title: "Your Play was Successful!!!",
        icon: "success",
        text: `You scored ${gameScore}`,
        confirmButtonText: "Okay",
        timer: 4000,
      });

      // If web3 words were played show them
      const dictionary: Record<string, string> = web3Dictionary;
      if (web3Words.length > 0)
        web3Words.forEach(
          async (word, index) =>
            await Swal.fire({
              title: `You played the web3 word ${
                Object.keys(word)[0]
              }. It earned you ${Object.values(word)[0]}`,
              text: `Meaning: \n ${dictionary[Object.keys(word)[0]]}`,
              confirmButtonText:
                index + 1 === web3Words.length ? "Okay" : "Next",
            })
        );
      dispatch(updateTilesPlayed([]));
      dispatch(updateRefillRack(true));
      if (firstMove) dispatch(markFirstMove());
    } catch (error) {
      // Show notification
      Swal.fire({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: (error as any)?.message,
        icon: "error",
        title: "An error occured!!!",
      });
      console.log(error);
    }

    dispatch(updateShowLoader(false));
    dispatch(updatePauseTimer(false));
    dispatch(updateLoaderText(defaultLoaderText));
  };

  return (
    <button
      disabled={tilesPlayed.length > 0 ? false : true}
      onClick={handleClick}
      className="flex font-semibold px-2 h-8 max-xs:h-6 max-xs:text-[0.75rem] rounded-full disabled:bg-light_purple bg-purple text-white justify-center"
    >
      <span className="my-auto">Submit</span>
    </button>
  );
}

/**
 * Steps to submit
 * - Check that all tiles added on the board are in a horizontal or verticle line
 * - Check that the word(s) are a valid word in my list of words
 * - Check that the tiles played are connected to the ones on the board
 *
 * Things I need to know
 * - number of tiles on board at last game play
 * - number of tiles on board now
 * - tiles and tile locations
 *
 * Other things to note
 *  - You can tell if the user played horizontally or vertically by which is constant
 *  - recursively check for formed words and add to an array
 *  - After determining the play direction and therefore the "main word". You only really need to check the other direction recursively.
 */
