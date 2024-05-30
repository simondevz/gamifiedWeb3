import { CgArrowsExchange } from "react-icons/cg";

export default function ExchangeButton() {
  return (
    <button
      disabled
      className="flex w-8 h-8 rounded-md bg-purple disabled:bg-light_purple text-white justify-center"
    >
      <span className="my-auto">
        <CgArrowsExchange size={"1.25rem"} />
      </span>
    </button>
  );
}
