const express = require('express');
const session = require('express-session');
const passport = require('passport');


require('./auth');

// check if user is logged in
function isLoggedIn(req, res, next) {
    // if user logged in, then proceed to next(), 
    // else return status 401 (unauthorized)
    req.user ? next() : res.sendStatus(401);
}

// initialize the app
const app = express(); 
app.use(session({ 
    secret: 'cats',
    resave: true,
    saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

// create a route 'auth/google'
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

//authenticate the user with provider google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile'] 
}));

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/Home',
    failureRedirect: '/auth/failure',
}));

app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong... ');
});

// app.get('/', (req, res) => {
//     res.send('Hola there, ');
// });

app.get('/Home', isLoggedIn, (req, res) => {
    // console.log('Current user: ', req.user.displayName);
    console.log('Directory: /Home');
    // console.log('Request: ', req.user.photos);
    res.status(200).send(req.user.displayName);
});

app.get('/Upload-Excel', isLoggedIn, (req, res) => {
    console.log('Directory: /Upload-Excel');
    res.status(200).send(req.user.email);
});

app.get('/Upload-Images', isLoggedIn, (req, res) => {
    console.log('Directory: /Upload-Images');
    res.status(200).send(req.user);
});

app.get('/logout', (req, res) => {
    console.log('Directory: /logout');
    req.logout();
    req.session.destroy();
    res.send('Hope to see you again!');
    console.log('logout session: ', req.session);
});

app.listen(3000, () => console.log('Listening on 3000')).keepAliveTimeout = 60000*2;