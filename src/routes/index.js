const express = require('express');
const { authRouter } = require('./auth-routes');
const { epresenceRouter } = require('./epresence-routes');
const { userRouter } = require('./user-routes');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/epresence', epresenceRouter);

module.exports = { router };
