import { CgArrowsExchange } from "react-icons/cg";

export default function ExchangeButton() {
  return (
    <button
      disabled
      className="flex w-8 max-xs:w-6 max-xs:h-6 max-xs:text-[0.75rem] h-8 rounded-md bg-purple disabled:bg-light_purple text-white justify-center"
    >
      <span className="my-auto">
        <CgArrowsExchange size={"1.25rem"} />
      </span>
    </button>
  );
}
