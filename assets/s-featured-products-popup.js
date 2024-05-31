if (!customElements.get('s-featured-products-popup')) {
  customElements.define('s-featured-products-popup', class SectionFeaturedProductsPopup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      console.log("init section")
    }

    disconnectedCallback() {
    }
  });
}