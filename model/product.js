module.exports = (sequelize, DataTypes) => {
  const queryInterface = sequelize.getQueryInterface();
  const products = sequelize.define("products", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productModel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    productPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    productOption: {
      type: DataTypes.STRING,
    },
    productImgUrl: {
      type: DataTypes.STRING,
    },
    productMeasure: {
      type: DataTypes.ENUM("kg", "litr", "dona", "metr", "metrkv"),
    },
    productMainPrice: {
      type: DataTypes.BIGINT,
    },
    productCurrency: {
      type: DataTypes.ENUM("dollar", "sum"),
    },
  });
  queryInterface.changeColumn("products", "productCurrency", {
    type: DataTypes.ENUM("dollar", "sum"),
    defaultValue: "sum",
  });
  queryInterface.changeColumn("products", "productPrice", {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  });
  queryInterface.changeColumn("products", "productQuantity", {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  });
  queryInterface.changeColumn("products", "productMainPrice", {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  });
  return products;
};
