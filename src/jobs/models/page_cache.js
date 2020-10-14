const { DataTypes } = require('sequelize');
const getSequelize = require('../../bootstrap/sequelize')

const sequelize = getSequelize()

function nextExpiry() {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 30)
  return d
}

const PageCache = sequelize.define('PageCache', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stealAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: nextExpiry(),
  },
}, {
  tableName: 'page_caches',
  timestamps: true,
});

module.exports = PageCache
