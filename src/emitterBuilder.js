const emitter = require('./emitter.js');

module.exports = (find, send) => {

  return (collection, query, responseType, interval) => {

    const id = Date.now();
    const operation = () => find(collection, JSON.parse(query))
      .on('data', (data) => send(JSON.stringify({ emitterId: id, type: responseType, value: data })));

    return emitter(id, operation, interval);

  }

}