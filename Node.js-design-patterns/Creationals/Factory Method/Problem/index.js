var Shopper = require('./Shopper');
var Employee = require('./Employee');

// El problema recide cuando se se manajan muchos tipos de personas o cuando se requiere 
// En tiempo de ejecucion obeter un determinado tipo de persona
var alex = new Shopper('Alex Banks', 100);
var eve = new Employee('Eve Porcello', 100, 'This and That');

console.log( alex.toString() )
console.log( eve.toString() )
