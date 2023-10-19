import * as vscode from "vscode";
import { GlobalExtensionState } from "./types";
import initCommands from "./commands";
import initUiComponents from "./ui";
import initPlayer from "./player";

const state: GlobalExtensionState = {
  running: false,
  runUntill: new Date(),
};

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const extensionUtlis = {
    ui: { ...initUiComponents(subscriptions) },
    player: {
      ...initPlayer(),
    },
  };
  const { pressExtensionCommand } = initCommands(state, extensionUtlis);

  subscriptions.push(
    vscode.commands.registerCommand(
      "pomomongo.pressExtension",
      pressExtensionCommand
    )
  );
}
