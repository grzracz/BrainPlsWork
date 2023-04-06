import React from "react";
import dayjs from "dayjs";

interface CurrentTimeProps {
  now: dayjs.Dayjs;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ now }) => {
  const currentTime = [now.format("HH:mm"), now.format("ss")];

  return (
    <div className="select-none">
      <span className="font-bold text-2xl mono">{currentTime[0]}</span>{" "}
      <span className="text-md opacity-60 mono">{currentTime[1]}</span>
    </div>
  );
};

export default CurrentTime;
