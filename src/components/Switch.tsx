import React, { ChangeEvent, ReactNode } from 'react';

interface SwitchProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  iconOff?: ReactNode;
  iconOn?: ReactNode;
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  checked,
  onChange,
  iconOff,
  iconOn,
  label,
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`relative cursor-pointer bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full transition-all duration-200`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center transition-transform duration-200 ease-in-out transform ${
            checked ? 'translate-x-6' : ''
          }`}
        >
          {checked ? iconOn : iconOff}
        </span>
      </label>
      {label && <span className="ml-3">{label}</span>}
    </div>
  );
};

export default Switch;
