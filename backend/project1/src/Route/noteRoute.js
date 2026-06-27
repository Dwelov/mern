const router = require('express').Router();

//connecting the noteController to the noteRoute.js file and the schema notes   
const { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } = require('../controllers/noteController');
const notes = require('../schema/note');

// instantiate the express router
const noteRouter = require('./Router/noteRouter');
app.use('/api/v1/notes', noteRouter);

// defining the structural paths for the CRUD operations search and filtering of notes

// 1- create a new note
router.post('/', (req, res) => {
    res.send('Create a new note');
});

//2- getting all notes
router.get('/', (req, res) => {
    res.send('Get all notes');
});

//3- getting a single note by id
router.get('/:id', (req, res) => {
    res.send(`Get a single note with id ${req.params.id}`);
});

//4- updating a note by id
router.put('/:id', (req, res) => {
    res.send(`Update a note with id ${req.params.id}`);
});

//5- deleting a note by id
router.delete('/:id', (req, res) => {
    res.send(`Delete a note with id ${req.params.id}`);
});

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

//searching and filtering notes
router.get('/search', (req, res) => {
    const { title, tag } = req.query;
    let filteredNotes = notes;
    if (title) {
        filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (tag) {
        filteredNotes = filteredNotes.filter(note => note.tag.toLowerCase().includes(tag.toLowerCase()));
    }
    res.json(filteredNotes);
});

//export the router to be used in other parts of the application
module.exports = router;

