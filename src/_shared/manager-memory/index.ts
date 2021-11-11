import fs from "fs";
import path from "path";
import { MusicDBType } from "../../domain/music/types";
import { ServerConnectedType } from "../types";

type MemoryDBType = {
  actualMusic: MusicDBType;
  servers: ServerConnectedType[];
};

export class ManagerMemory {
  private readonly musicsInfosPath: string = path.resolve(
    __dirname + "../../../../data/memory-db.json",
  );
  private readonly memoryDbFile: MemoryDBType;

  constructor() {
    const file: string = fs.readFileSync(this.musicsInfosPath, "utf8");
    this.memoryDbFile = JSON.parse(file) as MemoryDBType;
  }

  public onStart(): void {
    fs.writeFileSync(
      this.musicsInfosPath,
      JSON.stringify({
        actualMusic: null,
      }),
    );
  }

  public getActualMusic(): MusicDBType {
    return this.memoryDbFile.actualMusic;
  }

  public setActualMusic(music: MusicDBType): void {
    this.memoryDbFile.actualMusic = music;
    fs.writeFileSync(this.musicsInfosPath, JSON.stringify(this.memoryDbFile, null, 2));
  }

  public getServersConnected(): ServerConnectedType[] {
    return this.memoryDbFile.servers;
  }

  public setServersConnected(data: ServerConnectedType[]) {
    this.memoryDbFile.servers = data;
    fs.writeFileSync(this.musicsInfosPath, JSON.stringify(this.memoryDbFile, null, 2));
  }
}
