import { IoPlayForward } from "react-icons/io5";

export default function PassButton() {
  return (
    <button className="flex w-8 h-8 rounded-md bg-purple disabled:bg-light_purple text-white justify-center">
      <span className="my-auto">
        <IoPlayForward />
      </span>
    </button>
  );
}
