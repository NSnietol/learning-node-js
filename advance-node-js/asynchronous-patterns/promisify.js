let { promisify } = require('util');

let delay = (seconds, callback) => {
    if (seconds > 3) {
        callback(new Error(`${seconds} seconds it too long!`));
    } else {
        setTimeout(() =>
            callback(null, `the ${seconds} second delay is over.`),
            seconds
        );
    }
}
let delayPromise = promisify(delay);

delayPromise(4)
    .then((data) => console.log(data))
    .catch((err) => console.log(`Error : ${err.message}`))