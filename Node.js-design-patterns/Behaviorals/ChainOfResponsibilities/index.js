let Store = require('./Store');
let inventory = require('./inventory');

let skiShop = new Store('Steep and Deep', inventory);

let searchItem = 'powder skis';
let results = skiShop.find(searchItem);

console.log( results );
