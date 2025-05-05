const Author = require('../models/Autors.model.js');
const Book = require('../models/Libros.model.js');

//GET
const getAuthors = async (req, res, next) => {
    let authors;

    try {
        authors = await Author.find();
        if (authors.lenght === 0) {
            res.json("No hay autores disponibles")
        }
    } catch (error) {
        res.json({'Error al obtener los autores: ' :error});
    }

    res.authors = authors;
    next();
}

//GET BY ID
const getAuthorById = async (req, res, next) => {
    let author;
    const {id} = req.query;

    if (!id){
        return res.status(404).json({message: "El id no es válido" });
    }

    try {
        author= await Author.findById(id);
        if(!author){
            return res.status(404).json({message: "No se encontró autor con ese id"});
        }
    } catch (error) {
        res.json({"Error al obtener el autor: " :error});
    }

    res.author = author;
    next();
}

//POST
const postAuthor = async(req, res, next) => {
    let author;

    try {
        const newAuthor = new Author(req.body);
        if(newAuthor.nombre === ('' || null)){
            return res.json({message: "No se puede crear un autor sin nombre"});
        }
        author = await newAuthor.save();
        res.status(201).json(author);

    } catch (error) {
        res.status(400).json({'Error al crear el autor' :error});
    }

    res.author = author;
    next();
}

//PUT
const putAuthor = async (req, res, next) => {
    let authorToUpdate;

    try {
        authorToUpdate =await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!authorToUpdate){
            return res.status(404).json({'Autor no encontrado: ':error });
        }
        res.json(authorToUpdate);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el autor' });
    }

    res.authorToUpdate = authorToUpdate;
    next();
}

//PUT BOOK
const putBookOnAuthor = async (req, res, next) => {

    let book;
    let author = Author.getAuthor();

    try {
        book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({'Libro no encontrado': error});
        }

        if (author.libros.includes(req.params.bookId)) {
            return res.status(400).json({'El libro ya está asignado al autor': error });
        }

        author.libros.push(req.params.bookId);
        author = await author.save();
        res.json(author);

    } catch (error) {
        res.status(500).json({ 'Error al asignar libro al autor':error });
    }

    res.author = author;
    next();
}

//DELETE
const deleteAuthor = async (req, res, next) => {
    let authorToDelete;

    try {
        authorToDelete = await Author.findByIdAndDelete(req.params.id);
        res.json({ message: 'Autor eliminado con éxito' });
    } catch (error) {
        res.json({'Error al eliminar el autor: ' :error});
    }

    res.authorToDelete = authorToDelete;
    next();
}

module.exports = {
    getAuthors,
    getAuthorById,
    postAuthor,
    putAuthor,
    putBookOnAuthor,
    deleteAuthor
}