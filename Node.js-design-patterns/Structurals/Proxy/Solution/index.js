let path = require('path');
let FS_Proxy = require('./FS_Proxy');

let fs = new FS_Proxy(require('fs'));

// let txtFile = path.join(__dirname, 'Readme.txt');
let mdFile = path.join(__dirname, 'Readme.md');

let result = (error, contents) => {

    if (error) {
        console.log('\x07');
        console.error(error);
        process.exit(0);
    }

    console.log('reading file...');
    console.log(contents);

}

// fs.readFile(txtFile, 'UTF-8', result);
fs.readFile(mdFile, 'UTF-8', result);