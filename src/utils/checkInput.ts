export const isBigNumber = (input: string): boolean => {
  const bigNumberRegex = /^\d+$/;
  return bigNumberRegex.test(input);
};
