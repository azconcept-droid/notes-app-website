const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( (note) => note.title === title ) //NOTE: this is an array
    // const duplicateNotes = notes.filter( function (note) {
    //     return note.title === title
    // })
    const duplicateNote = notes.find( (note) => note.title === title )
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note already exit!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const noteTokeep = notes.filter((note) => note.title !== title)

    if (notes.length > noteTokeep.length)
    {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(noteTokeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNote = () => {
    const notes = loadNotes()

    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.inverse(title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}