import React from "react";
import { IconType } from "react-icons/lib";

interface StyledButtonProps {
  text: string;
  icon?: IconType;
  onClick: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className="bg-indigo-400 dark:bg-indigo-800 p-2 px-4 rounded-lg font-bold text-lg flex items-center hover:opacity-80"
      onClick={onClick}
    >
      <span>{text}</span>
      {Icon && <Icon className="ml-2" />}
    </button>
  );
};

export default StyledButton;
