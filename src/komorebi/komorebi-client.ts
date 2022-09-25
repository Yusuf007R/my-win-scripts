import {
  AppConfigs,
  KomorebiCommandsType,
  Option,
} from "../types/komorebi-types";
import { Socket } from "node:net";
import KomorebiState from "./komorebi-state";
import axios from "axios";
import YAML from "yaml";

type SocketQueueMsg = { msg: string };

class KomorebiClient {
  readonly run: KomorebiCommandsType = this.generateCommandProxy();
  state!: KomorebiState;
  private tcpClient = new Socket();
  private messageQueue: SocketQueueMsg[] = [];
  private isPacketBeingSend = false;

  constructor(onConnect?: () => void) {
    this.tcpClient.connect(69, "127.0.0.1", () => {
      this.appConfigurations();
      onConnect && onConnect();
      this.state = new KomorebiState((pipe) => {
        this.run.AddSubscriber(pipe);
      });
    });
    this.tcpClient.on("error", (err) => console.log(err));
    this.tcpClient.on("data", (data) => console.log(data));
  }

  private addSocketMessage(type: string, content: any[]) {
    const msg = JSON.stringify({ type, content: content });
    this.messageQueue.push({ msg });
    this.sendSocketMessage();
  }

  private sendSocketMessage() {
    if (this.isPacketBeingSend) return;
    const packet = this.messageQueue.shift();
    if (!packet) return;

    this.isPacketBeingSend = true;
    // ! REMOVE THIS WHEN TCP PROBLEM IS RESOVED
    this.tcpClient.destroy();
    this.tcpClient.connect(69, "127.0.0.1", () => {
      this.tcpClient.write(packet.msg, (err) => {
        console.log(packet.msg, err ?? true);
        this.isPacketBeingSend = false;
        this.sendSocketMessage();
      });
    });
  }

  private generateCommandProxy(): any {
    const handler = {
      get: (_: unknown, eventType: any) => (args: any) =>
        this.addSocketMessage(eventType, args),
    };
    return new Proxy({}, handler);
  }

  changePadding(num: number) {
    const [_, currentMonitorIndex] = this.state.currentMonitor;
    const [currentWorkspace, currentWorkspaceIndex] =
      this.state.currentWorkspace;
    this.run.WorkspacePadding([
      currentMonitorIndex,
      currentWorkspaceIndex,
      (currentWorkspace.workspace_padding ?? 0) + num,
    ]);
    this.run.ContainerPadding([
      currentMonitorIndex,
      currentWorkspaceIndex,
      (currentWorkspace.container_padding ?? 0) + num,
    ]);
  }

  private async appConfigurations() {
    const file = await axios.get(
      "https://raw.githubusercontent.com/LGUG2Z/komorebi-application-specific-configuration/master/applications.yaml"
    );
    const configs = YAML.parse(file.data) as AppConfigs[];

    configs.forEach((config) => {
      config.options?.forEach((option) => {
        const tempConfigs = {
          border_overflow: this.run.IdentifyBorderOverflowApplication,
          force: this.run.ManageRule,
          tray_and_multi_window: this.run.IdentifyTrayApplication,
          layered: this.run.IdentifyLayeredApplication,
          object_name_change: this.run.IdentifyObjectNameChangeApplication,
        };

        tempConfigs[option]([config.identifier.kind, config.identifier.id]);
      });
      config.float_identifiers?.forEach((float) => {
        this.run.FloatRule([float.kind, float.id]);
      });
    });
  }
}

export default KomorebiClient;
