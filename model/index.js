const dbConfig = require("./../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const sellers = require("./seller");
const stores = require("./store");
const products = require("./product");
const adresses = require("./adress");
const payments = require("./payment");
const sales = require("./sales");
const soldproducts = require("./soldProduct");
const clients = require("./client");

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.adresses = adresses(sequelize, DataTypes);
db.stores = stores(sequelize, DataTypes);
db.sellers = sellers(sequelize, DataTypes);
db.sales = sales(sequelize, DataTypes);
db.products = products(sequelize, DataTypes);
db.soldproducts = soldproducts(sequelize, DataTypes);
db.payments = payments(sequelize, DataTypes);
db.clients = clients(sequelize, DataTypes);
db.products.belongsTo(db.stores, {
  foreignKey: {
    name: "storeId",
    allowNull: false,
  },
});

db.payments.belongsTo(db.sales, {
  foreignKey: {
    name: "saleId",
    allowNull: false,
  },
});

db.products.belongsTo(db.adresses, {
  foreignKey: {
    name: "adressId",
    allowNull: false,
  },
});
db.products.belongsTo(db.stores, {
  foreignKey: {
    name: "storeId",
    allowNull: false,
  },
});

db.sales.belongTo(db.stores, {
  foreignKey: {
    name: "storeId",
    allowNull: false,
  },
});

db.sales.belongTo(db.sellers, {
  foreignKey: {
    name: "sellerId",
    allowNull: false,
  },
});
db.sales.belongTo(db.clients, {
  foreignKey: {
    name: "clientId",
    allowNull: true,
  },
});
db.soldproducts.belongTo(db.products, {
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
});

db.soldproducts.belongTo(db.sales, {
  foreignKey: {
    name: "saleId",
    allowNull: false,
  },
});


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
