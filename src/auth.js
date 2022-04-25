const passport = require('passport');
const  GoogleStrategy = require( 'passport-google-oauth2').Strategy;

//TO-DO: change the variable to .env file
const GOOGLE_CLIENT_ID = '140281256136-sn8u0oviifv4smqdo1meltjv4n58bjrf.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  
  //when successfully login
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});