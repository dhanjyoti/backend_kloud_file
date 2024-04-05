const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || '';
    const details = err.details || ''
   
    res.status(statusCode).send({
        statusCode,
        message,
        details
    })
}

module.exports = errorMiddleware;