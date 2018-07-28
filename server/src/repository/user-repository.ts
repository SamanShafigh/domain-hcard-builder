import HCardT from '../type';

const MODEL_NAME = 'user'

/**
 * This UserRepository currently supports only the mongodb storage 
 * if we want to support different storage mechanizems we can simply 
 * define underlining implementations of each storage provider and 
 * deligate the CRUD job to thoses implementations
 */
class UserRepository implements HCardT.UserRepository {
  db: any
  constructor(db: any) {
    this.db = db;
  }

  /**
   * Find and return a user from db or return null
   * @param userId 
   */
  async get(userId: string) {
    var result = await this.db
      .collection(MODEL_NAME)
      .findOne({ userId }, { _id: 0 });

    return result? result.data : null;
  }

  /**
   * Save a user data to db
   * @param userId 
   * @param data 
   */
  async save(userId: string, data: any) {
    await this.db
      .collection(MODEL_NAME)
      .update({ userId }, {$set: { data }}, {
        upsert: true
      });     
  }

  /**
   * Update a user filed in db
   * @param userId 
   * @param key 
   * @param value 
   */  
  async update(userId: string, key: string, value: any) {
    var reference = `data.${key}`;

    await this.db
      .collection(MODEL_NAME)
      .update({ userId }, {$set: { [reference]: value }}, {
        upsert: true
      });     
  }  
}

export default UserRepository;