import { sendRequest } from "./sendRequest";

export const login = (userData) => {
  return sendRequest("post", "/auth/login", userData);
};

export const register = (userData) => {
  return sendRequest("post", "/auth/register", userData);
};
