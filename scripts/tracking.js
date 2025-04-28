import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



async function loadPage() {

  await loadProductsFetch();

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const productId = urlParams.get('productId');

const product = getProduct(productId);
const order  = getOrder(orderId);
console.log(productId);
console.log(orderId);

let productDetails ;

order.products.forEach(details => {
  details.productId === product.id? productDetails = details : '';
});

const trackOrderHtml = 

`<a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>
  <div class="delivery-date">
  ${
    dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
  }
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>`;

  document.querySelector('.js-order-tracking').innerHTML = trackOrderHtml;
}

loadPage();
