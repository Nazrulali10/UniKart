
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : '/api';

export default BASE_URL;
