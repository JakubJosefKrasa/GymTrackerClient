import { PropsWithChildren, useState } from "react";

import { AuthContextType, AuthType } from "@/types/types";
import { AuthContext } from "@/context/authContext";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authObjStr = localStorage.getItem("auth");

    if (authObjStr) {
      const storedAuth = JSON.parse(authObjStr) as AuthContextType;

      return storedAuth.isLoggedIn;
    }

    return false;
  });

  const [email, setEmail] = useState<string | null>(() => {
    const authObjStr = localStorage.getItem("auth");

    if (authObjStr) {
      const storedAuth = JSON.parse(authObjStr) as AuthContextType;

      return storedAuth.email;
    }

    return null;
  });

  function setAuth(auth: AuthType) {
    const { isLoggedIn, email } = auth;

    setIsLoggedIn(isLoggedIn);
    setEmail(email);

    localStorage.setItem("auth", JSON.stringify({ isLoggedIn, email }));
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
