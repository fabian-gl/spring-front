import axios from "axios";

export const sendRequest = async (method, relativeUrl, data) => {
  return new Promise((resolve, reject) => {
    const hostBaseUrl = "http://localhost:5000";
    const url = hostBaseUrl + relativeUrl;

    const headers = {};
    const token = "";

    // If the token exists it adds it to the authorization header
    if (token) headers.Authorization = `Bearer ${token}`;

    axios({
      method,
      url,
      headers,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) reject(error.response.data.errors[0]);
        else reject("Unreachable server");
      });
  });
};
