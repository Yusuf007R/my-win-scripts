import ffi from "ffi-napi";
import { exec as nodeExec } from "node:child_process";

const user32 = ffi.Library("user32", {
  PostMessageA: ["int32", ["long", "int32", "long", "int32"]],
});

const killWindow = (hwnd: number) => {
  user32.PostMessageA(hwnd, 0x0010, 0, 0);
};

const exec = (cmd: string) => {
  let reject: (value: string) => void;
  let resolve: (value: string) => void;
  nodeExec(cmd, (err, stdout) => {
    if (err) {
      reject(err.message);
      return;
    }
    resolve(stdout);
  });
  return new Promise<any>((res, rej) => {
    reject = rej;
    resolve = res;
  });
};

export default {
  killWindow,
  exec,
};
