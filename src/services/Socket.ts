export default class Socket {
  private peerConnection;
  private sendChannel;

  constructor() {
    this.peerConnection = new RTCPeerConnection();
    this.sendChannel = this.peerConnection.createDataChannel("sendChannel");
    this.connect();
    console.log(this.peerConnection);
  }

  private connect = async () => {
    const offer = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(offer);
  };
}
