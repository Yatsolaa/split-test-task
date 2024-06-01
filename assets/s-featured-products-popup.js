if (!customElements.get('s-featured-products-popup')) {
  customElements.define('s-featured-products-popup', class SectionFeaturedProductsPopup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.showPopup = this.dataset.showPopup;
      this.popupDelay = this.dataset.delay;
      this.showOnce = this.dataset.showOnce;
      this.overlay = this.querySelector('.js-featured-products-popup__overlay');
      this.popup = this.querySelector('.js-featured-products-popup__popup');
      this.closePopupBtns = this.querySelectorAll('.js-featured-products-popup__close');
      this.addToCartBtn = this.querySelector('.js-featured-products-popup__cta');
      this.addToCartMessage = this.querySelector('.js-featured-products-popup__add_to_cart');
      this.successMessage = this.querySelector('.js-featured-products-popup__success');
      this.products = this.querySelectorAll('.js-featured-products-popup__product');

      this.closePopupBtns.forEach(btn => {
        btn.addEventListener('click', this.closePopup)
      });

      this.addToCartBtn.addEventListener('click', this.addToCart);

      if (this.showOnce == "true" && localStorage.isShown) {
        console.log("prevent show")
        return
      }

      if (this.showPopup == "true") {
        setTimeout(this.openPopup, this.popupDelay);
      }
    }

    disconnectedCallback() {
      this.closePopupBtns.forEach(btn => {
        btn.removeEventListener('click', this.closePopup)
      });

      this.addToCartBtn.removeEventListener('click', this.addToCart);
    }

    openPopup = () => {
      document.body.style.overflow = "hidden"
      this.popup.classList.add('is-active');
      this.overlay.classList.add('is-active');

      if (this.showOnce == "true") {
        localStorage.setItem("isShown", true);
      }
    }

    closePopup = () => {
      document.body.style.overflow = "unset"
      this.popup.classList.remove('is-active');
      this.overlay.classList.remove('is-active');
    }

    addToCart = () => {
      let formItems = [];
      this.products.forEach(product => {
        formItems.push({
          id: product.dataset.variantId,
          quantity: 1,
        });
      });

      let formData = {
        items: formItems,
      };

      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          this.successMessageHandler();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    successMessageHandler = () => {
      this.addToCartMessage.classList.add("is-hidden");
      this.successMessage.classList.remove("is-hidden");

      setTimeout(this.closePopup, 1500);
    }
  });
}