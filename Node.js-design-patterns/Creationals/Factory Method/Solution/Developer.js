
var Person = require('./Person')

class Developer extends Person{

    constructor(name, money=0,skills) {
        super(name);
        this.money = money;
        this.skills = [...skills];
    }
    
}