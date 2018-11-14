const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session')
const redis = require('connect-redis')(session);


//Linking gallery routes and authorization routes
app.use(express.static('public'))


const galleryRoutes = require('./routes/gallery');
const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.urlencoded({extended: true}));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//Setup for method-override
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', galleryRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res)=>{
  res.render('_404');
})
//session setup
app.use(session({
  store:new redis({url: 'redis://redis-server:6379', logErrors:
true}),
  secret: 'cars are better',
  resave: false,
  saveUninitialized: true,
}));



 ///Listening//
app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});