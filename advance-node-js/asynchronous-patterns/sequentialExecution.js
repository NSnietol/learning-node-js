let fs = require('fs')
let { promisify } = require('util')
let writeFile = promisify(fs.writeFile)
let unlink = promisify(fs.unlink);

let delay = (time) => new Promise((resolve, reject) => {
    console.log('Waiting...');
    setTimeout(resolve, time * 1000);
})

let deep = () => process.stdout.write('\x07');

const execution = () => Promise.resolve()
    .then(() => console.log('Staring'))
    .then(() => delay(1))
    .then(() => deep())
    .then(() => console.log('waiting some more'))
    .then(() => delay(3))
    .then(() => {
        writeFile('message.txt', 'Hello Node.js', 'utf8')
        console.log('File created');
    })
    .then(() => deep())
    .then(() => delay(12))
    .then(() => {
        unlink('message.txt')
        console.log('File removed');
    })
    .then(() => deep())
    .then(() => console.log('End'))
    .catch((err) => console.log(err))

execution()