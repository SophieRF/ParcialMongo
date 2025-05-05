const mongoose = require('mongoose');

const AutorsSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    fechaNacimiento: {
        type: Date,
        required:true
    },
    Nacionalidad: {
        type: String,
        required:true
    },
    libros: [{
        type: Object,
        ref: 'Libros'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Autors', AutorsSchema);