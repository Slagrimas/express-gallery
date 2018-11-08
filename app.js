const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


//Linking gallery routes and authorization routes
app.use(express.static('public'))
const galleryRoutes = require('./routes/gallery');
const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.urlencoded({extended: true}));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

app.use('/', galleryRoutes);
app.use('/auth', authRoutes);


 
app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});