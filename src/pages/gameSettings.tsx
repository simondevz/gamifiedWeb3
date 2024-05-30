import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/utils/buttons";
import Dropdown from "../components/games/dropdown";
import NavBar from "../components/utils/navBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../redux/hooks";
import { updateConnectWallet } from "../redux/slice";

export default function GameSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameType, setGametype] = useState(searchParams.get("gameType") || "");
  const [puzzleTime, setPuzzleTime] = useState(
    searchParams.get("puzzleTime") || ""
  );

  const navigate = useNavigate();
  const game = searchParams.get("game");
  const [gameTypeDropped, setGameTypeDropped] = useState(false);

  const [puzzleTimeDropped, setPuzzleTimeDropped] = useState(false);
  const { address } = useAccount();
  const dispatch = useAppDispatch();

  // Handle closing and opening the dropdown
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((event.target as any)?.id === "dropdown_btn_0") {
        setGameTypeDropped(!gameTypeDropped);
        setPuzzleTimeDropped(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((event.target as any)?.id === "dropdown_btn_1") {
        setGameTypeDropped(false);
        setPuzzleTimeDropped(!puzzleTimeDropped);
      } else {
        setGameTypeDropped(false);
        setPuzzleTimeDropped(false);
      }
    };
    window.onclick = handleClick;

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [gameTypeDropped, puzzleTimeDropped]);

  // If the url does not have a game search param return to home page
  useEffect(() => {
    if (!game)
      Swal.fire({
        title: "Game not found!!",
        text: "Redirecting you to our home page.",
        icon: "error",
        confirmButtonText: "Okay",
      }).finally(() => {
        navigate("/");
      });
  }, [game, navigate]);

  // Update the url on the users prefered settings
  useEffect(() => {
    setSearchParams({ game: game as string, gameType, puzzleTime });
  }, [game, gameType, puzzleTime, setSearchParams]);

  return (
    <section className="flex flex-col w-full">
      <NavBar showConnect />
      <div className="flex flex-col w-full justify-center py-16">
        <h1 className="flex mx-auto text-[3rem] font-racing text-primary">
          {game}
        </h1>

        <div className="flex w-full px-20 flex-col gap-10 py-8">
          <Dropdown
            index={0}
            placeholder="Game Type"
            options={[
              { text: "Single Player", disabled: false },
              { text: "Versus (coming soon)", disabled: true },
            ]}
            setValue={setGametype}
            dropped={gameTypeDropped}
          />
          <Dropdown
            index={1}
            placeholder="Puzzle Time"
            options={[
              { text: "10 mins", disabled: false },
              { text: "10min + 10", disabled: false },
            ]}
            setValue={setPuzzleTime}
            dropped={puzzleTimeDropped}
          />
        </div>

        <div className="flex mx-auto">
          <PrimaryButton
            onclick={async () => {
              if (!puzzleTime || !gameType) {
                Swal.fire({
                  title: "Missing Setting",
                  text: "Please pick your game type and puzzle time",
                  icon: "error",
                  confirmButtonText: "Okay",
                });
                return;
              }

              if (!address) {
                await Swal.fire({
                  title: "No wallet connected",
                  text: "Pleace connect your wallet. And try again",
                  icon: "error",
                  confirmButtonText: "Connect Wallet",
                  cancelButtonText: "Close",
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) dispatch(updateConnectWallet(true));
                });
                return;
              }

              // Todo: create backend so that a game can be created there and given an id. But for now
              navigate("/scrabble?" + searchParams.toString());
            }}
            text="Start"
          />
        </div>
      </div>
    </section>
  );
}
