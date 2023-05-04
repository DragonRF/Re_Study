// router categories.js

const express = require('express');
const CategoryController = require("../src/controllers/admin/category.controller");
const router = express.Router();

/* GET users listing. */
router.get('/', CategoryController.showCategoryList);
router.get('/create', CategoryController.showCategoryFormCreate);
router.post('/add', CategoryController.CategoryStore);
router.get('/:id/delete', CategoryController.deleteById);
router.post('/:id/confirm-delete', CategoryController.confirmDelete);
router.get('/:id/edit', CategoryController.showFormEdit);
router.post('/:id/edit', CategoryController.edit);

module.exports = router;
