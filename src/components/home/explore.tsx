import { PrimaryButton } from "../utils/buttons";

export default function Explore() {
  return (
    <div className="flex justify-between pb-20 pl-10 pr-24 pt-16">
      <div className="flex flex-col my-auto">
        <span className="flex flex-col text-[2.5rem] pt-20 text-primary font-racing">
          <span className="leading-12">Get NFTs Rewards for </span>
          <span className="leading-12">Playing Your Favorite Games</span>
        </span>
        <span className="flex text-primary font-semibold mb-4 w-[30rem]">
          NFT games are one of the most exciting developments, offering fun ways
          to learn and earn an income
        </span>
        <div className="pl-4">
          <PrimaryButton text="Explore Now" />
        </div>
      </div>
      <div className="flex">
        <div className="flex w-52 h-60 bg-ash rounded-lg border-dashed border-2 border-black relative top-20 rotate-[-5.89deg]"></div>
        <div className="flex w-64 h-[18rem] bg-ash rounded-lg border-dashed border-2 border-black rotate-[17.77deg]"></div>
      </div>
    </div>
  );
}
