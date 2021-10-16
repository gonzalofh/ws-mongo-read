const mongoConfig = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  dbName: process.env.MONGO_DB_NAME || 'test'
}

module.exports = {

  async connect() {
    const uri = 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.dbName;
    const { MongoClient } = new require('mongodb');
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(mongoConfig.dbName);

    return {
      find(collectionName, query, limit) {
        return db.collection(collectionName).find(query).limit(limit).stream();
      }
    }
  }

};