const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const getNotes = (note) => note

const addNote = (title, body) => {
    const notes = loadnotes()
    const duplicateNote = notes.find((note) => note.title === title)
   
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('note added'));

    }
    else {
        console.log(chalk.red.inverse('title has taken'));
    }
}

const removeNote = (title) => {
    const notes = loadnotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse(title + ' removed'));
    }
    else {
        console.log(chalk.red.inverse('not found'));
    }
    //  console.log('removed: '+ dupliacte);

}

const listNotes = () => {
    const notes = loadnotes()
    //  saveNotes(notes)
    console.log(chalk.blue.bold('your notes are: '));
    notes.forEach(title => {
        console.log(chalk.green.inverse(title.title));
    });

}

const readNotes = (title) => {
    const notes = loadnotes()
    const selectedNote = notes.find(note => note.title === title)

    if (selectedNote) {
        console.log(chalk.green.inverse(selectedNote.title));
        console.log(chalk.blue(selectedNote.body));
    }
    else {
        console.log(chalk.red.inverse('note not found!!'));
    }


}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadnotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}