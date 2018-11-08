const bookshelf = require('./bookshelf');

const Users = bookshelf.Model.extend({
  tableName: 'users'
});
module.exports = Users;