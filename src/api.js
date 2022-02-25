const API_ENDPOINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const response = await fetch(url, { headers: { "Access-Control-Allow-Headers": "*" } });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
const api = {
  fetchProducts: () => {
    return request(`${API_ENDPOINT}/products`);
  },
  fetchDetailProduct: (productId) => {
    return request(`${API_ENDPOINT}/products/${productId}`);
  },
};

export default api;
