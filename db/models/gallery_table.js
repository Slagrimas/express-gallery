const bookshelf = require('./bookshelf');

const Gallery = bookshelf.Model.extend({
  tableName: 'gallery'
});
module.exports = Gallery;