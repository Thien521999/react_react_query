import axios from "axios";
import { toast } from 'react-toastify';

export const createProduct = async (newData) => {
  return axios.post('/products', newData)
};

export const updateProduct = async ({id, newData}) => {
  return axios.put(`/products/${id}`, newData)
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};

// -------------------------react-query------------------------
const handleError = (error) => {
  if(error.response.data.msg) {
    throw new Error(error.response.data.msg);
    toast.error(error.response.data.msg);
  }else {
    throw new Error(error.response);
    toast.error(error.response);
  }
}

export const getData = async ({queryKey}) => {
  try {
    const res = await axios.get(`${queryKey[0]}`);  
    return res.data;
    
  } catch (error) {
    handleError(error);
  }
}

export const getInfiniteData = async ({pageParam = 1, queryKey}) => {
  console.log({pageParam});

  try {
    const res = await axios.get(`${queryKey[0]}&page=${pageParam}`);  
    return res.data;
  } catch (error) {
    handleError(error);
  }
}