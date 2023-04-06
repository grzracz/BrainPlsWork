import React, { useEffect, useState } from "react";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CurrentTime from "./components/CurrentTime";
import { useLocalState } from "./hooks/useLocalState";
import dayjs from "dayjs";
import SetupView from "./components/SetupView";
import WorkView from "./components/WorkView";
import SessionList from "./components/SessionList";

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

  const isWorking =
    sessions.length > 0
      ? now.unix() < sessions[0].start + sessions[0].work + sessions[0].break
      : false;

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 100);
    return () => clearInterval(timer);
  }, []);

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
