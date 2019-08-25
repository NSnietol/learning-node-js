let Shopper = require('./Shopper');
let {
  InventoryItem,
  GoldenInventoryItem,
  DiamondInventoryItem
} = require('./InventoryItem');

let alex = new Shopper('Alex', 3500);

let walkman = new InventoryItem("Walkman", 29.99);
let necklace = new InventoryItem("Necklace", 9.99);

let gold_necklace = new GoldenInventoryItem(necklace);
let diamond_gold_necklace = new DiamondInventoryItem(gold_necklace);

let diamond_walkman = new DiamondInventoryItem(walkman);

alex.purchase(diamond_gold_necklace);
alex.purchase(diamond_walkman);

alex.printStatus();

diamond_walkman.print();
