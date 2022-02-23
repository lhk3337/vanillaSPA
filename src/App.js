import ProductListPage from "./components/ProductListPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import CartPage from "./components/CartPage.js";

export default class App {
  constructor($target) {
    this.router = () => {
      const { pathname } = location;

      if (pathname === "/") {
        new ProductListPage({ $target });
      } else if (pathname.indexOf("/products/") === 0) {
        const [, , productId] = pathname.split("/");
        new ProductDetailPage({ $target, productId });
      } else if (pathname === "/cart") {
        new CartPage({ $target });
      }
    };
    this.router();
  }
}
