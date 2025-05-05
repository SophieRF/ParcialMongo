const express = require('express');
const { getBooks, getBookById, postBook, putBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

// GET
router.get('/books', getBooks ,async (req, res) => {
res.json(res.books);
});

//GET BY ID
router.get('/books/:id', getBookById ,async (req, res) => {
    res.json(res.book);
    });

// POST
router.post('/books', postBook, async (req, res) => {
res.json(res.book);
});

//PUT
router.put('/books/:id', putBook, async (req, res)=>{
    res.json(res.bookToUpdate);
});

//DELETE
router.delete('/books/:id', deleteBook, async (req, res)=>{
    res.json(res.bookToDelete);
});

module.exports = router;