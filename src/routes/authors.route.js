const express = require('express');
const { getAuthors, getAuthorById, postAuthor, putBookOnAuthor } = require('../controllers/authorController');
const router = express.Router();

// GET
router.get('/authors', getAuthors ,async (req, res) => {
res.json(res.authors);
});

//GET BY ID
router.get('/authors/:id', getAuthorById ,async (req, res) => {
    res.json(res.author);
    });

// POST
router.post('/authors', postAuthor, async (req, res) => {
res.json(res.author);
});

//PUT
router.put(' /authors/:id', putAuthor, async (req, res)=>{
    res.json(res.authorToUpdate);
});

//DELETE
router.delete('/authors/:id', deleteAuthor, async (req, res)=>{
    res.json(res.authorToDelete);
});

//PUT BOOK
router.put('/authors/:id/addBook/:bookId',putBookOnAuthor, async (req, res) => {
res.json(res.author);
});

module.exports = router;