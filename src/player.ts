import * as vscode from "vscode";
const cp = require("child_process");
const path = require("path");
const player = require("play-sound")();

const _isWindows = process.platform === "win32";
const _playerWindowsPath = path.join(__dirname, "..", "audio", "sounder.exe");

const playerAdapter = () => ({
  afplay: ["-v", 1], // Mac Volume control
  mplayer: ["-af", `volume=${1}`], // Linux volume control
});

const play = (filePath: string) => {
  const { playSounds } = vscode.workspace.getConfiguration("pomomongo");

  if (!playSounds) {
    return;
  }

  if (_isWindows) {
    cp.execFile(_playerWindowsPath, ["/vol", 100, filePath]); // Windows volume control
  } else {
    player.play(filePath, playerAdapter(), (err: any) => {
      if (err) {
        console.error("Error playing sound:", filePath, " - Description:", err);
      }
    });
  }
};

const initPlayer = () => ({
  playAlarm(): void {
    play(path.join(__dirname, "audio", "alarm.wav"));
  },
  playTickTock(): void {
    play(path.join(__dirname, "audio", "tick_tock.wav"));
  },
});

export default initPlayer;
