module.exports = (sequelize, DataTypes) => {
  const adresses = sequelize.define("adresses", {
    adressName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return adresses;
};
