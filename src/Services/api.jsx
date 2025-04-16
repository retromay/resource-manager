import axios from "axios";

const BASE_URL = "https://67fe40f53da09811b17845a0.mockapi.io/api/test";

export const api = {
  // Read operations
  getAllItems: async () => {
    const response = await axios.get(`${BASE_URL}/crud`);
    return response.data;
  },

  // Create operations
  createItem: async (data) => {
    const response = await axios.post(`${BASE_URL}/crud`, data);
    return response.data;
  },

  // Update operations
  updateItem: async (id, data) => {
    const response = await axios.put(`${BASE_URL}/crud/${id}`, data);
    return response.data;
  },

  // Delete operations
  deleteItem: async (id) => {
    const response = await axios.delete(`${BASE_URL}/crud/${id}`);
    return response.data;
  },
};
