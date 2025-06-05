import { useAuth } from "@clerk/clerk-react";

export const useValidToken = () => {
  const { isSignedIn } = useAuth();
  return !!isSignedIn;
};
