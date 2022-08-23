import axios from "axios";
import { toast } from 'react-toastify';

export const createProduct = async (newData) => {
  const res = await axios.post('/products', newData);
  return res.data;
};

export const updateProduct = async ({id, newData}) => {
  const res = await axios.put(`/products/${id}`, newData);
  return res.data;
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};

// -------------------------react-query------------------------
export const handleError = (error) => {
  if(error.response.data.msg) {
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }else {
    toast.error(error.response);
    throw new Error(error.response);
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
  try {
    const res = await axios.get(`${queryKey[0]}&page=${pageParam}`);  
    return res.data;
  } catch (error) {
    handleError(error);
  }
}