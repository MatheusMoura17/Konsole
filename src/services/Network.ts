import Peer, { DataConnection } from "peerjs";
import debug from "debug";

import { NetworkUserData, NetworkCommand, JoystickData } from "./types";

const log = debug("Network");

/** Gerencia a conexão dos controles e encaminha os inputs para o jgo */
export default class Network {
  private mainPeer: Peer;
  private users: NetworkUserData[] = [];
  private connection?: DataConnection;

  public callbackConnectedToMaster: () => void;
  public callbackDisconnectedToMaster: () => void;
  public callbackReady: (id: string) => void;
  public callbackUsersUpdated: (users: NetworkUserData[]) => void;

  constructor() {
    this.mainPeer = new Peer();
    log("Obtendo id...");
    this.mainPeer.on("open", this.onOpen);
    this.mainPeer.on("connection", this.onConnection);
  }

  public send = (command: NetworkCommand) => {
    log(`Enviando ${JSON.stringify(command)}`);
    this.connection.send(command);
  };

  /** Conecta a um peer remoto */
  public connect = (id: string) => {
    log(`Conectando a ${id}`);
    console.log(this.mainPeer);
    this.connection = this.mainPeer.connect(id);
    this.connection.on("open", () => {
      if (this.callbackConnectedToMaster) {
        this.callbackConnectedToMaster();
      }
    });
    this.connection.on("close", () => {
      if (this.callbackDisconnectedToMaster) {
        this.callbackDisconnectedToMaster();
      }
    });
  };

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
      switch (data.action) {
        case "setup": {
          user.name = data.userName;
          if (this.callbackUsersUpdated) this.callbackUsersUpdated(this.users);
          break;
        }
        case "joystick": {
          if (user.onJoystickUpdate) user.onJoystickUpdate(data.joystickData);
        }
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
