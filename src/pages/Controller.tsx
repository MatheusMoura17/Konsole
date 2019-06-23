import * as React from "react";
import QrReader from "react-qr-reader";

import Network from "../services/Network";
import Joystick from "../components/Joystick";

const Controller = () => {
  const [connectionId, setConnectionId] = React.useState("");
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnectonLost, setIsConnectionLost] = React.useState(false);

  React.useEffect(() => {
    this.network = new Network();
    this.network.callbackReady = (id: string) => {
      // setConnectionId(id);
    };
    this.network.callbackConnectedToMaster = () => {
      setIsConnected(true);
      setIsConnectionLost(false);
      setIsConnecting(false);
    };
    this.network.callbackDisconnectedToMaster = () => {
      setIsConnected(false);
      setIsConnectionLost(true);
      setIsConnecting(false);
    };
  }, []);

  const connect = (id: string) => {
    setIsConnected(false);
    setIsConnectionLost(false);
    setIsConnecting(true);

    this.network.connect(id);
  };

  const handleQrScan = data => {
    if (data) {
      connect(data);
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter") {
      connect(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  const handleQrError = err => {
    console.error(err);
  };

  return (
    <div>
      {!connectionId && <div>Registrando peer...</div>}
      {connectionId && !isConnected && (
        <div>
          <QrReader
            delay={300}
            onScan={handleQrScan}
            onError={handleQrError}
            style={{ width: "100%", height: "100%" }}
          />
          <input onKeyPress={handleInputKeyPress} />
        </div>
      )}
      {isConnecting && <div>Conectando...</div>}
      {isConnected && <div>Conectado</div>}
      {isConnectonLost && <div>Falha ao conectar</div>}
      <Joystick />
    </div>
  );
};
export default Controller;
