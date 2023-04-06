import React, { useLayoutEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import Switch from "./Switch";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState("light");

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <div className="relative inline-block w-16">
      <Switch
        id="theme-toggle"
        name="theme-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
        iconOn={<IoMoon />}
        iconOff={<IoSunny />}
      />
    </div>
  );
};

export default ThemeSwitcher;
