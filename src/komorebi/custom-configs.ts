import { AppConfigs } from "../types/komorebi-types";

const customConfigs: AppConfigs[] = [
  {
    name: "vscode",
    identifier: { kind: "exe", id: "Code.exe" },
    options: ["force"],
  },
];

export default customConfigs;
