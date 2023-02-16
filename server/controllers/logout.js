const logout = (req,res)=>{
    res.clearCookie('logUser');
    res.text('ok')
}

module.exports = logout;
