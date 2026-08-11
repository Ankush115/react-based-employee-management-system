import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          return Promise.reject(
            new Error("Bad request"),
          );

        case 401:
          return Promise.reject(
            new Error("Unauthorized request"),
          );

        case 403:
          return Promise.reject(
            new Error("Access forbidden"),
          );

        case 404:
          return Promise.reject(
            new Error("Employee not found"),
          );

        case 500:
          return Promise.reject(
            new Error("Server error"),
          );

        default:
          return Promise.reject(
            new Error(
              `Request failed with status ${status}`,
            ),
          );
      }
    }

    if (error.request) {
      return Promise.reject(
        new Error(
          "No response received from server",
        ),
      );
    }

    return Promise.reject(
      new Error(
        error.message ||
          "Something went wrong",
      ),
    );
  },
);

export default api;