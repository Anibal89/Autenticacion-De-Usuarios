const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../routes/db-config');

const login = async (req,res)=>{
    const {user, pass} = req.body

    db.query('SELECT * from usersd WHERE user = ?', [user], async(stop,chkuser)=>{
        if(stop) throw stop
        if(!chkuser[0] || !await bcrypt.compare(pass,chkuser[0].pass)) return res.json(
            {status: 0 , message: 'Usuario No registrado'}
        )
        const token = jwt.sign({id:chkuser[0].id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES
        })

        const cookieOption = {
            expiresIn: new Date(Date.now() * process.env.COOKIE_EXPIRES * 24 * 60 *60 *1000),
            httpOnly:true,
            secure: true,
            sameSite: "none",
        }
        res.cookie('logUser',token,cookieOption)
        return res.json({status: 1, message: '¡El usuario ha iniciado sesión!'})
    })
}

module.exports = login;