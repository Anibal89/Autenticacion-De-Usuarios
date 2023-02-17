const logout = (req,res)=>{
    res.clearCookie('logUser');
    res.json('ok')
}

module.exports = logout;
