import React from "react";
import MinuteSelector from "./MinuteSelector";
import { FaBriefcase, FaCoffee, FaRocket } from "react-icons/all";
import Button from "./Button";
import { useLocalState } from "../hooks/useLocalState";
import dayjs from "dayjs";
import { LocalStorageConsts, Session } from "../App";

interface SetupViewProps {
  sessions: Session[];
  setSessions: (newSessions: Session[]) => void;
  now: dayjs.Dayjs;
}

function SetupView({ sessions, setSessions, now }: SetupViewProps) {
  const [workTime, setWorkTime] = useLocalState<number>(
    LocalStorageConsts.WORK_TIME,
    25
  );
  const [breakTime, setBreakTime] = useLocalState<number>(
    LocalStorageConsts.BREAK_TIME,
    5
  );

  const startWorking = () => {
    setSessions([
      { start: dayjs().unix(), work: workTime * 60, break: breakTime * 60 },
      ...sessions,
    ]);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gray-300 dark:bg-gray-600 rounded-lg p-4 space-y-2">
          <div className="flex justify-center space-x-2 items-center">
            <MinuteSelector
              icon={<FaBriefcase />}
              value={workTime}
              onChange={setWorkTime}
              className="bg-blue-300 dark:bg-blue-600 bg-opacity-80 dark:bg-opacity-80"
            />
          </div>
          <div className="flex justify-center space-x-2 items-center">
            <MinuteSelector
              icon={<FaCoffee />}
              value={breakTime}
              onChange={setBreakTime}
              className="bg-green-200 dark:bg-green-600 bg-opacity-80 dark:bg-opacity-80"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 py-4">
        <Button
          icon={FaRocket}
          text="Let's get to work!"
          onClick={startWorking}
        />
        <div className="text-sm opacity-50">
          Your break will start at{" "}
          <b className="mono">{now.add(workTime, "minutes").format("HH:mm")}</b>
        </div>
      </div>
    </>
  );
}

export default SetupView;
