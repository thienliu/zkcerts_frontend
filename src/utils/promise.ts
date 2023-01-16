export const sleep = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};
