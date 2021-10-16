const emitter = require('./emitter');
const messageIsValid = require('./messageIsValid');

module.exports = (emitters, emitterBuilder) => {

  return (msg) => {

    const msgData = JSON.parse(msg['utf8Data']);

    if (!messageIsValid(msgData)) {
      return;
    }

    const operation = msgData['operation'];

    if (operation === 'start') {

      const collection = msgData['collection'];
      const query = msgData['query'] || "{}";
      const responseType = msgData['responseType'] || collection;
      const interval = msgData['interval'] || 1000;
      const em = emitterBuilder(collection, query, responseType, interval);
      em.run();
      emitters.push(em);

    } else if (operation === 'stop') {

      const emId = msgData['emitterId'];

      if (emId === '*') {

        emitters.forEach(em => {
          em.stop();
        });
        emitters = [];

      } else {

        const emitterId = parseInt(emId);
        const i = emitters.findIndex(em => em.id === emitterId);
  
        if (i < 0) {
          console.error('emitter id was not found');
          return;
        } else {
          emitters[i].stop();
          emitters.splice(i, 1);
        }

      }

    }

  }

}