const express = require("express");
const app = express();
const ErrorController = require("../controller/errorController");
const AppError = require("./../util/appError");
const { apiLimiter, apiLimiterUpload } = require("../util/appLimiter");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const uploadFile = require("./../route/uploadFile");
const seller = require("./../route/seller");
const auth = require("./../route/auth");
const store = require("../route/store");
const product = require("./../route/product");

app.set("trust proxy", 1);
app.use("/uploads", express.static("uploads"));
app.use("/download", express.static("public"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:5173",
      "*",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json({ limit: "1000000kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(hpp());

app.use(morgan("tiny"));
app.use(express.json());

app.use("/upload", apiLimiterUpload, uploadFile);
app.use("/api/v1/sellers", seller);
app.use("/api/v1/auth", auth);
app.use("/api/v1/stores", store);
app.use("/api/v1/products", product);

app.all("*", function (req, res, next) {
  next(new AppError(`This url has not found: ${req.originalUrl}`, 404));
});
app.use(ErrorController);
module.exports = app;
