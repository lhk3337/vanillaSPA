import { getItem } from "./storage.js";
import { routeChange } from "../router.js";
export default class CartPage {
  constructor({ $target }) {
    this.DetailPage = document.createElement("div");

    this.DetailPage.className = "ProductListPage";
    this.DetailPage.innerHTML = `<h1>장바구니</h1>`;
    this.state = {
      products: null,
    };
    this.render($target);
  }

  render($target) {
    const cartData = getItem("product_cart", []);
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
    } else {
      $target.appendChild(this.DetailPage);
    }
  }
}
