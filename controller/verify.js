const AppError = require("../utility/appError");
const catchErrorAsync = require("../utility/catchError");
const jwt = require("jsonwebtoken");
const db = require("./../models/index");
const User = db.users;
const protect = catchErrorAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not login", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return next(new AppError("Token is invallid", 403));
    }

    const userData = await User.findOne({
      where: {
        pin: user.pin,
      },
    });
    if (!userData) {
      return next(new AppError("You are not register", 401));
    }

    req.user = userData.dataValues;
    next();
  });
});
const role = (roles) => {
  return catchErrorAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Siz bu amaliyotni bajarish huquqiga ega emassiz!", 401)
      );
    }
    next();
  });
};

module.exports = { protect, role };
