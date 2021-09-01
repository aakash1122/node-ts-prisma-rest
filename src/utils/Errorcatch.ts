export const ErrorCatch = (fn: Function) => {
  try {
    fn();
  } catch (error) {
    throw error;
  }
};
