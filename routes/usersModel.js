const db = require('../data/db-config');

module.exports = {
  add,
  findBy
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id') // second arg tells knex to return an array of all rows of the specified column
    .then(ids => {
      const [id] = ids; // destructures first element of the returned array
      return findById(id);
    });
}

function findBy(filter) {
  // takes any key-value pair
  return db('users')
    .where(filter)
    .first(); // returns the record matching the key-value pair
}
