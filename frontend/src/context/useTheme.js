import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export function useTheme(){
  const context = useContext(ThemeContext);

  if(!context)
    console.error("no context use provider to inject");

  return context;
}