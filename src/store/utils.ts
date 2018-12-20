const appPrefix = "@rn-hello-talk";
export const withPrefix = (action: string) => {
  return `${appPrefix}/${action}`;
};
