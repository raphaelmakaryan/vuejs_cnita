import axios from "axios";

let api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_JUDGEMENT,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(config => {
  if (config.method === "patch") {
    config.headers["Content-Type"] = "application/merge-patch+json"
  }
  return config;
})

export default api
