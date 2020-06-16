export const generalError: ErrorHandlerObject = {
    message: "You have not entered a valid value.",
    statusCode: 400
};

export const serverError: ErrorHandlerObject = {
    message: "The server could not process your request.",
    statusCode: 500
};

export const requiredFields: ErrorHandlerObject = {
    message: "You must fill all the fields...",
    statusCode: 400
};
