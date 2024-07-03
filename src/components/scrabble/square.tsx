import { MdOutlineStarPurple500 } from "react-icons/md";
import { SquareType } from "../../types/scrabble/types";
import { isStar } from "../../utils/premiumConditions";
import Tile from "./tile";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateSnapRadius, updateSquarePoints } from "../../redux/slice";
import { isNumeric } from "../../utils/helpers";

export default function Square({
  row,
  col,
  premium,
  occupied,
  tile,
}: SquareType) {
  const squareRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const coordinateData = squareRef.current?.getBoundingClientRect();
    if (coordinateData?.x) {
      dispatch(updateSnapRadius(coordinateData.width));
      dispatch(
        updateSquarePoints({
          x: coordinateData.x,
          y: coordinateData.y,
        })
      );
    }
  }, [dispatch]);

  return (
    <div
      ref={squareRef}
      data-col={col}
      data-row={row}
      className="flex justify-center scrabble_square_container"
    >
      {occupied && isNumeric(tile) ? (
        <Tile tile={tile!} />
      ) : (
        <div
          data-col={col}
          data-row={row}
          className={
            (!premium
              ? "bg-white "
              : premium === "DL"
              ? "bg-dl "
              : premium === "TL"
              ? "bg-tl "
              : premium === "DW"
              ? "bg-dw "
              : premium === "TW"
              ? "bg-tw "
              : "") +
            "flex w-8 max-xs:w-6 max-xs:h-6 max-xs:text-[0.5rem] h-8 rounded-md scrabble_square"
          }
        >
          {isStar(row, col) ? (
            <MdOutlineStarPurple500
              size={"1.25rem"}
              color="#fff"
              className="mx-auto my-auto scrabble_square_child"
            />
          ) : premium && !isStar(row, col) ? (
            <span className="mx-auto my-auto text-white font-semibold scrabble_square_child">
              {premium}
            </span>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

/** Features a board box should have
 * - row (number)
 * - col (number)
 * - index (number) === row * col
 * - premium (string \ null)
 * - tile (tileType/undefined)
 *  */

/**
 * Tile type
 * - letter
 * - value (number)
 */

/**
 * When updating the server on the moves, a list of objects with the following properties
 * - move number(might be omited and array index used)
 * - word played
 * - word direction (down or right)
 * - player that played.
 */
