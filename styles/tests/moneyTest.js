import { formatCurrancy } from "../../scripts/utils/money.js";

console.log('tests suite: format currancy');
console.log('test case with nearest rouned number');
formatCurrancy(2022.5) === '20.23' ? console.log('passed') : console.log('failed') ;

console.log('working with 0');
formatCurrancy(0) === '0.00' ? console.log('passed') : console.log('failed') ;