import { removeToken } from "./token";

export const logout = () => {
  removeToken();

  window.location.href = "/login";
};
