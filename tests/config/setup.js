const util = require('util');
const { exec } = require('child_process');

const execPromise = util.promisify(exec);

const setup = async () => {
 try {
  await execPromise('NODE_ENV=testing npm run migrate:up && NODE_ENV=testing npm run seed:all');
 } catch (error) {
  console.error('Error executing setup commands:', error);
 }
};

module.exports = setup;
