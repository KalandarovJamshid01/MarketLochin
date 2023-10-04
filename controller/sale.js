const sale = require("../model/sale");
const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");

const sales = db.sales;
const payments = db.payments;
const soldProducts = db.soldproducts;
const products = db.products;
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  responseFunction,
} = require("./handlerController");

const options = [
  {
    model: db.sellers,
  },
  {
    model: db.stores,
  },
  {
    model: db.clients,
  },
  {
    model: db.soldproducts,
  },
  {
    model: db.payments,
  },
];

const addOneSale = catchErrorAsync(async (req, res, next) => {
  const sale = await sales.create({
    storeId: req.body.storeId,
    saleMainPrice: req.body.saleMainPrice,
    saleSoldPrice: req.body.saleSoldPrice,
    sellerId: req.body.sellerId,
    saleDebt: req.body.saleDebt,
    clientId: req.body?.clientId || null,
    comment: req.body?.comment || null,
  });
  req.body.payments.map(async (item) => {
    await payments.create({
      paymentAmount: item.paymentAmount,
      paymentType: item.paymentType,
      saleId: sale.id,
    });
  });
  req.body.soldProducts.map(async (item) => {
    const product = await products.findOne({
      where: {
        id: item.productId,
      },
    });
    const quantity = product.productQuantity - item.soldQuantity;
    await soldProducts.create({
      saleId: sale.id,
      productId: item.productId,
      soldPrice: item.soldPrice,
      soldQuantity: item.soldQuantity,
      soldProductName:item.soldProductName
    });
    await products.update(
      {
        productQuantity: quantity,
      },
      {
        where: {
          id: product.id,
        },
      }
    );
  });
  responseFunction(req, res, 201, sale, 1);
});

const getAllSales = getAll(sales);
const getOneSale = getOne(sales, options, "saleId", "saleMainPrice");
const updateSale = updateOne(sales);
const deleteSale = deleteOne(sales);

module.exports = {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
};
