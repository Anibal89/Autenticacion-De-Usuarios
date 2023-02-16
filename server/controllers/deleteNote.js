const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');

const deleteNote = (req,res)=>{
    if(!req.cookies.logUser) return res.json({status: 0 ,message: 'Porfavor inicia sesion'})
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id)=>{if
        (err) return null; else return id})
    if (user == null) return res.json({status: 0 , message: 'por favor inicie sesión de nuevo!'})
    const {id} = req.body
    db.query('DELETE FROM notes WHERE note_id = ?', [id], (err, result) =>{
        if(err) throw err
        return res.json({status: 1 , message: 'Nota Eliminada'})
    })

}

module.exports = deleteNote;