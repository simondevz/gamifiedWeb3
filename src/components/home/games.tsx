import GameCard from "./gamecard";

export default function Games() {
  return (
    <div className="flex flex-col gap-6 w-full px-8 pt-20 max-lg:pt-14 max-xs:pt-4">
      <div className="flex flex-col w-full">
        <h1 className="capitalize mx-auto max-xs:text-[2rem] text-[3.5rem] text-primary font-racing">
          our game land
        </h1>
        <span className="flex mx-auto text-primary max-xs:text-[0.75rem] max-xs:w-[18rem] w-[30rem] text-center font-semibold">
          Get rewarded in crypto and NFTs as we breach the line between our
          Education system and Web3
        </span>
      </div>
      <div className="flex gap-4 w-full justify-around max-lg:overflow-x-scroll">
        {["Scrabble", "Word Connect", "Riddles", "Word Puzzle"].map(
          (item, index) => (
            <GameCard name={item} key={index} />
          )
        )}
      </div>
    </div>
  );
}
