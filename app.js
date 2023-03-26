const express = require("express");
const { models } = require("mongoose");
const AppError = require('./utils/appError')
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require('./routes/userRouter')
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
