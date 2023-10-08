const catchErrorAsync = require("../util/catchError");
const db = require("./../model/index");
const clients = db.clients;
const sequelize = db.sequelize;
const xlsx = require("json-as-xlsx");
const { QueryTypes } = require("sequelize");
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  responseFunction,
} = require("./handlerController");

const options = [
  {
    model: db.sales,
  },
  {
    model: db.debts,
  },
  {
    model: db.payments,
  },
];

const addOneClient = addOne(clients);
const getAllClients = getAll(clients, null, "clientPhone", "clientName");
const getOneClient = getOne(clients, options);
const updateOneClient = updateOne(clients);
const deleteOneClient = deleteOne(clients);
const getDebitorsFile = catchErrorAsync(async (req, res, next) => {
  const debitors = await sequelize.query(
    `SELECT clients.id, clients.clientName,clients.clientPhone,clients.clientAdress,clients.clientPaymentDate,SUM(debts.debt) as debtSum FROM clients left join debts on clients.id=debts.clientId group by clients.id HAVING SUM(debts.debt)!=0 or SUM(debts.debt)!=null ORDER BY clients.clientPaymentDate ASC`,
    {
      type: QueryTypes.SELECT,
    }
  );

  let data = [
    {
      sheet: "Debitors",
      columns: [
        { label: "Qarzdor ismi", value: (row) => row?.clientName }, // Top level data
        { label: "Qarzdor telefoni", value: (row) => row?.clientPhone },
        {
          label: "Qarzdor manzili",
          value: (row) => row?.clientAdress,
        },
        {
          label: "Qarzdorning umumiy qarzi",
          value: (row) => row?.debtSum + " " + "so'm",
        },
        {
          label: "Qarz qaytarish sanasi",
          value: (row) => row?.clientPaymentDate,
        }, // Custom format

        // Run functions
      ],
      content: debitors,
    },
  ];

  let settings = {
    fileName: `Qarzdorlar ro'yxati`, // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "write", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: { type: "buffer", bookType: "xlsx" }, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: true, // Display the columns from right-to-left (the default value is false)
  };

  const file = xlsx(data, settings);

  res.statusCode = 200;
  res.setHeader("Content-Disposition", `attachment; filename="Qarzdorlar.xls"`);
  res.setHeader("Content-Type", "application/vnd.ms-excel");
  res.end(file);
});
module.exports = {
  getAllClients,
  addOneClient,
  getOneClient,
  updateOneClient,
  deleteOneClient,
  getDebitorsFile,
};
