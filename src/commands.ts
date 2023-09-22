import * as vscode from "vscode";
import { ExtensionUtils, GlobalExtensionState } from "./types";
import { calculateTimeRemaining } from "./utils/timer";

const initCommands = (state: GlobalExtensionState, utils: ExtensionUtils) => {
  const { ui } = utils;

  const resetExtension = () => {
    state.running = !state.running;
    clearInterval(state.interval);
    ui.resetStatusBarItemText();
  };

  return {
    pressExtensionCommand: () => {
      if (state.running) {
        resetExtension();
      } else {
        state.running = !state.running;

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

          ui.setStatusBarItemText(`${minutesLeft}:${secondsLeft}`);

          if (distance < 0) {
            resetExtension();
          }
        }, 1000);
      }
    },
  };
};
export default initCommands;
