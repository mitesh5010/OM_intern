const user  = {name: 'Mitesh', age : 23};

console.log('mitesh');
console.log(user.name);

let greetings: string = 'hello! Mitesh';
greetings.toLowerCase();

//number
let userId = 555.5
userId.toFixed()

let hero: string

function getName() {
  return 'thor'
}

hero = getName();

type User ={
  name :string
  readonly id: number
  isPaid: boolean
  cardDetail?:string
}

function getUser(user:User):User {
  return {name:'',id:123,isPaid:true}
}
let prouser = {name:'',id:125,isPaid:true}
getUser(prouser);

let name : number | boolean;
name = 12
name = true

//enum

enum seatChoice{ 
  a,
  m = 10,
  w,
  f=111
}

const mySeat = seatChoice.w

//interface

interface Car{
  color : string
  carNo : number
}

const aulto : Car = {color:'white', carNo:123, working:true}

interface Car{
  working: boolean

}


export{}