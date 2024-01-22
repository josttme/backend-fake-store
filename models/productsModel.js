const db = require("../adapter");

function find({ id }) {
  return db.get("products").find({ id: +id }).value();
}

function list({ categoryId }) {
  let category;
  if (categoryId) {
    category = db.get("products").filter({ categoryId: +categoryId }).value();
  } else {
    // Return all products if no categoryId is specified
    category = db.get("products").value();
  }
  return category;
}

module.exports = { list, find };
