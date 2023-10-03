const AppError = require("../util/appError");
const catchErrorAsync = require("../util/catchError");
const jwt = require("jsonwebtoken");
const db = require("./../model/index");
const sellers = db.sellers;
const protect = catchErrorAsync(async (req, res, next) => {
  let token = null;
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

    const seller = await sellers.findOne({
      where: {
        id: user.id,
      },
    });
    if (!seller) {
      return next(new AppError("You are not register", 401));
    }

    req.user = seller.dataValues;
    next();
  });
});

const role = (roles) => {
  return catchErrorAsync(async (req, res, next) => {
    if (!roles.includes(req.user.sellerRole)) {
      return next(
        new AppError("Siz bu amaliyotni bajarish huquqiga ega emassiz!", 401)
      );
    }
    next();
  });
};

module.exports = { protect, role };
