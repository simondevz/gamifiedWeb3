import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Dropdown({
  index,
  placeholder,
  setValue,
  options,
  dropped,
}: {
  index: number;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: { text: string; disabled: boolean }[];
  dropped: boolean;
}) {
  const [displayText, setDisplayText] = useState(placeholder);

  return (
    <div className="flex flex-col w-full">
      <button
        id={"dropdown_btn_" + index}
        className="flex px-6 rounded-xl py-2 border border-primary text-primary justify-between w-full z-10 bg-white"
      >
        <span className="z-[-25] font-semibold my-auto">{displayText}</span>
        <span className="flex z-[-25] my-auto">
          {dropped ? (
            <span className="z-[-50]">
              <FaChevronUp className="" />
            </span>
          ) : (
            <span className="z-[-50]">
              <FaChevronDown className="" />
            </span>
          )}
        </span>
      </button>
      <ul
        className={
          (dropped ? "flex " : "hidden ") +
          " rounded-b-xl border border-t-0 border-primary -mt-2 flex flex-col pt-2 bg-white_ish"
        }
      >
        {options.map((option, index, arr) => (
          <li
            className={
              (index === arr.length - 1 ? "" : "border-b border-primary ") +
              " py-2 px-6 font-semibold text-primary"
            }
            key={index}
          >
            <button
              disabled={option.disabled}
              className="flex w-full"
              onClick={() => {
                setDisplayText(option.text);
                setValue(option.text);
              }}
            >
              <span>{option.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
