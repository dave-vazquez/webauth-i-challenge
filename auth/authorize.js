const Users = require('../routes/usersModel');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    try {
      const user = await Users.findBy({ username });

      user && bcrypt.compareSync(password, user.password)
        ? next()
        : res.status(403).json({
            message: 'Forbidden - Invalid Credentials'
          });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json({
      message: 'Forbidden - Invalid Credentials'
    });
  }
};
