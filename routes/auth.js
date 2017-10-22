const express = require('express');
const router = express.Router();
const passportTwitter = require('../auth/twitter');
const passportGitHub = require('../auth/github');

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Please Sign In with:'});
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/twitter', passportTwitter.authenticate('twitter'));
router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/users');
  });

router.get('/github', passportGitHub.authenticate('github', {scope: ['user:email']}));
router.get('/github/callback',
  passportGitHub.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/users');
  });

module.exports = router;
