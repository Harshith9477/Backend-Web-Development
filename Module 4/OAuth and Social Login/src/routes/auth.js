const express = require('express');
const passport = require('passport');
const { signToken } = require('../utils/jwt');

const router = express.Router();

// 1. Trigger the OAuth flow (given)
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile'],
    session: false,
  })
);

// 2. Google redirects back here
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = signToken({ sub: req.user.id, role: req.user.role });
    res.json({ token });
  }
);

module.exports = router;