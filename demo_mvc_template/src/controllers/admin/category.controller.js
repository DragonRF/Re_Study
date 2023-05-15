//categories-controller.js
const AppDataSource = require("../../data-source");
const categoryRepository = AppDataSource.getRepository("Category");

class CategoryController {
    static async showCategoryList(req, res) {
        const data = await categoryRepository.find({});
        return res.render('admin/categories/list', { categories: data});
    }

    static async showCategoryFormCreate(req, res) {
        const data = await categoryRepository.find({});
        return res.render('admin/categories/add',{categories: data});
    }

    static async store(req, res) {
        try {
            const { name } = req.body;
            const existingCategory = await categoryRepository.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    message: 'Category already exists'
                });
            }

            const category = categoryRepository.create({
                name
            });
            let result = await categoryRepository.save(category);
            return res.status(200).json({
                message: 'Create category successful.',
                cate: result
            });
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({
                message: 'Failed on creating new category'
            });
        }
    }

    static async deleteById(req, res) {
        const categoryId = req.params.id;
        try {
            const category = await categoryRepository.findOneById(categoryId);
            if (!category) {
                return res.render('errors/404')
            }
            return res.render('admin/categories/delete', {category: category});
        } catch (error) {
            return res.status(500).send('Error deleting categories');
        }
    }

    static async confirmDelete(req, res) {
        const categoryId = req.params.id;
        try {
            const category = await categoryRepository.findOneById(categoryId);
            if (!category) {
                return res.render('errors/404')
            }
            await categoryRepository.remove(category);
            return res.redirect('/admin/categories');
        } catch (error) {
            return res.status(500).send('Error deleting user');
        }
    }

    static async showFormEdit(req, res) {
        const categoryId = req.params.id;
        try {
            const category = await categoryRepository.findOneById(categoryId);
            if (!category) {
                return res.render('errors/404')
            }
            return res.render('admin/categories/edit', {category: category});
        } catch (error) {
            return res.status(500).send('Error getting categories');
        }
    }

    static async edit(req, res) {
        const categoryId = req.params.id;
        try {
            const category = await categoryRepository.findOneById(categoryId);
            if (!category) {
                return res.render('errors/404')
            }
            const {name} = req.body;
            category.name = name;
            await categoryRepository.save(category);
            return res.redirect('/admin/categories');
        } catch (error) {
            return res.status(500).send('Error updating categories');
        }
    }
}

module.exports = CategoryController;
