export const formatErrorMessage = (message) => {
  if (Array.isArray(message)) {
    let error = "";
    message.forEach((errorObject) => {
      Object.keys(errorObject).forEach((key) => {
        error = error + errorObject[key]+ ', ';
      });
    });
    return error
  } else {
    return message;
  }
};
