import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { SquareType, TileType } from "../../types/scrabble/types";
import { ClipLoader } from "react-spinners";
import { Draggable } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  updateBoard,
  updateTileLocations,
  updateTiles,
  updateTilesPlayed,
  updateToExchange,
} from "../../redux/slice";
import gsap from "gsap";
import { isNumeric } from "../../utils/helpers";
import _ from "lodash";

// TODO Try to fix the bugs later. Bugs below
// - After moving the tile multiple times it misbehaves

export default function Tile({ tile }: { tile: number }) {
  const [tiles, setTiles] = useState<TileType[]>([]);
  const [tilesLoaded, setTiledLoaded] = useState<boolean>(false);
  const tileElement = useRef(null);

  const [selectedSquare, setSelectedSquare] = useState<Element>();
  const [nextSelectedSquare, setNextSelectedSquare] = useState<Element>();
  const { squarePoints, snapRadius } = useAppSelector((state) => state.app);

  const [dragEnd, setDragEnd] = useState(false);
  const board = useAppSelector((state) => state.app.board);
  const dispatch = useAppDispatch();

  const boardRef = useRef(board);
  const [newSquare, setNewSquare] = useState<SquareType>(); // For moving tiles to a new tile
  const [oldSquare, setOldSquare] = useState<SquareType>(); // for removing tiles from old tiles

  const [realesed, setRealesed] = useState<boolean>(false);
  const [draggableTile, setDraggableTile] = useState<globalThis.Draggable[]>();
  const [wasDragged, setWasDragged] = useState(false); // Used to distinguish between drags and clicks

  const toExchange = useAppSelector((state) => state.app.toExchange);
  const [selected, setSelected] = useState(false); // to know if a tile is currently selected for exchange
  const [wasClicked, setWasClicked] = useState(false); // Used to know when a tile has been clicked

  const tilesPlayed = useAppSelector((state) => state.app.tilesPlayed); // Keeps track of the tiles played
  const tilesPlayedRef = useRef(tilesPlayed);
  const toExchangeRef = useRef(toExchange);

  const rackTiles = useAppSelector((state) => state.app.rackTiles);
  const [isDraggable, setisDraggable] = useState(false);
  const rackTilesRef = useRef(rackTiles);

  const tileLocations = useAppSelector(
    (state) => state.app.currentTilelocations
  );

  // GSAP codes
  const makeDraggable = useCallback(
    (element: gsap.DOMTarget) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let StartX: any, StartY: any;
      return Draggable.create(element, {
        type: "x,y",
        onDrag: function () {
          setDragEnd(false);
          setWasDragged(true);
          const selectedElement = document.elementFromPoint(
            this.pointerEvent.pageX,
            this.pointerEvent.pageY - snapRadius * 3
          );

          if (selectedElement?.classList.contains("scrabble_square")) {
            setNextSelectedSquare(selectedElement);
          }
        },
        onClick: function () {
          setWasClicked(true);
        },
        onDragEnd: function () {
          setDragEnd(true);
        },
        onPress: function () {
          StartX = this.x;
          StartY = this.y;
        },
        onRelease: function () {
          gsap.to(this.target, { x: StartX, y: StartY });
          setRealesed(true);
        },
      });
    },
    [snapRadius]
  );

  useGSAP(() => {
    if (snapRadius && squarePoints) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const returnTile = makeDraggable(tileElement.current);
      setDraggableTile(() => returnTile);
    }
  });

  // Using LayoutEffect to help prvent infinit rerender in what is to come
  useLayoutEffect(() => {
    boardRef.current = board;
    toExchangeRef.current = toExchange;
    tilesPlayedRef.current = tilesPlayed;
    rackTilesRef.current = rackTiles;
  }, [board, rackTiles, tilesPlayed, toExchange]);

  //  todo: Checks the rack (rackTiles array) for if the tile is on it. If it is it is draggable if not it is not
  useEffect(() => {
    rackTiles.forEach((num) => {
      if (Number(num) === tile) {
        setisDraggable(true);
        return;
      }
    });
  }, [rackTiles, tile]);

  // Use this effect to set the tiles final position when drag ends
  useEffect(() => {
    // Todo: refine logic for when the tile is moved from the board
    if (dragEnd) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row = (selectedSquare as any)?.dataset?.row;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const col = (selectedSquare as any)?.dataset?.col;

      if (isNumeric(row) && isNumeric(col)) {
        // Take note of the tiles the user played during the current game and their locations
        const tilesPlayedCopy = [...tilesPlayedRef.current];
        _.remove(tilesPlayedCopy, (n) => n.tile === tile); // Removes occurence of the current tile. Just incase it is being relocated
        dispatch(updateTilesPlayed([...tilesPlayedCopy, { tile, row, col }])); // Adds it to the array so it has the latest row and col values

        // Updates the tile locations and new square data
        dispatch(updateTileLocations({ tileNumber: tile, row, col })); // Todo: Make more reliable by removing the tile from the object when it is taken of the board
        setNewSquare({
          ...boardRef.current[col][row],
          tile,
          occupied: true,
        });
      }
    }
  }, [dispatch, dragEnd, selectedSquare, tile]);

  // After updating the new square this is called to update the board seperately
  useEffect(() => {
    if (newSquare) dispatch(updateBoard(newSquare));
  }, [dispatch, newSquare]);

  // Use this effect to switch the class of the currently selected square during draging
  useEffect(() => {
    if (nextSelectedSquare) {
      setSelectedSquare((prev) => {
        prev?.classList.remove("border-2");
        prev?.classList.remove("border-primary");
        nextSelectedSquare?.classList.add("border-2");
        nextSelectedSquare?.classList.add("border-primary");
        return nextSelectedSquare;
      });
    }
  }, [nextSelectedSquare]);

  // Run this piece of code when the tile is released
  useEffect(() => {
    if (realesed && wasDragged) {
      setRealesed(() => false);
      setWasDragged(() => false);
      if (draggableTile) {
        const element = draggableTile?.[0];

        // This condition lets us know if the tile is being picked from the board or the rack so we can apply the appropriate logic
        if (
          element.target.parentElement?.parentElement?.classList.contains(
            "scrabble_square_container"
          )
        ) {
          // This logic might look familiar. It is the same thing we do when dropping the tiles on a box from the rack, just that this time we are setting things to undefined and we are using new states to avoid conflict
          element.disable(); // stops the tile from being dragged again
          const row: number = Number(
            element.target.parentElement?.parentElement?.dataset.row
          );
          const col: number = Number(
            element.target.parentElement?.parentElement?.dataset.col
          );

          if (isNumeric(row) && isNumeric(col)) {
            setOldSquare({
              ...boardRef.current[col][row],
              tile: undefined,
              occupied: false,
            });
          }
        } else {
          element.target.classList.add("hidden");
          element.target.parentElement?.classList.add("hover:scale-125");
        }
      }
    }
  }, [draggableTile, realesed, wasDragged]);

  // After updating the old square this is called to update the board seperately
  useEffect(() => {
    if (oldSquare) dispatch(updateBoard(oldSquare));
  }, [dispatch, oldSquare]);

  // Logic for when a tile is clicked
  useEffect(() => {
    if (wasClicked) {
      setWasClicked(() => false);
      const newArray = [...toExchangeRef.current];
      const result = newArray.filter((n) => n === tile);

      if (result.length) {
        setSelected(false);
        dispatch(updateToExchange([tile, "remove"]));
      } else {
        setSelected(true);
        dispatch(updateToExchange([tile, "add"]));
      }
    }
  }, [dispatch, tile, wasClicked]);

  // Fill up the tiles array
  useMemo(() => {
    // An array that represents the letters, how many times they occur and their value in the game in that order.
    const letterOccuranceValuePair: [string[], number, number][] = [
      [["k"], 1, 5],
      [["j", "x"], 1, 8],
      [["q", "z"], 1, 10],
      [["_"], 2, 0],
      [["b", "c", "m", "p"], 2, 3],
      [["f", "h", "v", "w", "y"], 2, 4],
      [["g"], 3, 2],
      [["l", "s", "u"], 4, 1],
      [["d"], 4, 2],
      [["n", "r", "t"], 6, 1],
      [["o"], 8, 1],
      [["a", "i"], 9, 1],
      [["e"], 12, 1],
    ];

    let tempTiles: TileType[] = [];
    letterOccuranceValuePair.forEach((item) => {
      const letters: string[] = item[0];
      const occurence: number = item[1];
      const value: number = item[2];

      // Create the tiles and add them to an array
      for (let index = 0; index < letters.length; index++) {
        for (let num = 0; num < occurence; num++) {
          const tile: TileType = {
            letter: letters[index],
            value: value,
          };
          tempTiles = [...tempTiles, tile];
        }
      }
    });

    // Update the tiles state
    setTiles(tempTiles);
    dispatch(updateTiles(tempTiles));
    setTiledLoaded(true);
  }, [dispatch]);

  // Revert the state of the tile to the initial state
  const revertTileState = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((event.target as Element)?.children[0]?.classList.contains("hidden")) {
      // Make tile not hidden
      (event.target as Element)?.children[0]?.classList?.remove("hidden");
      (event.target as Element)?.classList?.remove("hover:scale-125");

      // Make the tile the tile is currently on empty
      const row: number = Number(tileLocations[tile].row);
      const col: number = Number(tileLocations[tile].col);

      if (isNumeric(row) && isNumeric(col)) {
        dispatch(
          updateBoard({
            ...boardRef.current[col][row],
            tile: undefined,
            occupied: false,
          })
        );
      }

      // Remove the tile from tilesPlayed array
      const tilesPlayedCopy = [...tilesPlayed];
      _.remove(tilesPlayedCopy, (n) => n.tile === tile);
      dispatch(updateTilesPlayed(tilesPlayedCopy));

      // Reset related states
      setSelectedSquare(undefined);
      setNextSelectedSquare(undefined);
      setNewSquare(undefined);
      setOldSquare(undefined);
    }
  };

  return (
    <div
      onClick={revertTileState}
      className="cursor-pointer flex w-8 h-8 bg-white scrabble_tiles_container rounded-md"
    >
      <div
        ref={!isDraggable ? tileElement : null}
        className={
          "scrabble_tiles flex relative w-8 h-8 rounded-md bg-tile_color text-white justify-center " +
          (selected ? " outline" : "")
        }
      >
        {tilesLoaded && tiles.length === 100 ? (
          tiles[tile].value === 0 ? (
            <></>
          ) : (
            <>
              <span className="uppercase text-[1.5rem] font-bold my-auto leading-3">
                {tiles[tile].letter}
              </span>
              <span className="absolute bottom-0 right-0 text-[0.5rem] p-[0.1rem]">
                {tiles[tile].value}
              </span>
            </>
          )
        ) : (
          <ClipLoader color="#fff" className="my-auto" />
        )}
      </div>
    </div>
  );
}
