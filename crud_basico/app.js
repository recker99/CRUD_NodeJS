// 1.-invocar express
const express = require('express');
const app = express();

// 2.- establecer el sector de plantillas ejs
app.set('view engine', 'ejs');

// 3.- setear urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express(JSON));

// 4.- invocar a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 5.- el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 6.- invocar a bcryptjs
const bcriptjs = require('bcryptjs')

// 7.- var. de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}))

// 8.- Invocar al modulo de conexion de la BD
const connection = require('./database/db');

// 9.- estableciendo las rutas
app.get('/', (req,res)=>{
    res.render('login')
})

// 10.- registrarse
app.post('/create', (req, res)=>{
})

// 11.- autentificacion
/* app.post('/auth', (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    if(user && password){
        connection.query('SELECT * FROM users WHERE user = ?', [user] (error, results)=>{
            /* if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
                res.send('USUARIO Y/O CONTRASEÑA INCORRECTOS');
            }else{
                res.send('LOGIN CORRECTOS');
            }
        }); 
    });
};
 */
app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('Server Conectado en http://localhost:5000');
});