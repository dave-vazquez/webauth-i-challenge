const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./usersModel');

const router = express.Router();

/********************************************************
 *                   POST /api/register                 *
 ********************************************************/
router.post('/register', async (req, res, next) => {
  const user = req.body;

  try {
    user.password = bcrypt.hashSync(user.password, 10);

    const newUser = await Users.add(user);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                   POST /api/login                    *
 ********************************************************/
router.post('/login', async (req, res, next) => {
  const { username, passwordGuess } = req.body;
  req.session.loggedin = false;
  try {
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(passwordGuess, user.password)) {
      req.session.loggedin = true;
      res.status(200).json({
        message: `ayyy ${username}`
      });
    } else {
      res.status(400).json({
        message: 'Invalid Credentials'
      });
    }
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                  CUSTOM MIDDLEWARE                   *
 ********************************************************/
// async function authorize(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//     try {
//       const user = await Users.findBy({ username });

//       user && bcrypt.compareSync(password, user.password)
//         ? next()
//         : res.status(403).json({
//             message: 'Forbidden - Invalid Credentials'
//           });
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     res.status(403).json({
//       message: 'Forbidden - Invalid Credentials'
//     });
//   }
// }

module.exports = router;
