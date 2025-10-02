import { createContext, useState } from "react";

export const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((d) => !d);

  return (
    <ModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}