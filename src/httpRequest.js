import axios from "axios";

export const httpRequest = axios.create({
  baseURL: "https://threads.f8team.dev/api",
});

// request
httpRequest.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("accessToken");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

// response
axios.interceptors.response.use((response) => {
  return response.data;
});

let isRefreshing = false;
let queueJobs = [];

const sendRefreshToken = async (original, refreshToken) => {
  isRefreshing = true;
  const response = await axios.post(`${original.baseURL}/auth/refresh`, {
    refresh_token: refreshToken,
  });
  const { access_token, refresh_token } = response.data;
  localStorage.setItem("accessToken", access_token),
    localStorage.setItem("refreshToken", refresh_token);
};
httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (error.status === 401 && refreshToken) {
      const original = error.config;
      try {
        if (isRefreshing) {
          await new Promise((resolve, reject) => {
            queueJobs.push({ resolve, reject });
          });
        } else {
          await sendRefreshToken(original, refreshToken);
          queueJobs.forEach((job) => job.resolve());
          queueJobs = [];
        }
        return await httpRequest(original);
      } catch (error) {
        queueJobs.forEach((job) => job.resolve());
        queueJobs = [];
        return Promise.reject(error);
      }
    }
  }
);

export default httpRequest;
