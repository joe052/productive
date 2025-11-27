import axios from "axios";
import { createClient } from "../supabase/client";

const taskApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

/**Add a Request Interceptor */
taskApi.interceptors.request.use(
  async (config) => {
    /**Initialize Supabase Client */
    const supabase = createClient();

    /**Get the current session (which contains the JWT access token) */
    const { data } = await supabase.auth.getSession();

    /**If a session exists, add the Authorization header */
    if (data.session?.access_token) {
      config.headers["Authorization"] = `Bearer ${data.session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**RESPONSE INTERCEPTOR */
taskApi.interceptors.response.use(
  (response) => {
    /**Return response if successful */
    return response;
  },
  async (error) => {
    /**Check if the error is a 401 Unauthorized */
    if (error.response && error.response.status === 401) {
      /**Initialize Supabase */
      const supabase = createClient();

      /**Sign out from Supabase (clears cookies/local storage) */
      await supabase.auth.signOut();

      /**Redirect to login page */
      /**We use window.location because we can't use Next.js 'useRouter' inside a non-component file */
      if (typeof window !== "undefined") {
        window.location.href = "/login?error=Session expired";
      }
    }
    /**Return the error so the calling component still knows something failed */
    return Promise.reject(error);
  }
);

/**EXPORTS */
export default {
  get: (uri: string) => {
    return taskApi.get(uri);
  },
  post: (uri: string, data: any) => {
    return taskApi.post(uri, data);
  },
  put: (uri: string, data: any) => {
    return taskApi.put(uri, data);
  },
  delete: (uri: string) => {
    return taskApi.delete(uri);
  },
};

export { taskApi };
