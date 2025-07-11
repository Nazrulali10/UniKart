
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : process.env.BACKEND_URL;

export default BASE_URL;
