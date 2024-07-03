import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import bgImage from "../assets/home_bg.jpeg";
import Board from "../components/scrabble/board";
import Rack from "../components/scrabble/rack";
import Loader from "../components/scrabble/loader";
import { randomNumbers } from "../utils/random";
import _ from "lodash";
import { delay } from "../utils/delay";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  updateBag,
  updateGameSettings,
  updateLoaderText,
  updateRackTiles,
  updateRefillRack,
  updateShowLoader,
} from "../redux/slice";
import Timer from "../components/scrabble/timer";
import EndgameBtn from "../components/scrabble/endGame";
import { useSearchParams } from "react-router-dom";

export default function Scrabble() {
  const dispatch = useAppDispatch();
  const { defaultLoaderText } = useAppSelector((state) => state.app);
  const refillRack = useAppSelector((state) => state.app.refillRack);

  const bag = useAppSelector((state) => state.app.bag);
  const rackTiles = useAppSelector((state) => state.app.rackTiles);
  const [rackFilled, setRackfilled] = useState(false); // To signify that the rack has been filled at game start

  const { score } = useAppSelector((state) => state.app);
  const bagRef = useRef(bag);
  const [searchParams] = useSearchParams();

  useLayoutEffect(() => {
    bagRef.current = bag;
  }, [bag]);

  // Update the game settings at the start of the game
  useEffect(() => {
    dispatch(
      updateGameSettings({
        gameType: searchParams.get("gameType")!,
        playingTime: searchParams.get("puzzleTime")!,
      })
    );
  }, [dispatch, searchParams]);

  // fill Bag array
  useMemo(() => {
    let returnArr: number[] = [];
    for (let index = 0; index < 100; index++) {
      returnArr = [...returnArr, index];
    }
    dispatch(updateBag(returnArr));
  }, [dispatch]);

  // Fill player Rack at game start
  useEffect(() => {
    (async () => {
      if (!rackFilled) {
        const bagCopy = [...bag];
        dispatch(updateShowLoader(true));
        dispatch(updateLoaderText("Filling Rack"));
        setRackfilled(() => true);

        // Get the list of random numbers less than the number of tiles left in the bag
        const randNumbers = await randomNumbers(7, bagCopy.length);
        const tempPlayerTiles: number[] = [];

        // Using this list of random numbers index into the bag and get the tile index. Add it to the players rack
        for (let index = 0; index < randNumbers.length; index++) {
          tempPlayerTiles.push(bagCopy[randNumbers[index]]);
        }

        // Remove the used numbers so that the bag's size also reduces
        _.pullAll(bagCopy, tempPlayerTiles);
        await delay(1000);
        dispatch(updateBag(bagCopy));
        dispatch(updateRackTiles([...tempPlayerTiles]));

        dispatch(updateShowLoader(false));
        dispatch(updateLoaderText(defaultLoaderText));
      }
    })();
  }, [bag, defaultLoaderText, dispatch, rackFilled]);

  // Use effect for re-filling the rack
  useEffect(() => {
    (async () => {
      if (refillRack) {
        // Gets the number of empty spaces
        let count = 0;
        rackTiles.forEach((num) => {
          if (num === undefined) count += 1;
        });

        const bagCopy = [...bag];
        dispatch(updateShowLoader(true));
        dispatch(updateLoaderText("Filling Rack"));

        // Get the list of random numbers less than the number of tiles left in the bag
        const randNumbers = await randomNumbers(count, bagCopy.length);
        const tempPlayerTiles = [...rackTiles];

        // Using this list of random numbers index into the bag and get the tile index. Add it to the players rack
        for (let index = 0; index < randNumbers.length; index++) {
          for (let index2 = 0; index2 < tempPlayerTiles.length; index2++) {
            if (tempPlayerTiles[index2] === undefined) {
              tempPlayerTiles[index2] = randNumbers[index];
              break;
            }
          }
        }

        // Remove the used numbers so that the bag's size also reduces
        _.pullAll(bagCopy, tempPlayerTiles);
        await delay(1000);
        dispatch(updateBag(bagCopy));
        dispatch(updateRackTiles([...tempPlayerTiles]));

        dispatch(updateShowLoader(false));
        dispatch(updateRefillRack(false));
        dispatch(updateLoaderText(defaultLoaderText));
      }
    })();
  }, [bag, defaultLoaderText, dispatch, rackTiles, refillRack]);

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      className="flex w-screen bg-cover bg-center bg-no-repeat scale-x-[-1]"
    >
      <div className="flex justify-center w-full h-full bg-white/40 scale-x-[-1]">
        <div className="flex max-xs:w-full my-auto flex-col bg-sky_blue max-sm:scale-75 max-xs:scale-[1]">
          <div className="flex flex-col gap-4 relative w-full bg-primary py-4 px-6 rounded-b-lg">
            <div className="flex w-full flex-row-reverse justify-between">
              <Timer />
              <EndgameBtn />
              <div className="text-white flex gap-4 max-xs:gap-2 flex-col">
                <div className="font-semibold flex gap-4 max-xs:gap-2 max-xs:text-[0.75rem]">
                  <span>Tiles in bag:</span>
                  <span className="w-24 text-center rounded-md bg-deep_blue">
                    {bag.length}
                  </span>
                </div>
                <div className="font-semibold flex gap-4 max-xs:gap-2 max-xs:text-[0.75rem]">
                  <span>Score</span>
                  <span className="w-24 text-center rounded-md bg-deep_blue">
                    {score}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-sky_blue px-6 max-xs:px-4 pt-12 pb-8 max-xs:pb-6">
            <Board />
          </div>
          <div className="flex w-full bg-primary py-4 rounded-t-lg">
            <Rack />
          </div>
        </div>
      </div>

      {/* Incase of loading */}
      <Loader />
    </section>
  );
}
