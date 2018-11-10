const express = require('express');
const router = express.Router();
const Users = require('../db/models/users_table')
const passport = require('passport');
const LocalStrategy = require('passport-local');

//upon succesful login
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, {
    username: user.attributes.username,
    password: user.attributes.password
  });
 })

 passport.deserializeUser((user, done) => {
  console.log("Deserializing user:", user);
  Users
    .where({ username: user.username })
    .fetch()
    .then(user => {
      //When you access a protected route, it throws your object into req.user
      done(null, user.attributes)
    })
    .catch(err => {
      done(err);
    })
 });


//login 
router.get('/login', (req, res) => {
  console.log('this is get - auth/login')
  res.render('login');
})

//POST - /login, users login with username and password
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  //If passes LocalStrategy and serializing, then this block executes
  res.send('You are authenticated.');
  console.log("You are authenticated.")
  res.redirect('/');
 })







// custom middleware
function isAuthenticated(req, res, next) {
//  if it is authenticated then i will go to next middleware function in chain otherwise redirect to homepage. To use this, use router-level middleware
 if (req.isAuthenticated()) {
   console.log("AUTHENTICATED!")
   next();
 }
 else {
   console.log("Not Authenticated.")
   res.redirect('/login');
 }
}
module.exports = router;