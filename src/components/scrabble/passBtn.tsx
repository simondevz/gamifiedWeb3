import { IoPlayForward } from "react-icons/io5";

export default function PassButton() {
  return (
    <button className="flex w-8 max-xs:w-6 max-xs:h-6 max-xs:text-[0.75rem] h-8 rounded-md bg-purple disabled:bg-light_purple text-white justify-center">
      <span className="my-auto">
        <IoPlayForward />
      </span>
    </button>
  );
}
