console.log("you're not crazy");
const express = require('express');
const router = express.Router();
// knex = require('../db/knex')

const Gallery = require('../db/models/gallery_table');

//Get Home Route 
router.get('/', (req, res) => {
  console.log("This is GET /");
  Gallery
    .fetchAll()
    .then(results => {
      let galleryItems = results.toJSON(); 
      // console.log("galleryItems:", galleryItems);
      res.render('home', { galleryItems });
    })
    .catch(err => {
      console.log(err)
    });
 });
//gallery detail
 router.get('/gallery/:id', (req, res) => {
 console.log('ok, lets get this detail!')
 const { id } = req.params;
 Gallery
 .where('id', id)
 .fetch()
 .then(results => {
   const galleryPhoto = results.toJSON();
   console.log(galleryPhoto);
   res.render('galleryPhoto', galleryPhoto);
 })
 .catch(err => { console.log(err)});
 });

router.post('/gallery', (req, res) => {
  console.log('lets get a new photo shall we')
  const gallery = req.body;
  console.log('this is the gallery', gallery)
  const newPhoto = {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }
  Gallery
  .forge(newPhoto)
  .save()
  .then( () => {
    res.redirect('/')
  })
  .catch(err => {console.log(err)})
});


 module.exports = router;