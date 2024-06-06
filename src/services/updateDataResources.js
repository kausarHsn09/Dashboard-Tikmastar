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
export const updateDataPatch = async (formdata) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.patch(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
};

