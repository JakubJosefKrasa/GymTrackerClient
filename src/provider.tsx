import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

import AuthProvider from "@/context/AuthProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  );
}
