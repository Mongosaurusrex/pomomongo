import * as vscode from "vscode";
import { ExtensionUtils, GlobalExtensionState } from "./types";
import { calculateTimeRemaining } from "./utils/timer";
import { addZeroIfNumberIsBelowTen } from "./utils/text";

const initCommands = (state: GlobalExtensionState, utils: ExtensionUtils) => {
  const {
    ui: { setStatusBarItemText, resetStatusBarItemText },
    player: { playAlarm, playTickTock },
  } = utils;

  const resetExtension = () => {
    state.running = !state.running;
    clearInterval(state.interval);
    resetStatusBarItemText();
    state.iteration = 0;
    state.focusTime = true;
  };

  return {
    pressExtensionCommand: async () => {
      if (state.running) {
        resetExtension();
      } else {
        state.running = true;
        playTickTock();

        const { pomodoroTime, iterations, restTime } =
          vscode.workspace.getConfiguration("pomomongo");

        state.runUntill = new Date(new Date().getTime() + pomodoroTime * 60000);
        state.interval = setInterval(() => {
          const distance = calculateTimeRemaining(state.runUntill);

          let minutesLeft = addZeroIfNumberIsBelowTen(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          );
          let secondsLeft = addZeroIfNumberIsBelowTen(
            Math.floor((distance % (1000 * 60)) / 1000)
          );

          if (distance < 0) {
            if (state.focusTime) {
              playAlarm();
              state.runUntill = new Date(
                new Date().getTime() + restTime * 60000
              );
              state.focusTime = false;
            } else {
              if (state.iteration === iterations) {
                playAlarm();
                resetExtension();
                return;
              }

              playTickTock();
              state.runUntill = new Date(
                new Date().getTime() + pomodoroTime * 60000
              );
              state.focusTime = true;
              state.iteration++;
            }
          } else {
            setStatusBarItemText(
              `${minutesLeft}:${secondsLeft} - ${
                state.focusTime ? "Work" : "Rest"
              }`
            );
          }
        }, 1000);
      }
    },
  };
};
export default initCommands;
