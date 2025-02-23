import { HeroUIProvider } from "@heroui/system";

import { useNavigate } from "react-router-dom";

import AuthProvider from "@/context/AuthProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate}>
      <AuthProvider>{children}</AuthProvider>
    </HeroUIProvider>
  );
}
