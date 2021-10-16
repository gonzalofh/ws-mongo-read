const emitter = require('./emitter.js');

module.exports = (find, send) => {

  return (collection, query, sort, limit, responseType, interval) => {

    const id = Date.now();
    const operation = () => find(collection, JSON.parse(query), JSON.parse(sort), limit)
      .on('data', (data) => send(JSON.stringify({ emitterId: id, type: responseType, value: data })));

    return emitter(id, operation, interval);

  }

}