const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');
const TwitterUrl = (process.env.TWITTER_URL || 'http://127.0.0.1:3000/auth/twitter') + '/callback';

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: TwitterUrl
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('Twitter info: ', profile.displayName, profile.id);

    User.findOrCreate(
      {name: profile.displayName},
      {name: profile.displayName, userid: profile.id},
      function (err, user, created) {
        if (err) {
          console.log(err);
          return done(err);
        }
        done(null, user);
      });
  }
));


module.exports = passport;
