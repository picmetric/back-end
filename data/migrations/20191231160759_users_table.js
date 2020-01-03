exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.varchar('name', 255).notNullable();
    tbl
      .varchar('username', 255)
      .notNullable()
      .unique();
    tbl.varchar('password', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
