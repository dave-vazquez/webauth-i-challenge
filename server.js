const express = require('express');
const authorize = require('./auth/authorize');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/auth/authRouter');

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// ROUTES
server.use('/api', usersRouter);
server.use('/api/auth', authRouter);

server.use('/', (err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

module.exports = server;
