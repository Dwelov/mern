//creating a note database that is simple an array
const notes = [];

const note = {
    id: 'note',
    title: 'Note',
    content: "the content of the note",
    tag: "the tag of the note",
    createdAt: "the created date and time of the note",
    updatedAt: "the updated date and time of the note"
}

notes.unshift(note);

module.exports = notes;