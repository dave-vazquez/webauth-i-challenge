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

router.post('/login', async (req, res, next) => {
  const { username, passwordGuess } = req.body;

  try {
    const user = await Users.findBy({ username });

    user && bcrypt.compareSync(passwordGuess, user.password)
      ? res.status(200).json({
          message: `ayyy ${username}`
        })
      : res.status(400).json({
          message: 'Invalid Credentials'
        });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
