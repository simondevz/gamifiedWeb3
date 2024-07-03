import { useMemo, useState } from "react";
import { BoardType, SquareType } from "../../types/scrabble/types";
import { getPremium } from "../../utils/premiumConditions";
import Square from "./square";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { uploadBoard } from "../../redux/slice";

export default function Board() {
  const board = useAppSelector((state) => state.app.board);
  const [boardLoaded, setBoardLoaded] = useState(false);
  const dispatch = useAppDispatch();

  // process the squares array and load up the board
  useMemo(() => {
    // TODO: Write logic for when it is an existing game. For now New Games.
    // Think of the board as a m * n matrix
    const m = 15;
    const n = 15;

    // Update each square to have the appropriate values
    let columns: BoardType = [];
    for (let colIndex = 0; colIndex < m; colIndex++) {
      let rows: SquareType[] = [];
      for (let rowIndex = 0; rowIndex < n; rowIndex++) {
        const square: SquareType = {
          col: colIndex,
          row: rowIndex,
          premium: getPremium(rowIndex + 1, colIndex + 1),
          occupied: false,
        };
        rows = [...rows, square];
      }
      columns = [...columns, rows];
    }

    // Update state
    dispatch(uploadBoard(columns));
    setBoardLoaded(true);
  }, [dispatch]);

  const Loading = () => <div>Loading...</div>;

  return (
    <div className="grid grid-cols-15 gap-[0.2rem] max-xs:gap-[0.1rem] ">
      {boardLoaded ? (
        board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Square
              key={`${rowIndex}_${colIndex}`}
              row={col.row}
              col={col.col}
              occupied={col.occupied}
              premium={col.premium}
              tile={col.tile}
            />
          ))
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
