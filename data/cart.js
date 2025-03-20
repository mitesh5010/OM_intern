export const cart = [];

export function addToCart(productId) {
  let matchineItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchineItem = cartItem;
        }
      });

      matchineItem ? matchineItem.quantity += 1 : 
                    cart.push({
                      productId ,
                      quantity: 1 });
}