import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymetSummary } from "./checkout/paymentSummary.js";
// import   '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymetSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymetSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(()=>{
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymetSummary();
});
*/


/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymetSummary();
});
*/
