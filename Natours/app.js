const express = require('express');
const app = express();
const morgan = require('morgan');
const errorController = require('./Controllers/errorController');
const tourRoute = require('./Routes/tourRoutes');
const userRoute = require('./Routes/userRoutes');
const AppError = require('./utils/appError');
const ErrorHandler = require('./Controllers/errorController');
////////////////////////////
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/////////////////////////////////

////////////////////////

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't Find ${req.originalUrl} `);
  // err.statusCode = 404;
  // err.status = 'Fail';

  next(new AppError(`Can't Find ${req.originalUrl} `, 404));
});
app.use(ErrorHandler);
//////////////////////////////////
module.exports = app;
