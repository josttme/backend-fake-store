const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

async function someFunction() {
  const json = require("./db.json");
  const isLocal = !process.env.NOW_REGION;
  const type = isLocal ? new FileSync("./db.json") : new Memory();

  const adapter = new type.constructor("./db.json");
  const db = low(adapter);

  db.defaults(json).write();

  module.exports = db;
}

someFunction();
