const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        statusCode,
        message,
        data
    })
}

const validation = (statusCode, message, res) => {
    res.status(statusCode).json({
        statusCode,
        message,
    })
}


module.exports = {
    response,
    validation
}