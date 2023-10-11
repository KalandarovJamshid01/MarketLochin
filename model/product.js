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
  });
  return products;
};
