const API_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

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
