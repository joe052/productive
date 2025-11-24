import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

export default {
  get: (uri: string) => {
    return taskApi.get(uri);
  },
};

export { taskApi };
