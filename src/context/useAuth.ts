import { useContext } from "react";

import { AuthContext } from "@/context/authContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of AuthProvider");
  }

  return context;
}
