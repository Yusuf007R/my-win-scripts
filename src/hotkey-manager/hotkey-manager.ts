import { GlobalKeyboardListener } from "node-global-key-listener";
import { KeysEnum } from "../types/keys-enum";

type Hotkey = {
  keys: number[];
  callback: () => void;
};

class HotkeyManager {
  private hook = new GlobalKeyboardListener();
  private registerdShortcuts: Hotkey[] = [];
  private _pause = false;
  private pressedKeys: { [key: string]: boolean } = {};

  constructor() {
    this.registerKeyEvent();
  }

  addHotkey(hotkey: string, callback: () => void) {
    this.registerdShortcuts.push({
      callback,
      keys: hotkey
        .split("+")
        .map((key: string) => {
          const tempKey = (
            typeof key === "string" ? key.toLowerCase() : key
          ) as keyof typeof KeysEnum;
          if (KeysEnum[tempKey] != undefined) {
            return KeysEnum[tempKey];
          }
          throw new Error(`Unknown key: ${tempKey}`);
        })
        .filter((key) => key != null) as number[],
    });
  }

  private registerKeyEvent() {
    this.hook.addListener((e) => {
      if (this._pause) return false;
      this.pressedKeys[e.scanCode] = e.state === "DOWN";
      if (e.state === "UP") return false;
      const numOfPressedKeys = Object.values(this.pressedKeys).reduce(
        (prev, next) => (next ? prev + 1 : prev),
        0
      );

      const hotkey = this.registerdShortcuts.find((data) => {
        if (numOfPressedKeys !== data.keys.length) return false;
        return data.keys.every((key) => this.pressedKeys[key]);
      });
      if (hotkey) {
        hotkey.callback();
        return true;
      }
      return false;
    });
  }

  togglePause() {
    this._pause = !this._pause;
  }

  get pause() {
    return this._pause;
  }
}

export default HotkeyManager;
