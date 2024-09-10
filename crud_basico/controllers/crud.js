const conexion = require('../database/db');

exports.save = (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    const correo = req.body.correo;
    
     conexion.query('INSERT INTO users SET ?',{user:user, password:password, correo:correo}, (error, results)=>{
         if(error){
            console.log(error);
        }else{
            res.redirect('/registros');      
            }
        });
    };

exports.update = (req, res)=>{
    const id = req.body.id;
    const user = req.body.user;
    const password = req.body.pasword;
    const correo = req.body.correo;
    conexion.query('UPDATE users SET ? WHERE id= ?', [{user:user, password:password, correo:correo}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        } 
    });
};