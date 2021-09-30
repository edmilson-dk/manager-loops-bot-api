import SocketIO from "socket.io";
import http from "http";

export class Sockets {
  public readonly io: SocketIO.Server;

  constructor(server: http.Server) {
    this.io = new SocketIO.Server(server, {
      cors: {
        origin: "*",
        credentials: false,
      },
    });
  }

  public onConnection(socket: SocketIO.Socket) {
    console.log("Socket connected with id: ", socket.id);
  }

  public onDisconnect(socket: SocketIO.Socket) {
    console.log("Socket disconnected with id: ", socket.id);
  }

  get ioServer() {
    return this.io;
  }
}
