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

db.sellers = sellers(sequelize, DataTypes);
db.stores = stores(sequelize, DataTypes);
db.products = products(sequelize, DataTypes);

db.products.belongsTo(db.stores, {
  foreignKey: {
    name: "storeId",
    allowNull: false,
  },
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
