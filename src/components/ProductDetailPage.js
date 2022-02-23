export default class ProductDetailPage {
  constructor({ $target, productId }) {
    this.state = { productId };
    this.DetailPage = document.createElement("div");
    $target.appendChild(this.DetailPage);
    this.DetailPage.className = "ProductDetailPage";
    this.render();
  }
  render() {
    const title = document.createElement("h1");
    title.innerText = "상세 페이지";
    this.DetailPage.appendChild(title);
  }
}
