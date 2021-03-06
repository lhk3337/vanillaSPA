import ProductListPage from "./components/ProductListPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import CartPage from "./components/Cart/CartPage.js";

import { api } from "./api.js";
import { init } from "./router.js";
export default function App({ $target }) {
  this.router = () => {
    const { pathname } = location;
    if (pathname === "/") {
      const productList = new ProductListPage({
        $target,
        fetchData: async () => {
          const response = await api.fetchProducts();

          if (!response.isError) {
            productList.setData([...response.data]);
          }
        },
      });
    } else if (pathname.indexOf("/products/") === 0) {
      const [, , productId] = pathname.split("/");

      const productDetail = new ProductDetailPage({
        $target,
        productId,
        detailFetchData: async () => {
          const response = await api.fetchDetailProduct(productId);
          productDetail.setData({ ...response });
        },
      });
    } else if (pathname === "/cart") {
      new CartPage({ $target });
    }
  };
  init(this.router);
  this.router();
  window.addEventListener("popstate", this.router);
}
