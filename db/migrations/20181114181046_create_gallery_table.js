
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gallery', table => {
      table.increments();
      table.string('author').notNullable();
      table.string('link').notNullable();
      table.string('description').notNullable();
    //   table.integer('author_id').references('id').inTable('users');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('gallery');
  };
  