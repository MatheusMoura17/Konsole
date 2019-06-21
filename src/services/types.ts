export interface NetworkUserData {
  name: string;
  id: string;
}
export interface NetworkCommand {
  action: "setup";
  userName: string;
}
