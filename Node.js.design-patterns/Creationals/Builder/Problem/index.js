var Person = require('./Person')


/**
 * In Java, there is no support for default values for constructor parameters.
 *  As a workaround, a technique called "Telescoping constructor" is often used. 
 * A class has multiple constructors, where each constructor calls a more specific constructor
 *  in the hierarchy, which has more parameters than itself, providing default values 
 * for the extra parameters. The next constructor does the same until there is no left
 * 
 * This pattern can therefore not scale very well - it is hard to maintain
 *  and from a certain number of parameters, constructors are insanely long and 
 * there is just too many of them.


 */
// Employees
var sue = new Person('Sue', true, true, 60);
var bill = new Person('Bill', true, false, 20);
var phil = new Person('Phil', true, false);

// Shoppers
var charles = new Person('Charles', false, false, 0, 500, ['jeans', 'sunglasses']);
var tabbitha = new Person('Tabbitha', false, false, 0, 1000);