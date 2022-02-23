const API_ENDPOINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const result = await fetch(url);

    return result.json();
  } catch (e) {
    console.log(e);
  }
};
export const api = {
  fetchDetailProduct: (productId) => {
    return request(`${API_ENDPOINT}/products/${productId}`);
  },
  fetchProducts: () => {
    return request(`${API_ENDPOINT}/products`);
  },
};
