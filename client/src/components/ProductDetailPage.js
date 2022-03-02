export default class ProductDetailPage {
  constructor({ $target, productId, detailFetchData }) {
    this.state = {};

    this.$DetailPage = document.createElement("div");
    this.$productDetail = document.createElement("div");

    $target.appendChild(this.$DetailPage);
    this.$title = document.createElement("h1");
    this.$DetailPage.appendChild(this.$title);
    this.$DetailPage.appendChild(this.$productDetail);

    this.$DetailPage.className = "ProductDetailPage";
    this.$productDetail.className = "ProductDetail";
    detailFetchData();
  }
  setData(data) {
    this.data = data;
    this.render();
  }
  setSelected(select) {
    this.select = select;
    this.render();
  }
  render() {
    const { name, price, imageUrl, productOptions } = this.data;

    this.$title.innerText = `${name} 상품 정보`;
    this.$productDetail.innerHTML = `
    <img src=${imageUrl} />
    <div class="ProductDetail__info">
      <h2>${name}</h2>
      <div class="ProductDetail__price">${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원~</div>
      <select id="selectedItem">
        <option selected>선택하세요.</option>
        ${productOptions.map((product) =>
          product.stock === 0
            ? `<option disabled value=${price + product.price}>${product.name} ${
                product.price !== 0 ? `(+${product.price}원)` : ""
              }</option>`
            : `<option value=${price + product.price}>${product.name} ${
                product.price !== 0 ? `(+${product.price}원)` : ""
              }</option>`
        )}
      </select>
    </div>
    `;

    const $selectedOptions = document.createElement("div");
    $selectedOptions.className = "ProductDetail__selectedOptions";
    document.querySelector(".ProductDetail__info").appendChild($selectedOptions);

    const exSelect = document.getElementById("selectedItem");
    exSelect.addEventListener("change", (e) => {
      const { value } = e.target;
      this.setSelected(value);
    });

    $selectedOptions.innerHTML = `
    <h3>선택된 상품</h3>
    <ul>
      <li>
        커피잔 100개 번들 ${this.select === undefined ? 0 : this.select}원
        <div><input type="number" value="10" />개</div>
      </li>
      <li>
        커피잔 1000개 번들 15,000원
        <div><input type="number" value="5" />개</div>
      </li>
    </ul>
    <div class="ProductDetail__totalPrice">175,000원</div>
    <button class="OrderButton">주문하기</button>
    `;
  }
}
