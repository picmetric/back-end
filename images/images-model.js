const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  update
};

function find() {
  return db('images');
}

function findById(id) {
  return db('images')
    .where({ user_id: id })
    .first();
}

function add(image) {
  return db('images')
    .insert(image)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('images')
    .where({ id })
    .update(changes)
    .then(ids => {
      return findById(id);
    });
}
