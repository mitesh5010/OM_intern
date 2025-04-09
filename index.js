// function x() {
//   for (var i = 1; i <=5 ; i++) {
//     function close(x){
//     setTimeout(function () {
//       console.log(x);
//     }, x*1000);

//   }
//   close(i);
    
//   }
// }
// x();

// function name(a,...b){
//   console.log(a)
//   console.log(b)
// }
// name("a","b","c")



// var b = function (fn) {
//   console.log(fn);  
// }

// function xt() {
//   return 'hii';
// }

// b(xt());

// const num = [1,2,4];
// const result = num.map(function (number) {
//   return number%2;
// })
// console.log(result);

// function x(y) {
//   y();
//   console.log('x');
// }
// x(function y() {
//   console.log('y')
// })




// console.log('A');
// function a() {
//   console.log('fn')
// }
// a();
// setTimeout(function () {
//   console.log('lll')
// },0);
// console.log('b');

// const arr = [1,3,4,6,5];

// const a = arr.reduce(function (acc,curr) {
//   if (acc < curr) {
//     acc = curr; 
//   }
//   return acc;
// },0)
// console.log(a);

// const users = [
//   {firstName: "akshay", lastName: "saini", age: 26 },
//   {firstName: "donald", lastName: "trump", age: 75 },
//   {firstName: "elon", lastName: "musk", age: 50 },
//   {firstName: "deepika", lastName: "padukone", age: 26 },
// ]

// const o = users.map(x => x.firstName+" "+x.lastName)
// console.log(o);

// const b = users.reduce(function (acc,curr){
//   if(acc[curr.age]) { 
//     acc[curr.age]= ++acc[curr.age];
//   }else{ 
//     acc[curr.age]= 1;};
//   return acc;
// }, {})
// console.log(b);

// const c = users.filter(x => x.age <30).map(x=> x.firstName)
// console.log(c);

// const d = users.reduce(function (acc,curr) {
//   if (curr.age<30) {
//    acc.push(curr.firstName) ;
//   }
//   return acc;
// },[])
// console.log(d);


// nums = [-12,6,100,2,7]
// const a = 50; 

// let max = Math.min(a,...nums);
// console.log(max);

// const num = -1534236469;
// // const num = 123;
// var arr = num.toString().split('').reverse();
// if (arr[arr.length-1]==='-') {
//   arr.unshift(...arr.splice(arr.length-1,1))
// }
// var ans = parseInt(arr.join(''));
// if(ans>2147483648 || ans<-2147483648) ans=0;
// console.log(ans);

// const s ="91283472332";

// let ans =parseInt(s.trim());
// if (isNaN(ans))
//   ans =0;
// if(ans>2**31-1)
//   {ans = 2**31-1}
// if(ans<-(2**31))
//   {ans = -(2**31)}


// console.log(ans);
// let  ans = 0;
// for (let i = 0; i < array.length; i++) {
//   for (let j = i+1; j < array.length; j++) {
//     for (let k = j+1; k < array.length; k++) {
//      ans  = Math.max(ans, (nums[i]-nums[j])*nums[k]);
//     }
//   }
  
// }

/*
const GitHub_Api = "https://api.github.com/users/mitesh5010"

const user = fetch(GitHub_Api);

console.log(user);

user.then(function (data) {
  console.log(data);
})
  */
/////

const cart = [
  {
      itemName : 'Shoes',
      itemPrice : 2000
  },
  {
      itemName : 'Paint',
      itemPrice : 2500
  },
  {
      itemName : 'Kurta',
      itemPrice : 1500
  }
];

let walletBalance = 10000;

createOrder(cart)
  .then(function(orderId){
      return orderId;
  })
  .then(function(orderId){
      return proceedToPayment(orderId);
  })
  .then(function(orderStatus){
      return showOrderSummery(orderStatus);
  })
  .then(function(orderHistory){
      return updateWallet(orderHistory);
  })
  .then(function(res){
     console.log(res);
  })
  .catch((err)=>{
      console.log(err.message)
  })

function createOrder(cart){
  return new Promise(function(resolve,reject){
      if(!validateCart(cart)){
          reject(new Error("Cart is not valid"));
      }
      let orderId=10
      if(orderId){
          resolve(orderId);
      }
  })
}

function proceedToPayment(orderId){
  return new Promise(function(resolve,reject){
      if(orderId){
          resolve({paymentStatus : 1, message : "Payment successfully completed"});
      }else{
          reject(new Error("Payment Failed"));
      }
  })
}

function showOrderSummery(orderStatus){
  return new Promise(function(resolve,reject){
      if(orderStatus.paymentStatus === 1){
          resolve({status:'success', orders : cart});
      }else{
          reject(new Error("Something went wrong"));
      }
  })
}

function updateWallet(orderHistory){
  return new Promise(function(resolve,reject){
      if(orderHistory.status === 'success'){
          let orderAmount = 6000;
          walletBalance = walletBalance - orderAmount;
          resolve({balance : walletBalance, message:'Wallet updated'});
      }else{
          reject(new Error("Wallet balance not updated"));
      }
  })
}

function validateCart(cart){
  return true;
}