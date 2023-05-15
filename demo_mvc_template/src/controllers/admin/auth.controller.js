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

    static showPageRegister(req,res){
        let errRegMess = req.session.error;
        res.render('admin/auth/register', { errRegMess: errRegMess });
    }

    static register(req, res) {
        const { name, email, password, username, address, phone } = req.body;

        const newUser = userRepository.create({
            name,
            email,
            password,
            username,
            address,
            phone,
        });

        userRepository.save(newUser)
            .then((result) => {
                const userInfo = result;
                const { id, username, email, phone, address, password } = userInfo;

                req.session.user = {
                    id,
                    name,
                    username,
                    email,
                    phone,
                    address,
                    password,
                };

                req.session.save((err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error: Could not save session");
                    } else {
                        req.session.success = "Account registration successful";
                        req.session.save((err) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send("Error: Could not save session");
                            } else {
                                res.redirect('/admin/auth/login');
                            }
                        });
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                req.session.error = "Error: Could not register account";
                req.session.save((err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error: Could not save session");
                    } else {
                        res.redirect('/auth/register');
                    }
                });
            });
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
