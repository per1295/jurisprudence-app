import "./reset.scss";
import "./index.scss";

import Desk from "./components/Desk";
import ChangeThemeButton from "./components/ChangeThemeButton";
import Score from "./components/Score";

import { ThemeContext, ScoreContext } from "./contexts";
import { useState, useEffect } from "react";
import type { IGameTheme, GameTheme, IScore } from "./types";

export default function App() {
  const [ theme, setTheme ] = useState<IGameTheme>({ value: "dark", prevValue: null });
  const [ score, setScore ] = useState<IScore>({total: 6, access: null});
  const [ shownScore, setShownScore ] = useState(false);

  function change(value: GameTheme) {
    setTheme(prevTheme => ({ ...prevTheme, value, prevValue: prevTheme.value }));
  }

  const theme_ctx = { value: theme.value, prevValue: theme.prevValue, change };
  const score_ctx = { score, setScore };

  // Реагируем на подсчет очков
  useEffect(() => {
    if ( score.access !== null ) {
      setShownScore(true);
    }
  }, [score]);

  return(
    <ThemeContext.Provider value={theme_ctx}>
      <ScoreContext.Provider value={score_ctx}>
        <Desk />
        <ChangeThemeButton />
        <Score shownScore={shownScore}/>
      </ScoreContext.Provider>
    </ThemeContext.Provider>
  )
}