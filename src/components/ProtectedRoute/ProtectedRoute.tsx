import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/context/useAuth";

export default function ProtectedRoute() {
  const { isLoggedIn, email } = useAuth();

  console.log(isLoggedIn, email);

  return !isLoggedIn || email === null ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Outlet />
  );
}
