const AppDataSource = require("../../data-source");
const userRepository = AppDataSource.getRepository("User")

class AuthController {
    static showPageLogin(req, res) {
        let errMess = req.session.error;
        res.render('admin/auth/login', { errMess: errMess });
    }

    static login(req, res) {
        // destructuring es6
        const {email, password} = req.body;

        // call model
        userRepository.find({
                where: {
                    email: email, password: password
                }
            }
        ).then((result) => {
            if (result.length > 0) {
                let userInfo = result[0]
                if (userInfo.role != 'admin'){
                    return res.render('errors/403')
                }
                // luu thong tin user login vao session
                const {id, username, email, phone, address} = userInfo
                req.session.user = {id, username, email, phone, address}
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.redirect('/admin')
                })
            } else {
                req.session.error = "Account not exist!"
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.redirect("/admin/auth/login")
                })

            }
        })
    }

    static logout(req, res) {
        req.session.user = null;
        req.session.error = null;
        req.session.save(function (err) {
            if (err) next(err)
            res.redirect('/admin/auth/login')
        })
    }
}

module.exports = AuthController
