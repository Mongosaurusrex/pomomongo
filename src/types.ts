export type GlobalExtensionState = {
  running: boolean;
  interval?: NodeJS.Timer;
  runUntill: Date;
};

export type ExtensionUtils = {
  ui: {
    setStatusBarItemText: Function;
    resetStatusBarItemText: Function;
  };
};
