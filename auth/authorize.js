const Users = require('../routes/users/usersModel');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  req.session && req.session.loggedin === true
    ? next()
    : res.status(403).json({
        message: 'Forbidden: You do not have access to this page.'
      });
};
