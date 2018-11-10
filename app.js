const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')


//Linking gallery routes and authorization routes
app.use(express.static('public'))
const galleryRoutes = require('./routes/gallery');
const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.urlencoded({extended: true}));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')


app.get('*', (req, res)=>{
  res.render('_404');
})
//session setup
app.use(session({
  secret: 'cars are better',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', galleryRoutes);
app.use('/auth', authRoutes);

 ///Listening//
app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});