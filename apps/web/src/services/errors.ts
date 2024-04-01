const formatErrorMessage = (message: string) =>
  message.charAt(0).toUpperCase() + message.slice(1);

export const getErrorMessage = async (error: any) => {
  let message = 'Something went wrong';
  if (error.message) {
    if (Array.isArray(error.message)) {
      message = formatErrorMessage(error.message[0] || message);
    }
    message = formatErrorMessage(error.message);
  }
  return { error: message };
};
