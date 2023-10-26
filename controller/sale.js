const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");
const xlsx = require("json-as-xlsx");
const { QueryTypes } = require("sequelize");

const sequelize = db.sequelize;
const sales = db.sales;
const payments = db.payments;
const soldproducts = db.soldproducts;
const products = db.products;
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  responseFunction,
  deleteAll,
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

const options2 = [
  {
    model: db.sellers,
  },
  {
    model: db.stores,
  },
  {
    model: db.soldproducts,
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
  req.body.payments?.map(async (item) => {
    await payments.create({
      paymentAmount: item.paymentAmount,
      paymentType: item.paymentType,
      saleId: sale.id,
      clientId: req.body?.clientId,
      storeId: req.body.storeId,
    });
  });
  req.body.soldproducts?.map(async (item) => {
    const product = await products.findOne({
      where: {
        id: item.productId,
      },
    });
    const quantity = product.productQuantity - item.soldQuantity;
    await soldproducts.create({
      saleId: sale.id,
      productId: item.productId,
      soldPrice: item.soldPrice,
      soldQuantity: item.soldQuantity,
      soldProductName: item.soldProductName,
      soldProductMeasure: item.soldProductMeasure,
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

const getAllSales = getAll(sales, options2, "saleId", "saleMainPrice");
const getOneSale = getOne(sales, options);
const updateSale = updateOne(sales);
const deleteSale = deleteOne(sales);
const checkFile = catchErrorAsync(async (req, res, next) => {
  const soldproducts = await sequelize.query(
    `SELECT productName,productModel,soldPrice,soldQuantity,productMeasure from soldproducts left join products on soldproducts.productId=products.id where saleId=${req.params.id}`,
    {
      type: QueryTypes.SELECT,
    }
  );

  const sale = await sequelize.query(
    `SELECT comment, clientName, clientAdress, clientPhone from sales left join clients on sales.clientId=clients.id where sales.id=${req.params.id}`,
    {
      type: QueryTypes.SELECT,
    }
  );

  soldproducts.map((item) => {
    item.totalPrice = item.soldQuantity * item.soldPrice;
    item.client = `${sale[0]?.clientName + "," || ""} ${
      sale[0]?.clientPhone + "," || ""
    } ${sale[0]?.clientAdress + "," || ""}`;
    item.comment = sale[0]?.comment || "";
  });

  let data = [
    {
      sheet: "Check",
      columns: [
        { label: "Mahsulot nomi", value: (row) => row.productName }, // Top level data
        { label: "Mahsulot modeli", value: (row) => row.productModel }, // Custom format
        {
          label: "Mahsulot hajmi",
          value: (row) => row.soldQuantity + " " + row.productMeasure,
        }, // Custom format
        { label: "Mahsulot narxi", value: (row) => row.soldPrice }, // Custom format
        { label: "Umumiy narx", value: (row) => row.totalPrice }, // Custom format
        { label: "Xaridor ma'lumotlari", value: (row) => row.client }, // Custom format
        { label: "Izoh", value: (row) => row.comment }, // Custom format

        // Run functions
      ],
      content: soldproducts,
    },
  ];

  let settings = {
    fileName: "Check File", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "write", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: { type: "buffer", bookType: "xlsx" }, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: true, // Display the columns from right-to-left (the default value is false)
  };

  const file = xlsx(data, settings);

  res.statusCode = 200;
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=" ${
      sale[0]?.clientName || sale[0]?.comment
    } Check File.xls"`
  );
  res.setHeader("Content-Type", "application/vnd.ms-excel");
  res.end(file);
});

const deleteAllSales = deleteAll(sales);
module.exports = {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
  checkFile,
  deleteAllSales,
};
