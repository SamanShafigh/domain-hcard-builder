const MODEL_NAME = 'user'

/**
 * This UserRepository currently supports only the mongodb storage 
 * if we want to support different storage mechanizems we can simply 
 * define underlining implementations of each storage provider and 
 * deligate the CRUD job to thoses implementations
 */
class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async get(userId) {
    var result = await this.db
      .collection(MODEL_NAME)
      .findOne({ userId }, { _id: 0 });

    return result? result.data : null;
  }

  async save(userId, data) {
    return await this.db
      .collection(MODEL_NAME)
      .update({ userId }, {$set: { data }}, {
        upsert: true
      });     
  }

  async update(userId, key, value) {
    var reference = `data.${key}`;

    return await this.db
      .collection(MODEL_NAME)
      .update({ userId }, {$set: { [reference]: value }}, {
        upsert: true
      });     
  }  
}

module.exports = UserRepository;