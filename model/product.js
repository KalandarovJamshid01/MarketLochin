module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.BIGINT,
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
  });
  const queryInterface = sequelize.getQueryInterface();
  queryInterface.addColumn("products", "productMainPrice", {
    type: DataTypes.BIGINT,
  });

  queryInterface.changeColumn("products", "productQuantity", {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  });
  return products;
};
