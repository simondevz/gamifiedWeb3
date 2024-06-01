import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTimer } from "use-timer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseTime,
  endgame,
  increaseTime,
  updateEndTimeLeft,
} from "../../redux/slice";
import { secondsToMinutes } from "date-fns";

export default function Timer() {
  const pauseTimer = useAppSelector((state) => state.app.pauseTimer);
  const addTime = useAppSelector((state) => state.app.addTime);
  const deduceTime = useAppSelector((state) => state.app.deductTime);

  const deduceTimeRef = useRef(deduceTime);
  const addTimeRef = useRef(addTime);

  const [timeUpdated, settimeUpdated] = useState(false);
  const dispatch = useAppDispatch();
  const { needEndTime } = useAppSelector((state) => state.app);

  const [searchParams] = useSearchParams();
  const timeStart = searchParams.get("puzzleTime");
  const { time, pause, status, start, advanceTime } = useTimer({
    autostart: true,
    initialTime: Number(timeStart?.split(" ")[0]) * 60,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      dispatch(endgame());
    },
  });

  // Helps prevent infinte rerender
  useLayoutEffect(() => {
    deduceTimeRef.current = deduceTime;
    addTimeRef.current = addTime;
  }, [addTime, deduceTime]);

  // If needEndTime is true update the end time
  useEffect(() => {
    if (needEndTime)
      dispatch(
        updateEndTimeLeft(
          `${secondsToMinutes(time)}:${time - secondsToMinutes(time) * 60}`
        )
      );
  }, [dispatch, needEndTime, time]);

  // Basically pauses time during submition
  useEffect(() => {
    if (pauseTimer) pause();
    if (status === "PAUSED" && !pauseTimer) start();
  }, [pause, pauseTimer, start, status]);

  // Handles time updates
  useEffect(() => {
    if (addTimeRef.current) {
      advanceTime(-addTimeRef.current);
      pause();
      settimeUpdated(true);
    }

    if (deduceTimeRef.current) {
      advanceTime(deduceTimeRef.current);
      pause();
      settimeUpdated(true);
    }
  }, [advanceTime, pause]);

  // After time has been updated make it zero on the global state
  useEffect(() => {
    if (timeUpdated) {
      if (deduceTime) dispatch(decreaseTime(-deduceTime));
      if (addTime) dispatch(increaseTime(-addTime));
      settimeUpdated(() => false);
    }
  }, [addTime, deduceTime, dispatch, timeUpdated]);

  return (
    <div className="w-20 h-20 rounded-full bg-white absolute flex top-14 right-8 justify-center">
      <div className="flex w-16 h-16 rounded-full bg-primary my-auto text-[0.75rem] font-semibold text-white justify-center">
        <div className="flex flex-col my-auto">
          <span className="text-center w-full">Time Left</span>
          <span className="text-[0.875rem] text-center w-full">
            {secondsToMinutes(time)}:{time - secondsToMinutes(time) * 60}
          </span>
        </div>
      </div>
    </div>
  );
}
