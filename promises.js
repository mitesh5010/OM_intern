const cart = ['shoes', 'pents', 'shirts'];
let walletAmout = 10000;

createOrder(cart)
  .then(orderId => {
    console.log(orderId);
    return orderId;
  })
  .then(orderId => { return paymentProcess(orderId); })
  .then(orderStatus => { console.log(orderStatus.message);return paymentInfo(orderStatus);})
  .catch(err => {
      console.log(err.message);
    })
  .then(orderStatus => {
    console.log('Payment:'+orderStatus.status);
    return updateAmout(orderStatus)}
  ).then(res => console.log(res))

///
function createOrder(cart) {
  return new Promise((resolve, reject) => {
    if (!validCart(cart)) {
      const err = new Error('cart is not valid');
      reject(err);
    }
    const orderId = 1234465;
    if (orderId) {
      setTimeout(
        ()=> resolve(orderId), 1000
      )
    }
  })
}

function validCart(cart) {
  return true;
}

function paymentProcess(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
     resolve({paymentStatus : 1, message : "Go for Payment"}); 
    }else{
      const err = new Error('Not Go for Payment')
      reject(err);
    }
  })
}

function paymentInfo(orderStatus) {
  return new Promise((resolve, reject) => {
    if (orderStatus.paymentStatus === 1) {
      resolve({status: 'success', orders : cart})
    } else {
      const err = new Error('Pyament : Failier')
      reject(err)
    }
  })
}

function updateAmout(orderStatus) {
  return new Promise((resolve, reject) => {
    
  if (orderStatus.status === 'success') {
    let totalPayment = 4000;
    walletAmout -= totalPayment;
    resolve({balance: walletAmout, message : "Wallet is Updated."})
  } else {
    reject(new Error('Somthing Is wrong!!'))
  }
  }) 
}

