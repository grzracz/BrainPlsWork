import React, { useMemo } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Session } from "../App";
dayjs.extend(duration);

interface CountdownProps {
  sessions: Session[];
  now: dayjs.Dayjs;
}

const Countdown: React.FC<CountdownProps> = ({ now, sessions }) => {
  const workEndTime =
    sessions.length > 0 ? sessions[0].start + sessions[0].work : 0;
  const countdownTime =
    sessions.length > 0
      ? now.unix() > workEndTime
        ? workEndTime + sessions[0].break
        : workEndTime
      : 0;

  const countdown = useMemo(() => {
    const targetTime = dayjs.unix(countdownTime);
    const remainingTime = dayjs.duration(targetTime.diff(now));
    const minutes = (remainingTime.hours() * 60 + remainingTime.minutes())
      .toString()
      .padStart(2, "0");
    const seconds = remainingTime.seconds().toString().padStart(2, "0");
    return [minutes, seconds];
  }, [workEndTime, now]);

  return (
    <div className="select-none">
      <span className="font-bold text-7xl mono">
        {countdown[0]}:{countdown[1]}
      </span>
    </div>
  );
};

export default Countdown;
