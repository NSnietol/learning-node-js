class Logger {

    constructor() {
        this.logs = [];
    }

    get count() {
        return this.logs.length;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`${timestamp} - ${message}`);
    }

}


// Se exporta una unica instancia de la clase Logger 
// Lo que permite que se utilice solo esta durante la ejecucion del programa
module.exports = new Logger();
