import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1/'
});
// const axiosInstance = axios.create({
//   baseURL: 'https://seashell-app-olb54.ondigitalocean.app/api/v1'
// });



export default axiosInstance;
