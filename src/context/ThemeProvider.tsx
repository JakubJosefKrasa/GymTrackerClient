import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
  system: "system",
} as const;

type Theme =
  | typeof ThemeProps.light
  | typeof ThemeProps.dark
  | typeof ThemeProps.system;

type ThemeContextProps = {
  theme: Theme;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export default function ThemeProvider({
  children,
  defaultTheme,
}: PropsWithChildren & { defaultTheme?: Theme }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;

    return storedTheme || (defaultTheme ?? ThemeProps.system);
  });

  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  const _setTheme = (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(
      ThemeProps.light,
      ThemeProps.dark
    );

    if (theme === ThemeProps.system) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? ThemeProps.dark
        : ThemeProps.light;

      document.documentElement.classList.add(systemTheme);
      setTheme(systemTheme);
    } else {
      document.documentElement.classList.add(theme);
      setTheme(theme);
    }
  };

  const setLightTheme = () => _setTheme(ThemeProps.light);

  const setDarkTheme = () => _setTheme(ThemeProps.dark);

  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  useEffect(() => {
    _setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isLight,
        isDark,
        setTheme: _setTheme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
