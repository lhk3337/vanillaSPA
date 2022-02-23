export default class ProductDetailPage {
  constructor({ $target, productId }) {
    this.state = { productId };
    this.ListPage = document.createElement("div");
    $target.appendChild(this.ListPage);
    this.ListPage.className = "ProductDetailPage";
    this.render();
  }
  render() {
    const title = document.createElement("h1");
    title.innerText = "상세 페이지";
    this.ListPage.appendChild(title);
  }
}
