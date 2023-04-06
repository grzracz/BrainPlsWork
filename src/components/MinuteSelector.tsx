import React from "react";
import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/all";

interface MinuteSelectorProps {
  value: number;
  icon: React.ReactNode;
  onChange: (value: number) => void;
  className?: string;
}

const MinuteSelector: React.FC<MinuteSelectorProps> = ({
  value,
  onChange,
  icon,
  className,
}) => {
  const addMinutes = () => {
    onChange(value + 5);
  };

  const removeMinutes = () => {
    onChange(value - 5 < 0 ? 0 : value - 5);
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg hover:opacity-80"
        onClick={removeMinutes}
      >
        <FaMinus />
      </button>
      <div
        className={clsx(
          "px-4 py-2 mx-1 rounded items-center flex space-x-1",
          className
        )}
      >
        <span className="pr-1">{icon}</span> <span>takes</span>{" "}
        <b className="mono">{value}</b> <span>minutes</span>
      </div>
      <button
        className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg hover:opacity-80"
        onClick={addMinutes}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default MinuteSelector;
