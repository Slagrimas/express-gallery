console.log('duck duck = new duck()');
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

})
 module.exports = router;