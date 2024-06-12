import { PrimaryButton } from "../utils/buttons";
import achiementNftImg from "../../assets/achievement_nft.jpg";
import powerUpNft from "../../assets/2x_nft.jpg";

export default function Explore() {
  return (
    <div className="flex max-md:flex-col justify-between pb-20 max-lg:pb-16 max-lg:pl-8 pl-10 pr-24 max-md:pt-2 max-md:-mt-10 max-lg:pt-14 pt-16 max-xs:-mb-16">
      <div className="flex flex-col my-auto max-xs:w-full">
        <span className="flex flex-col max-xs:text-center max-xs:text-[0.875rem] max-sm:text-[1.5rem] max-lg:text-[2rem] max-lg:pt-26 text-[2.5rem] pt-20 text-primary font-racing">
          <span className="leading-12 max-lg:leading-10 max-sm:leading-8 max-xs:leading-4">
            Get NFTs Rewards for{" "}
          </span>
          <span className="leading-12 max-lg:leading-10 max-sm:leading-8 max-xs:leading-4">
            Playing Your Favorite Games
          </span>
        </span>
        <span className="flex text-primary font-semibold mb-4 max-xs:text-center max-xs:pt-3 max-xs:mx-auto max-xs:text-[0.75rem] max-lg:text-[0.875rem] max-sm:w-[15rem] max-lg:w-[20rem] w-[30rem]">
          NFT games are one of the most exciting developments, offering fun ways
          to learn and earn an income
        </span>
        <div className="pl-4 max-sm:scale-75 max-sm:-ml-10 max-xs:flex max-xs:w-full max-xs:pl-20">
          <PrimaryButton className="max-xs:mx-auto" text="Explore Now" />
        </div>
      </div>
      <div className="flex max-xs:static max-xs:-mr-24 max-xs:-ml-24 max-xs:pl-8 max-md:relative max-md:top-[-8rem] max-md:left-[9rem] max-xs:-mb-20 max-md:-mb-60 max-sm:scale-[0.6] max-lg:scale-[0.7]">
        <div
          style={{
            backgroundImage: `url(${achiementNftImg})`,
          }}
          className="flex w-52 h-60 bg-ash bg-center bg-cover rounded-lg border-dashed border-2 border-black relative top-20 rotate-[-5.89deg]"
        ></div>
        <div
          style={{
            backgroundImage: `url(${powerUpNft})`,
          }}
          className="flex w-64 h-[18rem] bg-ash bg-center bg-cover rounded-lg border-dashed border-2 border-black rotate-[17.77deg]"
        ></div>
      </div>
    </div>
  );
}
