const { authLoginController } = require('../controllers/auth-controllers');
const express = require('express');

const authRouter = express.Router();

authRouter.post('/login', [], authLoginController);

module.exports = { authRouter };
