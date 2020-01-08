exports.up = function(knex) {
  return knex.schema.createTable('images', tbl => {
    tbl.increments();

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.json('data');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images');
};
