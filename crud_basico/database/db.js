const mysql = require('mysql');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conexion.connect((error) => {
    if (error) {
        console.error('Error de conexion es: ' + error);
        return;
    }
    console.log('¡Conectado a la BD MySQL!');
});

module.exports = conexion;
