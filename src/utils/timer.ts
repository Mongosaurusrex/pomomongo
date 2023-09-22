export const calculateTimeRemaining = (runUtill: Date) =>
  runUtill.getTime() - new Date().getTime();
