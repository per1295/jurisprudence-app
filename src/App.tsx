import "./reset.scss";
import "./index.scss";

import Desk from "./components/Desk";
import ChangeThemeButton from "./components/ChangeThemeButton";

import { ThemeContext } from "./contexts";
import { useState } from "react";
import type { IGameTheme, GameTheme } from "./types";

export default function App() {
  const [ theme, setTheme ] = useState<IGameTheme>({ value: "dark", prevValue: null });

  function change(value: GameTheme) {
    setTheme(prevTheme => ({ ...prevTheme, value, prevValue: prevTheme.value }));
  }

  const theme_ctx = { value: theme.value, prevValue: theme.prevValue, change };

  return(
    <ThemeContext.Provider value={theme_ctx}>
      <Desk />
      <ChangeThemeButton />
    </ThemeContext.Provider>
  )
}