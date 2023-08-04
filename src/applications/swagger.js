const swaggerJsdoc = require('swagger-jsdoc');

const options = {
 failOnErrors: true,
 definition: {
  openapi: '3.0.0',
  info: {
   title: 'API TEST FAN',
   version: '1.0.0',
  },
 },
 apis: ['./**/docs/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
