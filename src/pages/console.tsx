import * as React from "react";
import QRCode from "qrcode.react";

import Network from "../services/Network";
import { NetworkUserData } from "../services/types";

/** Componente do console, aqui temos a base de conexão com peerjs */
const Console = () => {
  const [connectionId, setConnectionId] = React.useState();
  const [users, setUsers] = React.useState([]);
  let network: Network;

  React.useEffect(() => {
    network = new Network();
    network.callbackReady = (id: string) => {
      setConnectionId(id);
    };

    network.callbackUsersUpdated = (users: NetworkUserData[]) => {
      setUsers([...users]);
    };
  }, []);

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
                    {user.id} - {user.name} -{" "}
                    {JSON.stringify(user.joystickData)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Console;
