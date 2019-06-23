import { NetworkUserData } from "./types";

export const KonsoleWrapper = {
  onUsersUpdated: (users: NetworkUserData[]) => {}
};

// @ts-ignore
window.KonsoleWrapper = KonsoleWrapper;
