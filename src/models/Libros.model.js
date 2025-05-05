const mongoose = require('mongoose');

const LibrosSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    resumen:{
        type: String
    },
    genero: {
        type: String,
        required:true,
        enum: ['novela', 'poesia', 'ensayo'],
        default: 'novela'
    },
    publicacion: {
        type: Date,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Libros', LibrosSchema);