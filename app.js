const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')


//crete yargs c ommand
yargs.command({
    command: 'add',
    describe: 'Add a new notes',
    builder: {
        title: {
            describe: 'Notes title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Notes Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'list to notes',
    handler: () => {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'To read a notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title)
})

yargs.parse()