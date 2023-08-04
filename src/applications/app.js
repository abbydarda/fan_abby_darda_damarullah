const express = require('express');
const swaggerUiExpress = require('swagger-ui-express');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { router } = require('../routes/index');
const { errorMiddleware } = require('../middlewares/error-middlewares');
const swaggerDocs = require('./swagger');
require('../databases/models/index');

const app = express();

app.use(express.json());

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
app.use('/api', router);

app.use(errorMiddleware);

module.exports = app;
