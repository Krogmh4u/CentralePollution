module.exports = (sequelize, Sequelize) => {
  const MainEntries = sequelize.define("main_entries", {
   
   /* id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },*/
     type: {
      type: Sequelize.STRING(15)
    },
    value: {
      type: Sequelize.DOUBLE
    }
  });

  return MainEntries;
};