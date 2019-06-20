import * as React from "react";
import QrReader from "react-qr-reader";

const Controller = () => {
  const [remoteId, setRemoteId] = React.useState("");

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
      {!remoteId && (
        <QrReader
          delay={300}
          onScan={handleQrScan}
          onError={handleQrError}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {remoteId && <div>id remoto: {remoteId}</div>}
    </div>
  );
};
export default Controller;
