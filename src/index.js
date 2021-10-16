require('./database').connect().then(db => {

  const app = require('./app');
  const httpServer = require('http').createServer(app);
  const port = process.env.PORT || 8080;

  httpServer.listen(port, () => {
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  const wsServer = require('./wsServer')(httpServer);

  wsServer.on('request', request => {

    console.log((new Date()) + ' Connected to origin ' + request.origin);

    let emitters = [];

    const connection = request.accept('echo-protocol', request.origin);

    const send = (data) => connection.sendUTF(data);
    const emitterBuilder = require('./emitterBuilder.js')(db.find, send);
    const messageHandler = require('./messageHandler')(emitters, emitterBuilder);

    connection.on('message', messageHandler);

    connection.on('close', (reasonCode, description) => {
      emitters.forEach(em => em.stop());
      emitters = [];
    });

  });

});