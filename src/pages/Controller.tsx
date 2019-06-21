import * as React from "react";
import QrReader from "react-qr-reader";

import Network from "../services/Network";

const Controller = () => {
  const [connectionId, setConnectionId] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [remoteId, setRemoteId] = React.useState("");
  let network: Network;

  React.useEffect(() => {
    this.network = new Network();
    this.network.callbackReady = (id: string) => {
      setConnectionId(id);
    };
    this.network.callbackConnectedToMaster = () => {
      setIsConnected(true);
    };
    this.network.callbackDisconnectedToMaster = () => {
      setIsConnected(false);
    };
  }, []);

  const connect = (id: string) => {
    this.network.connect(id);
    setRemoteId(id);
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
      {connectionId && !remoteId && (
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
      {isConnected ? <div>Conectado</div> : <div>Não conectado</div>}
    </div>
  );
};
export default Controller;
