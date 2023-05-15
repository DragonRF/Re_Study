// router users.js

const express = require('express');
const UserController = require("../src/controllers/admin/user.controller");
const router = express.Router();

/* GET users listing. */
router.get('/', UserController.showUserList);
router.get('/create', UserController.showFormCreate);
router.post('/add', UserController.store);
router.get('/:id/delete', UserController.confirmDelete);
// router.post('/:id/confirm-delete', UserController.confirmDelete);
router.get('/:id/edit', UserController.showFormEdit);
router.post('/:id/edit', UserController.edit);

module.exports = router;
