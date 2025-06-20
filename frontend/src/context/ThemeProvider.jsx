import ThemeContext from "./ThemeContext";
import { useState } from "react";

export default function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light"); //state for the current theme of website

  function toggleTheme() { //function that will toggle our theme when button is clicked
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> {/*Give our ThemeContext box the values all its children will be able to use */}
      {children}
    </ThemeContext.Provider>
  );
}
