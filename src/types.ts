export type GlobalExtensionState = {
  running: boolean;
  interval?: NodeJS.Timer;
  runUntill: Date;
};
