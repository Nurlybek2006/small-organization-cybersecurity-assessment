import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 15000,
});
export const get = <T>(path: string) => api.get<T>(path).then((r) => r.data);
export const post = <T>(path: string, data: unknown) =>
  api.post<T>(path, data).then((r) => r.data);
export const patch = <T>(path: string, data: unknown) =>
  api.patch<T>(path, data).then((r) => r.data);
