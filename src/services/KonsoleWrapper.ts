import { NetworkUserData } from "./types";

export const KonsoleWrapper = {
  onSetup: () => {},
  onUsersUpdate: (users: NetworkUserData[]) => {},
  rendererElem: document.body
};

// @ts-ignore
window.KonsoleWrapper = KonsoleWrapper;
