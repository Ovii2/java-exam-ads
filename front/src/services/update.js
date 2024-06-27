import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const updateData = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/${id}`, data);
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateDataAuth = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateCommentAuth = async (bookId, commentId, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/ads/${bookId}/comments/${commentId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};
