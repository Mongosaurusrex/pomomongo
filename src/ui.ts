import * as vscode from "vscode";

const initUiComponents = (subscriptions: { dispose(): any }[]) => {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );
  statusBarItem.command = "pomomongo.pressExtension";
  statusBarItem.text = `$(notebook-execute) Start timer`;
  subscriptions.push(statusBarItem);
  statusBarItem.show();

  return {
    setStatusBarItemText: (text: string) => {
      statusBarItem.text = `$(debug-stop) ${text}`;
    },
    resetStatusBarItemText: () => {
      statusBarItem.text = `$(debug-start) Start timer`;
    },
  };
};

export default initUiComponents;
