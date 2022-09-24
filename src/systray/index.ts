import SysTray from "systray2";
import { hotkeyManager } from "..";

const itemExit = {
  title: "Exit",
  tooltip: "",
  checked: false,
  enabled: true,
  click: () => {
    systray.kill(false);
    process.exit(0);
  },
};
const ItemPause = {
  title: "Toggle Pause",
  tooltip: "",
  checked: false,
  enabled: true,
  click: () => {
    hotkeyManager.togglePause();
  },
};

const systray = new SysTray({
  menu: {
    icon: "./src/systray/icon.ico",
    title: "Yusuf's shortcuts",
    tooltip: "Yusuf's shortcuts",
    items: [ItemPause, SysTray.separator, itemExit],
  },

  debug: false,
  copyDir: false,
});

systray.onClick((action: any) => {
  if (action.item.click != null) {
    action.item.click();
  }
});

export function startSystray() {
  systray
    .ready()
    .then(() => {
      console.log("systray started!");
    })
    .catch((err) => {
      console.log("systray failed to start: " + err.message);
    });
}
