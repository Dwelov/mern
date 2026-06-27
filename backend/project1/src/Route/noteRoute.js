// connecting the noteController to the noteRoute.js file and the schema notes   
const { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } = require('../controllers/noteController');
const notes = require('../schema/note');

// instantiate the express router
const router = require('express').Router();

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

