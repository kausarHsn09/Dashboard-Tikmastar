import axios from './axiosConfig'; 


export const userToken = async (formdata) => {
 
  const response = await axios
    .post(`/users/login`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
  return response;
};

export const createUser = async (formdata) => {
  const response = await axios
    .post(`/users/signup`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
  return response;
};

