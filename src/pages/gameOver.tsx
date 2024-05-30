import bgImage from "../assets/home_bg.jpeg";
import profilePic from "../assets/profile_pic.png";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useAppSelector } from "../redux/hooks";

export default function GameOver() {
  const location = useLocation();
  const game = location.pathname.includes("scrabble") ? "scrabble" : ""; // Todo if Introducing other games add conditions for their name
  const score = useAppSelector((state) => state.app.score);
  const navigate = useNavigate();

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      className="flex w-screen  bg-cover bg-center bg-no-repeat scale-x-[-1]"
    >
      <div className="flex flex-col gap-16 p-12 w-full h-screen bg-white/40 scale-x-[-1]">
        <div className="flex justify-center w-full">
          <div className="flex w-full justify-between ">
            <div className="flex w-full">
              <button
                onClick={() => navigate("/")}
                className="p-2 flex justify-center bg-primary rounded-md "
              >
                <span className="my-auto text-white">
                  <MdOutlineKeyboardArrowLeft size={"1.5rem"} />
                </span>
              </button>
            </div>
            <h1 className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing text-[3rem] uppercase">
              {game.toString()}
            </h1>
            <span className="flex w-full"></span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-8">
          <div className="flex w-full justify-center ">
            <span className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing text-[2rem] capitalize">
              Score: {score}
            </span>
          </div>
          <span className="flex w-full justify-center ">
            <span
              style={{
                backgroundImage: `url(${profilePic})`,
              }}
              className="flex bg-cover bg-center bg-no-repeat h-48 w-52 rounded-3xl border-2 border-primary"
            ></span>
          </span>
          <div className="flex w-full justify-center ">
            <span className="bg-gradient-to-l from-transparent via-dark_text_bg from-5% via-90% text-center py-[0.2rem] px-8 text-white">
              You earned {score} RME
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
