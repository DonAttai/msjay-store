import { useEffect } from "react";
import { useUser } from "../stores/user-store";
import { useNavigate } from "react-router-dom";
export const CheckoutPage = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  });
  return (
    <div className="min-h-[calc(100vh-128px)]">
      Still working on the page....
    </div>
  );
};
