"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
/**
 * This is a default DB storage driver currently we support
 */
class MongoDbDriver {
    constructor(db) {
        this.db = db;
    }
    /**
     * Find an entity
     * @param model
     * @param query
     * @param options
     */
    async findOne(model, query, options) {
        return await this.db
            .collection(model)
            .findOne(query, options);
    }
    /**
     * Save an entity
     * @param model
     * @param query
     * @param data
     * @param options
     */
    async save(model, query, data, options) {
        return await this.db
            .collection(model)
            .update(query, { $set: data }, Object.assign({ upsert: true }, options));
    }
    /**
     * Update an entity
     * @param model
     * @param query
     * @param data
     * @param options
     */
    async update(model, query, data, options) {
        return await this.db
            .collection(model)
            .update(query, { $set: data }, Object.assign({ upsert: true }, options));
    }
}
exports.MongoDbDriver = MongoDbDriver;
/**
 * Make a Data storage driver, the default one is Mongo, but I can make it
 * more advanced to return different type of drivers
 *
 * @param dbUri
 * @param dbName
 */
async function makeDbDriver(dbUri, dbName) {
    return new Promise((resolve, reject) => {
        // Just make a default mongoDB driver
        mongodb_1.MongoClient.connect(dbUri, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return reject(err);
            }
            var db = client.db(dbName);
            var dbDriver = new MongoDbDriver(db);
            resolve(dbDriver);
        });
    });
}
exports.makeDbDriver = makeDbDriver;
//# sourceMappingURL=dbdriver-service.js.map