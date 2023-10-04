const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");
const xlsx = require("json-as-xlsx");
const { QueryTypes } = require("sequelize");

const sequelize = db.sequelize;
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
      clientId: req.body?.clientId,
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
      soldProductName: item.soldProductName,
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
const checkFile = catchErrorAsync(async (req, res, next) => {
  const soldProducts = await sequelize.query(
    `SELECT productName,productModel,soldPrice,soldQuantity,productMeasure from soldProducts left join products on soldProducts.productId=products.id where saleId=${req.params.id}`,
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

  soldProducts.map((item) => {
    item.client = `${sale[0]?.clientName || ""} ${sale[0]?.clientPhone || ""} ${
      sale[0]?.clientAdress || ""
    }`;
    item.comment = sale[0]?.comment || "";
  });

  let data = [
    {
      sheet: "Adults",
      columns: [
        { label: "User", value: "user" }, // Top level data
        { label: "Age", value: (row) => row.age + " years" }, // Custom format
        {
          label: "Phone",
          value: (row) => (row.more ? row.more.phone || "" : ""),
        }, // Run functions
      ],
      content: [
        { user: "Andrea", age: 20, more: { phone: "11111111" } },
        { user: "Luis", age: 21, more: { phone: "12345678" } },
      ],
    },
    {
      sheet: "Children",
      columns: [
        { label: "User", value: "user" }, // Top level data
        { label: "Age", value: "age", format: '# "years"' }, // Column format
        { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
      ],
      content: [
        { user: "Manuel", age: 16, more: { phone: 9999999900 } },
        { user: "Ana", age: 17, more: { phone: 8765432135 } },
      ],
    },
  ];

  let settings = {
    fileName: "MySpreadsheet", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "write", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: { type: "buffer", bookType: "xlsx" }, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: true, // Display the columns from right-to-left (the default value is false)
  };

  responseFunction(req, res, 200, soldProducts, 1);
});

module.exports = {
  addOneSale,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale,
  checkFile,
};
