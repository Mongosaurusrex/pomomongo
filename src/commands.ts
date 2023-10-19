import * as vscode from "vscode";
import { ExtensionUtils, GlobalExtensionState } from "./types";
import { calculateTimeRemaining } from "./utils/timer";

const initCommands = (state: GlobalExtensionState, utils: ExtensionUtils) => {
  const {
    ui: { setStatusBarItemText, resetStatusBarItemText },
    player: { playAlarm, playTickTock },
  } = utils;

  const resetExtension = () => {
    state.running = !state.running;
    clearInterval(state.interval);
    resetStatusBarItemText();
  };

  return {
    pressExtensionCommand: async () => {
      if (state.running) {
        resetExtension();
      } else {
        state.running = !state.running;
        playTickTock();

        const { runForMinutes } =
          vscode.workspace.getConfiguration("pomomongo");

        state.runUntill = new Date(
          new Date().getTime() + runForMinutes * 60000
        );
        state.interval = setInterval(() => {
          const distance = calculateTimeRemaining(state.runUntill);

          var minutesLeft = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          var secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

          setStatusBarItemText(`${minutesLeft}:${secondsLeft}`);

          if (distance < 0) {
            playAlarm();
            resetExtension();
          }
        }, 1000);
      }
    },
  };
};
export default initCommands;
