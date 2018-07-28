import { MongoClient } from 'mongodb';

export async function dbConnect({ dbUri, dbName }: any) {
  return new Promise((resolve: any, reject: any) => {
    MongoClient.connect(dbUri, {useNewUrlParser: true}, (err: any, client: any) => {
      if (err) {
        return reject(err)
      }
      var db = client.db(dbName)
      resolve(db)
    });
  })
}