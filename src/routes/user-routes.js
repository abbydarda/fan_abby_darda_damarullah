const express = require('express');
const { findUserController } = require('../controllers/user-controllers');
const { isAuthorized } = require('../middlewares/auth-middlewares');

const userRouter = express.Router();

userRouter.get('/', [isAuthorized], findUserController);

module.exports = { userRouter };
