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
  onJoystickUpdate?: (joystickData: JoystickData) => void;
}
export interface NetworkCommand {
  action: "setup" | "joystick";
  userName?: string;
  joystickData?: JoystickData;
}
