console.log('here we go')
const express = require('express');
const router = express.Router();

const Gallery = require('../db/models/gallery_table');

//Get Home Route 
router.get('/', (req, res) => {
  Gallery
    .fetchAll()
    .then(results => {
      let galleryItems = results.toJSON();
      res.render('home', { galleryItems });
    })
    .catch(err => {
      console.log(err)
    });
});


//get to edit form 
router.get('/gallery/:id/edit', (req, res) => {
  console.log("\nThis is GET - /gallery/:id/edit");
  console.log("\nreq.params:", req.params);

  const { id } = req.params;
  console.log("\nid:", id)

  Gallery
    .where('id', id)
    .fetch()
    .then(results => {
      console.log("results:", results.toJSON());
      const photoToEdit = results.toJSON();
      res.render('edit', photoToEdit);
    })
    .catch(err => {
      console.log("Error retrieving photoToEdit", err);
    })

});


//get to new photo form
router.get('/gallery/new', (req, res) => {
  res.render('new');
})

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
    .catch(err => { console.log(err) });
});



//add photo
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
    .then(() => {
      res.redirect('/')
    })
    .catch(err => { console.log(err) })
});

//edit
router.put('/gallery/:id', (req, res) => {
  console.log("This is PUT /gallery/:id");

  const { id } = req.params;

  const updatedPhoto = {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }

  Gallery
    .where('id', id)
    .fetch()
    .then(results => {
      console.log("results:", results);
      results.save(updatedPhoto);
      res.redirect(`/gallery/${id}`);
    })
    .catch(err => {
      console.log('error', err)
    });
});

router.delete('/gallery/:id', (req, res) => {
  console.log('why is this thing broken?')
  const { id } = req.params;

  Gallery
  .where("id", id)
  .destroy()
  .then ( () => {
    res.redirect('/');
  })
  .catch(err => {
    console.log('error error')
    res.redirect('/');
  })
})

module.exports = router;