import SocketIO from "socket.io";
import http from "http";
import { SOCKET_EVENTS } from "../events";
import { ManagerMemory } from "../manager-memory";

export class Sockets {
  public readonly io: SocketIO.Server;
  private readonly managerMemory = new ManagerMemory();

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
    this.managerMemory.setActualMusic(data);
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.onMusicIsPlaying, data);
  }

  private onGetActualMusicPlaying(data: any) {
    const actualMusic = this.managerMemory.getActualMusic();

    console.log("Get actual music playing: ", actualMusic);
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.onMusicIsPlaying, actualMusic);
  }

  private onConnection(socket: SocketIO.Socket) {
    console.log("Socket connected with id: ", socket.id);

    socket.join(SOCKET_EVENTS.roomMain);

    // events for main room
    socket.on(SOCKET_EVENTS.loopMusicIsPlaying, (data) => {
      console.log("Loop music is playing: ", data);
    });

    socket.on(SOCKET_EVENTS.musicIsPlaying, (data) => this.onMusicPlaying(data));
    socket.on(SOCKET_EVENTS.getActualMusicPlaying, (data) => this.onGetActualMusicPlaying(data));
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
