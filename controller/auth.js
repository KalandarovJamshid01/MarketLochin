const AppError = require("../util/appError");
const catchErrorAsync = require("../util/catchError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./../model/index");
const { responseFunction } = require("./handlerController");
const sellers = db.sellers;

const cookieOptions = {
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  httpOnly: true,
};

if (process.env.NODE_ENV === "PRODUCTION") {
  cookieOptions.secure = true;
}

const saveTokenCookie = (res, token) => {
  res.cookie("jwt", token, cookieOptions);
};

const login = catchErrorAsync(async (req, res, next) => {
  const { sellerPhone, sellerPassword } = req.body;
  if (!sellerPhone || !sellerPassword) {
    return next(new AppError("Tizimga kirishda ma'lumotlar yeterli emas"));
  }
  const seller = await sellers.findOne({
    where: {
      sellerPhone: sellerPhone,
    },
  });
  if (!seller) {
    return next(new AppError("Bunday foydalanuvchi mavjud emas", 404));
  }

  const tekshirHashga = async (oddiyPassword, hashPassword) => {
    const tekshir = await bcrypt.compare(oddiyPassword, hashPassword);
    return tekshir;
  };

  if (!(await tekshirHashga(sellerPassword, seller.sellerPassword))) {
    return next(
      new AppError(
        "Sizning parol yoki loginingiz xato! Iltimos qayta urinib kuring!",
        401
      )
    );
  }

  const token = jwt.sign({ id: seller.id }, process.env.JWT_SECRET);

  const data = {
    token: token,
    seller,
  };
  saveTokenCookie(res, token);
  responseFunction(req, res, 201, data);
});

module.exports = {
  login,
};
