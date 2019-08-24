const Users = require('../users/usersModel');
const express = require('express');

const router = express.Router();

/********************************************************
 *                   GET /api/auth/users                *
 ********************************************************/
router.get('/users', authorize, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
