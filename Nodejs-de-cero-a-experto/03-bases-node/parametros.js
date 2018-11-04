const argv = require('yargs')
    .command('listar', 'Listar la tablas de multiplicación', {
        'run': {
            alias: 'r',
            describe: 'run your program',
            demandOption: true
        },
        'path': {
            alias: 'p',
            describe: 'provide a path to file',
            demandOption: true
        },
        'spec': {
            alias: 's',
            describe: 'program specifications'
        }
    })
    .help()
    .argv

console.log('path :' + argv.path);