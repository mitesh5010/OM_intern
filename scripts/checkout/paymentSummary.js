import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrancy } from "../utils/money.js";
import { addOrders } from "../../data/orders.js";

export function renderPaymetSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem)=>{

    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforTaxcents = productPriceCents + shippingPriceCents ;
  const taxCents = totalBeforTaxcents*0.1 ;
  const totalCents = totalBeforTaxcents + taxCents ;

  const paymentSummaryHtml = 
  `<div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrancy(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrancy(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrancy(totalBeforTaxcents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrancy(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrancy(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml; 

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try{
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        cart: cart
      })
    });

    const order = await response.json();

    addOrders(order);
  } catch(error){
    console.log('Unexpected error. Try again later.');
  }

  window.location.href = 'orders.html';

  })
}