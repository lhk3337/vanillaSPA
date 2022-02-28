export default class ProductListPage {
  constructor({ $target, fetchData }) {
    this.$ListPage = document.createElement("div");
    $target.appendChild(this.$ListPage);
    this.$ListPage.className = "ProductListPage";
    this.data = [];
    fetchData();
  }
  setData(data) {
    this.data = data;

    this.render();
  }

  render() {
    const $title = document.createElement("h1");
    const $lists = document.createElement("ul");

    $title.innerText = "상품목록";
    this.$ListPage.appendChild($title);
    this.$ListPage.appendChild($lists);
    $lists.innerHTML = `${this.data
      .map(
        (product) => `
    <li class="Product">
    <a href=/products/${product.id} >
    <img src="${product.imageUrl}" />
    <div class="Product__info">
    <div>${product.name}</div>
    <div>${product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원~</div>
    </div>
    </a>
  </li>
    `
      )
      .join("")}`;
  }
}
