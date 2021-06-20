/*const Sequelize = require('sequelize');

module.exports = class Cal extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          barcode: {
            type: Sequelize.STRING(3000),
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING(3000),
          },
          HRNK_PRDLST_NM:{
              type:Sequelize.STRING(3000),
          },
          PRDLST_NM:{
              type:Sequelize.STRING(3000),
          },
        }, {
          sequelize,
          timestamps: true,
          underscored: false,
          modelName: 'Barcode',
          tableName: 'barcodes',
          paranoid: false,
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
        });
      }
    
      static associate(db) {
          
      }
    
};*/