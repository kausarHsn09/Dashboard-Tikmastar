import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://seashell-app-olb54.ondigitalocean.app/api/v1'
});



export default axiosInstance;
