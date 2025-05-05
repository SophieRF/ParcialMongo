const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesAutors = require('./src/routes/Autors.route.js');
const routesLibros = require('./src/routes/Libros.route.js');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}));

mongoose.connect(
    process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME}
);

const db = mongoose.connection;

app.use("/", routesAutors);
app.use("/authors", routesAutors);
app.use("/books", routesLibros);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})