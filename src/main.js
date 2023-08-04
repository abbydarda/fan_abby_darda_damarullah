const app = require('./applications/app');
const logger = require('./applications/logger');
const { APP_PORT } = require('./applications/config');

app.listen(APP_PORT, () => {
 logger.info(`Server start on port ${APP_PORT}`);
});
