import { api } from "../api.js";

export default class ProductListPage {
  constructor({ $target }) {
    this.$ListPage = document.createElement("div");
    $target.appendChild(this.$ListPage);
    this.$ListPage.className = "ProductListPage";
    this.render();
  }
  render() {
    const $title = document.createElement("h1");
    const $lists = document.createElement("ul");

    $title.innerText = "상품목록";
    this.$ListPage.appendChild($title);
    this.$ListPage.appendChild($lists);
    $lists.innerHTML = `
      <li class="Product">
        <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
        <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
      </li>
      
      `;
  }
}
