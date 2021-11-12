import SocketIO from "socket.io";
import http from "http";
import { SOCKET_EVENTS } from "../events";
import { ManagerMemory } from "../manager-memory";
import { ServerConnectedType } from "../types";

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
    this.managerMemory.setActualMusic(data);
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.onMusicIsPlaying, data);
  }

  private onGetActualMusicPlaying() {
    const actualMusic = this.managerMemory.getActualMusic();
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.onMusicIsPlaying, actualMusic);
  }

  private onGetServersConnected() {
    const servers = this.managerMemory.getServersConnected();
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.serversConnected, servers);
  }

  private onChangeServersConnected(data: ServerConnectedType[]) {
    this.managerMemory.setServersConnected(data);
    this.io.in(SOCKET_EVENTS.roomMain).emit(SOCKET_EVENTS.serversConnected, data);
  }

  private onConnection(socket: SocketIO.Socket) {
    console.log("Socket connected with id: ", socket.id);

    socket.join(SOCKET_EVENTS.roomMain);

    socket.on(SOCKET_EVENTS.loopMusicIsPlaying, () => console.log("Loop music is playing"));
    socket.on(SOCKET_EVENTS.musicIsPlaying, (data) => this.onMusicPlaying(data));
    socket.on(SOCKET_EVENTS.onGetServersConnected, () => this.onGetServersConnected());
    socket.on(SOCKET_EVENTS.onGetActualMusicPlaying, () => this.onGetActualMusicPlaying());
    socket.on(SOCKET_EVENTS.onChangeServersConnected, (data: ServerConnectedType[]) => {
      this.onChangeServersConnected(data);
    });
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
