//user-controller.js
const AppDataSource = require("../../data-source");
const userRepository = AppDataSource.getRepository("User");

class UserController {
    static showUserList(req, res) {
        let userLogin = req.session.user;
        userRepository.find({}).then(users => {
            return res.render('admin/users/list', {users: users, userLogin: userLogin});
        });
    }

    static showFormCreate(req, res) {
        return res.render('admin/users/add');
    }

    static async store(req, res) {
        try {
            const { name, email, username, address, phone, password } = req.body;
            const user = userRepository.create({ name, email, username, address, phone, password, role: "user" });
            await userRepository.save(user);
            console.log('New user created:', user);
            return res.redirect('/admin/users');
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).send('Error creating user');
        }
    }

    static async deleteById(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            return res.render('admin/users/delete', { user: user });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send('Error deleting user');
        }
    }

    static async confirmDelete(req, res) {
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
            await userRepository.remove(user);
            console.log('User deleted:', user);
            return res.redirect('/admin/users');
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send('Error deleting user');
        }
    }

    static async showFormEdit(req, res){
        const userId = req.params.id;
        try {
            const user = await userRepository.findOneById(userId);
        console.log(user)

        return res.render('admin/users/edit',{user: user});
        } catch (error) {
            console.error('Error getting user:', error);
            return res.status(500).send('Error getting user');
        }
    }

    static async edit(req, res){
        const userId = req.params.id;
        // try {
            const user = await userRepository.findOneById(userId);
            const { name, email, username, address, phone, password } = req.body;
            user.name = name;
            user.email = email;
            user.username = username;
            user.address = address;
            user.phone = phone;
            user.password = password;
            await userRepository.save(user);
            console.log('User updated:', user);
            return res.redirect('/admin/users');
        // } catch (error) {
        //     console.error('Error updating user:', error);
        //     return res.status(500).send('Error updating user');
        // }
    }
}

module.exports = UserController;
