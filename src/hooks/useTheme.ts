import { useContext } from "react";

import { ThemeContext } from "@/context/ThemeProvider";

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used inside of ThemeProvider");
  }

  return context;
}
