

// const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:4000/api'
//     : `${meta.env.VITE_BACKEND_URL}/api`;

const BASE_URL =
  import.meta.env.DEV
    ? 'http://localhost:4000/api'
    : `${import.meta.env.VITE_BACKEND_URL}/api`;


export default BASE_URL;
