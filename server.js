const express = require('express');
const authorize = require('./auth/authorize');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
const usersRouter = require('./routes/usersRouter');

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// ROUTES
server.use('/api', usersRouter);
server.use('/api/restricted', authorize /*, router */);

server.use('/', (err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

module.exports = server;
