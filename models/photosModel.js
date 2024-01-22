const db = require("../adapter");

function find({ id }) {
  const photo = db.get("photos").find({ id: +id }).value();
  return photo;
}

function list({ categoryId, ids }) {
  let photos;
  if (categoryId && categoryId !== "all") {
    photos = db.get("photos").filter({ categoryId: +categoryId }).value();
  } else if (ids) {
    photos = db
      .get("photos")
      .filter((photo) => ids.includes(photo.id.toString()))
      .value();
  } else {
    photos = db.get("photos").value();
  }

  return photos;
}

module.exports = { find, list };
