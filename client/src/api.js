const API_ENDPOINT = "http://localhost:5000";

const request = async (url) => {
  try {
    const response = await fetch(url, {});
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    console.log(e);
  }
};

export const api = {
  fetchProducts: async () => {
    const coffeeData = await request(`${API_ENDPOINT}/products`);
    return {
      data: coffeeData,
    };
  },
  fetchDetailProduct: async (productId) => {
    return await request(`${API_ENDPOINT}/products/${productId}`);
  },
};

export default api;
