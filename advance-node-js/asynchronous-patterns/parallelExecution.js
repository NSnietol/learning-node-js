let fs = require('fs')
let { promisify } = require('util')
let writeFile = promisify(fs.writeFile)
let unlink = promisify(fs.unlink);
let readdir = promisify(fs.readdir)
let delay = (time) => new Promise((resolve, reject) => {
    console.log('Waiting...');
    setTimeout(resolve, time * 1000);
})
Promise.all([
        writeFile('data.txt', 'Node.js 11x has been released'),
        writeFile('readme.md', 'Hello World'),
        writeFile('readme.js', '{message:"Hello"}')
    ]).then(() => readdir(__dirname))
    .then(console.log)
    .catch((err) => console.log)