export type buttonName = "a" | "b" | "home";

export interface JoystickData {
  x: number;
  y: number;
  home: boolean;
  a: boolean;
  b: boolean;
}

export interface NetworkUserData {
  name: string;
  id: string;
  joystickData: JoystickData;
  callbackJoystickUpdated?: () => void;
}
export interface NetworkCommand {
  action: "setup" | "joystick";
  userName?: string;
  joystickData?: JoystickData;
}
