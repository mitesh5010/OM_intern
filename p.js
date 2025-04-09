/*
let user = {
  name: 'Mitesh',
  address : {
    personal : {
      city : 'anand',
    },
    office: {
      city : 'nadiad',
      area :  {
        landmark : 'croma'
      }
    }
  }
}

let finalObj = {}

let magic = (obj, parent)=>{
  for( let key in obj){
    if(typeof obj[key]=== 'object'){
      magic(obj[key],parent+'_'+key)
    }else{
      finalObj[parent+'_'+key] = obj[key];
    }
  }
}

magic(user, 'user');
console.log(finalObj);
*/


// let sub = function (x) {
//   return function (y) {
//     console.log(x-y);
//   }
// }

// let subByTen = sub(10)

// subByTen(20);

//throtting

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

// Example
const log = () => console.log("Scrolling...");
const throttledLog = throttle(log, 1000);

window.addEventListener("scroll", throttledLog);