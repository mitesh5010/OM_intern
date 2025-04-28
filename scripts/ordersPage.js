import { getProduct, loadProducts, loadProductsFetch, products } from "../data/products.js";
import { orders } from "../data/orders.js";
import { formatCurrancy } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

console.log(orders);

renderOrdersGrid();

async function renderOrdersGrid() {

  await loadProductsFetch();

  let ordersHtml = '';

  orders.forEach(order => {
    // const products = order.products;
    // const matchingProduct = getProduct(products);
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    

ordersHtml += `
  <div class="order-container">       
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${orderTimeString}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>${formatCurrancy(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>

    <div class="order-details-grid js-order-details-grid">
      ${orderDetails(order)}
     
    </div>
  </div> `;

  });

  function orderDetails(order) {
    let html = '';
    order.products.forEach(productDetails =>{
      const product = getProduct(productDetails.productId);
      
      html += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
        ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
          }
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>`;
    });

    return html;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHtml;

}

  
