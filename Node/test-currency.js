const currency = require('./currency');
const data = require('./data');
console.log('50 Canadian dollars equals this amount of US dollars: ');
console.log(currency.canadianToUs(50));
console.log('30 Canadian dollars equals this amount of US dollars: ');
console.log(currency.canadianToUs(30));

console.log(data.name);