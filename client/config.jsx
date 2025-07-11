import { meta } from "@eslint/js";

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : `${meta.env.VITE_BACKEND_URL}/api`;

export default BASE_URL;
