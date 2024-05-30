import { Link } from "react-router-dom";

export default function GameCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          borderTop: "3px solid green",
          borderBottom: "3px solid green",
          borderImage:
            "linear-gradient( 90deg, #0019FF, #0019FF 1%, #0019FF 0 15%, #7482FF 0 85%, #0019FF 0 100%) 10",
          backgroundImage:
            "linear-gradient( 180deg, #0019FF, #0019FF 1%, #0019FF 0 10%, #7482FF 0 90%, #0019FF 0 100%)",
        }}
        className="px-[3px]"
      >
        <div className="flex p-4 bg-white ">
          {/* to hold image */}
          <div className="bg-black w-52 h-60"></div>
        </div>
      </div>
      <div className="flex w-full">
        <Link to={`/games?game=${name}`} className="flex mx-auto font-bold">
          {name}
        </Link>
      </div>
    </div>
  );
}
