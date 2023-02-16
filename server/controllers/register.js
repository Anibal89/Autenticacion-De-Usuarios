const bcrypt = require('bcryptjs');
const db = require('../routes/db-config');

const register = async(req,res)=>{
    const {user, pass: rawPass} = req.body
    db.query('SELECT user from usersd WHERE user = ?', [user], async(stop,chkuser)=>{
        if(stop) throw stop
        if(chkuser[0]) return res.json({status:0 , message:'Ya existe un usuario con ese nombre'})
        const pass = await bcrypt.hash(rawPass,10)
        db.query('INSERT INTO usersd SET ?',{user,pass},(err,result) =>{
            if(err) throw err
            return res.json({status: 1, message:'El usuario ha sido registrado'})
        })
    })

}

module.exports = register