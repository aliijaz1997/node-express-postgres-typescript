import axios, { AxiosResponse } from "axios";
import { Post } from "../components/posts";
axios.defaults.baseURL = "http://localhost:5000";

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const PostsApis = {
  list: () => requests.get<Post[]>("/api/posts"),
  create: ({ Description }: any) =>
    requests.post<void>(`/api/posts`, { Description }),
  delete: (id: number) => requests.delete<void>(`/api/courses/${id}`),
};

export default {
  PostsApis,
};
