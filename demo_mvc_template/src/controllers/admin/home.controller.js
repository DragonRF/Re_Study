const AppDataSource = require("../../data-source");
const userRepository = AppDataSource.getRepository("User")


class HomeController {
    static async showPageIndex(req, res) {
        const totalUser = await userRepository.count({})
        // truyen du lieu sang view
        // res.render('view', {data: value, data2: value2, data3: value3})
        // data thuoc tinh truyen sang view, value: gia tri gan cho data
        // data su dung nhu bien trong view
        return res.render('admin/index', { totalUser: totalUser });
    }

}

module.exports = HomeController;
