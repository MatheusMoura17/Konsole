import Peer, { DataConnection } from "peerjs";
import debug from "debug";

import { NetworkUserData, NetworkCommand } from "./types";

const log = debug("Network");

/** Gerencia a conexão dos controles e encaminha os inputs para o jgo */
export default class Network {
  private mainPeer: Peer;
  private users: NetworkUserData[] = [];

  public callbackReady: (id: string) => void;
  public callbackUsersUpdated: (users: NetworkUserData[]) => void;

  constructor(id?: string) {
    this.mainPeer = new Peer(id);
    log("Obtendo id...");
    this.mainPeer.on("open", this.onOpen);
    this.mainPeer.on("connection", this.onConnection);
  }

  private onOpen = (id: string) => {
    log(`Id obtido ${id}`);
    if (this.callbackReady) this.callbackReady(id);
  };

  private onConnection = (dataConnection: DataConnection) => {
    const { peer } = dataConnection;
    log(`Peer ${peer} conectado`);
    const user: NetworkUserData = {
      id: peer,
      name: "anonymous"
    };
    dataConnection.on("close", () => this.onClose(user));
    dataConnection.on("data", (data: NetworkCommand) => {
      log(`comando recebido: ${JSON.stringify(data)}`);
      if (data.action === "setup") {
        user.name = data.userName;
      }
    });
    this.users = this.users.concat(user);
    if (this.callbackUsersUpdated) this.callbackUsersUpdated(this.users);
  };

  private onClose = (user: NetworkUserData) => {
    log(`Peer: ${user.id} desconectado`);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    if (this.callbackUsersUpdated) this.callbackUsersUpdated(this.users);
  };
}
