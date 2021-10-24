import SocketIO from "socket.io";
import http from "http";
import { SOCKET_EVENTS } from "../events";

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

  private onMusicPlaying(data: any) {
    console.log("Music is playing: ", data);
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.onMusicIsPlaying, data);
  }

  private onConnection(socket: SocketIO.Socket) {
    console.log("Socket connected with id: ", socket.id);

    socket.join(SOCKET_EVENTS.roomMain);
    socket.on(SOCKET_EVENTS.musicIsPlaying, (data) => this.onMusicPlaying(data));
  }

  private onDisconnect(socket: SocketIO.Socket) {
    console.log("Socket disconnected with id: ", socket.id);
    socket.leave(SOCKET_EVENTS.roomMain);
  }

  public onStartEvents() {
    this.io.on("connection", (socket) => this.onConnection(socket));
    this.io.on("disconnect", (socket) => this.onDisconnect(socket));
  }
}
