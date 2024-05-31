import { Link } from "react-router-dom";
import scrabbleImg from "../../assets/scrabble.jpeg";
import wordConnect from "../../assets/word connect.png";
import riddlesImg from "../../assets/word riddles.jpeg";
import crosswordPuzzleImg from "../../assets/crossword puzzle.png";

export default function GameCard({ name }: { name: string }) {
  const bgImg = name.toLowerCase().includes("scrabble")
    ? scrabbleImg
    : name.toLowerCase().includes("word connect")
    ? wordConnect
    : name.toLowerCase().includes("riddle")
    ? riddlesImg
    : crosswordPuzzleImg;

  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          borderTop: "3px solid green",
          borderBottom: "3px solid green",
          borderImage:
            "linear-gradient( 90deg, #0019FF, #0019FF 1%, #0019FF 0 15%, #7482FF 0 85%, #0019FF 0 100%) 10",
          backgroundImage:
            "linear-gradient( 180deg, #0019FF, #0019FF 1%, #0019FF 0 10%, #7482FF 0 90%, #0019FF 0 100%)",
        }}
        className="px-[3px]"
      >
        <div className="flex p-4 bg-white ">
          {/* to hold image */}
          <div
            style={{
              backgroundImage: `url(${bgImg})`,
            }}
            className="bg-cover bg-norepeat bg-center w-52 h-60"
          ></div>
        </div>
      </div>
      <div className="flex w-full">
        <Link to={`/games?game=${name}`} className="flex mx-auto font-bold">
          {name}
        </Link>
      </div>
    </div>
  );
}
