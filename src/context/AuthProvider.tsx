import { PropsWithChildren, useEffect, useState } from "react";

import { AuthContextType, AuthType } from "@/types/types";
import { AuthContext } from "@/context/authContext";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const authObjStr = localStorage.getItem("auth");

    if (authObjStr) {
      const storedAuth = JSON.parse(authObjStr) as AuthContextType;

      setIsLoggedIn(storedAuth.isLoggedIn);
      setEmail(storedAuth.email);
    }
  }, []);

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
