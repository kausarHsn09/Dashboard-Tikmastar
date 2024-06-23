import axios from './axiosConfig'; 

export const addData = async (formdata) => {
  
 
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.post(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
  
};


export const addDatamultiformd = async (formdata) => {
 
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.post(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
 
};

