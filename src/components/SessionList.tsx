import React, { useMemo } from "react";
import { Session } from "../App";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(relativeTime);
dayjs.extend(isYesterday);

interface SessionListProps {
  now: dayjs.Dayjs;
  sessions: Session[];
  setSessions: (newSessions: Session[]) => void;
  isWorking?: boolean;
}

const SessionList: React.FC<SessionListProps> = ({
  now,
  sessions,
  isWorking,
  setSessions,
}) => {
  const trueSessions = isWorking ? sessions.slice(1) : sessions;
  const sessionData = useMemo(() => {
    const emptyObject = {
      timestamp: 0,
      workSeconds: 0,
      breakSeconds: 0,
      sessions: 0,
    };
    const nowTimestamp = now.unix();
    const data: Record<number, typeof emptyObject> = {};
    for (let session of sessions) {
      const sessionDay = session.start - (session.start % (24 * 60 * 60));
      if (!data[sessionDay])
        data[sessionDay] = { ...emptyObject, timestamp: sessionDay };
      data[sessionDay].workSeconds += Math.max(
        0,
        Math.min(nowTimestamp - session.start, session.work)
      );
      data[sessionDay].breakSeconds += Math.max(
        0,
        Math.min(nowTimestamp - session.start - session.work, session.break)
      );
      data[sessionDay].sessions += 1;
    }
    const values = Object.values(data);
    values.reverse();
    return values;
  }, [trueSessions, isWorking, now]);

  const renderTime = (seconds: number, size: number, className: string) => {
    const fullBarSize = 25 * 60;
    let tempSeconds = seconds;
    const widths = [];
    while (tempSeconds > fullBarSize) {
      widths.push(100);
      tempSeconds -= fullBarSize;
    }
    widths.push(Math.floor((100 * tempSeconds) / fullBarSize));
    return (
      <div className="flex space-x-2 items-center">
        {widths.map((w, i) => (
          <div
            key={`hour-${i}`}
            className={className}
            style={{
              width: Math.floor(size * (w / 100)),
              height: Math.floor(size),
            }}
          />
        ))}
      </div>
    );
  };

  const hoursAndMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const hoursText =
      hours > 0 ? (hours === 1 ? "1 hour, " : `${hours} hours, `) : "";
    return `${hoursText}${minutes} minutes`;
  };

  return sessionData.length > 0 ? (
    <ul className="space-y-8 pt-24">
      {sessionData.map((day, i) => (
        <li
          key={day.timestamp}
          className="flex flex-col md:flex-row items-center bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 p-2 rounded-lg space-y-4 sm:space-x-4"
        >
          <div className="w-64">
            <span
              className="opacity-80 font-bold text-sm rounded-lg bg-gray-200 dark:bg-gray-800 p-2 sm:p-4 min-w-max"
              title={dayjs.unix(day.timestamp).format("dddd, DD MMMM")}
            >
              {dayjs.unix(day.timestamp).isSame(now, "day")
                ? "Today"
                : dayjs.unix(day.timestamp).isYesterday()
                ? "Yesterday"
                : dayjs.unix(day.timestamp + 24 * 3600).fromNow()}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-8 items-start sm:items-end md:w-full">
            <div>
              {renderTime(
                day.workSeconds,
                32,
                "bg-blue-400 dark:bg-blue-800 rounded"
              )}
              <span className="text-xs opacity-80">
                {hoursAndMinutes(day.workSeconds)} of work
              </span>
            </div>
            <div>
              {renderTime(
                day.breakSeconds,
                32,
                "bg-green-400 dark:bg-green-700 rounded"
              )}
              <span className="text-xs opacity-80">
                {hoursAndMinutes(day.breakSeconds)} on a break
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="p-8 opacity-30 text-sm">
      Work sessions will show up here =)
    </div>
  );
};

export default SessionList;
