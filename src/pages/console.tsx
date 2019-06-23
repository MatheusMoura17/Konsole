import * as React from "react";
import QRCode from "qrcode.react";

import Network from "../services/Network";
import { NetworkUserData } from "../services/types";
import { KonsoleWrapper } from "../services/KonsoleWrapper";

/** Componente do console, aqui temos a base de conexão com peerjs */
const Console = () => {
  const [connectionId, setConnectionId] = React.useState();
  let network: Network;

  React.useEffect(() => {
    network = new Network();
    network.callbackReady = (id: string) => {
      setConnectionId(id);
    };

    KonsoleWrapper.rendererElem = document.getElementById(
      "konsoleGameRenderer"
    );

    network.callbackUsersUpdated = (userList: NetworkUserData[]) => {
      KonsoleWrapper.onUsersUpdate(userList);
    };
  }, []);

  const handleClickLoadGame = () => {
    loadGame("joystick-debugger");
  };

  const loadGame = async (name: string) => {
    const gameScript = document.createElement("script");
    gameScript.src = `/games/${name}/index.js`;
    gameScript.addEventListener("load", () => {
      KonsoleWrapper.onSetup();
    });
    document.body.appendChild(gameScript);
  };

  return (
    <div>
      {!connectionId && <div>Registrando peer...</div>}
      {connectionId && (
        <div>
          <div>
            <QRCode size={250} value={connectionId} />
            <div>{connectionId}</div>
          </div>
        </div>
      )}
      <div id="konsoleGameRenderer">
        <button onClick={handleClickLoadGame}>Carregar Jogo</button>
      </div>
    </div>
  );
};
export default Console;
