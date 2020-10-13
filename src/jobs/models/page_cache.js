const { DataTypes } = require('sequelize');
const getSequelize = require('../../bootstrap/sequelize')

const sequelize = getSequelize()

const PageCache = sequelize.define('PageCache', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'page_caches',
  timestamps: true
});

module.exports = PageCache
