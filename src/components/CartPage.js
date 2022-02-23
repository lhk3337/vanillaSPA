export default class CartPage {
  constructor({ $target }) {
    this.DetailPage = document.createElement("div");
    $target.appendChild(this.DetailPage);
    this.DetailPage.className = "ProductListPage";
    this.render();
  }
  render() {
    const title = document.createElement("h1");
    title.innerText = "장바구니";
    this.DetailPage.appendChild(title);
  }
}
