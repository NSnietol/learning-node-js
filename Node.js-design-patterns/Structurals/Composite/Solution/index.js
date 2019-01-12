let CatalogItem = require('./CatalogItem');
let CatalogGroup = require('./CatalogGroup');

let boots = new CatalogItem("Leather Boots", 79.99);
let sneakers = new CatalogItem("Kicks", 39.99);
let flipFlops = new CatalogItem("California work boots", 19.99);

let group_shoes = new CatalogGroup("Shoes and Such", [boots, sneakers, flipFlops]);

let group_food = new CatalogGroup("Food for while you try on clothes", [
    new CatalogItem("Milkshake", 5.99),
    new CatalogItem("French Fries", 3.99)
]);

let keychain = new CatalogItem("Key Chain", .99);

let catalog = new CatalogGroup("Clothes and Food", [keychain, group_shoes, group_food]);

console.log(`$${catalog.total}`);

catalog.print();