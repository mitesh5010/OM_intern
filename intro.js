"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user = { name: 'Mitesh', age: 23 };
console.log('mitesh');
console.log(user.name);
var greetings = 'hello! Mitesh';
greetings.toLowerCase();
//number
var userId = 555.5;
userId.toFixed();
var hero;
function getName() {
    return 'thor';
}
hero = getName();
function getUser(user) {
    return { name: '', id: 123, isPaid: true };
}
var prouser = { name: '', id: 125, isPaid: true };
getUser(prouser);
var name;
name = 12;
name = true;
//enum
var seatChoice;
(function (seatChoice) {
    seatChoice[seatChoice["a"] = 0] = "a";
    seatChoice[seatChoice["m"] = 10] = "m";
    seatChoice[seatChoice["w"] = 11] = "w";
    seatChoice[seatChoice["f"] = 111] = "f";
})(seatChoice || (seatChoice = {}));
var mySeat = seatChoice.w;
