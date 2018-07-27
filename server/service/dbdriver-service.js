var MongoClient = require('mongodb').MongoClient;

async function connect({ dbUri, dbName }) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUri, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        return reject(err)
      }
      var db = client.db(dbName)
      resolve(db)
    });
  })
}

module.exports = {
  connect
}