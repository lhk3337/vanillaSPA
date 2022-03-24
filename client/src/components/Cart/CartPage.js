import { getItem } from "../storage.js";
import { routeChange } from "../../router.js";
import { api } from "../../api.js";
import Cart from "./Cart.js";

export default class CartPage {
  constructor({ $target }) {
    this.target = $target;
    this.cartComponent = null;
    this.DetailPage = document.createElement("div");

    this.DetailPage.className = "ProductListPage";
    this.DetailPage.innerHTML = `<h1>장바구니</h1>`;
    this.cartData = getItem("product_cart", []);
    this.state = {
      products: null,
    };
    this.render();
    this.fetchProducts();
  }
  setState(nexState) {
    this.state = nexState;
    this.render();
  }
  fetchProducts = async () => {
    const products = await Promise.all(
      this.cartData.map(async (cartItem) => {
        const product = await api.fetchCartProduct(cartItem.productId);
        const selectedOption = product.productOptions.find((option) => option.id === cartItem.optionId);
        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );
    this.setState({ products });
  };

  render() {
    if (this.cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
    } else {
      this.target.appendChild(this.DetailPage);
      if (this.state.products && !this.cartComponent) {
        this.cartComponent = new Cart({
          $target: this.DetailPage,
          initialState: this.state.products,
        });
      }
    }
  }
}
