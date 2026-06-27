// in the note controller.js file, we will define the logic for handling the CRUD operations for notes. 
// This will include functions for creating, reading, updating, and deleting notes. We will also implement search 
// and filtering functionality.

//cretation of new note
const createNote = (req, res) => {
    const { title, content, tag } = req.body;
    const newNote = {
        id: notes.length + 1,
        title,
        content,
        tag,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    notes.unshift(newNote);
    res.status(201).json(newNote);
};

//getting all notes
const getAllNotes = (req, res) => {
    res.json(notes);
};

//getting a single note by id
const getNoteById = (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');
    res.json(note);
};

//updating a note by id
const updateNoteById = (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');
    const { title, content, tag } = req.body;
    note.title = title || note.title;
    note.content = content || note.content;
    note.tag = tag || note.tag;
    note.updatedAt = new Date();
    res.json(note);
}

//deleting a note by id

const deleteNoteById = (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) return res.status(404).send('Note not found');
    const deletedNote = notes.splice(noteIndex, 1);
    res.json(deletedNote);
}

//exporting the functions to be used in the routes      
module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
};  