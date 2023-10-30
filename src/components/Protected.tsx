import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useUser } from "../stores/user-store";
// import { Modal } from "./Modal";

export const Protected = () => {
  //   const user = useUser();
  const location = useLocation();
  const user = "Attai";

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="cart" state={{ from: location }} replace />
  );
};
