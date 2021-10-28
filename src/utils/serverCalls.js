import { sendRequest } from "./sendRequest";

export const login = (userData) => {
  return sendRequest("post", "/auth/login", userData);
};

export const register = (userData) => {
  return sendRequest("post", "/auth/register", userData);
};

export const getPosts = () => {
  return sendRequest("get", "/posts");
};

export const getPhotos = (limit, offset) => {
  return sendRequest("get", "/photos", null, { limit, offset });
};

const serverCalls = {
  login,
  register,
  getPosts,
  getPhotos,
};

export default serverCalls;
