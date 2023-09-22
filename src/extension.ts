import * as vscode from "vscode";
import { GlobalExtensionState } from "./types";
import initCommands from "./commands";
import initUiComponents from "./ui";

const state: GlobalExtensionState = {
  running: false,
  runUntill: new Date(),
};

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const { ...rest } = initUiComponents(subscriptions);
  const extensionUtlis = { ui: { ...rest } };
  const { pressExtensionCommand } = initCommands(state, extensionUtlis);

  subscriptions.push(
    vscode.commands.registerCommand(
      "pomomongo.pressExtension",
      pressExtensionCommand
    )
  );
}
