
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : `${process.env.BACKEND_URL}/api`;

export default BASE_URL;
