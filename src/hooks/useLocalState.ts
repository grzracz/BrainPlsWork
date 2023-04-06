import { useState } from "react";

const getLocalState = <T>(name: string, def: T) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? (JSON.parse(item) as T) : def;
  }
  return def;
};

export const useLocalState = <T>(name: string, def: T): [T, (v: T) => void] => {
  const [state, setState] = useState<T>(getLocalState<T>(name, def));

  const updateState = (newState: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(newState));
    }
    setState(newState);
  };

  return [state, updateState];
};
