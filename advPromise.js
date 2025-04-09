const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1 fdsa')
  }, 3000);
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 1000);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p3')
  }, 2000);
})

Promise.allSettled([p1,p2,p3])
  .then((res)=>console.log(res))
  .catch(err => {console.log(err.errors);console.error(err)});
