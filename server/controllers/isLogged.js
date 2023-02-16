const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');

const isLogged = (req, res) =>{
    if (!req.cookies.logUser) {return res.json({status: 0})}
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id)=>{if
    (err) return null; else return id})
    if(user == null ) {return  res.json({status:0})}

    db.query('SELECT user FROM usersd WHERE id = ?',[user.id], (err,result)=> {
        if (err) throw err ;
        return res.json({status:1, user: result[0].user})
    })
}

module.exports = isLogged;
