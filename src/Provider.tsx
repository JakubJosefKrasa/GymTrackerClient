import { HeroUIProvider } from "@heroui/system";

import { useNavigate } from "react-router-dom";

import AuthProvider from "@/context/AuthProvider";
import ThemeProvider from "@/context/ThemeProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
