import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CurrentTime from "./components/CurrentTime";
import { useLocalState } from "./hooks/useLocalState";
import dayjs from "dayjs";
import SetupView from "./components/SetupView";
import WorkView from "./components/WorkView";
import SessionList from "./components/SessionList";
import chime1 from "./assets/notification-1.mp3";
import chime2 from "./assets/notification-2.mp3";
import chime3 from "./assets/notification-3.mp3";

export const LocalStorageConsts = {
  WORK_TIME: "workTime",
  BREAK_TIME: "breakTime",
  SESSIONS: "sessions",
};

export interface Session {
  start: number;
  work: number;
  break: number;
}

function App() {
  const [now, setNow] = useState(dayjs());
  const [sessions, setSessions] = useLocalState<Session[]>(
    LocalStorageConsts.SESSIONS,
    []
  );

  const workEndTime =
    sessions.length > 0 ? sessions[0].start + sessions[0].work : 0;
  const breakEndTime =
    sessions.length > 0 ? workEndTime + sessions[0].break : 0;
  const isWorking = now.unix() < breakEndTime;
  const isWork = now.unix() < workEndTime;

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const workStateRef = useRef<number>();

  useEffect(() => {
    const workState = isWorking ? (isWork ? 1 : 2) : 0;
    if (workState != workStateRef.current) {
      switch (workState) {
        case 1:
          new Audio(chime3).play();
          break;
        case 2:
          new Audio(chime1).play();
          break;
        case 0:
          new Audio(chime2).play();
          break;
        default:
          break;
      }
    }
    workStateRef.current = workState;
  }, [isWork, isWorking]);

  const updateTitle = () => {
    if (isWorking) {
      const secondsLeft =
        (isWork ? workEndTime : breakEndTime) - now.unix() - 1;
      const minutesLeft = Math.floor(secondsLeft / 60);
      let minutes = minutesLeft.toString();
      if (minutesLeft < 10) minutes = "0" + minutes;
      let seconds = (secondsLeft % 60).toString();
      if (secondsLeft % 60 < 10) seconds = "0" + seconds;
      const time = `⦗${minutes}:${seconds}⦘ `;
      document.title = time + (isWork ? `Working...` : `Break time!`);
    } else {
      document.title = "Brain pls work";
    }
  };

  useEffect(updateTitle, [now]);

  return (
    <div className="App space-y-6">
      <header className="flex items-center justify-center space-x-4">
        <CurrentTime now={now} />
        <ThemeSwitcher />
      </header>
      {isWorking ? (
        <WorkView sessions={sessions} setSessions={setSessions} now={now} />
      ) : (
        <SetupView sessions={sessions} setSessions={setSessions} now={now} />
      )}
      <SessionList
        sessions={sessions}
        setSessions={setSessions}
        isWorking={isWorking}
        now={now}
      />
    </div>
  );
}

export default App;
