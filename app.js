const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoute");
const reviewRouter = require("./routes/reviewRoute");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoute");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

//temp

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests for this IP,Please try again in an hour",
});
app.use("/api", limiter);
// TODO MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NOSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

//TODO API ROUTERS

/*app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));*/

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
//USER'S ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  //
  // const error = new Error(`Can't find ${req.originalUrl}`);
  // error.status = "failed";
  // error.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl}`), 404);
});
app.use(globalErrorHandler);

module.exports = app;

//13. Including a Map with Mapbox - Part 1
