let Shopper = require('./Shopper');

let alex = new Shopper('Alex Banks');

// Estos atributos se repiten y las lineas tambien
alex.addItemToList('camping knife');
alex.addItemToList('tent');
alex.addItemToList('backpack');
alex.addItemToList('map');
//----
alex.addItemToList('slingshot');

let eve = new Shopper('Eve Porcello');
eve.addItemToList('camping knife');
eve.addItemToList('tent');
eve.addItemToList('backpack');
eve.addItemToList('map');
eve.addItemToList('reading light');

console.log( `${alex.name}: ${alex.shoppingList}` );
console.log( `${eve.name}: ${eve.shoppingList}` );
