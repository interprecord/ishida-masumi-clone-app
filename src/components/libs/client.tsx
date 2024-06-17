import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "masumi-ishida-blog",
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY ?? "",
});
