import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { Session } from "../App";
import Countdown from "./Countdown";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import chime from "../assets/chime.mp3";

interface WorkViewProps {
  sessions: Session[];
  setSessions: (newSessions: Session[]) => void;
  now: dayjs.Dayjs;
}

function WorkView({ sessions, setSessions, now }: WorkViewProps) {
  const audio = new Audio(chime);
  const isWork =
    sessions.length > 0
      ? now.unix() <= sessions[0].start + sessions[0].work
      : false;

  const endEarly = () => {
    if (sessions.length > 0) {
      const alteredSession = { ...sessions[0] };
      if (isWork) {
        alteredSession.work = now.unix() - alteredSession.start - 1;
      } else {
        alteredSession.break =
          now.unix() - alteredSession.start - alteredSession.work;
      }
      setSessions([alteredSession, ...sessions.slice(1)]);
    }
  };

  const isWorkRef = useRef<boolean>();

  useEffect(() => {
    if (!isWork && !!isWorkRef.current) {
      audio.play();
    }
    isWorkRef.current = isWork;
  }, [isWork]);

  return (
    <div className="flex justify-center py-8">
      <div className="flex justify-center flex-col items-center space-y-4">
        <div
          className={clsx(
            "rounded-lg p-4 bg-opacity-80 dark:bg-opacity-80",
            isWork
              ? "bg-blue-400 dark:bg-blue-800"
              : "bg-green-400 dark:bg-green-700"
          )}
        >
          <div>{isWork ? "Your break starts in:" : "Enjoy your break!"}</div>
          <Countdown sessions={sessions} now={now} />
        </div>
        <button
          className="bg-gray-200 dark:bg-gray-800 rounded-lg text-xs p-1 flex items-center space-x-1 opacity-80 hover:opacity-60"
          onClick={endEarly}
        >
          <span>End early</span>
          <IoClose />
        </button>
      </div>
    </div>
  );
}

export default WorkView;
