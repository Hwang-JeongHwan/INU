
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Barcode = require('./barcode');
//const Post = require('./post');
//const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
  );
  
db.sequelize = sequelize;
db.Barcode= Barcode;

Barcode.init(sequelize);
//Post.init(sequelize);
//Hashtag.init(sequelize);

Barcode.associate(db);
//Post.associate(db);
//Hashtag.associate(db);

module.exports = db;