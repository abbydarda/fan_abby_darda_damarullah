const express = require('express');
const { approvedEpresenceController, insertEpresenceController } = require('../controllers/epresence-controllers');
const { isAuthorized, isSupervisor } = require('../middlewares/auth-middlewares');

const epresenceRouter = express.Router();

epresenceRouter.post('/', [isAuthorized], insertEpresenceController);
epresenceRouter.put('/approve/:idEpresence', [isAuthorized, isSupervisor], approvedEpresenceController);

module.exports = { epresenceRouter };
