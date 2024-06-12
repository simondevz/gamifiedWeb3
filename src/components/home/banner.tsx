import homeBackground from "../../assets/home_bg.jpeg";
import { useAppDispatch } from "../../redux/hooks";
import { updateConnectWallet } from "../../redux/slice";
import { PrimaryButton, SecondaryButton } from "../utils/buttons";
import NavBar from "../utils/navBar";

export default function Banner() {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        backgroundImage: `url(${homeBackground})`,
      }}
      className="flex w-full scale-x-[-1] bg-no-repeat bg-cover"
    >
      <div className="scale-x-[-1] flex w-full flex-col">
        <NavBar />
        <div className="flex px-8 py-2">
          <div className="flex flex-col text-pale_blue max-xs:my-10 max-sm:my-16 max-md:my-24 my-32">
            <span className="flex font-jomo max-md:text-base max-sm:text-[0.875rem] max-xs:text-[0.75rem] text-[1.2rem] uppercase">
              play your
            </span>
            <span className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing max-sm:text-[3.5rem] max-xs:text-[3rem] max-md:text-[5rem] text-[6rem] uppercase">
              web3 game
            </span>
            <span className="flex max-md:text-base max-sm:text-[0.875rem] max-xs:text-[0.75rem] text-[1.2rem] max-md:w-[27rem] max-sm:w-[20rem] w-[30rem]">
              Learning experiences that blend the excitement of gaming with the
              depth of education
            </span>

            <div className="flex gap-6 py-8 px-8 max-xs:ml-[-7rem] max-xs:scale-50 max-xs:-mt-8 max-sm:ml-[-3.5rem] max-sm:scale-75 max-md:ml-[-1.5rem] max-md:scale-90">
              <SecondaryButton text="Explore Now" serif />
              <PrimaryButton
                onclick={() => dispatch(updateConnectWallet(true))}
                text="Connect Wallet"
                serif
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
