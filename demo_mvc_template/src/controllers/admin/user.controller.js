//user-controller.js
const AppDataSource = require("../../data-source");
const userRepository = AppDataSource.getRepository("User");

class UserController {
    static async showUserList(req, res) {
        const userLogin = req.session.user;
        const value = await userRepository.find({});
        return res.render('admin/users/list', { users: value, userLogin: userLogin});
    }

    static showFormCreate(req, res) {
        return res.render('admin/users/add');
    }

    static async store(req, res) {
        try {
            const {name, email, username, address, phone, password,role} = req.body;
            const user = userRepository.create({name, email, username, address, phone, password, role});
            await userRepository.save(user);
            return res.redirect('/admin/users');
        } catch (error) {
            return res.status(500).send('Error creating user');
        }
    }

    static async deleteById(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            if (!user) {
                return res.render('errors/404')
            }
            return res.render('admin/users/delete', {user: user});
        } catch (error) {
            return res.status(500).send('Error deleting user');
        }
    }

    static async confirmDelete(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            if (!user) {
                return res.render('errors/404')
            }
            await userRepository.remove(user);
            return res.redirect('/admin/users');
        } catch (error) {
            return res.status(500).send('Error deleting user');
        }
    }

    static async showFormEdit(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            if (!user) {
                return res.render('errors/404')
            }
            return res.render('admin/users/edit', {user: user});
        } catch (error) {
            return res.status(500).send('Error getting user');
        }
    }

    static async edit(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            if (!user) {
                return res.render('errors/404')
            }
            const {name, role, username, address, phone} = req.body;
            user.name = name;
            user.username = username;
            user.role = role;
            user.address = address;
            user.phone = phone;
            await userRepository.save(user);
            return res.redirect('/admin/users');
        } catch (error) {
            return res.status(500).send('Error updating user');
        }
    }
}

module.exports = UserController;
