import { removeItem } from "../storage.js";
import { routeChange } from "../../router.js";
export default class Cart {
  constructor({ $target, $parentTarget, initialState }) {
    this.$component = document.createElement("div");
    this.$component.className = "Cart";
    this.target = $target;
    this.parentTarget = $parentTarget;
    this.state = initialState;
    $target.appendChild(this.$component);
    this.setState(this.state);
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  getTotalPrice() {
    return this.state.reduce((acc, option) => acc + (option.productPrice + option.optionPrice) * option.quantity, 0);
  }
  render() {
    this.$component.innerHTML = `
    <ul>
        ${this.state
          .map(
            (cartItem) => `
            <li class="Cart__item">
                <img src="${cartItem.imageUrl}">
                <div class="Cart__itemDescription">
                    <div>${cartItem.productName} ${cartItem.optionName} ${cartItem.quantity}개</div>
                    <div>${(cartItem.productPrice + cartItem.optionPrice)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
                </div>
            </li>
        `
          )
          .join("")}
    </ul>
    <div class="Cart__totalPrice">
        총 상품가격 ${this.getTotalPrice()
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
    </div>
    <button class="OrderButton">주문하기</button>
    `;
    this.$component.addEventListener("click", (e) => {
      if (e.target.className === "OrderButton") {
        alert("주문 되었습니다.");
        removeItem("product_cart");
        this.parentTarget.removeChild(this.target);
        routeChange("/");
      }
    });
    return this.$component;
  }
}
