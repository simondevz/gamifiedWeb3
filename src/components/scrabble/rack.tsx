import { useMemo } from "react";
import Tile from "./tile";
import SubmitButton from "./submitBtn";
import ExchangeButton from "./exchangeBtn";
import PassButton from "./passBtn";
import { useAppSelector } from "../../redux/hooks";
import { isNumeric } from "../../utils/helpers";

export default function Rack() {
  const rackTiles = useAppSelector((state) => state.app.rackTiles);

  // Array must always be of length seven
  const formattedArray = useMemo(() => {
    const tiles = [...rackTiles];
    let temp: (number | undefined)[] = [];

    for (let index = 0; index < 7; index++) {
      if (isNumeric(tiles?.[index])) {
        temp = [...temp, tiles[index]];
      } else {
        temp = [...temp, undefined];
      }
    }
    return temp;
  }, [rackTiles]);

  return (
    <div className="flex max-xs:flex-col-reverse gap-2 mx-auto">
      <div className="flex gap-2">
        {formattedArray.map((value, index) =>
          isNumeric(value) ? (
            <Tile key={index} tile={value!} />
          ) : (
            <span
              className="flex w-8 max-xs:w-6 max-xs:h-6 max-xs:text-[0.5rem] h-8 rounded-md bg-white"
              key={index}
            ></span>
          )
        )}
      </div>
      <div className="flex gap-2 max-xs:w-full max-xs:justify-end">
        <PassButton />
        <ExchangeButton />
        <SubmitButton />
      </div>
    </div>
  );
}
