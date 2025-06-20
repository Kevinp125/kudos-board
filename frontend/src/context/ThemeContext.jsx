import { createContext } from "react";

const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});

export default ThemeContext; //creating box for context to go inside. Default values used if component uses context without provider
