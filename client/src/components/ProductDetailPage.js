export default class ProductDetailPage {
  constructor({ $target, productId, detailFetchData }) {
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
    this.state = {
      product: data,
      selectedOptions: [],
    };
    this.render();
  }

  setSelected = (select) => {
    this.state = select;
    this.render();
  };
  render() {
    const { name, price, imageUrl, productOptions } = this.state.product;

    this.$title.innerText = `${name} 상품 정보`;
    this.$productDetail.innerHTML = `
    <img src=${imageUrl} />
    <div class="ProductDetail__info">
      <h2>${name}</h2>
      <div class="ProductDetail__price">${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원~</div>
      <select id="selectedItem">
        <option selected>선택하세요.</option>
        ${productOptions
          .map(
            (product) =>
              `<option ${product.stock === 0 ? "disabled" : ""} value=${product.id}>${
                product.stock === 0 ? "(품절)" : ""
              }${product.name} ${product.price !== 0 ? `(+${product.price}원)` : ""}</option>`
          )
          .join("")}
      </select>
    </div>
    `;

    const $selectedOptions = document.createElement("div");
    $selectedOptions.className = "ProductDetail__selectedOptions";
    document.querySelector(".ProductDetail__info").appendChild($selectedOptions);
    const { product, selectedOptions } = this.state; // this.setSelected({ ...this.state, selectedOptions: nextSelectedOptions }); nextSelectedOptions -> 88 line
    console.log(selectedOptions);
    const total = selectedOptions.reduce(
      (acc, option) => acc + (product.price + option.optionPrice) * option.quantity,
      0
    );
    $selectedOptions.innerHTML = `
    <h3>선택된 상품</h3>
    <ul>
    ${selectedOptions
      .map(
        (selected) => `
    <li>
    ${name} ${selected.optionName} ${this.state === undefined ? 0 : price + selected.optionPrice}원
    <div><input id="count" type="text" data-optionId="${selected.optionId}" value="${selected.quantity}" /> 개</div>
  </li>
    `
      )
      .join("")}
   
    </ul>
    <div class="ProductDetail__totalPrice">${total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>
    <button class="OrderButton">주문하기</button>
    `;

    $selectedOptions.addEventListener("change", (e) => {
      if (e.target.tagName === "INPUT") {
        const nextQuantity = parseInt(e.target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];
        console.log(nextSelectedOptions);
        if (typeof nextQuantity === "number") {
          const { product } = this.state;
          const optionId = parseInt(e.target.dataset.optionid);
          const option = product.productOptions.find((option) => option.id === optionId);
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          );
          nextSelectedOptions[selectedOptionIndex].quantity =
            option.stock >= nextQuantity ? nextQuantity : option.stock;

          this.setSelected({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      }
    });

    const exSelect = document.getElementById("selectedItem");
    exSelect.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT") {
        const selectedOptionId = parseInt(e.target.value);
        const { product, selectedOptions } = this.state;

        const option = product.productOptions.find((option) => option.id === selectedOptionId);
        const selectOption = selectedOptions.find((selectedOption) => selectedOption.optionId === selectedOptionId);

        if (option && !selectOption) {
          const nextSelectedOptions = [
            ...selectedOptions,
            {
              productId: product.id,
              optionId: option.id,
              optionName: option.name,
              optionPrice: option.price,
              quantity: 1,
            },
          ];

          this.setSelected({ ...this.state, selectedOptions: nextSelectedOptions });
        }
      }
    });
  }
}
