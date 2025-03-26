export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder ;

  orders.forEach(order => {
    order.id === orderId ? matchingOrder = order : 'Order Not found';
  });
  return matchingOrder;
}