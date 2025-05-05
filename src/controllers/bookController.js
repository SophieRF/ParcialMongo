const Book = require('../models/Libros.model.js');

//GET
const getBooks = async (req, res, next) => {
    let books;

    try {
        books = await Book.find();
        if (books.lenght === 0) {
            res.json("No hay libros disponibles")
        }
    } catch (error) {
        res.json({'Error al obtener los libros: ' :error});
    }

    res.books = books;
    next();
}

//GET BY ID
const getBookById = async (req, res, next) => {
    let book;
    const {id} = req.query;

    if (!id){
        return res.status(404).json({message: "El id no es válido" });
    }

    try {
        book= await Book.findById(id);
        if(!book){
            return res.status(404).json({message: "No se encontró un libro con ese id"});
        }
    } catch (error) {
        res.json({"Error al obtener el libro: " :error});
    }

    res.book = book;
    next();
}

//POST
const postBook = async(req, res, next) => {
    let book;

    try {
        const newBook = new Book(req.body);
        book = await newBook.save();
        res.status(201).json(book);

    } catch (error) {
        res.status(400).json({'Error al crear el libro' :error});
    }

    res.book = book;
    next();
}

//PUT
const putBook = async (req, res, next) => {
    let bookToUpdate;

    try {
        bookToUpdate =await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bookToUpdate){
            return res.status(404).json({'Libro no encontrado: ':error });
        }
        res.json(bookToUpdate);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el libro' });
    }

    res.bookToUpdate = bookToUpdate;
    next();
}

//DELETE
const deleteBook = async (req, res, next) => {
    let bookToDelete;

    try {
        bookToDelete = await Book.findById(req.params.id);
        if (!bookToDelete) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        if (bookToDelete.authorId) {
            return res.status(400).json({ error: 'No se puede eliminar el libro porque está asignado a un autor/a' });
        }

        bookToDelete = await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado con éxito' });
    } catch (error) {
        res.json({'Error al eliminar el libro: ' :error});
    }

    res.bookToDelete = bookToDelete;
    next();
}

module.exports = {
    getBooks,
    getBookById,
    putBook,
    postBook,
    deleteBook
}