import { NetworkUserData } from "./types";

export const KonsoleWrapper = {
  onUsersUpdated: (users: NetworkUserData[]) => {},
  rendererElem: document.querySelector("#konsoleGameRenderer")
};

// @ts-ignore
window.KonsoleWrapper = KonsoleWrapper;
