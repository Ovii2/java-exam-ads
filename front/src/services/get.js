import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const getAllData = async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllDataAuth = async () => {
  try {
    const resp = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getOneAd = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/ads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(`Error fetching book for ID ${id}: ${error.message}`);
  }
};

export const getCategories = async () => {
  try {
    const resp = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllAdsAuth = async () => {
  try {
    const resp = await axios.get(`${API_URL}/ads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllCommentsAuth = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/ads/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};
