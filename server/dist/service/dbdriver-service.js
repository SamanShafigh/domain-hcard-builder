"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
async function dbConnect(dbUri, dbName) {
    return new Promise((resolve, reject) => {
        mongodb_1.MongoClient.connect(dbUri, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return reject(err);
            }
            var db = client.db(dbName);
            resolve(db);
        });
    });
}
exports.dbConnect = dbConnect;
//# sourceMappingURL=dbdriver-service.js.map