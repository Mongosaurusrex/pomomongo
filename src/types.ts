export type GlobalExtensionState = {
  running: boolean;
  interval?: NodeJS.Timer;
  runUntill: Date;
  focusTime: boolean;
  iteration: number;
};

export type ExtensionUtils = {
  ui: {
    setStatusBarItemText: Function;
    resetStatusBarItemText: Function;
  };
  player: {
    playAlarm: () => void;
    playTickTock: () => void;
  };
};
