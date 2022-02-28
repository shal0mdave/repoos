import axios from "axios";

export const githubAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_GITHUB}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
