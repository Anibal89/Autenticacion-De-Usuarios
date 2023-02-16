const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');

const createNote = async(req,res)=>{
    const {title, note} = req.body;
    if (!req.cookies.logUser) return res.json({status: 0})
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id)=>{if
    (err) return null; else return id})
    if(user == null ) {return  res.json({status:0})}
    const time = new Date(Date.now())
    const date = time.getFullYear()+'-'+time.getMonth() + 1 + '-' + time.getDate() + ' ' +
    time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    db.query('INSERT INTO notes SET ?', {title,note, date, user_id: user.id}, (err, result) =>{
        if(err) throw err;
        return res.json({status: 1 , message: 'se ha agregado la nota'})
    }) 
}

module.exports = createNote;