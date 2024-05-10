import axios from './axiosConfig'; 

export const getData = async (token, endpoint) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await axios.get(`/${endpoint}`, {
    headers: headers,
  });
  return response;
};
export const getDataWitoutAuth = async (endpoint) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.get(`/${endpoint}`, {
    headers: headers,
  });
  return response;
};
export const getDataMayAuth = async (token, endpoint) => {
  let headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const response = await axios.get(`/${endpoint}`, {
    headers: headers,
  });
  return response;
};
