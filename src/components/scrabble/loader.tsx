import { ClockLoader } from "react-spinners";
import { useAppSelector } from "../../redux/hooks";

export default function Loader() {
  const { showLoader, loaderText } = useAppSelector((state) => state.app);
  return !showLoader ? (
    <></>
  ) : (
    <div className="flex h-screen w-screen fixed justify-center scale-x-[-1]">
      <div className="flex flex-col gap-4 bg-black rounded-lg px-6 py-4 place-self-center">
        <span className="flex mx-auto">
          <ClockLoader color="#fff" />
        </span>
        <span className="text-white text-[0.875rem] mx-auto">
          {loaderText}...
        </span>
      </div>
    </div>
  );
}
