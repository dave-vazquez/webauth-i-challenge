const express = require('express');
const authorize = require('./auth/authorize');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();
const usersRouter = require('./routes/users/usersRouter');
const authRouter = require('./routes/auth/authRouter');

// MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// SESSION OPTIONS
const sessionOptions = {
  name: 'authenticate',
  secret: `Ring the bells that still can ring. 
    Forget your perfect offering. 
    There's a crack in everything. 
    That's how the light gets in.`,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // set to true when the client has an HTTPS connection, in development, false, in production, true
    saveUninitialized: false,

    store: new knexSessionStore({
      knex: require('./data/db-config'),
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
  }
};

server.use(session(sessionOptions));

// ROUTES
server.use('/api', usersRouter);
server.use('/api/auth', authorize, authRouter);

// CUSTOM ERROR-HANDLING MIDDLEWARE
server.use('/', (err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

module.exports = server;
