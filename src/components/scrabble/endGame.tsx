import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { endTimeNeeded, endgame, updateEndTimeLeft } from "../../redux/slice";
import { useNavigate } from "react-router-dom";

export default function EndgameBtn() {
  const gameEnded = useAppSelector((state) => state.app.gameEnded);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { endTimeLeft } = useAppSelector((state) => state.app);

  // If the global state is changed start the end game
  useEffect(() => {
    if (gameEnded) {
      dispatch(endTimeNeeded(true));
    }
  }, [dispatch, gameEnded, navigate]);

  useEffect(() => {
    (async () => {
      if (endTimeLeft) {
        dispatch(updateEndTimeLeft(endTimeLeft));
        dispatch(endTimeNeeded(false));
        navigate("/scrabble/gameover");
      }
    })();
  }, [dispatch, endTimeLeft, navigate]);

  return (
    <button
      onClick={() => dispatch(endgame(true))}
      className="flex w-24 max-xs:w-20 py-[0.2rem] rounded-full bg-purple place-self-start"
    >
      <span className="mx-auto text-white max-xs:text-[0.75rem] ">
        End Game
      </span>
    </button>
  );
}
