import { useApolloClient } from "@apollo/client/react";
import { useCallback } from "react";
import { getToken, removeToken, setToken } from "../auth/token";

const useAuth = () => {
  const client = useApolloClient();

  const login = useCallback((token) => {
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    client.clearStore();
    window.location.href = "/login";
  }, [client]);

  return {
    isAuthenticated: Boolean(getToken()),
    login,
    logout,
  };
};

export default useAuth;
