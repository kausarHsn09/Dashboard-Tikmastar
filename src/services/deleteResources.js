import axios from './axiosConfig'; 

export const deleteData = async (formdata) => {
  
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + formdata.token,
    };
    const response = await axios.delete(`/${formdata.endpoint}`, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error)
  }
};


