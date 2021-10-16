module.exports = (httpServer) => {
    const WebSocketServer = require('websocket').server;
    return new WebSocketServer({
      httpServer: httpServer,
      autoAcceptConnections: false
    });
}