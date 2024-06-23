import axios from './axiosConfig'; 

export const deleteData = async (formdata) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.delete(`/${formdata.endpoint}`, {
      headers: headers,
    });
    return response;
  
};


