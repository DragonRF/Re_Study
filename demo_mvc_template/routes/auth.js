const express = require('express');
const AuthController = require("../src/controllers/admin/auth.controller");
const router = express.Router();

router.get('/login', AuthController.showPageLogin);
router.post('/login', AuthController.login);
router.get('/register',AuthController.showPageRegister)
router.post('/register',AuthController.register)
router.get('/logout', AuthController.logout);
module.exports = router;
