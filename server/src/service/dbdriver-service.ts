import { MongoClient } from 'mongodb';
import HCardT from '../type';

/**
 * This is a default DB storage driver currently we support
 */
class MongoDbDriver implements HCardT.DbDriver {
  db: any
  constructor(db: any) {
    this.db = db;
  }

  /**
   * Find an entity
   * @param model 
   * @param query 
   * @param options 
   */
  async findOne(model: string, query: any, options?: any) {
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
  async save(model: string,query: any, data: any, options?: any) {
    await this.db
      .collection(model)
      .update(
        query, 
        {$set: data}, 
        Object.assign({upsert: true}, options)
      );
  }

  /**
   * Update an entity
   * @param model 
   * @param query 
   * @param data 
   * @param options 
   */
  async update(model: string, query: any, data: any, options?: any) {
    await this.db
      .collection(model)
      .update(
        query, 
        {$set: data}, 
        Object.assign({upsert: true}, options)
      );
  }  
}

/**
 * Make a Data storage driver, the default one is Mongo, but I can make it 
 * more advanced to return different type of drivers
 * 
 * @param dbUri 
 * @param dbName 
 */
export async function makeDbDriver(dbUri: string, dbName: string): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    // Just make a default mongoDB driver
    MongoClient.connect(dbUri, {useNewUrlParser: true}, (err: any, client: any) => {
      if (err) {
        return reject(err)
      }
      var db = client.db(dbName)
      var dbDriver = new MongoDbDriver(db);

      resolve(dbDriver)
    });
  })
}