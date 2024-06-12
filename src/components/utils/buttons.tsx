export const PrimaryButton = ({
  text,
  onclick,
  serif,
  className,
}: {
  text: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  serif?: boolean;
  className?: string;
}) => {
  return (
    <button
      className={"flex relative text-white -skew-x-[30deg] " + className}
      onClick={onclick}
    >
      <div className="">
        <div className="flex gap-3 h-2">
          <span className="flex bg-primary w-2/3"></span>
          <span className="flex bg-primary w-1/3"></span>
        </div>
        <div className="flex justify-center w-44 bg-primary">
          <span className="skew-x-[30deg]">{text}</span>
        </div>
        <div className="flex gap-3 h-2">
          <span className="flex bg-primary w-2/5"></span>
          <span className="flex bg-primary w-2/5"></span>
          <span className="flex bg-primary w-1/5"></span>
        </div>
      </div>
      <div
        className={
          (serif ? "flex " : "hidden ") +
          " rotate-90 absolute left-[9.5rem] top-[0.65rem] "
        }
      >
        <span className="flex h-4 w-10">
          <span className="flex bg-transparent w-1/3"></span>
          <span className="flex bg-white w-2/3"></span>
        </span>
        <span className="flex flex-col h-10 w-3 ">
          <span className="flex bg-white h-2/3"></span>
          <span className="flex -skew-y-[30deg] bg-white -mt-2 h-1/2"></span>
        </span>
      </div>
    </button>
  );
};

export const SecondaryButton = ({
  text,
  onclick,
  serif,
}: {
  text: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  serif?: boolean;
}) => {
  return (
    <button
      className="flex relative text-white -skew-x-[30deg]"
      onClick={onclick}
    >
      <div
        className={
          (serif ? "flex " : "hidden ") +
          " absolute bg-white w-8 h-16 -left-4 -top-3"
        }
      ></div>
      <div className="flex z-10 justify-center border-primary border-2 w-44">
        <span className="my-[0.37rem] skew-x-[30deg]">{text}</span>
      </div>
    </button>
  );
};
