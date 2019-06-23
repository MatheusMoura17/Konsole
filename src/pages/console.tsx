import * as React from "react";
import QRCode from "qrcode.react";

import Network from "../services/Network";
import { NetworkUserData } from "../services/types";
import { KonsoleWrapper } from "../services/KonsoleWrapper";

/** Componente do console, aqui temos a base de conexão com peerjs */
const Console = () => {
  const [connectionId, setConnectionId] = React.useState();
  const [users, setUsers] = React.useState([]);
  let network: Network;

  React.useEffect(() => {
    network = new Network();
    network.callbackReady = (id: string) => {
      setConnectionId(id);
      loadGame("three-js-jumper");
    };

    network.callbackUsersUpdated = (users: NetworkUserData[]) => {
      setUsers([...users]);
      KonsoleWrapper.onUsersUpdated(users);
    };
  }, []);

  const loadGame = async (name: string) => {
    const renderer = document.getElementById("konsoleGameRenderer");
    const response = await fetch(`/games/three-js-jumper`);
    const text = await response.text();
    renderer.innerHTML = text;
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
          <div>
            Usuários conectados:
            <ul>
              {users.map((user: NetworkUserData) => {
                return (
                  <li key={user.id}>
                    {user.id} - {user.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div id="konsoleGameRenderer" />
    </div>
  );
};
export default Console;
