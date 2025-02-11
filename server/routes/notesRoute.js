const express = require("express");
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const {createNote, getNote, updateNote, deleteNote} = require('../controllers/notesController');

router.post('/', authmiddleware, createNote);
// router.get('/', authmiddleware, getNote);
// router.put('/:noteId', authmiddleware, updateNote);
// router.delete('/:noteId', authmiddleware, deleteNote);


module.exports = router;