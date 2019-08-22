const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// ROUTES

// CUSTOM MIDDLEWARE
server.use('/', (error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    err: error.message
  });
});

module.exports = server;
