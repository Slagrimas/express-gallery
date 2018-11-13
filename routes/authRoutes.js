const express = require('express');
const router = express.Router();
const Users = require('../db/models/users_table')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, {
    username: user.username,
    password: user.password,
    cat: 'nearly missed'
  });
 });
 
 //Upon successful authorized request, we will take some information from the session to retrieve the user record from db and put it into req.user. 
 passport.deserializeUser((user, done) => {
  console.log("\nDeserializing user:\n", user);
  Users
    .where({ username: user.username })
    .fetch()
    .then(user => {
      //When you access a protected route, it throws your object into req.user
      done(null, user)
    })
    .catch(err => {
      done(err);
    })
 });
//ok that is clear.
//make sure my password is matching with my database.
passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  console.log("---> LocalStrategy is working...");
  Users
    .where({ username })
    .fetch()
    .then(user => {
      console.log('---> LocalStrategy user:', user);

      bcrypt.compare(password, user.attributes.password)
        .then(result => {
          console.log("Compare - password:", password);
          console.log("Compare - localstrategy password:", user.password);
          console.log("LocalStrategy Result:", result);

          if (result) {
            console.log("---> LocalStrategy result:", result);
            console.log("---> User is authenticated.");
            done(null, user);
          }
          else {
            console.log("---> LocalStrategy result:", result);
            done(null, false);
          }
        })
        .catch(err => {
          console.log("1st error:");
          done(err);
        })
    })
}));

//login 
router.get('/login', (req, res) => {
  console.log('this is get - auth/login')
  res.render('login');
})

router.get('/register', (req, res) => {
  console.log('This is GET - /auth/register');
  let isRegistering = true;
  res.render('register', { isRegistering });
 })

//POST - /login, users login with username and password
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
  //If passes LocalStrategy and serializing, then this block executes
  // res.send('You are authenticated.');
  console.log("You are authenticated.")
  res.redirect('/');
})

//POST - /register, users can register their own accounts
router.post('/register', (req, res) => {
  console.log('This is POST - /auth/register');
  let isInvalidRegistration = false;
  const { username, password } = req.body;
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      return Users
        .forge({ username, password: hashedPassword })
        .save()
    })
    .then(result => {
      if (result && username !== "" && password !== "") {
        // res.send("New user has been registered.");
        console.log("\nNew user has been registered.");
        res.redirect('login');
      }
      else {
        isInvalidRegistration = true;
        // res.send("Error w/registering new user.")
        console.log("\nError w/registering new user.");
        res.render('register', { isInvalidRegistration });
      }
    })
    .catch(err => {
      console.log("Error at auth register", err);
      res.send(err);
    })
});


module.exports = router;

