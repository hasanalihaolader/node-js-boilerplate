const helper = {
    formatApiResponse: (statusCode, message, context = {}) => {
        return {
            'code': statusCode,
            'message': message,
            'data': context,
        }
    }
}

module.exports = helper;