import { exec } from "node:child_process";
import HotkeyManager from "./hotkey-manager/hotkey-manager";
import KomorebiClient from "./komorebi/komorebi-client";
import { startSystray } from "./systray";
import win32 from "./win32";

const workspaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const monitors = ["w", "q"];

const vimKeys = {
  Left: "h",
  Right: "l",
  Down: "j",
  Up: "k",
};

export const hotkeyManager = new HotkeyManager();

export const komorebiClient = new KomorebiClient(() => {
  komorebiClient.run.WindowHidingBehaviour("Minimize");

  komorebiClient.run.CrossMonitorMoveBehaviour("Insert");
  // komorebiClient.run.InvisibleBorders({
  //   top: 0,
  //   right: 14,
  //   bottom: 7,
  //   left: 7,
  // });
  komorebiClient.run.FocusFollowsMouse(["Windows", true]);
  // komorebiClient.run.ActiveWindowBorderColour(["Single", 245, 0, 200]);
  // komorebiClient.run.ActiveWindowBorder(true);

  startSystray();

  // Keybinds

  workspaces.forEach((num) => {
    hotkeyManager.addHotkey(`alt+${num}`, () =>
      komorebiClient.run.FocusWorkspaceNumber(num - 1)
    );
    hotkeyManager.addHotkey(`alt+shift+${num}`, () =>
      komorebiClient.run.SendContainerToWorkspaceNumber(num - 1)
    );
  });

  Object.keys(vimKeys).forEach((key: keyof typeof vimKeys) => {
    hotkeyManager.addHotkey(`alt+${vimKeys[key].toUpperCase()}`, () =>
      komorebiClient.run.FocusWindow(key)
    );
    hotkeyManager.addHotkey(`alt+shift+${vimKeys[key].toUpperCase()}`, () =>
      komorebiClient.run.MoveWindow(key)
    );
  });

  hotkeyManager.addHotkey("alt+shift+c", () => {
    win32.killWindow(komorebiClient.state.focusedWindow);
  });

  hotkeyManager.addHotkey("alt+ctrl+shift+p", () => {
    hotkeyManager.togglePause();
  });

  monitors.forEach((monitor, index) => {
    hotkeyManager.addHotkey(`alt+${monitor}`, () => {
      komorebiClient.run.FocusMonitorNumber(index);
    });

    hotkeyManager.addHotkey(`alt+shift+${monitor}`, () => {
      komorebiClient.run.SendContainerToMonitorNumber(index);
      komorebiClient.run.FocusMonitorNumber(index);
    });
  });

  hotkeyManager.addHotkey("alt+shift+-", () => {
    komorebiClient.changePadding(5);
  });

  hotkeyManager.addHotkey("alt+shift+=", () => {
    komorebiClient.changePadding(-5);
  });

  hotkeyManager.addHotkey("ctrl+shift+r", komorebiClient.run.Retile);
  hotkeyManager.addHotkey(
    "ctrl+shift+m",
    komorebiClient.run.ManageFocusedWindow
  );

  hotkeyManager.addHotkey("alt+f", komorebiClient.run.ToggleMaximize);
  hotkeyManager.addHotkey("alt+space", komorebiClient.run.ToggleFloat);

  hotkeyManager.addHotkey("alt+shift+home", () =>
    exec("komorebic state |code -")
  );
});