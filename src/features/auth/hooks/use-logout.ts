import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../services/service";

export const useLogoutHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logoutUser] = useLogoutUserMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await logoutUser();
      localStorage.removeItem("access_token");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleLogout,
    error,
    isLoading,
  };
};
