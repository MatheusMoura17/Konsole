import * as React from "react";
import Peer from "peerjs";
import QRCode from "qrcode.react";

const Console = () => {
  const [peerId, setPeerId] = React.useState("");

  React.useEffect(() => {
    const peer = new Peer();
    peer.on("open", id => {
      setPeerId(id);
    });
  }, []);

  return (
    <div>
      {!peerId && <div>Criando uma conexão...</div>}
      {peerId && <QRCode value={peerId} />}
    </div>
  );
};
export default Console;
