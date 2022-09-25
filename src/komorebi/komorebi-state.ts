import { createServer } from "node:net";
import { State } from "../types/komorebi-types";

const PIPE_NAME = "yusuf-komorebi-pipe";
class KomorebiState {
  private _state?: State;

  constructor(cb: (pipe: string) => void) {
    createServer((stream) => {
      stream.on("data", (data) => {
        if (data.byteLength < 1000) return;
        try {
          this.setState(JSON.parse(data.toString().split("\n")[0])["state"]);
        } catch (error) {
          console.log(error, data.toString());
        }
      });
    }).listen("\\\\.\\pipe\\" + PIPE_NAME, () => {
      console.log("NamedPipe: listening");
      cb(PIPE_NAME);
    });
  }

  setState = (state: State) => (this._state = state);

  get currentMonitor() {
    const index = this.state.monitors.focused;
    return [this.state.monitors.elements[index], index] as const;
  }

  get currentWorkspace() {
    const [monitor] = this.currentMonitor;
    const index = monitor.workspaces.focused;
    return [monitor.workspaces.elements[index], index] as const;
  }

  get nextMonitor() {
    const [_, index] = this.currentMonitor;
    const nextIndex =
      index + 1 > this.state.monitors.elements.length - 1 ? 0 : index + 1;
    return [this.state.monitors.elements[nextIndex], nextIndex] as const;
  }

  get focusedWindow() {
    const [workspace] = this.currentWorkspace;
    const container =
      workspace.containers.elements[workspace.containers.focused];
    return container.windows.elements[container.windows.focused].hwnd;
  }
  get state() {
    if (!this._state) throw new Error("no state");
    return this._state;
  }
}

export default KomorebiState;
