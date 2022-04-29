
   const sendSuccess = function (res, data, message) {
        let result = {
            success: true,
            data: data,
            message: message,
        }
        return res.status(200).json(result);
    }
   const sendError = function (res, error, errorMessage, status=404) {
        let result = {
            success: false,
            message: error,
        };
        if(errorMessage.length)
            result.data = errorMessage;
        return res.status(status).json(result);
    }
    module.exports = {
        sendError, sendSuccess
    }
