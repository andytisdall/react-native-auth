const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const JWT_KEY = require('../jwt-key');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.sendStatus(404);
  }

  const passwordsMatch = user.comparePasswords(password);
  if (!passwordsMatch) {
    return res.sendStatus(422);
  }

  const token = jwt.sign({ username }, JWT_KEY);
  res.send({ token, username });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.sendStatus(400);
  }

  const user = new User({ username, password });
  await user.save();

  const token = jwt.sign({ username }, JWT_KEY);
  res.send({ token, username });
});

router.post('/user', (req, res) => {
  const { token } = req.body;

  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (!err) {
      const { username } = payload;

      const user = await User.findOne({ username });

      if (user) {
        res.send(username);
      }
    }
  });
});

module.exports = router;
