class HomeController {
    static showPageIndex(req, res) {
        console.log(req.session.user);
        res.render('admin/index', { title: 'Express' });
    }
}

module.exports = HomeController;
