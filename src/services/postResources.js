import axios from './axiosConfig'; 

export const addData = async (formdata) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.post(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error)
  }
};


export const addDatamultiformd = async (formdata) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.post(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
  } catch (error) {
     console.log(error)
  }
};

export const updateData = async (formdata) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.patch(`/${formdata.endpoint}`, formdata.data, {
      headers: headers,
    });
    return response;
  } catch (error) {
     console.log(error)
  }
};

