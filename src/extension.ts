import * as vscode from "vscode";
import { GlobalExtensionState } from "./types";

let myStatusBarItem: vscode.StatusBarItem;
const state: GlobalExtensionState = {
  running: false,
  runUntill: new Date(),
};

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const myCommandId = "sample.showSelectionCount";
  subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      if (state.running) {
        state.running = !state.running;
        clearInterval(state.interval);
        myStatusBarItem.text = `$(watch) Start timer`;
      } else {
        state.running = !state.running;

        const { runForMinutes } =
          vscode.workspace.getConfiguration("pomomongo");

        state.runUntill = new Date(
          new Date().getTime() + runForMinutes * 60000
        );
        state.interval = setInterval(() => {
          var now = new Date().getTime();
          const distance = state.runUntill.getTime() - now;

          var minutesLeft = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          var secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

          myStatusBarItem.text = `$(watch) ${minutesLeft}:${secondsLeft}`;

          if (distance < 0) {
            state.running = false;
            clearInterval(state.interval);
            myStatusBarItem.text = `$(watch) Start timer`;
          }
        }, 1000);
      }
    })
  );

  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );
  myStatusBarItem.command = myCommandId;
  myStatusBarItem.text = `$(watch) Start timer`;
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();
}
