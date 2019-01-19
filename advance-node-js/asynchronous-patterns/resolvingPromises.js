/*
Callback Vs Promise
*/
let delay = (time, callback) => {

    setTimeout(callback, time * 1000);
}
delay(1, (err, answer) => {

    if (err) {
        console.log('Fatal error');
    } else {
        console.log('1 Secondos');
    }

})
console.log('Staring delay');

let delayPromise = (time) => {
    return new Promise((resolve, reject) => {

        if (time > 10) {
            throw new Error(`Error into the Promise, ${time} is too long`);
            //reject( new Error(`Error into the Promise, ${time} is too long`))
        }
        setTimeout(() => {
            resolve('TimeOut has ended')
        }, time * 1000)

    });
}

// Los returns de los then pasan la información al then siguiente
delayPromise(2)
    .then((data) => {
        console.log(data, '2 seconds with Promise');
        return 'Example1'
    })
    .then((data) => { console.log('answer :', data) })



delayPromise(11)
    .then((data) => { console.log })
    .catch((err) => { console.log(err.message) })