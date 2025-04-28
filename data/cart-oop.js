export function Cart(localKeyStorage) {

const cart = {

  cartItem : undefined,

  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(localKeyStorage));
    if (!this.cartItem) {
    this.cartItem =[
  
    {
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId : '1'
    },{
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionsId : '2'
    }
  ];
  }
  },

  saveToStorage() {
    localStorage.setItem(localKeyStorage, JSON.stringify(this.cartItem));
  },

  addToCart(productId) {
    let matchingItem;
        this.cartItem.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
  
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItem.push({
            productId: productId,
            quantity: 1,
            deliveryOptions : '1'
          });
        }
        this.saveToStorage();
  },


  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItem.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    
    this.cartItem =newCart;
  
    this.saveToStorage();
  },

  updateDeliveryDate(productId, deliveryOptionsId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionsId = deliveryOptionsId;
    
    this.saveToStorage();
  }

}
return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
