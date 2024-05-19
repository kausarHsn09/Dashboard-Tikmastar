import axios from './axiosConfig'; 

export const updateData = async (formdata) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.put(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
};

