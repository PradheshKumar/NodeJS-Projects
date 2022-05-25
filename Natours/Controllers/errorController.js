const AppError = require('../utils/appError');

function senddErrDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}
function handleCastErrorDB(err) {
  const msg = `Invalid ${err.path}:${err.value}`;
  return new AppError(msg, 500);
}
function handleDuplicateFieldsDB(err) {
  const value = err.keyValue.name;
  return new AppError(
    `Duplicate Value:${value} .Please use another value`,
    400
  );
}
function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid Input Data . ${errors.join('. ')}`;
  return new AppError(msg, 400);
}
function sendErrProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.log('ERROR', err);
    res.status(500).json({
      status: err,
      message: 'Something Went Wrong',
    });
  }
}
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') senddErrDev(err, res);
  else {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === 'Validation failed')
      error = handleValidationErrorDB(error);
    sendErrProd(error, res);
  }
  next();
};
