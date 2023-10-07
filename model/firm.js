module.exports = (sequelize, DataTypes) => {
  const adresses = sequelize.define("firms", {
    firmName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firmINN: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: true,
    },
  });
  return adresses;
};
