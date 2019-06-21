import * as React from "react";
import QrReader from "react-qr-reader";
import Peer from "peerjs";

const Controller = () => {
  const [remoteId, setRemoteId] = React.useState("");
  const [peerId, setPeerId] = React.useState("");

  const handlePeerOpen = (id: string) => {
    setPeerId(id);
  };

  React.useEffect(() => {
    const peer = new Peer();
    peer.on("open", handlePeerOpen);
  }, []);

  const handleQrScan = data => {
    if (data) {
      setRemoteId(data);
    }
  };

  const handleQrError = err => {
    console.error(err);
  };

  return (
    <div>
      {!peerId && <div>Registrando peer...</div>}
      {peerId && !remoteId && (
        <QrReader
          delay={300}
          onScan={handleQrScan}
          onError={handleQrError}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {peerId && remoteId && <div>conectando a: {remoteId}</div>}
    </div>
  );
};
export default Controller;
