const isAuthenticated = (req, res, next) => {
    if (req.session.user){
        return next()
    } else {
        return res.redirect('/admin/auth/login')
    }
}

module.exports = isAuthenticated
