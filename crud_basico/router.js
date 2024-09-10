const express = require('express');
const conexion = require('./database/db');
const router = express.Router();

    // Mostrar todos los registros
    router.get('/registros', (req, res) => {
        conexion.query('SELECT * FROM users', (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('registros', { results: results });
            }
        });
    });

    // Ruta para crear registros
    router.get('/create', (req, res) => {
        res.render('create');
    });

    // Ruta para editar registros
    router.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        conexion.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('edit', { user: results[0] });
            }
        });
    });

    // Ruta para eliminar registros
    router.get('/delete/:id', (req, res) => {
        const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/registros');
        }
    });
});

    // Ruta para registrar un nuevo usuario 
    router.post('/register', (req, res) => {
        const { user, pass } = req.body;

    // Guardar el nuevo usuario con la contraseña 
    conexion.query('INSERT INTO users (user, password) VALUES (?, ?)', [user, pass], (error, results) => {
        if (error) {
            console.error('Error al registrar el usuario:', error);
            return res.status(500).send('Error en el servidor');
        }
        res.send('Usuario registrado exitosamente');
    });
});

    // Ruta para autenticar usuario 
    router.post('/auth', (req, res) => {
        const { user, pass } = req.body;

    // Consultar usuario de la base de datos
    conexion.query('SELECT * FROM users WHERE user = ? AND password = ?', [user, pass], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            
            res.send(`¡Bienvenido, ${user}!`);
        } else {
            
            res.send('Usuario o contraseña incorrectos');
        }
    });
});

const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;
