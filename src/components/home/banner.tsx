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
        <NavBar home />
        <div className="flex px-8 py-2">
          <div className="flex flex-col text-pale_blue my-32">
            <span className="flex font-jomo text-[1.2rem] uppercase">
              play your
            </span>
            <span className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing text-[6rem] uppercase">
              web3 game
            </span>
            <span className="flex text-[1.2rem] w-[30rem]">
              Learning experiences that blend the excitement of gaming with the
              depth of education
            </span>
            <div className="flex gap-6 py-8 px-8">
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
