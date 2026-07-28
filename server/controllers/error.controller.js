// error.controller.js is a generic error-handling controller.
// Note: unlike server/helpers/dbErrorHandler.js (which parses Mongoose/Mongo
// errors into readable messages), these two functions are currently stubs -
// handleError does nothing and getErrorMessage just logs and returns
// undefined. Most controllers actually rely on dbErrorHandler.js instead.

// Placeholder for a request-level error handler; not yet implemented.
function handleError(req, res) {
 // Your code to handle the error
}

// Placeholder for turning an error into a message; currently only logs it.
function getErrorMessage(errMsg) {
console.log(errMsg);
}
// Export the controller function
export default  {
    handleError: handleError,
    getErrorMessage:getErrorMessage
};
